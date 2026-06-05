// MCP server for anime.js v4. Serves the skills (skills/*/SKILL.md) as:
//   - resources: anime://skills/<name> and anime://skills-index
//   - tool search_anime_docs({ topic }): the matching SKILL.md body
//   - tool check_anime_v4_syntax({ code }): flags v3 syntax + fixes
//
// Skills are read from ../../skills, so there's no duplicated guidance.
// registerAll() wires a server (real or test double); the stdio bootstrap
// lives in stdio.mjs so importing this for tests doesn't open a transport.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { loadSkills, loadSkillsIndex, matchSkills } from "./skills.mjs";
import { findV3Tokens } from "../../scripts/v3-tokens.mjs";

const DEFAULT_DOCS_SKILLS = ["anime-migration-v3-v4", "anime-core"];

/**
 * Register all anime.js resources and tools on a server.
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 * @param {{ skills?: any[], skillsIndex?: string }} [deps] injectable for tests
 */
export const registerAll = (server, deps = {}) => {
  const skills = deps.skills ?? loadSkills();
  const skillsIndex = deps.skillsIndex ?? loadSkillsIndex();

  for (const skill of skills) {
    server.registerResource(
      skill.name,
      `anime://skills/${skill.name}`,
      {
        title: skill.name,
        description: skill.description,
        mimeType: "text/markdown",
      },
      async (uri) => ({
        contents: [
          { uri: uri.href, mimeType: "text/markdown", text: skill.raw },
        ],
      }),
    );
  }

  server.registerResource(
    "skills-index",
    "anime://skills-index",
    {
      title: "anime.js v4 skills index",
      description: "Index of all anime.js v4 agent skills with trigger keywords.",
      mimeType: "text/plain",
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: "text/plain", text: skillsIndex }],
    }),
  );

  server.registerTool(
    "search_anime_docs",
    {
      title: "Search the anime.js v4 docs",
      description:
        "Return the official anime.js v4 docs for a topic (e.g. 'core', " +
        "'timeline', 'svg', 'text', 'scroll', 'draggable', 'utils', 'easing', " +
        "'waapi', 'layout', 'engine', 'react', 'vue', 'migration'). Use before " +
        "writing or fixing anime.js code so you emit the v4 named-import API " +
        "instead of deprecated v3 syntax. With no topic, returns the migration " +
        "and core docs.",
      inputSchema: { topic: z.string().optional() },
    },
    async ({ topic }) => {
      const matched = topic
        ? matchSkills(skills, topic)
        : skills.filter((s) => DEFAULT_DOCS_SKILLS.includes(s.name));
      const chosen = matched.length ? matched : skills;
      const text = chosen
        .map((s) => `# ${s.name}\n\n${s.body}`)
        .join("\n\n---\n\n");
      return { content: [{ type: "text", text }] };
    },
  );

  server.registerTool(
    "check_anime_v4_syntax",
    {
      title: "Check anime.js code for deprecated v3 syntax",
      description:
        "Scan a snippet of anime.js code for deprecated v3 syntax (default import, " +
        "anime({ targets }), translateX/Y, easing:, anime.timeline/stagger/random, " +
        "direction:) and return the v4 fix for each. Returns OK if the code is " +
        "valid v4. Run this on anime.js code before finalizing it.",
      inputSchema: { code: z.string() },
    },
    async ({ code }) => {
      const issues = findV3Tokens(code);
      if (!issues.length) {
        return {
          content: [
            {
              type: "text",
              text: "OK, no v3 syntax detected. This looks like valid anime.js v4.",
            },
          ],
        };
      }
      const report = issues
        .map((i, n) => `${n + 1}. ${i.label}\n   → ${i.fix}`)
        .join("\n");
      return {
        content: [
          {
            type: "text",
            text:
              `Found ${issues.length} deprecated v3 pattern(s). Fix before using:\n\n` +
              `${report}\n\n` +
              `See search_anime_docs({ topic: "migration" }) for the full mapping.`,
          },
        ],
      };
    },
  );

  return server;
};

/** Build a fully-wired McpServer instance. */
export const createServer = (deps) =>
  registerAll(new McpServer({ name: "animejs", version: "4.0.0" }), deps);
