// Loads the SKILL.md files from ../../skills, so the MCP server serves the same
// content as the static skills, not a copy.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillsDir = join(__dirname, "..", "..", "skills");

/**
 * @typedef {{ name: string, description: string, body: string, raw: string }} Skill
 */

const parseDescription = (md) => {
  const fm = md.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return "";
  const lines = fm[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^description:\s*(.*)$/);
    if (!kv) continue;
    if (kv[1] === ">") {
      const folded = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) {
        folded.push(lines[++i].trim());
      }
      return folded.join(" ");
    }
    return kv[1];
  }
  return "";
};

const stripFrontmatter = (md) => md.replace(/^---\n[\s\S]*?\n---\n/, "");

/** @returns {Skill[]} */
export const loadSkills = () => {
  if (!existsSync(skillsDir)) return [];
  return readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(skillsDir, d.name, "SKILL.md")))
    .map(({ name }) => {
      const raw = readFileSync(join(skillsDir, name, "SKILL.md"), "utf8");
      return {
        name,
        description: parseDescription(raw),
        body: stripFrontmatter(raw).trim(),
        raw,
      };
    });
};

/** The root skills index (trigger keywords per skill). */
export const loadSkillsIndex = () => {
  const p = join(skillsDir, "llms.txt");
  return existsSync(p) ? readFileSync(p, "utf8") : "";
};

/**
 * Resolve a free-text topic to a skill. Matches by exact name, by the
 * `anime-<topic>` convention, or by keyword contained in name/description.
 * @param {Skill[]} skills
 * @param {string} topic
 * @returns {Skill[]}
 */
export const matchSkills = (skills, topic) => {
  const q = topic.trim().toLowerCase();
  if (!q) return skills;
  const exact = skills.filter(
    (s) => s.name === q || s.name === `anime-${q}`,
  );
  if (exact.length) return exact;
  return skills.filter(
    (s) =>
      s.name.includes(q) ||
      s.description.toLowerCase().includes(q),
  );
};
