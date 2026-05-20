import { addChild, removeChild } from "../core/helpers.js";

/**
 * @import {
 *   DOMTarget,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   WAAPIAnimation,
 * } from '../waapi/waapi.js'
*/

const WAAPIAnimationsLookups = {
  _head: null,
  _tail: null,
}

/**
 * @param {DOMTarget} $el
 * @param {String} [property]
 * @param {WAAPIAnimation} [parent]
 * @return {globalThis.Animation}
 */
export const removeWAAPIAnimation = ($el, property, parent) => {
  let nextLookup = WAAPIAnimationsLookups._head;
  let anim;
  while (nextLookup) {
    const next = nextLookup._next;
    const matchTarget = nextLookup.$el === $el;
    const matchProperty = !property || nextLookup.property === property;
    const matchParent = !parent || nextLookup.parent === parent;
    if (matchTarget && matchProperty && matchParent) {
      anim = nextLookup.animation;
      try { anim.commitStyles(); } catch {};
      anim.cancel();
      removeChild(WAAPIAnimationsLookups, nextLookup);
      const lookupParent = nextLookup.parent;
      if (lookupParent) {
        lookupParent._completed++;
        if (lookupParent.animations.length === lookupParent._completed) {
          lookupParent.completed = true;
          lookupParent.paused = true;
          if (!lookupParent.muteCallbacks) {
            lookupParent.onComplete(lookupParent);
            lookupParent._resolve(lookupParent);
          }
        }
      }
    }
    nextLookup = next;
  }
  return anim;
}

/**
 * @param {WAAPIAnimation} parent
 * @param {DOMTarget} $el
 * @param {String} property
 * @param {PropertyIndexedKeyframes} keyframes
 * @param {KeyframeAnimationOptions} params
 * @retun {globalThis.Animation}
 */
export const addWAAPIAnimation = (parent, $el, property, keyframes, params) => {
  const animation = $el.animate(keyframes, params);
  const animTotalDuration = params.delay + (+params.duration * params.iterations);
  animation.playbackRate = parent._speed;
  if (parent.paused) animation.pause();
  if (parent.duration < animTotalDuration) {
    parent.duration = animTotalDuration;
    parent.controlAnimation = animation;
  }
  parent.animations.push(animation);
  removeWAAPIAnimation($el, property);
  addChild(WAAPIAnimationsLookups, { parent, animation, $el, property, _next: null, _prev: null });
  const handleRemove = () => removeWAAPIAnimation($el, property, parent);
  animation.oncancel = handleRemove;
  animation.onremove = handleRemove;
  if (!parent.persist) {
    animation.onfinish = handleRemove;
  }
  return animation;
}
