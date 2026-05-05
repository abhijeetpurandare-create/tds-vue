#!/usr/bin/env node
/**
 * @delhivery/tarmac-mcp
 *
 * MCP server for Tarmac TDS component library.
 * Reads static JSON manifests from the hosted Storybook CDN:
 *
 *   Public endpoints used (no auth required):
 *     GET /storybook/sb/index.json              → Story index (component names, story IDs)
 *     GET /storybook/sb/manifests/components.json      → Component manifest (imports, code snippets)
 *     GET /storybook/sb/manifests/props-manifest.json  → Prop types from TypeScript source
 *
 *   Private endpoints (NOT accessed by this server):
 *     /storybook/sb/assets/*   → Behind Keycloak auth
 *     /storybook/sb/*.html     → Behind Keycloak auth
 *     /storybook/* (auth-shell) → Behind Keycloak auth
 *
 * No Playwright, no browser, no scraping — just static JSON.
 *
 * MCP config (add to .kiro/settings/mcp.json or ~/.kiro/settings/mcp.json):
 *   {
 *     "mcpServers": {
 *       "tarmac": {
 *         "command": "npx",
 *         "args": ["-y", "@delhivery/tarmac-mcp"],
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
  process.stderr.write(
    'Error: STORYBOOK_URL environment variable is required.\n' +
    'Set it in your MCP config env, e.g.:\n' +
    '  "env": { "STORYBOOK_URL": "https://tarmac-storybook-dev.pntrzz.com/storybook/sb" }\n'
  );
  process.exit(1);
}

// ─── CDN Data Fetching ───────────────────────────────────────────────────────

let indexCache = null;
let propsCache = null;
let componentsCache = null;

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} from ${url}`));
        res.resume();
        return;
      }
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
    const shortName = name.split('/').pop();
    const propsData = props.components[shortName] || props.components[name];

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
        const desc = prop.description ? ` — ${prop.description}` : '';
        result += `  ${prop.name}: ${prop.type}${req}${def}${desc}\n`;
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
    description: 'Get a list of all available Tarmac TDS components. Returns component names from the Storybook index.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'getComponentsProps',
    description: 'Get detailed props information for one or more Tarmac TDS components. Returns prop names, types, required status, defaults, descriptions, and code examples.',
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
      serverInfo: { name: '@delhivery/tarmac-mcp', version: '1.0.0' },
    });
  } else if (method === 'notifications/initialized') {
    // No response needed for notifications
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
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n');
}

function respondError(id, code, message) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }) + '\n');
}

process.stdin.resume();
