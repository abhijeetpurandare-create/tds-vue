# Tarmac Design System (TDS)

## Overview
Tarmac is Delhivery's design system — a modern, themeable UI component library for React 18 applications. It provides accessible, reusable components built with a hybrid styling approach using Tailwind CSS and Emotion CSS-in-JS. Published as `@delhivery/tarmac` on GitHub Packages.

## Packages

| Package | Path | Description |
|---------|------|-------------|
| `@delhivery/tarmac` | `packages/atoms` | Core component library (atoms) |
| Molecules | `packages/molecules` | Composite components |
| Angular Atoms | `packages/atoms-angular` | Angular wrappers (coming soon) |
| Tarmac MCP | `packages/tarmac-mcp` | MCP server for AI tooling |
| Storybook | `apps/storybook` | Component playground and docs |

---

## Setting Up Tarmac TDS in Your Project

Follow these steps to integrate Tarmac into an existing React project. This is additive — do not change your existing architecture, routing, state management, or folder structure.

### Step 1: Install the Package

```bash
pnpm add @delhivery/tarmac@dev
```

### Step 2: Add the Tailwind Preset

In your `tailwind.config.js`, add the Tarmac preset. Since most projects use ESM, use `createRequire`:

```js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // your existing colors and config stay as-is
    },
  },
  presets: [require('@delhivery/tarmac/tailwind-preset')],
  plugins: [],
};
```

The preset adds `tds-` prefixed design tokens alongside your existing ones. It does not remove or override anything.

### Step 3: Import Tarmac CSS

In your app entry point (e.g., `main.tsx` or `main.jsx`), add:

```tsx
import '@delhivery/tarmac/dist/style.css';
```

### Step 4: Download the Theme File

Download `tarmac-theme.json` and place it in your project's `public/` folder:

```
https://tarmac-storybook-dev.pntrzz.com/storybook/sb/tarmac-theme.json
```

Save it as `public/tarmac-theme.json`.

### Step 5: Wrap Your App in ThemeProvider

In your root component (e.g., `App.tsx`), wrap the app with `ThemeProvider`:

```tsx
import { ThemeProvider } from '@delhivery/tarmac';

function App() {
  return (
    <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
      {/* your existing app content */}
    </ThemeProvider>
  );
}
```

### Step 6: Add MCP Config (for AI-assisted development)

Choose one of the two options below:

#### Option A: Install locally (recommended)

Install the MCP server as a local dev dependency:

```bash
pnpm add -D @delhivery/tarmac-mcp@dev
```

Then add the following to your project's `.kiro/settings/mcp.json` (merge with existing config if present):

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

#### Option B: Use without installing (npx -y)

If you don't want to add the package as a dependency, you can run it directly with `npx -y`. Since `@delhivery/tarmac-mcp` is a private GitHub Package, you need to configure your global `~/.npmrc` so npx knows where to fetch it.

1. Generate a GitHub Personal Access Token with `read:packages` scope:
   - Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
   - Create a token with `read:packages` permission

2. Add the following to your `~/.npmrc` (create the file if it doesn't exist):

```
@delhivery:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<your-github-pat>
```

3. Add this MCP config to `.kiro/settings/mcp.json`:

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

> `-y` tells npx to auto-confirm the download. npx will fetch the package from GitHub Packages on first run and cache it for subsequent calls.

| Common Error | Fix |
|--------------|-----|
| `404 Not Found` | Package not published yet — ask a maintainer to run the Publish Tarmac MCP workflow |
| `401 Unauthorized` | Token missing/expired — regenerate PAT with `read:packages` and update `~/.npmrc` |
| `not in this registry` | `@delhivery` scope not mapped — ensure `@delhivery:registry=https://npm.pkg.github.com/` is in `~/.npmrc` |

### Step 7: Copy the Steering Files

Copy the `.kiro/steering/` folder from the `frontent-tarmac-design-kiro-steering/` directory in this repo into your project's `.kiro/steering/` folder. These steering files teach the AI how to use Tarmac components correctly — Tailwind CSS rules, Figma-to-code workflow, and TDS architecture patterns.

That's it. Your project is now ready to use Tarmac atoms and `tds-` Tailwind classes.

---

## Using Tarmac with Kiro (AI-Assisted Development)

Once the setup above is complete, you can implement Figma designs using Tarmac by simply typing in the Kiro chat:

```
implement this figma link using tarmac steering files on <page/component name>
<paste your figma link here>
```

For example:
```
implement this figma link using tarmac steering files on the dashboard header
https://www.figma.com/design/abc123/MyProject?node-id=1234:5678
```

Kiro will read the Figma design via MCP, look up the correct Tarmac components and props, and generate code that follows the TDS patterns.

### Before Starting Development

Make sure all MCP servers are connected and live before asking Kiro to implement anything. You can verify this in Kiro by:

1. Open the Kiro side panel and check the MCP Servers section
2. All servers should show a green/connected status
3. If any server shows disconnected, click reconnect or restart Kiro

If the MCP servers are not connected, Kiro won't have access to component props, code snippets, or Figma data — and the generated code will be incomplete or incorrect.

---

## Debugging & Common Issues

### Tarmac components render without styles

- Verify `import '@delhivery/tarmac/dist/style.css'` is present in your entry point
- Verify `ThemeProvider` wraps your app root with `initialSource="./tarmac-theme.json"` and `activeTheme="tarmac-theme"`
- Verify `tarmac-theme.json` exists in your `public/` folder and is accessible at runtime (open `http://localhost:<port>/tarmac-theme.json` in browser)

### `tds-` Tailwind classes not working

- Verify the Tarmac preset is added in `tailwind.config.js` under `presets`
- Run `npx tailwindcss --help` to confirm Tailwind is installed
- Check that your `content` paths in `tailwind.config.js` include the files where you use `tds-` classes

### MCP servers not connecting

- If using **Option A** (local install): Ensure `@delhivery/tarmac-mcp` is installed locally: `pnpm add -D @delhivery/tarmac-mcp@dev`
- If using **Option B** (npx -y): Ensure your `~/.npmrc` has the `@delhivery` scope mapped to GitHub Packages with a valid PAT
- Run `npx tarmac-mcp` manually in terminal to check if it starts without errors
- Verify your `.npmrc` has the GitHub Packages registry configured for `@delhivery` scope:
  ```
  @delhivery:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=<your-token>
  ```
- Check that you have network access to `https://tarmac-storybook-dev.pntrzz.com`

### Kiro generates incorrect or incomplete code

- Confirm all MCP servers are green/connected in the Kiro side panel
- Confirm the steering files are present in `.kiro/steering/` — without them, Kiro doesn't know the Tarmac patterns
- Try asking Kiro to `list all tarmac components` first to verify MCP is responding
- If Figma data looks wrong, verify the Figma link includes the correct `node-id` parameter

### Theme tokens not resolving (raw `{{TokenName}}` visible in UI)

- The token name in `tarmac-theme.json` doesn't match the variables file
- Re-download the latest `tarmac-theme.json` from the CDN URL above
- If using custom theme overrides, verify token names against the Tarmac variables system

### Package install fails

- Ensure `.npmrc` is configured with GitHub Packages auth for `@delhivery` scope
- Run `pnpm store prune` and retry
- Check that you're using `@dev` tag: `pnpm add @delhivery/tarmac@dev`

---

## Design Philosophy

1. **Hybrid Styling**: Tailwind CSS for static layout and structure, Emotion CSS-in-JS for dynamic styling and theming
2. **Theme-Driven**: All components read from a centralized theme config with sensible defaults
3. **Accessibility**: Components are designed with accessibility in mind
4. **Consistent Patterns**: Every component follows the same architecture

## Component Pattern

```tsx
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';

export interface ComponentProps {
  variant?: 'primary' | 'secondary';
}

const Component = ({ variant = 'primary' }: ComponentProps) => {
  const { theme } = useTheme();
  const config = theme.components?.component || defaultThemeConfig.components.component;

  // Static styling — Tailwind
  const baseClasses = 'flex items-center p-4';

  // Dynamic styling — Emotion
  const dynamicStyles = css({
    backgroundColor: config.variants[variant].backgroundColor,
    '&:hover': { backgroundColor: config.variants[variant].hoverColor },
  });

  return <div className={`${baseClasses} ${dynamicStyles}`}>{/* content */}</div>;
};
```

### Styling Guidelines

- **Tailwind CSS**: Use for layout, spacing, and static styles that don't change with props or theme
- **Emotion**: Use for dynamic styles driven by props, theme, or interactive states (hover, focus, animations)
- **Composition**: Combine both when rendering — `className={`${tailwindClasses} ${dynamicStyles}`}`

## Orca Backward Compatibility

Tarmac TDS evolved from the earlier Orca18 component library. Existing Orca18 components are still available and supported for backward compatibility. Teams currently using Orca18 components can continue to do so while gradually migrating to the newer Tarmac TDS equivalents.

## Contributing

1. Follow the established component pattern (Tailwind for static, Emotion for dynamic)
2. Maintain TypeScript type definitions
3. Ensure components are accessible
4. Keep comments that explain the styling approach


## AI Tooling — MCP Integration (Deep Dive)

Tarmac TDS components are accessible to AI coding tools (Kiro, Cursor, Claude Code, etc.) via MCP without cloning this repo or running Storybook locally.

### What the AI Tool Gets

- Component list (61+ components across Atoms, Molecules, and Tarmac TDS)
- Full prop types, required/optional status, and default values
- Import statements (`import { Button, ThemeProvider } from "@delhivery/tarmac"`)
- Code snippets showing real usage from Storybook stories

### How It Works

The hosted Storybook on CDN exposes three read-only metadata JSON files:

| File | URL | Contents |
|------|-----|----------|
| `index.json` | `/storybook/sb/index.json` | Story index — 750+ stories, component names |
| `components.json` | `/storybook/sb/manifests/components.json` | Component manifest — imports, code snippets |
| `props-manifest.json` | `/storybook/sb/manifests/props-manifest.json` | TypeScript prop types extracted at build time |

These files contain only component documentation (names, prop types, code examples). No business logic, API keys, or sensitive data.

### Props Manifest Generation

```bash
pnpm --filter @delhivery/tarmac generate-props-manifest
```

### Dev vs Prod

- **Dev** (`tarmac-storybook-dev.pntrzz.com`): Latest components from `dev*` tags — use during active development
- **Prod**: Stable released components from `v*` tags — use for production builds (when available)

### CDN Security Model

| Path | Access | What's there |
|------|--------|-------------|
| `/storybook/sb/assets/*` | Private (Keycloak auth) | Compiled JS bundles, CSS, component source code |
| `/storybook/sb/*.html` | Private (Keycloak auth) | Storybook UI pages |
| `/storybook/sb/index.json` | Public (read-only) | Story index — component names and story IDs |
| `/storybook/sb/manifests/components.json` | Public (read-only) | Component manifest — imports and code snippets |
| `/storybook/sb/manifests/props-manifest.json` | Public (read-only) | Prop types extracted from TypeScript source |

The 3 public files contain only component documentation metadata. No business logic, API keys, internal URLs, or user data is exposed.

## License
[License Information]
