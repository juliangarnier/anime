# @animejs/mcp

An optional [MCP](https://modelcontextprotocol.io) server for **anime.js v4**.

> **Most people don't need this.** The [skills](../skills/) are the main thing.
> Install them with `npx skills add https://github.com/juliangarnier/anime` and
> your agent gets the same guidance with no server to run. This MCP server is
> only useful if your client is MCP-native and you want the guidance and the
> v3-syntax check exposed as callable tools.

It is a thin wrapper over [`../skills/`](../skills/): it reads the same `SKILL.md`
files at startup and serves them, so there is no separate content to maintain. It
does not fetch anything over the network, run anime.js, or execute code. The
syntax check is a set of regex rules, the same ones the `validate-skills` script
uses.

## What it provides

### Resources

- `anime://skills/<name>`: each skill's `SKILL.md` (for example `anime://skills/anime-core`).
- `anime://skills-index`: the index of all skills with trigger keywords.

### Tools

- `search_anime_docs({ topic })`: returns the matching skill body for a topic
  (`core`, `timeline`, `svg`, `text`, `scroll`, `draggable`, `utils`, `easing`,
  `react`, `vue`, `migration`, and more). With no topic, it returns the migration
  and core skills.
- `check_anime_v4_syntax({ code })`: scans a snippet for deprecated v3 syntax
  (default import, `anime({ targets })`, `translateX`/`translateY`, `easing:`,
  `anime.timeline`/`stagger`/`random`, `direction:`) and returns the v4 fix for
  each, or `OK` if the code is valid v4.

## Install & run

```bash
cd mcp
npm install
node src/stdio.mjs        # stdio server
```

## Register with a client

### Claude Code

```bash
claude mcp add animejs -- node /absolute/path/to/anime/mcp/src/stdio.mjs
```

### Cursor

`.cursor/mcp.json` (or any generic `mcpServers` config):

```json
{
  "mcpServers": {
    "animejs": {
      "command": "node",
      "args": ["/absolute/path/to/anime/mcp/src/stdio.mjs"]
    }
  }
}
```

## Verify it works

```bash
cd mcp
npm install
npm run smoke   # connects with the MCP client, lists tools/resources, calls both
npm test        # unit tests
```

You can also open the official inspector to click through the tools:

```bash
npx @modelcontextprotocol/inspector node src/stdio.mjs
```

## Note

For most users the static [skills](../skills/) (installable with
`npx skills add https://github.com/juliangarnier/anime`) are enough and need no
running server. Use this MCP server when you want the `check_anime_v4_syntax`
tool, or guidance pulled on demand in an MCP-native client.
