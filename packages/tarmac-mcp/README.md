# @delhivery/tarmac-mcp

MCP server for the Tarmac TDS component library. Provides AI tools with access to component metadata — prop types, defaults, code examples — without requiring repo access or authentication.

## How it works

This server reads from three public JSON manifests on the Storybook CDN:

| File | What it contains |
|------|-----------------|
| `index.json` | Component names and story IDs |
| `manifests/components.json` | Import paths and code snippets |
| `manifests/props-manifest.json` | Prop names, types, required status, defaults |

No Playwright, no browser scraping, no Keycloak auth needed.

## Installation

There are two ways to set up the MCP server — choose whichever fits your workflow.

---

### Option A: Install locally (recommended)

Install `@delhivery/tarmac-mcp` as a local dev dependency. This is the simplest approach since `npx` resolves the binary from `node_modules/.bin/` without needing global registry config.

```bash
pnpm add -D @delhivery/tarmac-mcp@dev
```

#### Prerequisites

Your project `.npmrc` must have GitHub Packages registry configured for the `@delhivery` scope:

```
@delhivery:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<your-github-token>
```

#### MCP Config

```json
{
  "mcpServers": {
    "tarmac": {
      "command": "npx",
      "args": ["tarmac-mcp"],
      "env": {
        "STORYBOOK_URL": "https://tarmac-storybook-dev.pntrzz.com/storybook/sb"
      }
    }
  }
}
```

> The args use `"tarmac-mcp"` (without `-y`) so npx resolves it from the locally installed `node_modules/.bin/` binary.

---

### Option B: Use without installing (npx -y)

If you don't want to add the package as a dependency, you can run it directly with `npx -y`. Since `@delhivery/tarmac-mcp` is hosted on GitHub Packages (not the public npm registry), you need to configure your global `~/.npmrc` so `npx` knows where to fetch it.

#### Step 1: Generate a GitHub Personal Access Token

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**.
2. Generate a new token with the `read:packages` scope.
3. Copy the token.

#### Step 2: Configure your global ~/.npmrc

Add the following lines to `~/.npmrc` (create the file if it doesn't exist):

```
@delhivery:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<your-github-pat>
```

Replace `<your-github-pat>` with the token from Step 1.

#### Step 3: Add the MCP config

Add this to your MCP config file (`.kiro/settings/mcp.json`, `.cursor/mcp.json`, etc.):

```json
{
  "mcpServers": {
    "tarmac": {
      "command": "npx",
      "args": ["-y", "@delhivery/tarmac-mcp"],
      "env": {
        "STORYBOOK_URL": "https://tarmac-storybook-dev.pntrzz.com/storybook/sb"
      }
    }
  }
}
```

> Here `-y` tells npx to auto-confirm the download. npx will fetch the package from GitHub Packages on first run and cache it for subsequent calls.

#### Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `404 Not Found` | Package not published yet | Ask a maintainer to run the **Publish Tarmac MCP** workflow from GitHub Actions |
| `401 Unauthorized` | Token missing or expired | Regenerate your GitHub PAT with `read:packages` scope and update `~/.npmrc` |
| `E404 '@delhivery/tarmac-mcp' is not in this registry` | `@delhivery` scope not mapped to GitHub Packages | Ensure `@delhivery:registry=https://npm.pkg.github.com/` is in `~/.npmrc` |

## Tools

### getComponentList
Returns all available Tarmac TDS component names.

### getComponentsProps
Returns detailed prop information for specified components — prop names, types, required/optional, defaults, descriptions, and code examples.

**Input:** `{ "componentNames": ["Button", "Alert"] }`

## Publishing

This package has its own dedicated workflow (`.github/workflows/publish-tarmac-mcp.yaml`) and is published manually, independent of the main build pipeline.

### How to publish

1. Bump the `version` in `packages/tarmac-mcp/package.json`.
2. Commit and push to `main`.
3. Go to **Actions → Publish Tarmac MCP → Run workflow**.
4. Pick the npm tag (`latest` or `dev`) and run.

The workflow checks the registry first — if the version is already published, it skips with a warning. No duplicate publishes.
