/**
 * Anime.js - adapters - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { registerAdapter } from '../registry.js';

// Duck-typed gate for three.js targets, used as threeAdapter's Adapter-level detect.
// Early-rejects DOM nodes via nodeType so the OR chain only runs on non-DOM objects.
// Includes the isAnimejsInstanceProxy marker set in instance.js for per-instance wrappers.
const isThreeTarget = (t) => !!(
  t && !t.nodeType && (
    t.isObject3D || t.isMaterial || t.isTexture ||
    t.isFog || t.isFogExp2 || t.isUniformNode ||
    t.isColor || t.isVector2 || t.isVector3 || t.isVector4 ||
    t.isAnimejsInstanceProxy
  )
);

const threeAdapter = registerAdapter(isThreeTarget);

export { threeAdapter };
