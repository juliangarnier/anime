export namespace additive {
    export let animation: any;
    export { noop as update };
}
export function addAdditiveTween(tween: Tween): void;
export function removeAdditiveTween(tween: Tween): void;
export type AdditiveAnimation = {
    duration: number;
    _offset: number;
    _delay: number;
    _head: Tween;
    _tail: Tween;
    _hasSharedProgress: boolean;
    _hasSimpleTweens: boolean;
};
import { noop } from '../core/consts.js';
import type { Tween } from '../types/index.js';
