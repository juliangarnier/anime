// v3 syntax patterns and their v4 fixes. One source of truth, shared by the
// validate-skills script and the MCP check_anime_v4_syntax tool.

/** @typedef {{ pattern: RegExp, label: string, fix: string }} V3Token */

/** @type {V3Token[]} */
export const V3_TOKENS = [
  {
    pattern: /import\s+\w+\s+from\s+['"]animejs['"]/,
    label: "default import of animejs",
    fix: "Use named imports: import { animate } from 'animejs'",
  },
  {
    pattern: /\banime\s*\(/,
    label: "anime() call",
    fix: "Use animate(targets, params). anime() does not exist in v4",
  },
  {
    pattern: /\btargets\s*:/,
    label: "targets: property",
    fix: "Pass targets as the first argument: animate(targets, { ... })",
  },
  {
    pattern: /\btranslateX\b/,
    label: "translateX",
    fix: "Use the x shorthand",
  },
  {
    pattern: /\btranslateY\b/,
    label: "translateY",
    fix: "Use the y shorthand",
  },
  {
    pattern: /\beasing\s*:/,
    label: "easing: property",
    fix: "Use ease: and drop the 'ease' prefix from the value (easeInOutQuad → 'inOutQuad')",
  },
  {
    pattern: /\banime\.timeline\b/,
    label: "anime.timeline()",
    fix: "Use createTimeline()",
  },
  {
    pattern: /\banime\.stagger\b/,
    label: "anime.stagger()",
    fix: "Use the named import stagger()",
  },
  {
    pattern: /\banime\.(random|set|get)\b/,
    label: "anime.random/set/get",
    fix: "Use utils.random / utils.set / utils.get",
  },
  {
    pattern: /\bdirection\s*:/,
    label: "direction: property",
    fix: "Use alternate: true or reversed: true",
  },
];

// Drop comments before scanning. A note like "// not translateX" teaches the
// rule, it shouldn't trip the check. Non-string input returns "" instead of throwing.
export const stripComments = (code) =>
  typeof code !== "string"
    ? ""
    : code
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/.*$/gm, "$1");

/**
 * Scan a code string for deprecated v3 tokens (comments ignored).
 * @param {string} code
 * @returns {{ label: string, fix: string }[]} matches (empty if clean v4)
 */
export const findV3Tokens = (code) => {
  const stripped = stripComments(code);
  return V3_TOKENS
    .filter((t) => t.pattern.test(stripped))
    .map(({ label, fix }) => ({ label, fix }));
};
