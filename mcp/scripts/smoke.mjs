// Quick check that the server speaks MCP: connect with the official client,
// list tools/resources, call both tools. Run from anywhere: node mcp/scripts/smoke.mjs
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const serverPath = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "stdio.mjs");
const transport = new StdioClientTransport({
  command: "node",
  args: [serverPath],
});
const client = new Client({ name: "smoke", version: "1.0.0" }, { capabilities: {} });
await client.connect(transport);
console.log("connected\n");

const { tools } = await client.listTools();
console.log("tools:", tools.map((t) => t.name).join(", "));

const { resources } = await client.listResources();
console.log("resources:", resources.length, "\n");

const bad = await client.callTool({
  name: "check_anime_v4_syntax",
  arguments: { code: "import anime from 'animejs'; anime({ targets: '.b', translateX: 1 })" },
});
console.log("check_anime_v4_syntax (v3 input):");
console.log(bad.content[0].text, "\n");

const guide = await client.callTool({
  name: "search_anime_docs",
  arguments: { topic: "core" },
});
console.log("search_anime_docs (core):", guide.content[0].text.slice(0, 80).replace(/\n/g, " "), "...");

await client.close();
console.log("\nclosed cleanly. server works.");
