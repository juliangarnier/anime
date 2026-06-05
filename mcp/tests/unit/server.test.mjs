import { describe, it, expect, beforeEach } from "vitest";
import { registerAll } from "../../src/server.mjs";
import { FakeMcpServer } from "../helpers/fakeMcpServer.mjs";
import { fakeSkills, fakeIndex } from "../fixtures/skills.mjs";

const build = () => {
  const server = new FakeMcpServer();
  registerAll(server, { skills: fakeSkills, skillsIndex: fakeIndex });
  return server;
};

describe("registerAll", () => {
  let server;
  beforeEach(() => {
    server = build();
  });

  it("registers both tools", () => {
    expect(server.tools.map((t) => t.name).sort()).toEqual([
      "check_anime_v4_syntax",
      "search_anime_docs",
    ]);
  });

  it("registers one resource per skill plus the index", () => {
    expect(server.resources.map((r) => r.name)).toEqual([
      "anime-core",
      "anime-timeline",
      "anime-migration-v3-v4",
      "skills-index",
    ]);
  });

  it("each tool declares an inputSchema", () => {
    for (const t of server.tools) {
      expect(t.config.inputSchema).toBeTypeOf("object");
    }
  });
});

describe("check_anime_v4_syntax tool", () => {
  let tool;
  beforeEach(() => {
    tool = build().getTool("check_anime_v4_syntax");
  });

  it("reports OK for valid v4 code", async () => {
    const res = await tool.handler({
      code: "import { animate } from 'animejs'; animate('.b', { x: 1 })",
    });
    expect(res.content[0].text).toMatch(/^OK/);
  });

  it("reports the count and fixes for v3 code", async () => {
    const res = await tool.handler({
      code: "anime({ targets: '.b', translateX: 1 })",
    });
    expect(res.content[0].text).toContain("deprecated v3 pattern");
    expect(res.content[0].text).toContain("→");
  });

  it("does not throw on empty or missing code", async () => {
    await expect(tool.handler({ code: "" })).resolves.toBeDefined();
    await expect(tool.handler({})).resolves.toBeDefined();
  });
});

describe("search_anime_docs tool", () => {
  let tool;
  beforeEach(() => {
    tool = build().getTool("search_anime_docs");
  });

  it("returns the matching skill body for a topic", async () => {
    const res = await tool.handler({ topic: "timeline" });
    expect(res.content[0].text).toContain("anime-timeline");
    expect(res.content[0].text).toContain("createTimeline");
  });

  it("defaults to the migration + core skills when no topic is given", async () => {
    const res = await tool.handler({});
    expect(res.content[0].text).toContain("anime-migration-v3-v4");
    expect(res.content[0].text).toContain("anime-core");
    expect(res.content[0].text).not.toContain("anime-timeline");
  });

  it("falls back to all skills when the topic matches nothing", async () => {
    const res = await tool.handler({ topic: "zzz-nope" });
    expect(res.content[0].text).toContain("anime-core");
    expect(res.content[0].text).toContain("anime-timeline");
    expect(res.content[0].text).toContain("anime-migration-v3-v4");
  });
});

describe("skill resources", () => {
  it("a skill resource handler returns its raw markdown", async () => {
    const resource = build().getResource("anime-core");
    const res = await resource.handler(new URL("anime://skills/anime-core"));
    expect(res.contents[0].text).toContain("animate(targets, params)");
    expect(res.contents[0].mimeType).toBe("text/markdown");
  });

  it("the skills-index resource returns the index text", async () => {
    const resource = build().getResource("skills-index");
    const res = await resource.handler(new URL("anime://skills-index"));
    expect(res.contents[0].text).toContain("skills index");
  });
});
