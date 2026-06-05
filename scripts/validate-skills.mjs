#!/usr/bin/env node
// Check the skills against the built library. Fails if:
//   1. a symbol a skill imports from 'animejs' isn't a real export
//   2. a utils./svg./text./easings. member doesn't exist
//   3. v3 syntax shows up outside the migration skill
//   4. frontmatter is off (name, description length, license, body length)
//
// Build first (npm run build), then: node scripts/validate-skills.mjs

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { findV3Tokens } from "./v3-tokens.mjs"; // strips comments before scanning

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const skillsDir = join(root, "skills");
const distEntry = join(root, "dist", "modules", "index.js");

const MIGRATION_SKILL = "anime-migration-v3-v4";
const MAX_DESCRIPTION = 1024;
const MAX_BODY_LINES = 600;
const NAMESPACES = ["utils", "svg", "text", "easings"];

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);

if (!existsSync(distEntry)) {
  console.error(
    `\n✖ Built library not found at ${distEntry}\n  Run \`npm run build\` first.\n`,
  );
  process.exit(2);
}
const anime = await import(pathToFileURL(distEntry).href);
const topLevelExports = new Set(Object.keys(anime));
const namespaceMembers = Object.fromEntries(
  NAMESPACES.map((ns) => [
    ns,
    new Set(anime[ns] ? Object.keys(anime[ns]) : []),
  ]),
);

const codeBlocks = (md) => {
  const blocks = [];
  const re = /```(?:js|javascript|jsx|tsx|ts|vue|svelte)?\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(md))) blocks.push(m[1]);
  return blocks;
};

const importedFromAnimejs = (code) => {
  const names = new Set();
  const re = /import\s*\{([^}]*)\}\s*from\s*['"]animejs(?:\/[\w-]+)?['"]/g;
  let m;
  while ((m = re.exec(code))) {
    for (const raw of m[1].split(",")) {
      const name = raw.trim().split(/\s+as\s+/)[0].trim();
      if (name) names.add(name);
    }
  }
  return names;
};

const namespaceCalls = (code) => {
  const calls = [];
  const re = /\b(utils|svg|text|easings)\.([a-zA-Z_$][\w$]*)/g;
  let m;
  while ((m = re.exec(code))) calls.push([m[1], m[2]]);
  return calls;
};

const parseFrontmatter = (md) => {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const body = md.slice(m[0].length);
  const fm = {};
  // minimal YAML: "key:" lines and ">" folded blocks (all the skills use)
  const lines = m[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, val] = kv;
    if (val === ">") {
      const folded = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) {
        folded.push(lines[++i].trim());
      }
      fm[key] = folded.join(" ");
    } else {
      fm[key] = val;
    }
  }
  return { fm, body };
};

const skillFolders = readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (skillFolders.length === 0) fail("No skill folders found under skills/");

for (const folder of skillFolders) {
  const file = join(skillsDir, folder, "SKILL.md");
  if (!existsSync(file)) {
    fail(`${folder}: missing SKILL.md`);
    continue;
  }
  const md = readFileSync(file, "utf8");
  const parsed = parseFrontmatter(md);
  if (!parsed) {
    fail(`${folder}: missing or malformed YAML frontmatter`);
    continue;
  }
  const { fm, body } = parsed;

  // Frontmatter invariants
  if (fm.name !== folder) {
    fail(`${folder}: frontmatter name "${fm.name}" !== folder "${folder}"`);
  }
  if (!fm.description) fail(`${folder}: missing description`);
  else if (fm.description.length > MAX_DESCRIPTION) {
    fail(
      `${folder}: description ${fm.description.length} chars > ${MAX_DESCRIPTION}`,
    );
  }
  if (!fm.license) fail(`${folder}: missing license`);
  const bodyLines = body.split("\n").length;
  if (bodyLines > MAX_BODY_LINES) {
    fail(`${folder}: body ${bodyLines} lines > ${MAX_BODY_LINES}`);
  }

  // Code-block checks
  const blocks = codeBlocks(md);
  const isMigration = folder === MIGRATION_SKILL;

  for (const code of blocks) {
    // (1) imported symbols must be real exports
    for (const name of importedFromAnimejs(code)) {
      if (!topLevelExports.has(name)) {
        // even in the migration skill, named imports must be real v4 exports
        fail(`${folder}: imports "${name}" which is NOT exported by animejs`);
      }
    }
    // (2) namespace members must exist
    for (const [ns, member] of namespaceCalls(code)) {
      if (!namespaceMembers[ns].has(member)) {
        fail(`${folder}: ${ns}.${member} is not a member of the ${ns} namespace`);
      }
    }
    // (3) no v3 tokens outside the migration skill (comments are ignored)
    if (!isMigration) {
      const v3 = findV3Tokens(code);
      if (v3.length) {
        fail(
          `${folder}: v3 syntax in a code block: ${v3
            .map((t) => t.label)
            .join(", ")}`,
        );
      }
    }
  }
}

for (const llms of [join(skillsDir, "llms.txt"), join(root, "llms.txt")]) {
  if (!existsSync(llms)) {
    warnings.push(`missing ${llms}`);
    continue;
  }
  const txt = readFileSync(llms, "utf8");
  for (const folder of skillFolders) {
    if (!txt.includes(folder)) {
      warnings.push(`${llms} does not mention skill "${folder}"`);
    }
  }
}

const nsSummary = NAMESPACES.map(
  (ns) => `${ns}(${namespaceMembers[ns].size})`,
).join(" ");
console.log(
  `\nValidated ${skillFolders.length} skills against ${topLevelExports.size} ` +
    `top-level exports + namespaces ${nsSummary}.`,
);

if (warnings.length) {
  console.log("\nWarnings:");
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}

if (errors.length) {
  console.error(`\n✖ ${errors.length} error(s):`);
  for (const e of errors) console.error(`  ✖ ${e}`);
  console.error("");
  process.exit(1);
}

console.log("\n✓ All skills valid: every documented symbol is a real v4 export, no v3 leaked.\n");
