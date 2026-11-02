/**
 * Anime.js - adapters - ESM
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { registerAdapter } from '../registry.js';

// Reject DOM nodes by nodeType first so the isX chain only runs on plain objects.
// Include the isAnimejsInstanceProxy marker that instance.js sets on the per instance wrappers.
const isThreeTarget = (t) => !!(
  t && !t.nodeType && (
    t.isObject3D || t.isMaterial || t.isTexture ||
    t.isFog || t.isFogExp2 || t.isUniformNode ||
    t.isAnimejsInstanceProxy
  )
);

/** @type {ReturnType<typeof registerAdapter>} */
const threeAdapter = registerAdapter(isThreeTarget);

export { threeAdapter };
