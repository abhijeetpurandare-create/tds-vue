#!/usr/bin/env node
/**
 * tarmac-mcp-server.cjs
 *
 * A lightweight MCP server that serves Tarmac TDS component data from
 * the hosted Storybook CDN. Reads index.json for component list
 * and props-manifest.json for detailed prop information.
 *
 * No Playwright, no browser, no scraping — just static JSON.
 *
 * Usage:
 *   STORYBOOK_URL=https://your-cdn.com/storybook/sb node tarmac-mcp-server.cjs
 *
 * MCP config:
 *   {
 *     "mcpServers": {
 *       "tarmac": {
 *         "command": "node",
 *         "args": ["path/to/tarmac-mcp-server.cjs"],
 *         "env": {
 *           "STORYBOOK_URL": "https://tarmac-storybook-dev.pntrzz.com/storybook/sb"
 *         }
 *       }
 *     }
 *   }
 */

const http = require('http');
const https = require('https');

const BASE_URL = (process.env.STORYBOOK_URL || '').replace(/\/$/, '');
if (!BASE_URL) {
  console.error('STORYBOOK_URL environment variable is required');
  process.exit(1);
}

// Cache
let indexCache = null;
let propsCache = null;
let componentsCache = null;

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`Failed to parse JSON from ${url}`)); }
      });
    }).on('error', reject);
  });
}

async function getIndex() {
  if (!indexCache) indexCache = await fetchJSON(`${BASE_URL}/index.json`);
  return indexCache;
}

async function getPropsManifest() {
  if (!propsCache) {
    try {
      propsCache = await fetchJSON(`${BASE_URL}/manifests/props-manifest.json`);
    } catch {
      propsCache = { components: {} };
    }
  }
  return propsCache;
}

async function getComponentsManifest() {
  if (!componentsCache) {
    try {
      componentsCache = await fetchJSON(`${BASE_URL}/manifests/components.json`);
    } catch {
      componentsCache = { components: {} };
    }
  }
  return componentsCache;
}


// ─── Tool Handlers ───────────────────────────────────────────────────────────

async function handleGetComponentList() {
  const index = await getIndex();
  const entries = index.entries || {};
  const components = new Set();
  for (const entry of Object.values(entries)) {
    if (entry.type === 'docs') components.add(entry.title);
  }
  return Array.from(components).sort().join('\n');
}

async function handleGetComponentsProps(componentNames) {
  const props = await getPropsManifest();
  const components = await getComponentsManifest();
  const results = [];

  for (const name of componentNames) {
    // Try exact match in props manifest
    const shortName = name.split('/').pop();
    const propsData = props.components[shortName] || props.components[name];

    // Try components manifest for snippets
    const compKey = Object.keys(components.components || {}).find(
      (k) => components.components[k].name === shortName || k.includes(name.toLowerCase().replace(/\s+/g, '-'))
    );
    const compData = compKey ? components.components[compKey] : null;

    let result = `### ${name}\n`;

    if (propsData) {
      result += `\nProps (${propsData.propCount}):\n`;
      for (const prop of Object.values(propsData.props)) {
        const req = prop.required ? ' (required)' : '';
        const def = prop.defaultValue ? ` = ${prop.defaultValue}` : '';
        result += `  ${prop.name}: ${prop.type}${req}${def}\n`;
      }
    }

    if (compData) {
      result += `\nImport: ${compData.import || 'N/A'}\n`;
      if (compData.stories && compData.stories.length > 0) {
        result += `\nExample:\n${compData.stories[0].snippet || 'N/A'}\n`;
      }
    }

    if (!propsData && !compData) {
      result += `Component not found in manifest.\n`;
    }

    results.push(result);
  }

  return results.join('\n---\n');
}

// ─── MCP Protocol (stdio JSON-RPC) ──────────────────────────────────────────

const TOOLS = [
  {
    name: 'getComponentList',
    description: 'Get a list of all available Tarmac TDS components',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'getComponentsProps',
    description: 'Get detailed props information for one or more components. Returns prop names, types, required status, defaults, and code examples.',
    inputSchema: {
      type: 'object',
      properties: {
        componentNames: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of component names (e.g., ["Button", "OtpInput", "Tarmac TDS/Alert"])',
        },
      },
      required: ['componentNames'],
    },
  },
];

let buffer = '';

process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  buffer += chunk;
  // Process complete JSON-RPC messages (newline-delimited)
  const lines = buffer.split('\n');
  buffer = lines.pop() || '';
  for (const line of lines) {
    if (line.trim()) handleMessage(line.trim());
  }
});

async function handleMessage(raw) {
  let msg;
  try { msg = JSON.parse(raw); } catch { return; }

  const { id, method, params } = msg;

  if (method === 'initialize') {
    respond(id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'tarmac-mcp-server', version: '1.0.0' },
    });
  } else if (method === 'notifications/initialized') {
    // No response needed
  } else if (method === 'tools/list') {
    respond(id, { tools: TOOLS });
  } else if (method === 'tools/call') {
    try {
      const toolName = params?.name;
      let result;
      if (toolName === 'getComponentList') {
        result = await handleGetComponentList();
      } else if (toolName === 'getComponentsProps') {
        result = await handleGetComponentsProps(params?.arguments?.componentNames || []);
      } else {
        respondError(id, -32601, `Unknown tool: ${toolName}`);
        return;
      }
      respond(id, { content: [{ type: 'text', text: result }] });
    } catch (err) {
      respondError(id, -32603, err.message);
    }
  } else if (method === 'ping') {
    respond(id, {});
  } else if (id !== undefined) {
    respondError(id, -32601, `Method not found: ${method}`);
  }
}

function respond(id, result) {
  const msg = JSON.stringify({ jsonrpc: '2.0', id, result });
  process.stdout.write(msg + '\n');
}

function respondError(id, code, message) {
  const msg = JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } });
  process.stdout.write(msg + '\n');
}

process.stdin.resume();
