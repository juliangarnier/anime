#!/usr/bin/env node
// Stdio entry point: build the anime.js MCP server and connect it over stdio.

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.mjs";

const server = createServer();
await server.connect(new StdioServerTransport());
