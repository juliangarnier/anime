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
export type compositionTypes = number;
export namespace compositionTypes {
    let replace: number;
    let none: number;
    let blend: number;
}
export const isRegisteredTargetSymbol: unique symbol;
export const isDomSymbol: unique symbol;
export const isSvgSymbol: unique symbol;
export const transformsSymbol: unique symbol;
export const proxyTargetSymbol: unique symbol;
export const minValue: 1e-11;
export const maxValue: 1000000000000;
export const K: 1000;
export const maxFps: 240;
export const emptyString: "";
export const cssVarPrefix: "var(";
export const shortTransforms: Map<any, any>;
export const validTransforms: string[];
export const transformsFragmentStrings: {};
export function noop(): void;
export const validRgbHslRgx: RegExp;
export const hexTestRgx: RegExp;
export const rgbExecRgx: RegExp;
export const rgbaExecRgx: RegExp;
export const hslExecRgx: RegExp;
export const hslaExecRgx: RegExp;
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
