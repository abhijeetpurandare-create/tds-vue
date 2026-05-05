# Token Resolution in Orca — Scoping & Implementation Plan

## Overview

Theme JSON files (`Theme_Orca.json`) will contain semantic token references like `{Delhivery.Red}` and `{Surface.BG.Primary}` instead of hardcoded hex values. At runtime, the `ThemeProvider` resolves these references against a **token dictionary** — a flat key→value map built from the design token pipeline.

This keeps theme files human-readable and brand-agnostic, while letting designers change token values in one place and have all components update automatically.

---

## Concepts

### Token Dictionary (`tokens.dictionary.json`)
A flat JSON file produced at build time from the DTCG token pipeline:
```json
{
  "Delhivery.Red":            "#ed4136",
  "Delhivery.Blue":           "#5b80f7",
  "Surface.BG.Primary":       "#ffffff",
  "Surface.BG.Secondary":     "#f2f2f2",
  "Surface.BG.Tertiary":      "#e6e6e6",
  "Surface.Black.Default":    "#000000",
  "Surface.Black.Strong":     "#1a1a1a",
  "Surface.Black.Base":       "#262626",
  "Text.Primary":             "#000000",
  "Text.Secondary":           "#6b7280",
  "Text.Inverse":             "#ffffff",
  "Text.Disabled":            "#cdcbcb",
  "Border.Default":           "#e5e7eb",
  "Icon.Secondary":           "#6b7280",
  "Icon.Disabled":            "#cdcbcb",
  "Error.Base.Default":       "#ea4335",
  "Error.Base.Dark":          "#d32f2f",
  "Error.BG.Default":         "#fce8e6",
  "Error.Stroke.Default":     "#f28c8c",
  "Error.Stroke.Lighter":     "#f4a3a3",
  "Error.Font.Dark":          "#b71c1c",
  "Success.Base.Default":     "#34a853",
  "Success.Base.Dark":        "#1a6e3a",
  "Success.BG.Default":       "#c6e6d4",
  "Success.Stroke.Default":   "#6ebf96",
  "Success.Font.Dark":        "#1a6e3a",
  "Warning.Base.Default":     "#fbbc05",
  "Warning.BG.Default":       "#ffe0b2",
  "Warning.BG.Darkest":       "#ffcc80",
  "Warning.Font.Dark":        "#e65100",
  "Information.Base.Default": "#2196f3",
  "Information.Base.Dark":    "#1e88e5",
  "Information.BG.Default":   "#bbdefb",
  "Information.BG.Lightest":  "#e3f2fd",
  "Information.Stroke.Dark":  "#64b5f6",
  "Failure.BG.Lighter":       "#ffcdd2",
  "Failure.Base.Default":     "#f44336",
  "Failure.Base.Dark":        "#e53935"
}
```

### Theme JSON (`Theme_Orca.json`)
Theme files authored by designers. Values use `{Token.Path}` references for anything that comes from the design system. Static values (spacing, font sizes) remain as raw strings.

Two reference forms are supported:

| Form | Example | Resolved |
|---|---|---|
| Exact | `"{Delhivery.Red}"` | `"#ed4136"` |
| Embedded | `"1px solid {Border.Default}"` | `"1px solid #e5e7eb"` |
| Array item | `["{Information.Stroke.Dark}", "{Delhivery.Blue}"]` | `["#64b5f6", "#5b80f7"]` |

### Global Tokens (new section)
A `globals` section added alongside `light`/`dark` in the theme JSON to hold spacing, typography, border-radius, and other global design decisions. These are the same across modes.

```json
{
  "globals": {
    "spacing":      { "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "32px", "2xl": "48px" },
    "borderRadius": { "none": "0", "sm": "4px", "md": "8px", "lg": "12px", "full": "9999px" },
    "border":       { "width": { "thin": "1px", "medium": "2px" } },
    "typography": {
      "fontFamily": { "sans": "Noto Sans, sans-serif", "mono": "IBM Plex Mono, monospace" },
      "fontSize":   { "xs": "0.75rem", "sm": "0.875rem", "base": "1rem", "lg": "1.125rem", "xl": "1.25rem" },
      "fontWeight": { "normal": "400", "medium": "500", "semibold": "600", "bold": "700" },
      "lineHeight": { "tight": "1.25", "normal": "1.5", "relaxed": "1.75" }
    }
  },
  "light": { ... },
  "dark":  { ... }
}
```

---

## Architecture

```
Design Tokens (DTCG)
  Brand.Value.tokens.json
  Alias.Mode 1.tokens.json        ──▶  [Build-time pipeline]  ──▶  tokens.dictionary.json
  DLV_Mapped.Mode 1.tokens.json

Theme JSON (designer-authored)
  Theme_Orca.json                 ──▶  [ThemeProvider at runtime]
  (contains {Token.Ref} values)         resolves refs using dictionary
                                         ──▶  fully resolved theme object
                                               consumed by components via useTheme()
```

### Runtime resolution flow

```
ThemeProvider mounts
  │
  ├─ fetch tokens.dictionary.json   → tokenDict: Record<string, string>
  ├─ fetch Theme_Orca.json          → raw theme with {refs}
  │
  ├─ resolveThemeRefs(theme[activeMode], tokenDict)
  │    walks every string value
  │    "{Delhivery.Red}"               → "#ed4136"
  │    "1px solid {Border.Default}"    → "1px solid #e5e7eb"
  │    (non-string values pass through unchanged)
  │
  └─ setTheme(resolvedTheme)        → context consumed by all components
```

---

## Changes Required

### 1. `tokens.dictionary.json` — new build artifact
- Location: `packages/atoms/public/tokens.dictionary.json`
- Built by: `packages/tokens/scripts/build-tokens.ts` (new)
- Content: flat `{ "Token.Path": "#hexvalue" }` map

### 2. `ThemeProvider` — add token resolution
New prop: `tokenSource?: string` (URL or path to `tokens.dictionary.json`)

New internal function: `resolveThemeRefs(node, tokenDict)`
- Recursively walks the theme tree
- For each string: replaces all `{X.Y.Z}` occurrences using the dictionary
- For arrays: maps each element through the resolver

```ts
// Signature
function resolveThemeRefs(
  node: unknown,
  tokenDict: Record<string, string>
): unknown
```

Load order inside `loadThemeFromSource`:
1. Fetch `tokenSource` → `tokenDict`
2. Fetch theme JSON → `rawTheme`
3. Extract active mode: `rawTheme[activeTheme]` + `rawTheme.globals`
4. `resolveThemeRefs(modeTheme, tokenDict)` → resolved theme
5. Merge with overrides → `setTheme(mergedTheme)`

### 3. `Theme_Orca.json` — replace hardcoded values with token refs
- All color values become `{Token.Path}` references
- Spacing/sizing values in `globals` section remain raw
- Component size values (padding, fontSize, gap) remain raw
- Globals section added at root level

### 4. `useTheme()` hook — expose globals
ThemeContext should expose `globals` separately so components can access global spacing/typography without it being nested inside `light`/`dark`:
```ts
interface ThemeContextType {
  theme: Theme;         // resolved active mode (light/dark)
  globals: Globals;     // resolved globals (shared across modes)
  ...
}
```

### 5. TypeScript types — extend `ThemeConfig`
Add `GlobalTokens` interface to `types.ts` covering spacing, borderRadius, border, typography.

---

## Step-by-Step Implementation Tasks

### Phase 1 — Build-time token dictionary

**Task 1.1 — Create `packages/tokens` package**
- `packages/tokens/src/types.ts` — `FlatTokenMap`, `TokenNode` types
- `packages/tokens/src/flattener.ts` — walks DTCG JSON, returns `{ "A.B.C": { type, rawValue } }`
- `packages/tokens/src/resolver.ts` — resolves `{refs}` across collections in manifest order
- `packages/tokens/src/pipeline.ts` — orchestrates flattener + resolver, outputs dictionary
- `packages/tokens/scripts/build-tokens.ts` — CLI entry point (reads manifest, writes `tokens.dictionary.json`)

**Task 1.2 — Wire build script into monorepo**
- Add `"build:tokens"` script to root `package.json`
- Output: `packages/atoms/public/tokens.dictionary.json`
- Run before `build:atoms` (add to CI pipeline)

**Task 1.3 — Validate dictionary against token refs in Theme JSON**
- Script reads `Theme_Orca.json`, extracts all `{...}` refs, checks each exists in dictionary
- Fails build with a clear error if any ref is missing (catches designer typos early)

---

### Phase 2 — Runtime ThemeProvider changes

**Task 2.1 — Add `resolveThemeRefs` utility**
- File: `packages/atoms/src/utils/tokenResolver.ts`
- Handles: exact refs, embedded refs in strings, arrays
- Warns in dev mode if a `{ref}` has no match in the dictionary
```ts
export function resolveThemeRefs(
  node: unknown,
  tokenDict: Record<string, string>
): unknown {
  if (typeof node === 'string') {
    // replace all {X.Y.Z} occurrences
    return node.replace(/\{([^}]+)\}/g, (_, key) => {
      const val = tokenDict[key];
      if (!val && process.env.NODE_ENV === 'development') {
        console.warn(`[Orca] Unresolved token ref: {${key}}`);
      }
      return val ?? `{${key}}`;
    });
  }
  if (Array.isArray(node)) {
    return node.map(item => resolveThemeRefs(item, tokenDict));
  }
  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node as object).map(([k, v]) => [k, resolveThemeRefs(v, tokenDict)])
    );
  }
  return node;
}
```

**Task 2.2 — Add `tokenSource` prop to `ThemeProvider`**
- New optional prop: `tokenSource?: string`
- If provided, fetch dictionary before resolving theme
- If not provided, skip resolution (backwards-compatible — existing raw-value themes still work)

**Task 2.3 — Update `loadThemeFromSource` to resolve refs**
- After fetching theme JSON and selecting active mode, call `resolveThemeRefs`
- Extract `globals` from root of theme JSON before mode selection
- Resolve `globals` with the same dictionary

**Task 2.4 — Expose `globals` in ThemeContext**
- Add `globals` to `ThemeContextType`
- Add `globals` state to `ThemeProvider`
- Provide it in `ThemeContext.Provider` value

---

### Phase 3 — Theme JSON authoring

**Task 3.1 — Create `Theme_Orca.json`**
- Based on the drafted theme JSON (provided above)
- Add `globals` section at root
- Verify all `{Token.Ref}` keys match what the dictionary will produce
- Location: `packages/atoms/public/Theme_Orca.json`

**Task 3.2 — Add `globals` section**
```json
{
  "globals": {
    "spacing":      { "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "32px", "2xl": "48px" },
    "borderRadius": { "none": "0", "sm": "4px", "md": "8px", "lg": "12px", "full": "9999px" },
    "border":       { "width": { "thin": "1px", "medium": "2px" } },
    "typography": {
      "fontFamily": { "sans": "Noto Sans, sans-serif", "mono": "IBM Plex Mono, monospace" },
      "fontSize":   { "xs": "0.75rem", "sm": "0.875rem", "base": "1rem", "lg": "1.125rem", "xl": "1.25rem" },
      "fontWeight": { "normal": "400", "medium": "500", "semibold": "600", "bold": "700" },
      "lineHeight": { "tight": "1.25", "normal": "1.5", "relaxed": "1.75" }
    }
  }
}
```

---

### Phase 4 — TypeScript types

**Task 4.1 — Add `GlobalTokens` interface to `types.ts`**
```ts
export interface GlobalTokens {
  spacing:      Record<string, string>;
  borderRadius: Record<string, string>;
  border:       { width: Record<string, string> };
  typography: {
    fontFamily: Record<string, string>;
    fontSize:   Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  };
}
```

**Task 4.2 — Update `ThemeContextType`**
```ts
interface ThemeContextType {
  theme:    Theme;          // resolved active mode
  globals:  GlobalTokens;  // resolved global tokens
  setTheme: ...;
  ...
}
```

---

### Phase 5 — Storybook integration & validation

**Task 5.1 — Update Storybook ThemeProvider setup**
- Pass `tokenSource="/tokens.dictionary.json"` in Storybook's decorator
- Pass `initialSource="/Theme_Orca.json"`
- Copy both files to `apps/storybook/public/`

**Task 5.2 — Add a token resolution story / debug panel**
- Story that shows the raw theme before and after resolution
- Useful for designers to verify their token refs resolved correctly

**Task 5.3 — Add unit tests for `resolveThemeRefs`**
- Exact ref replacement
- Embedded ref replacement (`"1px solid {Border.Default}"`)
- Array item replacement
- Missing ref fallback + dev warning
- Nested object traversal
- No-op for non-string values (numbers, booleans)

---

## File Map (final state)

```
packages/
  tokens/                                  ← NEW package
    src/
      types.ts                             ← FlatTokenMap, TokenNode, TokenDictionary
      flattener.ts                         ← DTCG JSON → flat map
      resolver.ts                          ← resolve {refs} across collections
      pipeline.ts                          ← orchestrates build
    scripts/
      build-tokens.ts                      ← CLI: reads manifest, writes dictionary

  atoms/
    public/
      tokens.dictionary.json               ← NEW build artifact
      Theme_Orca.json                      ← UPDATED: {Token.Ref} values + globals section
    src/
      utils/
        tokenResolver.ts                   ← NEW: resolveThemeRefs()
        themeUtils.ts                      ← UNCHANGED
      components/
        ThemeProvider/index.tsx            ← UPDATED: tokenSource prop, globals state
      types/
        types.ts                           ← UPDATED: GlobalTokens interface

apps/
  storybook/
    public/
      tokens.dictionary.json              ← symlink or copy from atoms/public
      Theme_Orca.json                     ← symlink or copy from atoms/public
```

---

## Backwards Compatibility

| Scenario | Behaviour |
|---|---|
| `tokenSource` not provided | No resolution runs. Existing raw-value themes (e.g. `Theme_Red.json`) continue to work exactly as before. |
| Value has no `{ref}` | Passes through unchanged. |
| `{ref}` not in dictionary | Returns the original `{ref}` string unchanged, logs a warning in dev. |
| `globals` not in theme JSON | `globals` context value defaults to `{}`. |

No breaking changes to the public `useTheme()` API — `globals` is additive.

---

## What Each Role Does

| Role | Responsibility |
|---|---|
| **Design** | Authors `Theme_Orca.json` with `{Token.Ref}` values. Maintains the DTCG token files. |
| **Dev (tokens pkg)** | Builds and maintains the `build-tokens` pipeline and dictionary output. |
| **Dev (atoms pkg)** | Implements `resolveThemeRefs` and `ThemeProvider` changes. |
| **Dev (consumers)** | Passes `tokenSource` prop; optionally uses `globals` from `useTheme()`. |


Steps:

 Use figma mcp to map the variables names into orca's json.  ex:  backgroundColor: White/300
 
 Now use orca18/packages/atoms/src/docs/figma-variables-resolver.js and the orca18/packages/atoms/src/docs/🟥 TDS-variables-full.json to reverse direct values on themeprovider.

 Test the working in dev-server /orca18/packages/atoms/dev-server.tsx using pnpm run dev:server.

