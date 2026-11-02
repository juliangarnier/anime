import {
  expect,
  getChildAtIndex,
} from '../utils.js';

import {
  createTimeline,
  createTimer,
  globals,
  stagger,
} from '../../dist/modules/index.js';

/** @import { TimelineSyncTarget } from '../../dist/modules/types/index.js' */

suite('Timeline markers', () => {

  test('Returns only the editor build children and keeps nested hooks active', () => {
    const previous = globals.editor;
    const tl = createTimeline({ autoplay: false });
    const targets = [{ x: 0 }, { x: 0 }];
    const registrations = [];
    globals.editor = { ...previous,
      addTimelineChild: (owner, target, params, position, build) => {
        const children = build(target, { ...params, duration: 200 }, position);
        registrations.push([params.id, children.map(child => child.id)]);
        return true;
      },
    };
    try {
      tl.add(targets, { id: 'outer', x: 100, ease: 'linear' }, (_, index) => {
        tl.add({ x: 0 }, { id: `nested-${index}`, x: 100, ease: 'linear' }, 0);
        return index * 100;
      }).seek(150, true);
      expect(registrations).to.deep.equal([
        ['nested-0', ['nested-0']], ['nested-1', ['nested-1']], ['outer', ['outer-0', 'outer-1']],
      ]);
      expect(targets.map(target => target.x)).to.deep.equal([75, 25]);
    } finally { globals.editor = previous; tl.cancel(); }
  });

  test('Restores edited timer parameters and position before an immediate seek', () => {
    const previous = globals.editor;
    let calls = 0;
    const tl = createTimeline({ autoplay: false });
    globals.editor = { ...previous, addTimelineTimer: (params, position, owner, build) => build({ ...params, duration: 200 }, 300) };
    try {
      tl.add({ duration: 100, onUpdate: () => calls++ }, 0).seek(150);
      expect(getChildAtIndex(tl, 0)._offset).to.equal(300);
      expect(tl.duration).to.equal(500);
      expect(calls).to.equal(0);
      tl.seek(400);
      expect(calls).to.equal(1);
    } finally { globals.editor = previous; tl.cancel(); }
  });

  for (const kind of ['call', 'sync', 'timer']) {
    test(`Finishes the ${kind} editor hook after native construction before the method returns`, () => {
      const tl = createTimeline({ autoplay: false });
      const previous = globals.editor;
      let finished = false;
      const hook = kind === 'timer' ? 'addTimelineTimer' : kind === 'call' ? 'addTimelineCall' : 'addTimelineSync';
      globals.editor = { ...previous, [hook]: (...args) => {
        const build = args.at(-1);
        expect(tl._head).to.equal(null);
        const children = build(kind === 'timer' ? { duration: 75 } : 150);
        expect(children).to.deep.equal([tl._head]);
        expect(tl._head, 'native children exist while the editor hook is still running').to.not.equal(null);
        expect(getChildAtIndex(tl, 0)._offset).to.equal(kind === 'timer' ? 100 : kind === 'call' ? 150 - 1e-11 : 150);
        finished = true;
      } };
      try {
        const result = kind === 'timer' ? tl.add({ duration: 50 }, 100)
          : kind === 'call' ? tl.call(() => {}, 100)
          : tl.sync(createTimer({ duration: 50, autoplay: false }), 100);
        expect(result).to.equal(tl);
        expect(finished).to.equal(true);
        expect(tl.duration).to.equal(kind === 'timer' ? 175 : kind === 'call' ? 150 : 200);
      } finally { globals.editor = previous; tl.cancel(); }
    });
  }

  test('Identifies call timers by ID and preserves the position and callback', () => {
    let calls = 0;
    const tl = createTimeline({ autoplay: false });
    const parameters = Object.freeze({ id: 'start', callback: self => {
      expect(self).to.equal(tl);
      calls++;
    } });
    tl.call(parameters, 100).init();
    expect(tl._tail.id).to.equal('start');
    tl.seek(50);
    expect(calls).to.equal(0);
    tl.seek(101);
    expect(calls).to.equal(1);
    tl.cancel();
  });

  test('Returns only the sync build children without nested callback additions', () => {
    const tl = createTimeline({ autoplay: false });
    const previous = globals.editor;
    const targets = [0, 1].map(i => createTimer({ duration: 50, autoplay: false,
      onPause: () => tl.add({ id: `nested-${i}`, duration: 25 }, 0),
    }));
    let added = [];
    globals.editor = { ...previous, addTimelineSync: (target, params, position, owner, build) => { added = build(position); } };
    try {
      targets.forEach(target => target.resume());
      tl.sync({ id: 'batch', target: targets }, 100);
      expect(added.length).to.equal(2);
      expect(added.map(child => child.targets[0])).to.deep.equal(targets);
      expect(added.every(child => child._offset === 100)).to.equal(true);
      expect(tl._head.id).to.equal('nested-0');
      expect(tl._head._next._next.id).to.equal('nested-1');
    } finally { globals.editor = previous; tl.cancel(); }
  });

  test('Preserves the synced animation ID across registrations', () => {
    const child = createTimer({ id: 'child', duration: 50, autoplay: false });
    const tl = createTimeline({ autoplay: false });
    tl.sync({ id: 'first', target: child }, 100).sync({ id: 'second', target: child }, 200).init();
    expect(tl._head.id).to.equal('first');
    expect(tl._tail.id).to.equal('second');
    expect(child.id).to.equal('child');
    expect(tl.duration).to.equal(250);
  });

  test('Assigns the latest label position for ordinary and prototype names', () => {
    const tl = createTimeline({ autoplay: false });
    let calls = 0;
    try {
      for (const name of ['ready', '__proto__', 'constructor']) {
        tl.label(name, 10).label(name, 50);
        expect(tl.labels[name]).to.equal(50);
      }
      tl.call(() => calls++, '__proto__').seek(25);
      expect(calls).to.equal(0);
      tl.seek(75);
      expect(calls).to.equal(1);
    } finally { tl.cancel(); }
  });

  test('Runs call and sync registrations that repeat an ID', () => {
    const tl = createTimeline({ autoplay: false });
    const first = createTimer({ duration: 100, autoplay: false });
    const second = createTimer({ duration: 100, autoplay: false });
    const calls = [];
    try {
      tl.call({ id: 'notify', callback: () => calls.push(1) }, 10)
        .call({ id: 'notify', callback: () => calls.push(2) }, 20)
        .sync({ id: 'move', target: first }, 0)
        .sync({ id: 'move', target: second }, 50)
        .call(() => calls.push(3), 30)
        .seek(75);
      expect(calls).to.deep.equal([1, 2, 3]);
      expect(first.currentTime).to.equal(75);
      expect(second.currentTime).to.equal(25);
    } finally { tl.cancel(); first.cancel(); second.cancel(); }
  });

  test('Keeps nested sync registrations that repeat an ID', () => {
    const tl = createTimeline({ autoplay: false });
    const nested = createTimer({ duration: 100, autoplay: false });
    const child = createTimer({ duration: 100, autoplay: false,
      onPause: () => tl.sync({ id: 'move', target: nested }, 50),
    });
    try {
      child.resume();
      tl.sync({ id: 'move', target: child }, 0).seek(75, true);
      expect(child.currentTime).to.equal(75);
      expect(nested.currentTime).to.equal(25);
    } finally { tl.cancel(); child.cancel(); nested.cancel(); }
  });

  test('Lets the editor hook decide how to handle repeated IDs', () => {
    const previous = globals.editor;
    const tl = createTimeline({ autoplay: false });
    const seen = [];
    globals.editor = { ...previous, addTimelineCall: (callback, params, position, owner, build) => {
      seen.push(params.id);
      build(position);
    } };
    try {
      let calls = 0;
      tl.call({ id: 'notify', callback: () => calls++ }, 10)
        .call({ id: 'notify', callback: () => calls++ }, 20).seek(30);
      expect(seen).to.deep.equal(['notify', 'notify']);
      expect(calls).to.equal(2);
    } finally { globals.editor = previous; tl.cancel(); }
  });

  test('Registers one source marker for an array sync and keeps per child positions', () => {
    const children = [createTimer({ duration: 50, autoplay: false }), createTimer({ duration: 50, autoplay: false })];
    const tl = createTimeline({ autoplay: false });
    const position = stagger(100, { start: 50 });
    const previous = globals.editor;
    const seen = [];
    globals.editor = { ...previous, addTimelineSync: (synced, parameters, position, owner, build) => {
      seen.push({ synced, parameters, position, owner });
      build(position);
    } };
    try {
      const parameters = { id: 'batch', target: children };
      tl.sync(parameters, position).init();
      expect(seen.length).to.equal(1);
      expect(seen[0].synced).to.equal(children);
      expect(seen[0].parameters).to.equal(parameters);
      expect(seen[0].owner).to.equal(tl);
      expect(getChildAtIndex(tl, 0)._offset).to.equal(50);
      expect(getChildAtIndex(tl, 1)._offset).to.equal(150);
    } finally {
      globals.editor = previous;
    }
  });

  for (const array of [false, true]) {
    test(`Keeps editor hooks active in onPause of a synced ${array ? 'array' : 'target'}`, () => {
      const tl = createTimeline({ autoplay: false });
      const linked = createTimer({ duration: 20, autoplay: false });
      const child = createTimer({ duration: 50, autoplay: false, onPause: () => {
        tl.add({ x: 0 }, { id: 'from-pause', x: 1, ease: 'linear' }, 10);
        tl.sync({ id: 'nested', target: linked }, 20);
      } });
      const previous = globals.editor;
      const additions = [];
      const syncs = [];
      globals.editor = { ...previous,
        addTimelineChild: (owner, target, params) => { additions.push(params.id); },
        addTimelineSync: (target, params, position, owner, build) => { syncs.push(params.id); build(position); },
      };
      try {
        child.resume();
        tl.sync({ id: 'outer', target: array ? [child] : child }, 100);
        expect(additions).to.deep.equal(['from-pause']);
        expect(syncs).to.deep.equal(['outer', 'nested']);
      } finally {
        globals.editor = previous;
        child.pause();
        tl.pause();
      }
    });
  }

  test('Registers editor children from a sync position function', () => {
    const tl = createTimeline({ autoplay: false });
    const target = createTimer({ duration: 50, autoplay: false });
    const previous = globals.editor;
    const seen = [];
    globals.editor = { ...previous, addTimelineChild: (owner, target, params) => { seen.push(params.id); } };
    try {
      tl.sync({ id: 'outer', target }, () => {
        tl.add({ x: 0 }, { id: 'from-position', x: 1, ease: 'linear' }, 10);
        return 100;
      });
      expect(seen).to.deep.equal(['from-position']);
    } finally { globals.editor = previous; }
  });

  test('Resolves a pending label against the duration after its editor hook', () => {
    const tl = createTimeline({ autoplay: false }).add({ duration: 100 });
    const previous = globals.editor;
    globals.editor = { ...previous, addTimelineLabel: (name, position, owner) => {
      owner.add({ duration: 50 });
      return position;
    } };
    try {
      tl.label('ready', 'ready');
      expect(tl.labels.ready).to.equal(150);
    } finally { globals.editor = previous; tl.cancel(); }
  });

  test('Resolves a pending label after its editor hook stretches the timeline', () => {
    const tl = createTimeline({ autoplay: false }).add({ duration: 100 }).label('existing', 50);
    const previous = globals.editor;
    globals.editor = { ...previous, addTimelineLabel: (name, position, owner) => {
      owner.stretch(200);
      return position;
    } };
    try {
      tl.label('ready', 'ready');
      expect(tl.labels.ready).to.equal(200);
      expect(tl.labels.existing).to.equal(100);
    } finally { globals.editor = previous; tl.cancel(); }
  });

  test('Keeps direct callback positions', () => {
    const calls = [];
    const tl = createTimeline({ autoplay: false });
    tl.label('ready', 100)
      .call(() => calls.push('direct'), 'ready')
      .call(() => calls.push('numeric'), 200)
      .call(() => calls.push('end')).init();
    tl.seek(99);
    expect(calls).to.deep.equal([]);
    tl.seek(201);
    expect(calls).to.deep.equal(['direct', 'numeric', 'end']);
  });

  test('Does not use the target ID as a registration ID for direct syncs', () => {
    const target = createTimer({ id: 'child', duration: 50, autoplay: false });
    const tl = createTimeline({ autoplay: false });
    tl.sync(target, 100).sync(target, 200).init();
    expect(tl.duration).to.equal(250);
  });

  test('Keeps staggered positions for sync objects', () => {
    const targets = [createTimer({ duration: 50, autoplay: false }), createTimer({ duration: 50, autoplay: false })];
    const tl = createTimeline({ autoplay: false });
    tl.sync(Object.freeze({ id: 'batch', target: targets }), stagger(100, { start: 50 })).init();
    expect(getChildAtIndex(tl, 0)._offset).to.equal(50);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(150);
    tl.sync({ id: 'single', target: targets[0] }, 250).init();
    expect(tl._tail.id).to.equal('single');
    expect(tl.duration).to.equal(300);
  });

  test('Accepts direct sync targets that have their own target and id properties', () => {
    const target = { id: 'external', target: {}, duration: 100, currentTime: 0, paused: false, pause() { this.paused = true; } };
    const tl = createTimeline({ autoplay: false });
    try {
      tl.sync(/** @type {TimelineSyncTarget} */(/** @type {unknown} */(target)), 50).init().seek(100);
      expect(target.paused).to.equal(true);
      expect(target.currentTime).to.equal(50);
    } finally {
      tl.cancel();
    }
  });
});
