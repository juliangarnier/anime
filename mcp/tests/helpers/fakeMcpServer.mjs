// Captures what registerAll() registers, so tests can grab a tool or resource
// by name and call its handler directly, no transport needed. Matches the
// shapes server.mjs uses:
//   registerResource(name, uri, metadata, handler)
//   registerTool(name, config, handler)

export class FakeMcpServer {
  tools = [];
  resources = [];

  registerResource(name, uri, metadata, handler) {
    this.resources.push({ name, uri, metadata, handler });
  }

  registerTool(name, config, handler) {
    this.tools.push({ name, config, handler });
  }

  getTool(name) {
    const tool = this.tools.find((t) => t.name === name);
    if (!tool) throw new Error(`Tool not registered: ${name}`);
    return tool;
  }

  getResource(name) {
    const resource = this.resources.find((r) => r.name === name);
    if (!resource) throw new Error(`Resource not registered: ${name}`);
    return resource;
  }
}
