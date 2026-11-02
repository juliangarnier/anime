/**
 * Anime.js - adapters - ESM
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

/**
 * Anime.js adapter API. Each library or class group that wants to extend `animate()` and `utils.set()` calls `registerAdapter()` to create its own `Adapter`. The returned `Adapter` exposes `registerTargetAdapter(detect)` for per-class detection and `registerPropertyResolver(fn)` for global Color / Vector / pattern-based fallbacks.
 *
 *   import { registerAdapter } from 'animejs/adapters';
 *
 *   const myAdapter = registerAdapter();
 *   const widget = myAdapter.registerTargetAdapter((t) => t instanceof MyWidget);
 *   widget.registerProperty('value',
 *     (t) => t.getValue(),
 *     (target, value) => target.setValue(value),
 *   );
 *
 * For scalar tweens, value is the interpolated number. For color and complex tweens it is undefined, read tween._numbers instead.
 *
 * Resolution order: the target adapters of every Adapter in registration order, first match wins, then the property resolvers of every Adapter, first non null wins, then the engine property path.
 */

/** @import { Tween } from '../types/index.js' */

/**
 * @typedef TargetAdapterEntry
 * @property {(t: any) => any} get
 * @property {(target: any, value: number, tween: Tween) => void} set
 * @property {(t: any) => boolean} [gate]
 */

/** @typedef {(target: any, name: string) => TargetAdapterEntry | null} PropertyResolver */

/** @type {Adapter[]} */
const adapters = [];

class TargetAdapter {
  /**
   * @param {(t: any) => boolean} detect
   */
  constructor(detect) {
    this.detect = detect;
    /** @type {Record<string, TargetAdapterEntry>} */
    this.props = {};
  }

  /**
   * Registers a property the adapter handles. `setter` receives `(target, value, tween)`. For color and complex tweens `value` is `undefined`, read `tween._numbers` instead. `gate(target)` scopes the prop to a subset of matching targets.
   *
   * @param {string} name
   * @param {(t: any) => any} getter
   * @param {(target: any, value: number, tween: Tween) => void} setter
   * @param {(t: any) => boolean} [gate]
   */
  registerProperty(name, getter, setter, gate) {
    this.props[name] = {
      get: getter,
      set: setter,
      gate,
    };
  }
}

class Adapter {
  /**
   * @param {((t: any) => boolean) | null} [detect]
   *   Skips every lookup against this Adapter when detect(target) returns falsy.
   */
  constructor(detect) {
    /** @type {((t: any) => boolean) | null} */
    this.detect = detect || null;
    /** @type {TargetAdapter[]} */
    this.targetAdapters = [];
    /** @type {PropertyResolver[]} */
    this.propertyResolvers = [];
  }

  /**
   * Creates and registers a `TargetAdapter` scoped to this Adapter.
   *
   * @param {(t: any) => boolean} detect
   * @return {TargetAdapter}
   */
  registerTargetAdapter(detect) {
    const targetAdapter = new TargetAdapter(detect);
    this.targetAdapters.push(targetAdapter);
    return targetAdapter;
  }

  /**
   * Registers a property resolver scoped to this Adapter. The resolver returns an entry for the names it handles, or null to defer.
   *
   * @param {PropertyResolver} resolver
   */
  registerPropertyResolver(resolver) {
    if (this.propertyResolvers.indexOf(resolver) === -1) this.propertyResolvers.push(resolver);
  }
}

/**
 * Creates and registers an Adapter. Each library extending `animate()` calls this once and uses the returned Adapter to wire up its target adapters and property resolvers. The optional `detect` short-circuits all lookups against the Adapter when the target is unrelated.
 *
 * @param {(t: any) => boolean} [detect]
 * @return {Adapter}
 */
function registerAdapter(detect) {
  const adapter = new Adapter(detect);
  adapters.push(adapter);
  return adapter;
}

/**
 * Internal resolution. Tries every Adapter's target adapters first (in registration order, first match wins), then every Adapter's property resolvers.
 *
 * @param {any} target
 * @param {string} name
 * @return {TargetAdapterEntry | null}
 */
function resolveAdapterEntry(target, name) {
  if (!target) return null;
  const adapterCount = adapters.length;
  outer: for (let i = 0; i < adapterCount; i++) {
    const adapter = adapters[i];
    if (adapter.detect && !adapter.detect(target)) continue;
    const targetAdapters = adapter.targetAdapters;
    for (let j = 0, m = targetAdapters.length; j < m; j++) {
      const targetAdapter = targetAdapters[j];
      if (targetAdapter.detect(target)) {
        const entry = targetAdapter.props[name];
        if (entry && (!entry.gate || entry.gate(target))) return entry;
        break outer;
      }
    }
  }
  for (let i = 0; i < adapterCount; i++) {
    const adapter = adapters[i];
    if (adapter.detect && !adapter.detect(target)) continue;
    const resolvers = adapter.propertyResolvers;
    for (let j = 0, m = resolvers.length; j < m; j++) {
      const entry = resolvers[j](target, name);
      if (entry) return entry;
    }
  }
  return null;
}

export { registerAdapter, resolveAdapterEntry };
