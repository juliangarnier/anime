import { describe, it, expect } from "vitest";
import { loadSkills, loadSkillsIndex, matchSkills } from "../../src/skills.mjs";

describe("loadSkills (reads the real skills/ dir)", () => {
  const skills = loadSkills();

  it("loads the core skills (and however many others exist)", () => {
    const names = skills.map((s) => s.name);
    expect(names).toContain("anime-core");
    expect(names).toContain("anime-migration-v3-v4");
    expect(skills.length).toBeGreaterThanOrEqual(9);
  });

  it("each skill has a name, description, body, and raw markdown", () => {
    for (const s of skills) {
      expect(s.name).toMatch(/^anime-/);
      expect(s.description.length).toBeGreaterThan(0);
      expect(s.body.length).toBeGreaterThan(0);
      expect(s.raw).toContain("---");
    }
  });

  it("folds the multi-line YAML description into a single string", () => {
    const core = skills.find((s) => s.name === "anime-core");
    expect(core.description).toContain("Core anime.js v4");
    expect(core.description).not.toContain("\n");
  });

  it("strips frontmatter from the body", () => {
    const core = skills.find((s) => s.name === "anime-core");
    expect(core.body.startsWith("---")).toBe(false);
  });
});

describe("loadSkillsIndex", () => {
  it("returns the skills llms.txt with every skill mentioned", () => {
    const index = loadSkillsIndex();
    for (const name of [
      "anime-core",
      "anime-timeline",
      "anime-migration-v3-v4",
    ]) {
      expect(index).toContain(name);
    }
  });
});

describe("matchSkills", () => {
  const skills = loadSkills();

  it("matches an exact skill name", () => {
    const m = matchSkills(skills, "anime-core");
    expect(m.map((s) => s.name)).toEqual(["anime-core"]);
  });

  it("matches the bare topic via the anime- prefix convention", () => {
    const m = matchSkills(skills, "timeline");
    expect(m.map((s) => s.name)).toContain("anime-timeline");
  });

  it("falls back to keyword/description substring matching", () => {
    const m = matchSkills(skills, "migration");
    expect(m.map((s) => s.name)).toContain("anime-migration-v3-v4");
  });

  it("returns all skills for an empty topic", () => {
    expect(matchSkills(skills, "").length).toBe(skills.length);
  });

  it("returns an empty array for a topic that matches nothing", () => {
    expect(matchSkills(skills, "zzz-no-such-topic")).toEqual([]);
  });
});
