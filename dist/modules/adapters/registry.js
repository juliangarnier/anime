/**
 * Anime.js - adapters - ESM
 * @version v4.5.0
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
 * For scalar tweens, `value` is the interpolated number. For color and complex tweens it is `undefined`; read `tween._numbers` instead. `gate(target)` scopes the prop to a subset of matching targets.
 *
 * Resolution order: every Adapter's target adapters in registration order (first match wins) then every Adapter's property resolvers (first non-null wins) then engine direct property path.
 */

/**
 * @typedef TargetAdapterEntry
 * @property {(t: any) => any} get
 * @property {(target: any, value: number, tween: any) => void} set
 * @property {(t: any) => boolean} [gate]
 */

const alwaysTrue = () => true;

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
   * @param {(target: any, value: number, tween: any) => void} setter
   * @param {(t: any) => boolean} [gate]
   */
  registerProperty(name, getter, setter, gate) {
    this.props[name] = {
      get: getter,
      set: setter,
      gate: gate || alwaysTrue,
    };
  }
}

class Adapter {
  /**
   * @param {((t: any) => boolean) | null} [detect]
   *   Optional gate. When provided, every lookup against this Adapter's target adapters and resolvers is skipped if `detect(target)` returns falsy. Lets the Adapter as a whole short-circuit on unrelated targets.
   */
  constructor(detect) {
    /** @type {((t: any) => boolean) | null} */
    this.detect = detect || null;
    /** @type {TargetAdapter[]} */
    this.targetAdapters = [];
    /** @type {((target: any, name: string) => TargetAdapterEntry | null)[]} */
    this.propertyResolvers = [];
  }

  /**
   * Creates and registers a `TargetAdapter` scoped to this Adapter.
   *
   * @param {(t: any) => boolean} detect
   * @return {TargetAdapter}
   */
  registerTargetAdapter(detect) {
    const ta = new TargetAdapter(detect);
    this.targetAdapters.push(ta);
    return ta;
  }

  /**
   * Registers a property resolver scoped to this Adapter. Resolvers are functions invoked at tween creation when no target adapter has claimed the name; the function returns an entry for names it handles or `null` to defer. Use for runtime-matched patterns (Color / Vector axis detection, name-prefix conventions, etc.).
   *
   * @param {(target: any, name: string) => TargetAdapterEntry | null} resolver
   */
  registerPropertyResolver(resolver) {
    if (this.propertyResolvers.indexOf(resolver) === -1) this.propertyResolvers.push(resolver);
  }
}

const adapters = /** @type {Adapter[]} */([]);

/**
 * Creates and registers an Adapter. Each library extending `animate()` calls this once and uses the returned Adapter to wire up its target adapters and property resolvers. The optional `detect` short-circuits all lookups against the Adapter when the target is unrelated.
 *
 * @param {(t: any) => boolean} [detect]
 * @return {Adapter}
 */
function registerAdapter(detect) {
  const a = new Adapter(detect);
  adapters.push(a);
  return a;
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
  const al = adapters.length;
  outer: for (let i = 0; i < al; i++) {
    const a = adapters[i];
    if (a.detect && !a.detect(target)) continue;
    const tas = a.targetAdapters;
    for (let j = 0, m = tas.length; j < m; j++) {
      const ta = tas[j];
      if (ta.detect(target)) {
        const entry = ta.props[name];
        if (entry && (!entry.gate || entry.gate(target))) return entry;
        break outer;
      }
    }
  }
  for (let i = 0; i < al; i++) {
    const a = adapters[i];
    if (a.detect && !a.detect(target)) continue;
    const rs = a.propertyResolvers;
    for (let j = 0, m = rs.length; j < m; j++) {
      const entry = rs[j](target, name);
      if (entry) return entry;
    }
  }
  return null;
}

export { registerAdapter, resolveAdapterEntry };
