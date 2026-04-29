/**
 * A class that splits text into words and wraps them in span elements while preserving the original HTML structure.
 * @class
 */
export class TextSplitter {
    /**
     * @param  {Element|NodeList|String|Array<Element>} target
     * @param  {TextSplitterParams} [parameters]
     */
    constructor(target: Element | NodeList | string | Array<Element>, parameters?: TextSplitterParams);
    debug: boolean;
    includeSpaces: boolean;
    accessible: boolean;
    linesOnly: boolean;
    /** @type {String|false|SplitFunctionValue} */
    lineTemplate: string | false | SplitFunctionValue;
    /** @type {String|false|SplitFunctionValue} */
    wordTemplate: string | false | SplitFunctionValue;
    /** @type {String|false|SplitFunctionValue} */
    charTemplate: string | false | SplitFunctionValue;
    $target: HTMLElement;
    html: string;
    lines: any[];
    words: any[];
    chars: any[];
    effects: any[];
    effectsCleanups: any[];
    cache: string;
    ready: boolean;
    width: number;
    resizeTimeout: NodeJS.Timeout;
    resizeObserver: ResizeObserver;
    /**
     * @param  {(...args: any[]) => Tickable | (() => void) | void} effect
     * @return this
     */
    addEffect(effect: (...args: any[]) => Tickable | (() => void) | void): this;
    revert(): this;
    /**
     * Recursively processes a node and its children
     * @param {Node} node
     */
    splitNode(node: Node): void;
    /**
     * @param {Boolean} clearCache
     * @return {this}
     */
    split(clearCache?: boolean): this;
    refresh(): void;
}
export function splitText(target: Element | NodeList | string | Array<Element>, parameters?: TextSplitterParams): TextSplitter;
export function split(target: HTMLElement | NodeList | string | Array<HTMLElement>, parameters?: TextSplitterParams): TextSplitter;
export type Segment = {
    segment: string;
    isWordLike?: boolean;
};
export type Segmenter = {
    segment: (arg0: string) => Iterable<Segment>;
};
import type { SplitFunctionValue } from '../types/index.js';
import type { Tickable } from '../types/index.js';
import type { TextSplitterParams } from '../types/index.js';
