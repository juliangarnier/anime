export function scrambleText(params?: ScrambleTextParams): FunctionValue<ScrambleTextTween>;
export type ScrambleTextTween = {
    from: number;
    to: number;
    duration: number;
    delay: number;
    ease: string;
    modifier: (v: number) => string;
};
import type { ScrambleTextParams } from '../types/index.js';
import type { FunctionValue } from '../types/index.js';
