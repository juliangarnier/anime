import { animate, createTimer, createTimeline, JSAnimation, Timeline, Timer, waapi, WAAPIAnimation, spring, Spring, createLayout, utils } from '../dist/modules/index.js';
import { composeComplexValue } from '../dist/modules/core/values.js';
import { threeAdapter, getInstances } from '../dist/modules/adapters/three/index.js';
import type { Tween } from '../dist/modules/types/index.js';
import type { InstancedMesh } from 'three';

threeAdapter.registerPropertyResolver(() => ({ get: target => target.x, set: (target, value) => { target.x = value; } }));
// @ts-expect-error Property resolvers return an adapter entry or null.
threeAdapter.registerPropertyResolver(() => 1);

const timer = createTimer({
  autoplay: false,
  onUpdate(self) {
    const instance: Timer = this;
    const argument: Timer = self;
    // @ts-expect-error Timers have no animation targets.
    this.targets;
  },
});
const animation = animate({ x: 0 }, {
  x: 100, autoplay: false,
  onUpdate(self) {
    const instance: JSAnimation = this;
    const argument: JSAnimation = self;
    this.targets;
    // @ts-expect-error Animations have no timeline labels.
    this.labels;
  },
});
const timeline = createTimeline({
  autoplay: false,
  onRender(self) {
    const instance: Timeline = this;
    const argument: Timeline = self;
    this.labels;
    // @ts-expect-error Timelines have no animation targets.
    this.targets;
  },
});

animate([{ x: 0 }, { x: 0 }], {
  muted: false,
  x: { to: 100, muted: true },
});
// @ts-expect-error Muting applies to all targets and accepts no function.
animate([{ x: 0 }, { x: 0 }], { muted: () => true, x: 100 });
// @ts-expect-error Property muting accepts no function.
animate({ x: 0 }, { x: { to: 100, muted: () => true } });
// @ts-expect-error Keyframe muting accepts no function.
animate({ x: 0 }, { keyframes: [{ x: 100, muted: () => true }] });
// @ts-expect-error Timer muting accepts no function.
createTimer({ muted: () => true });
// @ts-expect-error Timeline muting accepts no function.
createTimeline({ muted: () => true });
// @ts-expect-error Default muting accepts no function.
createTimeline({ defaults: { muted: () => true } });
createTimer({ muted: true });
createTimeline({ muted: true, defaults: { muted: false } })
  .add({ x: 0 }, { x: { to: 100, muted: true } })
  .call({ id: 'muted call', muted: true, callback() {} })
  .sync({ id: 'muted sync', muted: true, target: animation });
const animationMuted: boolean = animation.muted;
// @ts-expect-error Muting accepts a boolean, not text.
createTimer({ muted: 'true' });

animation.pause().seek(50).refresh().targets;
timeline.pause().seek(50).label('end').labels;
timer.pause().seek(50).currentTime;
animation.onUpdate = function(self) {
  const instance: JSAnimation = this;
  this.targets;
  self.targets;
  // @ts-expect-error This must not become any.
  this.missingProperty;
};
timeline.call(function(self) {
  self.labels;
  const context: void = this;
  // @ts-expect-error The callback receives a timeline, not an animation.
  self.targets;
});

const animationDone = animation.then(function(self) {
  const context: void = this;
  self.targets;
  self.refresh();
  // @ts-expect-error Completion values do not expose their disabled then method.
  self.then();
  // @ts-expect-error Unknown properties must be rejected.
  self.missingProperty;
});
const timelineDone: Promise<void> = timeline.then(function(self) {
  const context: void = this;
  self.labels;
  self.add({ x: 0 }, { x: 1 });
});
const timerDone: Promise<void> = timer.then(self => {
  self.currentTime;
  // @ts-expect-error Timers have no targets.
  self.targets;
});

class CustomTimer extends Timer { customValue = 1; }
class CustomAnimation extends JSAnimation { customValue = 2; }
class CustomTimeline extends Timeline { customValue = 3; }
const customTimer = new CustomTimer({ autoplay: false });
const customAnimation = new CustomAnimation({ x: 0 }, { x: 1, autoplay: false });
const customTimeline = new CustomTimeline({ autoplay: false });
customTimer.pause().customValue;
customAnimation.refresh().customValue;
customTimeline.label('end').customValue;
const customTimerDone: Promise<number> = customTimer.then(self => self.customValue);
const customAnimationDone: Promise<number> = customAnimation.then(self => self.customValue);
const customTimelineDone: Promise<number> = customTimeline.then(self => self.customValue);
const asyncAnimationDone: Promise<number> = customAnimation.then(async self => self.customValue);
const chainedAnimationDone: Promise<string> = customAnimationDone.then(value => value.toFixed());
customTimeline.call(self => self.customValue);
customAnimation.onComplete = function(self) {
  const value: number = this.customValue + self.customValue;
  // @ts-expect-error Callback types must not become any.
  self.missingProperty;
};

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;
type TimerContext = Assert<Equal<ThisParameterType<typeof timer.onBegin>, Timer>>;
type AnimationContext = Assert<Equal<ThisParameterType<typeof animation.onRender>, JSAnimation>>;
type TimelineContext = Assert<Equal<ThisParameterType<typeof timeline.onRender>, Timeline>>;
type SubclassContext = Assert<Equal<ThisParameterType<typeof customAnimation.onComplete>, CustomAnimation>>;
type SubclassArgument = Assert<Equal<Parameters<typeof customAnimation.onComplete>[0], CustomAnimation>>;
type SubclassReturn = Assert<Equal<ReturnType<typeof customAnimation.pause>, CustomAnimation>>;
type CompletionResult = Assert<Equal<Awaited<typeof animationDone>, void>>;

async function awaitedValues() {
  const a = await animation;
  a.targets;
  // @ts-expect-error Awaited animation values must not become any.
  a.missingProperty;
  const t = await timeline;
  t.labels;
  const c = await customTimeline;
  c.customValue;
  timeline.sync(a).sync(t).sync(c).sync([a, t, c]);
  const result = await animationDone;
  // @ts-expect-error This callback returns nothing.
  result.targets;
  const noCallback = await customAnimation.then();
  noCallback.targets;
  noCallback.customValue;
  const returnedSelf = await customAnimation.then(self => self);
  returnedSelf.customValue;

  const returned = await Promise.resolve().then(() => customTimeline);
  returned.labels;
  returned.customValue;
  const [resolvedTimer, resolvedAnimation, resolvedTimeline] = await Promise.all([timer, animation, timeline]);
  resolvedTimer.currentTime;
  resolvedAnimation.targets;
  resolvedTimeline.labels;
  const nested = await (async () => customAnimation)();
  nested.targets;
  nested.customValue;
  // @ts-expect-error Promise chains must not lose the concrete value type.
  returned.missingProperty;
}

const native = waapi.animate(document.createElement('div'), {
  x: 100,
  onComplete(self) {
    const instance: WAAPIAnimation = this;
    const argument: WAAPIAnimation = self;
    this.targets;
  },
});
const nativeDone = native.then(function(self) {
  const context: void = this;
  self.targets;
  // @ts-expect-error Completion values do not expose their disabled then method.
  self.then();
  // @ts-expect-error WAAPI animations have no timeline labels.
  self.labels;
  return 42;
});
type NativeCompletionResult = Assert<Equal<Awaited<typeof nativeDone>, number>>;
const asyncNativeDone: Promise<number> = native.then(async () => 42);
const callbackResult: Promise<{ value: number }> = animation.then(() => ({ value: 42 }));
// @ts-expect-error Callback results must not become any.
const wrongResult: Promise<string> = native.then(() => 42);

Promise.resolve().then(() => native).then(self => {
  self.targets;
  timeline.sync(self).sync([self]);
  // @ts-expect-error Native promise chains must not lose the value type.
  self.missingProperty;
});

function complexResult(tween: Tween) {
  const value: string | undefined = composeComplexValue(tween, .5, 2, false);
  type ComplexResult = Assert<Equal<ReturnType<typeof composeComplexValue>, string | undefined>>;
}

spring({
  onComplete(self) {
    const instance: Spring = this;
    this.settlingDuration;
    self.targets;
  },
});

// @ts-expect-error Layout definitions do not support muting.
createLayout(document.createElement('div'), { muted: true });
// @ts-expect-error Layout transitions do not support muting.
createLayout(document.createElement('div')).animate({ muted: true });
// @ts-expect-error Layout updates do not support muting.
createLayout(document.createElement('div')).update(() => {}, { muted: true });

createLayout(document.createElement('div')).animate({
  onUpdate(self) {
    const instance: Timeline = this;
    self.labels;
  },
  onComplete(self) {
    const context: void = this;
    self.labels;
    // @ts-expect-error Layout completion receives a timeline, not an animation.
    self.targets;
  },
  onPause(self) {
    const context: void = this;
    self.labels;
  },
});

// Object markers keep the concrete callback type and accept completed sync targets.
customTimeline.call({ id: 'callback', callback: self => self.customValue }, 100);
timeline.call({ callback(self) { self.labels; } }, 'ready');
timeline.sync({ id: 'sync', target: animation }, 100);
timeline.sync({ target: [animation, timer] }, 200);
animation.then(completed => timeline.sync({ id: 'completed', target: completed }));
// @ts-expect-error Object callbacks must be functions.
timeline.call({ id: 'bad', callback: 1 }, 100);
// @ts-expect-error Object syncs require a target.
timeline.sync({ id: 'bad' }, 100);
// @ts-expect-error The parameters-second signature is not part of the API.
timeline.call(() => {}, { id: 'bad' }, 100);
// @ts-expect-error The parameters-second signature is not part of the API.
timeline.sync(animation, { id: 'bad' }, 100);

declare const mesh: InstancedMesh;
const instance = getInstances(mesh)[0];
if (instance) {
  instance.x = 10;
  instance.rotateY = 90;
  instance.scale = 2;
  const origin: number = instance.transformOriginX;
  // @ts-expect-error Instance transforms accept numbers.
  instance.scale = '2';
  // @ts-expect-error Instance transforms have no arbitrary properties.
  instance.missingTransform = 1;
}

const pickedObject: { x: number } = utils.randomPick([{ x: 1 }]);
const pickedNumber: number = utils.randomPick<number>([1, 2]);
declare const mixedInput: string | number[];
const pickedMixed: string | number = utils.randomPick(mixedInput);
const pickedCharacter: string = utils.randomPick('abc');
const pickedLiteral: 1 | 2 = utils.randomPick([1, 2] as const);
// @ts-expect-error Picking an object does not return a string.
const pickedString: string = utils.randomPick([{ x: 1 }]);

const seeded = utils.createSeededRandom(8);
const seededValue: number = seeded({ min: 10, max: 20 });
const randomNumber: number = utils.random(0, 10);
const randomGenerator: () => number = utils.random({ min: 0, max: 10, perTarget: true });
// @ts-expect-error A random number is not a string.
const randomString: string = utils.random(0, 10);
const rounded: number = utils.round(1.234, 2);
// @ts-expect-error The number of decimals is a number, not a string.
utils.round(1.234, '2');
const seededShared: number = seeded({ perTarget: false });
const seededGenerator: () => number = seeded({ perTarget: true });
declare const perTarget: boolean;
const seededEither: number | (() => number) = seeded({ perTarget });
// @ts-expect-error A per target draw returns a generator.
const seededNumber: number = seeded({ perTarget: true });
