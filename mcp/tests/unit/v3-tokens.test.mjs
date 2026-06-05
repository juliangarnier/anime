import { describe, it, expect } from "vitest";
import {
  findV3Tokens,
  stripComments,
  V3_TOKENS,
} from "../../../scripts/v3-tokens.mjs";

describe("findV3Tokens", () => {
  it("flags the canonical v3 snippet with all its deprecated patterns", () => {
    const code =
      "import anime from 'animejs';\n" +
      "anime({ targets: '.b', translateX: 100, easing: 'easeInOutQuad' });";
    const labels = findV3Tokens(code).map((t) => t.label);
    expect(labels).toContain("default import of animejs");
    expect(labels).toContain("anime() call");
    expect(labels).toContain("targets: property");
    expect(labels).toContain("translateX");
    expect(labels).toContain("easing: property");
  });

  it("returns no issues for valid v4 code", () => {
    const code =
      "import { animate } from 'animejs';\n" +
      "animate('.b', { x: 100, ease: 'inOutQuad' });";
    expect(findV3Tokens(code)).toEqual([]);
  });

  it("ignores v3 tokens that appear only inside comments", () => {
    const code =
      "import { animate } from 'animejs';\n" +
      "animate('.b', { x: 100 }); // not translateX, and never anime({ targets })";
    expect(findV3Tokens(code)).toEqual([]);
  });

  it("ignores v3 tokens inside block comments", () => {
    const code = "/* old: anime({ targets: '.b', translateX: 1 }) */\nanimate('.b', { x: 1 });";
    expect(findV3Tokens(code)).toEqual([]);
  });

  it("flags anime.timeline / anime.stagger / anime.random helpers", () => {
    const labels = findV3Tokens(
      "anime.timeline(); anime.stagger(50); anime.random(0, 1);",
    ).map((t) => t.label);
    expect(labels).toContain("anime.timeline()");
    expect(labels).toContain("anime.stagger()");
    expect(labels).toContain("anime.random/set/get");
  });

  it("flags direction: as a v3 property", () => {
    const labels = findV3Tokens("animate('.b', { direction: 'alternate' })").map(
      (t) => t.label,
    );
    expect(labels).toContain("direction: property");
  });

  it("does not treat the v4 'ease:' key as the v3 'easing:' key", () => {
    expect(findV3Tokens("animate('.b', { ease: 'inOutQuad' })")).toEqual([]);
  });

  it("every match carries a non-empty fix string", () => {
    for (const { fix } of findV3Tokens("anime({ targets: 1 })")) {
      expect(typeof fix).toBe("string");
      expect(fix.length).toBeGreaterThan(0);
    }
  });

  it("is null-safe: non-string input yields no issues instead of throwing", () => {
    expect(findV3Tokens(undefined)).toEqual([]);
    expect(findV3Tokens(null)).toEqual([]);
    expect(findV3Tokens(42)).toEqual([]);
  });
});

describe("stripComments", () => {
  it("removes line comments but keeps code", () => {
    expect(stripComments("const x = 1; // a comment").trim()).toBe("const x = 1;");
  });

  it("removes block comments", () => {
    expect(stripComments("a /* b */ c")).toBe("a  c");
  });

  it("does not break protocol-relative or URL double-slashes after a colon", () => {
    // the (^|[^:]) guard means "https://x" is preserved
    expect(stripComments("const u = 'https://x';")).toContain("https://x");
  });

  it("coerces non-strings to empty string", () => {
    expect(stripComments(undefined)).toBe("");
    expect(stripComments(null)).toBe("");
  });
});

describe("V3_TOKENS", () => {
  it("each token has a pattern, label, and fix", () => {
    for (const t of V3_TOKENS) {
      expect(t.pattern).toBeInstanceOf(RegExp);
      expect(typeof t.label).toBe("string");
      expect(typeof t.fix).toBe("string");
    }
  });
});
