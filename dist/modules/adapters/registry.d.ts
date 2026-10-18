/**
 * Creates and registers an Adapter. Each library extending `animate()` calls this once and uses the returned Adapter to wire up its target adapters and property resolvers. The optional `detect` short-circuits all lookups against the Adapter when the target is unrelated.
 *
 * @param {(t: any) => boolean} [detect]
 * @return {Adapter}
 */
export function registerAdapter(detect?: (t: any) => boolean): Adapter;
/**
 * Internal resolution. Tries every Adapter's target adapters first (in registration order, first match wins), then every Adapter's property resolvers.
 *
 * @param {any} target
 * @param {string} name
 * @return {TargetAdapterEntry | null}
 */
export function resolveAdapterEntry(target: any, name: string): TargetAdapterEntry | null;
export type TargetAdapterEntry = {
    get: (t: any) => any;
    set: (target: any, value: number, tween: any) => void;
    gate?: (t: any) => boolean;
};
declare class Adapter {
    /**
     * @param {((t: any) => boolean) | null} [detect]
     *   Optional gate. When provided, every lookup against this Adapter's target adapters and resolvers is skipped if `detect(target)` returns falsy. Lets the Adapter as a whole short-circuit on unrelated targets.
     */
    constructor(detect?: ((t: any) => boolean) | null);
    /** @type {((t: any) => boolean) | null} */
    detect: ((t: any) => boolean) | null;
    /** @type {TargetAdapter[]} */
    targetAdapters: TargetAdapter[];
    /** @type {((target: any, name: string) => TargetAdapterEntry | null)[]} */
    propertyResolvers: ((target: any, name: string) => TargetAdapterEntry | null)[];
    /**
     * Creates and registers a `TargetAdapter` scoped to this Adapter.
     *
     * @param {(t: any) => boolean} detect
     * @return {TargetAdapter}
     */
    registerTargetAdapter(detect: (t: any) => boolean): TargetAdapter;
    /**
     * Registers a property resolver scoped to this Adapter. Resolvers are functions invoked at tween creation when no target adapter has claimed the name; the function returns an entry for names it handles or `null` to defer. Use for runtime-matched patterns (Color / Vector axis detection, name-prefix conventions, etc.).
     *
     * @param {(target: any, name: string) => TargetAdapterEntry | null} resolver
     */
    registerPropertyResolver(resolver: (target: any, name: string) => TargetAdapterEntry | null): void;
}
declare class TargetAdapter {
    /**
     * @param {(t: any) => boolean} detect
     */
    constructor(detect: (t: any) => boolean);
    detect: (t: any) => boolean;
    /** @type {Record<string, TargetAdapterEntry>} */
    props: Record<string, TargetAdapterEntry>;
    /**
     * Registers a property the adapter handles. `setter` receives `(target, value, tween)`. For color and complex tweens `value` is `undefined`, read `tween._numbers` instead. `gate(target)` scopes the prop to a subset of matching targets.
     *
     * @param {string} name
     * @param {(t: any) => any} getter
     * @param {(target: any, value: number, tween: any) => void} setter
     * @param {(t: any) => boolean} [gate]
     */
    registerProperty(name: string, getter: (t: any) => any, setter: (target: any, value: number, tween: any) => void, gate?: (t: any) => boolean): void;
}
export {};
