export const isBrowser: boolean;
/** @typedef {Window & {AnimeJS: Array}|null} AnimeJSWindow

/** @type {AnimeJSWindow} */
export const win: AnimeJSWindow;
/** @type {Document|null} */
export const doc: Document | null;
export type tweenTypes = number;
export namespace tweenTypes {
    let OBJECT: number;
    let ATTRIBUTE: number;
    let CSS: number;
    let TRANSFORM: number;
    let CSS_VAR: number;
}
export type valueTypes = number;
export namespace valueTypes {
    let NUMBER: number;
    let UNIT: number;
    let COLOR: number;
    let COMPLEX: number;
}
export type tickModes = number;
export namespace tickModes {
    let NONE: number;
    let AUTO: number;
    let FORCE: number;
}
export type overrideTypes = number;
export namespace overrideTypes {
    let NONE_1: number;
    export { NONE_1 as NONE };
    export let TIMELINE: number;
    export let PERMANENT: number;
}
export type compositionTypes = number;
export namespace compositionTypes {
    let replace: number;
    let none: number;
    let blend: number;
    let muted: number;
}
export namespace compositionNames {
    import replace_1 = compositionTypes.replace;
    export { replace_1 as replace };
    import none_1 = compositionTypes.none;
    export { none_1 as none };
    import blend_1 = compositionTypes.blend;
    export { blend_1 as blend };
}
export const isDomSymbol: unique symbol;
export const isSvgSymbol: unique symbol;
export const transformsSymbol: unique symbol;
export const proxyTargetSymbol: unique symbol;
export const replaceLookupsSymbol: unique symbol;
export const lookupsOwnerSymbol: unique symbol;
export const noOriginalValueSymbol: unique symbol;
export const minValue: 1e-11;
export const maxValue: 1000000000000;
export const K: 1000;
export const maxFps: 240;
export const emptyString: "";
export const cssVarPrefix: "var(";
export const emptyArray: any[];
export const shortTransforms: Map<string, string>;
export const validTransforms: string[];
export const transformsFragmentStrings: {};
export function noop(): void;
export function noopModifier<T>(v: T): T;
export const validRgbHslRgx: RegExp;
export const hexTestRgx: RegExp;
export const colorFunctionExecRgx: RegExp;
export const digitWithExponentRgx: RegExp;
export const unitsExecRgx: RegExp;
export const lowerCaseRgx: RegExp;
export const relativeValuesExecRgx: RegExp;
export const cssVariableMatchRgx: RegExp;
/**
 * /**
 */
export type AnimeJSWindow = (Window & {
    AnimeJS: any[];
}) | null;
