---
inclusion: always
---

# Tarmac TDS — Color Architecture

## How Colors Work

The app uses two layers for styling, both powered by the same Figma token source:

### Layer 1 — Tarmac Atoms (components from @delhivery/tarmac)
- Components like Button, Alert, Checkbox, Input read colors from tarmac-theme.json
- The theme JSON uses {{TokenName}} placeholders (e.g., {{Surface/BG_Blue/Default}})
- ThemeProvider resolves these via figma-variables-resolver.js which reads tarmac-variables-full.json (exported from Figma)
- Resolved values are passed to Emotion css() to generate styles

### Layer 2 — Custom Elements (everything that is not a Tarmac atom)
- Page layouts, section backgrounds, custom cards, table wrappers, headers, etc.
- Styled with tds- prefixed Tailwind classes from @delhivery/tarmac/tailwind-preset
- The preset is auto-generated from the same tarmac-variables-full.json using the same resolver logic
- Colors are resolved to hex at build time — zero runtime cost

### Single Source of Truth

Figma exports tarmac-variables-full.json (1044 tokens). Two paths consume it:
1. figma-variables-resolver.js resolves tokens for Tarmac atoms (Emotion CSS)
2. generate-tailwind-preset.cjs resolves tokens for the Tailwind preset (tds- classes)

Both use the same resolution logic. 72/72 color tokens verified to match exactly.

## Setup

For Tarmac atoms (Button, Alert, etc.):
  import '@delhivery/tarmac/dist/style.css' in main.tsx
  Wrap app in ThemeProvider with initialSource="./tarmac-theme.json" activeTheme="tarmac-theme"

For tds- Tailwind classes (custom elements):
  In tailwind.config.js (ESM projects need createRequire):
  import { createRequire } from 'module';
  const require = createRequire(import.meta.url);
  presets: [require('@delhivery/tarmac/tailwind-preset')]

Note: The Tailwind preset works without ThemeProvider or style.css. But if you use any Tarmac atoms, you need both.

## Usage

Tarmac atom — use directly:
  import { Button } from '@delhivery/tarmac'

Custom element — use tds- Tailwind classes:
  bg-tds-surface-bg-coal-weakest text-tds-text-body-primary border-tds-border-neutral-primary

## Adding a New Token

All semantic color tokens (Surface/*, Text/*, Border/*, Icon/*, Alpha/*) are auto-discovered from Figma — no manual step needed. They are available as tds- Tailwind classes automatically on the next library publish.

For non-color tokens (spacing, radius, fonts), add to packages/atoms/scripts/tailwind-token-map.json and run the generator to verify.

## Three Ways to Use Tarmac Colors

1. Tailwind utility classes (most common) — use tds- prefixed classes:
   className="bg-tds-surface-bg-blue-weakest text-tds-text-body-secondary border-tds-border-neutral-primary"

2. JS theme objects / component color props — use useTheme() from @delhivery/tarmac:
   const { theme } = useTheme()
   const config = theme.components?.yourComponent
   backgroundColor={config?.variants?.primary?.backgroundColor}
   If the component is not inside ThemeProvider, use the hex values from the preset directly (check dist/tailwind-preset.cjs).

3. Complex visual effects (CSS gradients, boxShadow, WebkitBackgroundClip) — raw hex is acceptable only when the value cannot be expressed as a tds- class. Add a comment explaining why.

## Rules

- Tarmac atoms first: if a component exists in @delhivery/tarmac, use it. Do not rebuild with Tailwind.
- tds- classes for custom elements: never use hardcoded hex or arbitrary color values.
- Never mix old and new tokens in the same element: use tds- prefixed versions for all new code.
- The preset is read-only: do not manually edit dist/tailwind-preset.cjs. Edit tailwind-token-map.json instead.
- ThemeProvider is required for atoms: Tarmac atoms need ThemeProvider. The Tailwind preset works independently without it.

## Old Tokens Are Deprecated

Non-prefixed tokens like bg-surface-default, text-text-primary are from the old system. They resolve to different hex values than the Tarmac tokens. Use tds- versions for all new code. See tailwind-css-rules.md for the migration mapping table.
