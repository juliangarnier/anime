import {
  expect,
} from '../utils.js';

import { animate, createTimeline, createTimer, waapi, Timer, JSAnimation, Timeline } from '../../dist/modules/index.js';

suite('Promises', () => {

  test('then() on timer', resolve => {
    createTimer({ duration: 30 }).then(anim => {
      expect(anim.currentTime).to.equal(30);
      resolve();
    });
  });

  test('then() on animation', resolve => {
    animate('#target-id', {
      y: 100,
      duration: 30,
    })
    .then(anim => {
      expect(anim.currentTime).to.equal(30);
      resolve();
    });
  });

  test('then() on timeline', resolve => {
    createTimeline()
    .add('#target-id', {
      x: 100,
      duration: 15,
    })
    .add('#target-id', {
      y: 100,
      duration: 15,
    })
    .then(tl => {
      expect(tl.currentTime).to.equal(30);
      resolve();
    });
  });

  test('Use a timer as a return value in an async function', resolve => {
    async function doSomethingAsync() {
      async function wait30ms() {
        return createTimer({ duration: 30 });
      }
      const asyncTimer = await wait30ms();
      expect(asyncTimer.currentTime).to.equal(30);
      resolve();
    }
    doSomethingAsync();
  });

  for (const [name, create] of /** @type {const} */([
    ['timer', () => createTimer({ duration: 100, autoplay: false })],
    ['animation', () => animate('#target-id', { opacity: [0, 1], duration: 100, autoplay: false })],
    ['timeline', () => createTimeline({ autoplay: false }).add('#target-id', { opacity: [0, 1], duration: 100 })],
    ['WAAPI animation', () => waapi.animate('#target-id', { opacity: [0, 1], duration: 100, autoplay: false })],
  ])) {
    test(`Resolves 20000 ${name} listeners without recursion`, async () => {
      const instance = create();
      const keys = Reflect.ownKeys(instance);
      let calls = 0;
      const promises = Array.from({ length: 20000 }, (_, index) => instance.then(() => {
        expect(calls++).to.equal(index);
        return index;
      }));
      instance.complete();
      expect(await Promise.all(promises)).to.deep.equal(Array.from({ length: 20000 }, (_, i) => i));
      expect(calls).to.equal(promises.length);
      expect(Reflect.ownKeys(instance)).to.deep.equal(keys);
      expect(await instance.then(() => 42)).to.equal(42);
      if (name !== 'WAAPI animation') {
        instance.seek(0).complete();
        expect(calls).to.equal(promises.length);
      }
      instance.revert();
    });

    test(`Resolves each ${name} subscriber once`, async () => {
      const instance = create();
      const calls = [];
      const error = new Error('completion failed');
      const first = instance.then(self => {
        expect(self).to.equal(instance);
        calls.push(1);
        return 42;
      });
      const failed = instance.then(() => { calls.push(2); throw error; });
      const caught = failed.catch(reason => reason);
      const last = instance.then(async () => { calls.push(3); await Promise.resolve(); return 43; });
      const awaited = Promise.all([instance, instance]);
      await Promise.resolve();
      instance.complete();
      expect(await Promise.all([first, last])).to.deep.equal([42, 43]);
      expect(calls).to.deep.equal([1, 2, 3]);
      expect(await caught).to.equal(error);
      for (const value of await awaited) expect(value).to.equal(instance);
      expect(await instance.then()).to.equal(instance);
      expect(await instance.then(self => self)).to.equal(instance);
      expect(await instance.then(async self => { await Promise.resolve(); return self; })).to.equal(instance);
      expect(await instance.then(() => {})).to.equal(undefined);
      if (name !== 'WAAPI animation') {
        instance.seek(0).complete();
        expect(calls).to.deep.equal([1, 2, 3]);
      }
      instance.revert();
    });

    test(`Waits for pending ${name} completion results`, async () => {
      for (const completed of [false, true]) {
        const instance = create();
        if (completed) {
          instance.complete();
          await instance;
        }
        const { promise: result, resolve: release } = Promise.withResolvers();
        let called = false;
        let settled = false;
        const done = instance.then(() => {
          called = true;
          return result;
        });
        done.then(() => { settled = true; });
        expect(called).to.equal(completed);
        if (!completed) instance.complete();
        if (name !== 'WAAPI animation') expect(called).to.equal(true);
        await instance;
        expect(called).to.equal(true);
        await Promise.resolve();
        expect(settled).to.equal(false);
        release(42);
        expect(await done).to.equal(42);
        instance.revert();
      }
    });

    test(`Rejects ${name} completion errors without replacing then`, async () => {
      for (const completed of [false, true]) {
        for (const asynchronous of [false, true]) {
          const instance = create();
          if (completed) {
            instance.complete();
            await instance;
          }
          const then = instance.then;
          const error = new Error('completion failed');
          const failed = instance.then(() => {
            if (asynchronous) return Promise.reject(error);
            throw error;
          });
          const caught = failed.catch(reason => reason);
          if (!completed) instance.complete();
          expect(await caught).to.equal(error);
          expect(instance.then).to.equal(then);
          expect(await instance.then(() => 43)).to.equal(43);
          instance.revert();
        }
      }
    });

    if (name === 'WAAPI animation') continue;

    test(`Preserves ${name} listeners registered for the next run`, async () => {
      const instance = create();
      const subscribe = instance.then.bind(instance);
      const calls = [];
      let nextDone;
      const firstDone = instance.then(() => {
        calls.push('first');
        instance.seek(0);
        nextDone = subscribe(() => { calls.push('next'); return 3; });
        return 1;
      });
      const secondDone = instance.then(() => { calls.push('second'); return 2; });
      instance.complete();
      expect(await Promise.all([firstDone, secondDone])).to.deep.equal([1, 2]);
      expect(calls).to.deep.equal(['first', 'second']);
      instance.complete();
      expect(await nextDone).to.equal(3);
      expect(calls).to.deep.equal(['first', 'second', 'next']);
      instance.revert();
    });

    test(`Rejects throwing then accessors without skipping ${name} listeners`, async () => {
      const instance = create();
      const error = new Error('cannot read then');
      const failed = instance.then(() => ({ get then() { throw error; } }));
      const caught = failed.catch(reason => reason);
      const done = instance.then(() => 42);
      instance.complete();
      expect(await caught).to.equal(error);
      expect(await done).to.equal(42);
      expect(await instance.then(() => 43)).to.equal(43);
      instance.revert();
    });

    test(`Keeps earlier ${name} listeners pending after a muted seek`, async () => {
      const instance = create();
      let calls = 0;
      const pending = instance.then(() => { calls++; });
      instance.seek(100, true);
      expect(calls).to.equal(0);
      expect(await instance.then(() => 42)).to.equal(42);
      expect(calls).to.equal(0);
      instance.seek(0).complete();
      await pending;
      expect(calls).to.equal(1);
      instance.revert();
    });
  }

  test('Preserves subclass identity in completion callbacks', async () => {
    class CustomTimer extends Timer { customValue = 1; }
    class CustomAnimation extends JSAnimation { customValue = 2; }
    class CustomTimeline extends Timeline { customValue = 3; }
    const instances = [
      new CustomTimer({ duration: 100, autoplay: false }),
      new CustomAnimation({ x: 0 }, { x: 100, duration: 100, autoplay: false }),
      new CustomTimeline({ autoplay: false }).add({ x: 0 }, { x: 100, duration: 100 }),
    ];
    for (const instance of instances) {
      const then = instance.then;
      let called = false;
      const done = instance.then(function(self) {
        expect(this).to.equal(undefined);
        expect(self).to.equal(instance);
        expect(self.customValue > 0).to.equal(true);
        called = true;
        return self.customValue;
      });
      instance.seek(100);
      expect(await done).to.equal(instance.customValue);
      expect(called).to.equal(true);
      expect(instance.then).to.equal(then);
      expect(await Promise.resolve(instance)).to.equal(instance);
      expect(await Promise.resolve().then(() => instance)).to.equal(instance);
      expect(await Promise.all([instance])).to.deep.equal([instance]);
      instance.cancel();
    }
  });

});
