export function updateTimelineTakeovers(timeline: Timeline, time: number): void;
export function sampleAnimation(animation: JSAnimation, newAnimation: JSAnimation, time: number): void;
export function restoreSampledAnimation(): void;
export function removeTimelineTakeover(tween: Tween): void;
export function getPreviousTimelineSibling(sibling: Tween, animation: JSAnimation, tweenStartTime: number): Tween;
export function composeTimelineTween(tween: Tween, prevSibling: Tween, tweenStartTime: number): void;
export function renderChangedOwners(muteCallbacks: number): number;
export function rebuildTimelineTakeovers(timeline: Timeline): void;
export type Takeover = {
    time: number;
    /**
     * The first keyframe that takes the property, its _prevSibling is the tween that it takes it from
     */
    tween: Tween;
};
import type { Timeline } from './timeline.js';
import type { JSAnimation } from '../animation/animation.js';
import type { Tween } from '../types/index.js';
