// Minimal in-memory skill fixtures, injected into registerAll() via deps so the
// tool tests don't depend on the real skills/ directory.

export const fakeSkills = [
  {
    name: "anime-core",
    description: "Core v4 animation",
    body: "Use animate(targets, params).",
    raw: "---\nname: anime-core\n---\nUse animate(targets, params).",
  },
  {
    name: "anime-timeline",
    description: "Sequencing with createTimeline",
    body: "Use createTimeline().",
    raw: "---\nname: anime-timeline\n---\nUse createTimeline().",
  },
  {
    name: "anime-migration-v3-v4",
    description: "Convert v3 to v4",
    body: "anime({targets}) -> animate(targets, {}).",
    raw: "---\nname: anime-migration-v3-v4\n---\nanime({targets}) -> animate(targets, {}).",
  },
];

export const fakeIndex = "# anime.js v4 skills index\nanime-core\nanime-timeline\nanime-migration-v3-v4";
