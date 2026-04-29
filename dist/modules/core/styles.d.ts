export function sanitizePropertyName(propertyName: string, target: Target, tweenType: tweenTypes): string;
export function revertValues<T extends Renderable>(renderable: T, inlineStylesOnly?: boolean): T;
export function cleanInlineStyles<T extends Renderable>(renderable: T): T;
import type { Target } from '../types/index.js';
import { tweenTypes } from './consts.js';
import type { Renderable } from '../types/index.js';
