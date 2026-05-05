---
description: Guidelines for building and migrating atom components to the Tarmac TDS
inclusion: auto
---

# Tarmac Design System — Atom Component Guidelines

Rules for building new atoms or migrating existing components to the Tarmac TDS in the orca18 monorepo.

## Architecture

### File Structure
Every atom lives in `packages/atoms/src/components/<ComponentName>/`:
```
ComponentName/
├── index.tsx          # Component + types + exports
├── useComponentStyles.ts  # Emotion CSS builder (all styling logic)
```
Keep `index.tsx` under 150 lines. Extract all Emotion `css()` generation into the styles file.

### Exports
- Export the component as default and named from `index.tsx`
- Export all public types (`ComponentProps`, variant/size/style unions) from `index.tsx`
- Register exports in `packages/atoms/src/index.ts`
- Never export storybook-only types or utilities from the package

### Styling
- Use `@emotion/css` for dynamic styles — never Tailwind utility classes in atoms
- Read theme config via `useTheme()` from `../ThemeProvider`
- Fall back to `defaultThemeConfig` from `../../config/config` when theme is missing
- All colors, spacing, radii, and font values come from theme config — zero hardcoded values in the component

## Theme JSON Structure

Theme files live in `packages/atoms/public/tarmac-theme.json` and are copied to `apps/storybook/public/` for storybook access. And `/orca18/packages/atoms/public/tarmac-theme.json` this lives in Atoms.

### Token Syntax
Use `{{TokenName}}` placeholders that resolve via the Figma TDS variable system:
```json
"backgroundColor": "{{Surface/BG_Blue/Default}}"
```
The `resolveTemplatePlaceholders` function in ThemeProvider walks the JSON and calls `getVariableByName` from `figma-variables-resolver.js` to resolve each `{{...}}` to a CSS value.

### Finding Correct Token Names
Token names must match exactly what's in `packages/atoms/src/components/ThemeProvider/tarmac-variables-full.json`. To discover names:
```bash
grep -o '"name": "[^"]*"' packages/atoms/src/components/ThemeProvider/tarmac-variables-full.json | sort -u | grep "Surface\|Text\|Border\|Alpha"
```
Or use the Figma MCP `get_variable_defs` tool on the component node.

### MANDATORY: Hex-Verify Every Token Before Committing

**The #1 source of wrong tokens is guessing the level (Weakest/Weaker/Default/Strong/Strongest/Subtle) from naming conventions.** Token level names do NOT follow intuitive patterns — `Surface/BG_Primary/Strongest` resolves to `#F7F7F7` (light grey), not a dark color. `Surface/BG_Primary_Inverse/Subtle` resolves to `#333333` (dark). You CANNOT guess.

**After selecting a token, you MUST resolve it to hex and compare against the Figma hex value.** Use this script:

```bash
python3 << 'PYEOF'
import json
with open("packages/atoms/src/components/ThemeProvider/tarmac-variables-full.json") as f:
    data = json.load(f)

vars_by_id = {}
for coll in data.get("collections", []):
    for v in coll.get("variables", []):
        vars_by_id[v["id"]] = v

def resolve_to_hex(var_id, depth=0):
    if depth > 15: return "MAX_DEPTH"
    v = vars_by_id.get(var_id)
    if not v: return "NOT_FOUND"
    for mode_id, val in v["valuesByMode"].items():
        if isinstance(val, dict) and val.get("type") == "VARIABLE_ALIAS":
            return resolve_to_hex(val["id"], depth+1)
        elif isinstance(val, dict) and "r" in val:
            r,g,b = val["r"], val["g"], val["b"]
            return "#%02x%02x%02x" % (int(r*255), int(g*255), int(b*255))
    return "NO_VALUE"

# Replace with the token names you want to verify
targets = [
    "Surface/BG_Primary_Inverse/Subtle",
    "Surface/BG_Primary/Strongest",
]

for coll in data.get("collections", []):
    for v in coll.get("variables", []):
        if v["name"] in targets:
            hex_val = resolve_to_hex(v["id"])
            name = v["name"]
            print(f"{name} -> {hex_val}")
PYEOF
```

**Workflow:**
1. Fetch the Figma variant node via `get_figma_data` — note the hex color from `globalVars.styles` (e.g., `fill_XYZ: ['#333333']`)
2. Pick a candidate token name (e.g., `Surface/BG_Primary/Strongest`)
3. Run the script above to resolve the token to hex
4. Compare: if the resolved hex does NOT match the Figma hex (within ±2 per channel for rounding), the token is WRONG
5. Try sibling levels (Weakest, Weaker, Subtle, Default, Strong, Stronger, Strongest) or the `_Inverse` variant until you find an exact match
6. Also check across token families — e.g., `Surface/BG_Primary/Strongest` vs `Surface/BG_Primary_Inverse/Subtle` are completely different colors despite both being "Primary" tokens

**Mistakes this prevents (from the Pills migration):**
- `Surface/BG_Primary/Strongest` (#F7F7F7) was used for Black/Subtle bg instead of `Surface/BG_Primary_Inverse/Subtle` (#333333) — resulted in light bg instead of dark
- `Surface/BG_Blue/Weaker` (#E6F3FE) was used for Blue/Subtle bg instead of `Surface/BG_Blue/Weakest` (#F0F7FE) — resulted in a noticeably darker tint
- Same Weaker→Weakest mistake for Success, Error, Warning, and Legacy Blue subtle backgrounds
- Icon colors were assumed to match text colors, but Figma uses separate `Icon/*` tokens (e.g., text=`#52430D` via `Text/Warning/Tertiary` but icon=`#7B6414` via `Icon/Warning/Primary`)

**Rule: If you cannot resolve a token to hex and confirm it matches Figma, do NOT use it.**

### MANDATORY: Icon Colors Are Independent of Text Colors

Figma uses separate `Icon/*` tokens that do NOT always match the corresponding `Text/*` tokens. For every type/variant combo, you must:

1. Check the Icon Container's fill color in the Figma node (it's a separate fill from the text)
2. Map it to an `Icon/*` token (not `Text/*`)
3. Add `iconColor` to the theme JSON alongside `textColor`
4. The style builder must apply `iconColor` to the icon wrapper element, not inherit from the parent `color`

**Token family mapping:**
| Text Token | Corresponding Icon Token |
|-----------|------------------------|
| `Text/Body/Primary` | `Icon/Body/Primary` |
| `Text/Body_Inverse/Primary` | `Icon/Body_Inverse/Primary` |
| `Text/Info_Blue/Tertiary` | `Icon/Info_Blue/Primary` |
| `Text/Success/Tertiary` | `Icon/Success/Primary` |
| `Text/Error/Tertiary` | `Icon/Error/Primary` |
| `Text/Warning/Primary` | `Icon/Warning/Primary` |
| `Text/Coal/Primary` | `Icon/Coal/Primary` |
| `Text/Body/Disabled` | `Icon/Body/Disabled` |

Note: the text and icon tokens often use DIFFERENT levels (e.g., text uses `Tertiary` but icon uses `Primary`). Always verify from Figma.

### MANDATORY: Disabled States Are Per-Variant

Disabled states in Figma have unique text, border, and icon colors per variant — they are NOT a single shared config. Structure the theme JSON as:

```json
"states": {
  "disabled": {
    "black": { "textColor": "{{Text/Body/Disabled}}", "borderColor": "{{Border/Neutral/Disabled}}", "iconColor": "{{Icon/Body/Disabled}}" },
    "white": { "textColor": "{{Text/Body_Inverse/Disabled}}", "borderColor": "{{Border/Neutral_Inverse/Disabled}}", "iconColor": "{{Icon/Body_Inverse/Disabled}}" },
    "blue": { "textColor": "{{Text/Info_Blue/Disabled}}", "borderColor": "{{Border/Info/Disabled}}", "iconColor": "{{Icon/Info_Blue/Disabled}}" }
  }
}
```

The style builder must look up `states.disabled[variant]` — not a flat `states.disabled` object.

### MANDATORY: Verify Sizes Against Figma Text Styles

Figma text style annotations (e.g., `B2/body2_default`, `C1/caption1_default`, `C2/caption2_default`) define the exact fontSize and lineHeight per size. Cross-reference:

| Figma Text Style | fontSize | lineHeight |
|-----------------|----------|-----------|
| `B2/body2_default` | 14px | ~20px (1.43em) |
| `C1/caption1_default` | 12px | ~16px (1.33em) |
| `C2/caption2_default` | 10px | 12px (1.2em) |

Also verify icon container dimensions per size from the Figma `Icon Container` component reference:
- `Size=20` → 20×20px (Large)
- `Size=16` → 16×16px (Medium)
- `Size=12` → 12×12px (Small)

### Common Token Patterns
| Purpose | Token Pattern | Example |
|---------|--------------|---------|
| Filled background | `Surface/BG_{Color}/Default` | `Surface/BG_Blue/Default` |
| Hover background | `Surface/BG_{Color}/Stronger` | `Surface/BG_Blue/Stronger` |
| Pressed background | `Surface/BG_{Color}/Strong` | `Surface/BG_Blue/Strong` |
| Light tint bg | `Surface/BG_{Color}/Weaker` | `Surface/BG_Success/Weaker` |
| Lightest tint bg | `Surface/BG_{Color}/Weakest` | `Surface/BG_Error/Weakest` |
| Dark tint bg | `Surface/BG_{Color}/Strong` | `Surface/BG_Coal/Strong` |
| Text on filled | `Text/Heading_Inverse/Only White` | white text on dark bg |
| Text on filled (warning) | `Text/Heading/Only Black` | dark text on yellow bg |
| Colored text (primary) | `Text/{Color}/Primary` | `Text/Info_Blue/Primary` |
| Colored text (darker) | `Text/{Color}/Tertiary` | `Text/Success/Tertiary` |
| Hover text (tertiary) | `Text/{Color}/Secondary` | `Text/Info_Blue/Secondary` |
| Inverse text (dark bg) | `Text/Body_Inverse/Primary` | `Text/Body_Inverse/Primary` |
| Inverse text (secondary) | `Text/Body_Inverse/Secondary` | lighter text on dark bg |
| Border | `Border/{Color}/Primary` | `Border/Info/Primary` |
| Hover border | `Border/{Color}/Secondary` | `Border/Info/Secondary` |
| Disabled text | `Text/Body/Disabled` | `#cdcbcb` |
| Disabled border | `Border/Neutral/Disabled` | `#ededed` |
| Disabled bg (primary) | `Surface/BG_Coal/Weakest` | light grey |
| Ghost bg | `Surface/BG_Primary/Base` | `#dedede` |
| Focus ring | `Alpha/{Color}/300` | `Alpha/Black/300` = `rgba(0,0,0,0.4)` |
| Radius | `Radius/Default` | `4` |
| Spacing | `Spacing/{value}` | `Spacing/8` = `8` |

**IMPORTANT — Token Level Hierarchy:**
`Weakest` < `Weaker` < `Default` < `Strong` < `Stronger` < `Strongest`
- Alert backgrounds for colored variants use `Weakest` or `Weaker` (light tints)
- Coal alert uses `Strong` (dark) — it's a dark variant despite the name
- Never assume the level — always verify from Figma's CSS variable fallback hex value

### Theme Config Shape for a Component
```json
{
  "tarmac-theme": {
    "components": {
      "yourComponent": {
        "base": { /* shared: font, radius, transitions */ },
        "styles": {
          "primary": { "black": {}, "white": {}, "info": {}, ... },
          "secondary": { ... },
          "tertiary": { ... }
        },
        "variants": { /* legacy flat fallback */ },
        "sizes": { "sm": {}, "md": {}, "lg": {} },
        "states": { "disabled": {}, "ghost": {}, "loading": {} }
      }
    }
  }
}
```

## Component Props Pattern

### Figma Property → React Prop Mapping
| Figma Property | React Prop | Type |
|---------------|-----------|------|
| Style (Primary/Secondary/Tertiary) | `buttonStyle` | union type |
| Variant (Black/White/Blue/...) | `variant` | union type |
| Size (Large/Medium/Small) | `size` | `'sm' \| 'md' \| 'lg'` |
| Type (Button/Icon Button) | `buttonType` | union type |
| State (Disabled) | `isDisabled` | boolean |
| State (Ghost) | `isGhost` | boolean |
| Loading left/right | `isLoading` | boolean |
| Leading Icon (boolean + slot) | `leadingIcon` | `React.ReactNode` |
| Trailing Icon (boolean + slot) | `trailingIcon` | `React.ReactNode` |
| Label | `text` or `children` | string / ReactNode |

### Key Rules
- Figma "State" variants (Hover/Pressed/Focused) are CSS pseudo-states, not props
- Use `:hover`, `:active`, `:focus` in Emotion — never a `visualState` prop
- Figma "Slot" properties become `React.ReactNode` props
- Keep backward compatibility: add new props alongside old ones with `@deprecated` JSDoc
- Icon containers: use separate `leadingIcon`/`trailingIcon` props, not `icon` + `iconPosition`
- **NEVER prefix props with `tarmac`** — no `tarmacVariant`, `tarmacSize`, `tarmacStyle`. Merge TDS values into the existing `variant`/`size`/`style` props. Use a separate discriminator prop (e.g., `barType`, `badgeType`, `buttonStyle`) to activate the TDS rendering path.
- **NEVER hardcode variant/size/style lists in component code** — no `new Set([...])`, no `VARIANTS = [...]`, no `.has(variant)` checks. The variant string goes straight to `config.variants?.[variant]` in the theme JSON. Adding a new variant must be a JSON-only change with zero code modifications.
- **Variant and size types must be open** — use `(string & {})` union pattern (e.g., `type Variant = 'black' | 'coal' | (string & {})`) so consumers can pass any value defined in the theme JSON without TypeScript errors.

## Emotion CSS Builder Pattern

### Structure of `useComponentStyles.ts`
```typescript
import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';
import type { ComponentSize, ComponentStyle } from './index';

// Helper: convert raw number or string to CSS dimension (Scale tokens resolve to raw numbers)
function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}

// 1. Define interfaces for theme config shape
interface VariantConfig { backgroundColor?: string; textColor?: string; ... }
interface ComponentConfig { base: {...}; styles?: {...}; variants: {...}; sizes: {...}; states: {...}; }

// 2. Define params interface
export interface UseStylesParams { componentConfig: ComponentConfig; variant: string; size: ComponentSize; ... }

// 3. Helper functions
function getVariantConfig(...): VariantConfig { /* try styles.{style}.{variant} first, fallback to variants.{variant} */ }
function getDisabledState(...): DisabledState { /* style-specific disabled states */ }

// 4. Main builder — returns Emotion className string
// IMPORTANT: Use dim() for ALL dimension values (fontSize, lineHeight, height, width, padding, gap, borderRadius)
export function buildStyles(params: UseStylesParams): string {
  return css({
    fontSize: dim(sc.fontSize, '14px'),  // NOT sc.fontSize directly
    height: dim(sc.height),              // NOT sc.height directly
    padding: dim(sc.padding, '12px'),    // NOT sc.padding directly
    /* ... */
  });
}
```

### CSS State Priority
```
default → :hover → :active (pressed) → :focus (ring overlay)
:disabled overrides all
.ghost overrides all
```

### Focus Ring
Figma uses `DROP_SHADOW` effect with `spread: 2px`:
```typescript
'&:focus': {
  boxShadow: `0 0 0 2px ${focusRingColor}`,
  outline: 'none',
}
```
Use `:focus` not `:focus-visible` — the TDS shows focus on click too.

## Storybook Stories

### Sidebar Ordering & Title Convention
All Tarmac TDS stories use the root-level `"Tarmac TDS/"` group — NOT nested under `"Atoms/"`. The story title must be:
```
title: "Tarmac TDS/<ComponentName>"
```
Example: `"Tarmac TDS/Toggle"`, `"Tarmac TDS/Button"`, `"Tarmac TDS/Checkbox"`.

The sidebar ordering is configured in `apps/storybook/.storybook/preview.js` via `parameters.options.storySort.order`:
```js
order: ['Tarmac TDS', 'Atoms', 'Molecules', '*'],
```
This ensures "Tarmac TDS" always appears first in the sidebar, before "Atoms" and "Molecules".

**NEVER** use `"Atoms/<Name>/Tarmac TDS"` — all Tarmac stories must be at the root level under `"Tarmac TDS/"`.

### File Location
`apps/storybook/src/stories/atoms/<ComponentName>Tarmac.stories.tsx`

### Theme Loading
```tsx
const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);
```
Theme JSON must be in `apps/storybook/public/`.

### Showcase States
Never add `visualState` or showcase-only props to the actual component. Create a storybook-only wrapper:
```tsx
const ShowcaseButton: React.FC<ButtonProps & { showcaseState: ShowcaseState }> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  // Read theme tokens, apply inline style overrides via css()
  if (showcaseState === "default") return <Button {...props} />;
  if (showcaseState === "disabled") return <Button {...props} isDisabled />;
  // For hover/pressed/focused: apply color overrides from theme
  const overrides = css({ backgroundColor: vc.hoverColor, ... });
  return <Button {...props} className={overrides} />;
};
```

### Story Structure — Every Figma Dimension Gets Its Own Clickable Story
The sidebar must have a separate clickable entry for every major Figma dimension so reviewers can quickly navigate to any variant. Do NOT bury variants inside the Full Matrix only.

**Required stories (minimum):**
1. **Playground** — interactive with Storybook controls, no showcase state
2. **Full Matrix** — renders all combinations statically using ShowcaseWrapper
3. **Per-type stories** — one story per type/color variant (e.g., Regular, Success, Info Blue, Error)
4. **Per-style stories** — one story per structural layout variant (e.g., Standard, Add-on Left, Add-on Right)
5. **Per-state stories** — one story per non-interactive state (e.g., Disabled, Ghost/Skeleton)
6. **Sub-component stories** — one story for each sub-component variation (e.g., Badge combinations, Status Indicator types)
7. **Boolean Toggles** — demonstrates all toggle combinations
8. **Light vs Dark Mode** — side-by-side comparison

**Why this matters:** During the Input Field migration, Add-on Left/Right, Disabled, Ghost, Badge, and Status Indicator variants were all specified in the requirements but only appeared inside the Full Matrix. Reviewers couldn't click to a specific variant to compare against Figma. Each Figma property dimension (Style, Type, Size, State) and each sub-component should be independently reviewable.

**Rule of thumb:** If Figma has a property with N values, there should be N clickable stories for that property (or one story that clearly shows all N values in a grid). White/dark variants need dark background wrappers.

### Meta Typing
Use `Meta<ComponentProps>` not `Meta<typeof Component>` — the `Object.assign` compound component pattern breaks Storybook's type inference.

## Figma MCP Workflow — Exhaustive Evaluation Process

### CRITICAL: Never Assume, Always Verify Every Variant Individually

The #1 source of bugs across Button, Badge, Checkbox, Alert, and Tooltip migrations was assuming tokens/colors/sizes are shared across variants. They are NOT. Each variant in Figma can have completely different token levels, text colors, background intensities, and sub-component configurations. You MUST fetch and verify EVERY variant node individually.

### Phase 1 — Discovery (Before Writing Any Code)

#### Step 1: Get the Component Structure
```
get_context_for_code_connect(fileKey, nodeId)
```
This returns: all Figma properties (Type, Style, Size, boolean toggles), variant values, descendant instances (Button, Badge, Icon Container), and slot definitions. Use this to design your React prop API.

#### Step 2: Get Variable Definitions
```
get_variable_defs(fileKey, nodeId)
```
This returns resolved token names with hex values. Use this as the source of truth for token names. Cross-reference EVERY token name against `tarmac-variables-full.json`:
```bash
grep -o '"name": "[^"]*"' packages/atoms/src/components/ThemeProvider/tarmac-variables-full.json | sort -u | grep -i "your_token"
```

#### Step 3: Fetch EVERY Variant Node Individually
This is the step we kept skipping and paying for. For a component with 7 variants × 2 styles × 2 sizes = 28 combinations, you need to fetch at minimum:
- **All variants in one style/size** (e.g., all 7 variants as Dual Text / Large) — to get the per-variant color tokens
- **Both sizes for one variant** (e.g., White in Large + White in Small) — to get size-specific typography and spacing
- **Both styles for one variant** (e.g., White Single Text + White Dual Text) — to verify text rendering differences
- **Any variant that looks "dark"** (black, coal) — these use inverse tokens and need special attention
- **ALL state variants** (Default, Hover, Active, Focused, Disabled, Ghost) — states can have completely different DOM structures (Ghost may be a skeleton), different token levels (Disabled may keep white bg), and different text colors across ALL text elements (label, helper, subtext each change independently)

For each fetched node, extract and record:
```
get_design_context(fileKey, variantNodeId)
```

**CRITICAL — State Variants Are Not Just Color Swaps:**
- Hover/Focus may change label color from `Text/Body/Secondary` to `Text/Body/Primary`
- Hover/Focus may change helper text from `Text/Caption/Secondary` to `Text/Caption/Primary`
- Disabled may use `Text/Body/Disabled` for input text but `Text/Accent/Disabled` for mandatory marker
- Ghost may render a completely different DOM structure (skeleton blocks)
- Always fetch at least Default + Hover + Disabled + Ghost to catch these differences

#### Step 4: Build the Token Mapping Table
Before writing ANY theme JSON, build a complete table like this:

| Property | white | black | coal | success | error | info | warning |
|---|---|---|---|---|---|---|---|
| backgroundColor | token → hex | token → hex | token → hex | ... | ... | ... | ... |
| titleColor | ... | ... | ... | ... | ... | ... | ... |
| descriptionColor | ... | ... | ... | ... | ... | ... | ... |
| singleTextColor | ... | ... | ... | ... | ... | ... | ... |
| iconColor | ... | ... | ... | ... | ... | ... | ... |
| borderColor | ... | ... | ... | ... | ... | ... | ... |

Fill EVERY cell from actual Figma data. If a cell is empty, you haven't fetched that variant yet — go back and fetch it.

### Phase 2 — Verification Checklist (Per Variant)

For EACH variant, verify these properties from the `get_design_context` output:

#### Colors (from CSS variable fallbacks in the Figma output)
- [ ] `backgroundColor` — check the exact token level (Weakest vs Weaker vs Default vs Strong vs Strongest)
- [ ] `titleColor` — colored variants use `Text/{Color}/Tertiary`, NOT `Text/Body/Only Black`
- [ ] `descriptionColor` — colored variants use `Text/{Color}/Primary`, NOT `Text/Body/Secondary`
- [ ] `singleTextColor` — matches the single text node's color (often same as titleColor for colored variants)
- [ ] `iconColor` — matches the Icon Container's color in Figma
- [ ] Dark variants (black, coal) use `_Inverse` tokens — verify `Text/Body_Inverse/Primary` not `Text/Body/Primary`

#### Typography (from Figma text style annotations)
- [ ] Title font weight — check if it's `font-normal` (400) or `font-medium` (500) per size
- [ ] Title font family — `Font_Family/body` for large, may differ for small
- [ ] Description font family — `Font_Family/body` for large, `Font_Family/caption` for small
- [ ] Font sizes and line heights match the Figma Scale tokens exactly

#### Layout (from Figma auto-layout properties)
- [ ] Container direction — `flex` (row) or `flex-col` (column)
- [ ] Container gap — often `0` at the outer level
- [ ] Inner column gap — `contentGap` from Figma (e.g., `Spacing/8` for lg, `10px` for sm)
- [ ] Row gap — `iconGap` between icon and text (e.g., `10px` for lg, `Spacing/6` for sm)
- [ ] Text block gap — `textGap` between title and description (e.g., `Spacing/4`)
- [ ] Padding — uniform `Spacing/12` for both sizes

#### Sub-Components (from Figma descendant instances)
- [ ] Button instances — check `Style`, `Variant`, `Size` properties for EACH alert variant
- [ ] Badge instances — check `Type`, `Variant`, `Size` properties
- [ ] Icon Container — check `Size` property (24px for lg, 20px for sm)
- [ ] Build a sub-component mapping table (e.g., Alert variant → Button variant)

### Phase 3 — Cross-Reference Against Variables File

After building the token table, verify EVERY token name exists in `tarmac-variables-full.json`:
```bash
# Check all tokens you plan to use
grep '"Surface/BG_Coal/Strong"' packages/atoms/src/components/ThemeProvider/tarmac-variables-full.json
grep '"Text/Success/Tertiary"' packages/atoms/src/components/ThemeProvider/tarmac-variables-full.json
grep '"Border/Warning/Tertiary"' packages/atoms/src/components/ThemeProvider/tarmac-variables-full.json
```

If a token doesn't exist in the variables file, the `{{placeholder}}` will NOT resolve and will render as a literal string. This is a silent failure — the component will look broken with no error message.

### Phase 4 — Post-Implementation Audit

After writing the theme JSON and component code, do a final pass:

1. **Read back the theme JSON** and compare every value against your token mapping table
2. **Run `get_variable_defs`** on the overview/spec sheet node — it often includes ALL tokens used across the component in one response
3. **Verify the hex fallback values** in `get_design_context` match what the token resolves to in `tarmac-variables-full.json`
4. **Check storybook rendering** — if any variant looks wrong, the token is wrong. Go back to Figma.
5. **Verify story coverage** — count the Figma property dimensions and confirm each has a dedicated clickable story:
   - List all Figma properties (Style, Type, Size, State, boolean toggles)
   - For each property with N values, verify there's a story or story section showing all N values
   - Verify sub-components (Badge, Status Indicator, etc.) each have their own story section
   - If a Figma dimension is only visible inside the Full Matrix, add a dedicated story for it

### Common Mistakes This Process Prevents
- Using `Weakest` when Figma uses `Strong` (coal alert background)
- Using neutral text tokens when Figma uses colored tokens (success/error/info/warning title/description)
- Using the same button variant for all alert types (each alert type has its own button variant)
- Assuming font weight is the same across sizes (lg=400, sm=500 for alert titles)
- Missing the `_Inverse` suffix on tokens for dark variants
- Burying style/state/sub-component variants inside Full Matrix without dedicated stories — reviewers can't find or compare them against Figma
- Assuming Ghost state is "transparent text" when Figma shows a skeleton layout
- Assuming Disabled background is always grey when Figma shows white
- Using Scale tokens without `toCssDimension()` — renders as unitless numbers
- Writing stories from spec text instead of verifying each variant node-by-node in Figma

## Step-by-Step: Creating a New Tarmac Storybook Story

Follow this exact sequence when adding a new Tarmac atom story. Reference `ButtonTarmac.stories.tsx` as the canonical example.

### Step 1 — Gather Figma Data (do NOT skip)
```
1. get_context_for_code_connect(nodeId) → properties, variants, descendants, slots
2. get_variable_defs(nodeId) → resolved token names + hex values
3. Cross-check token names against tarmac-variables-full.json
```
Never assume token names. Always verify.

### Step 2 — Add Component Config to Theme JSON
Add your component under `tarmac-theme.components` in `packages/atoms/public/tarmac-theme.json`:
```json
"yourComponent": {
  "base": { "fontFamily": "{{Font_Family/body}}, sans-serif", ... },
  "styles": {
    "primary": { "black": { "backgroundColor": "{{Surface/BG_Primary_Inverse/Default}}", ... }, ... },
    "secondary": { ... },
    "tertiary": { ... }
  },
  "variants": { /* flat fallback for backward compat */ },
  "sizes": { "sm": {...}, "md": {...}, "lg": {...} },
  "states": { "disabled": {...}, "disabledSecondary": {...}, "disabledTertiary": {...}, "ghost": {...} }
}
```
After editing, copy to storybook:
```bash
cp packages/atoms/public/tarmac-theme.json apps/storybook/public/tarmac-theme.json
```

### Step 3 — Build the Component (2 files)

`index.tsx` — under 150 lines:
```tsx
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';
import { buildComponentStyles } from './useComponentStyles';

// Types
export type ComponentVariant = 'black' | 'white' | 'info' | 'success' | 'error' | 'warning';
export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentStyle = 'primary' | 'secondary' | 'tertiary';

export interface ComponentProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
  componentStyle?: ComponentStyle;
  isDisabled?: boolean;
  isGhost?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Component: React.FC<ComponentProps> = ({ variant = 'black', size = 'md', componentStyle = 'primary', ... }) => {
  const { theme } = useTheme();
  const config = theme.components?.yourComponent || defaultThemeConfig.components.yourComponent;
  const styles = buildComponentStyles({ config, variant, size, componentStyle, ... });
  return <element className={styles} ... />;
};
```

`useComponentStyles.ts` — all Emotion logic, under 200 lines:
- Define interfaces matching theme JSON shape
- `getVariantConfig()` — try `styles.{style}.{variant}` first, fall back to `variants.{variant}`
- `getDisabledState()` — return style-specific disabled config
- `buildComponentStyles()` — returns `css(...)` string with all pseudo-states

### Step 4 — Register Exports
In `packages/atoms/src/index.ts`, add:
```typescript
export { default as YourComponent } from './components/YourComponent'
export type { ComponentProps, ComponentVariant, ComponentSize, ComponentStyle } from './components/YourComponent'
```

### Step 5 — Create the Story File

File: `apps/storybook/src/stories/atoms/YourComponentTarmac.stories.tsx`

#### Required Imports
```tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { YourComponent, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { ComponentProps } from "@delhivery/tarmac";
```

#### Theme Wrapper (reuse across all Tarmac stories)
```tsx
const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);
```

#### ShowcaseWrapper (storybook-only, never in component code)
```tsx
type ShowcaseState = "default" | "hover" | "pressed" | "focused" | "disabled" | "ghost";

const ShowcaseComponent: React.FC<ComponentProps & { showcaseState: ShowcaseState }> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.yourComponent;
  const vc = cfg?.styles?.[props.componentStyle || "primary"]?.[props.variant || "black"] || {};

  if (showcaseState === "default") return <YourComponent {...props} />;
  if (showcaseState === "disabled") return <YourComponent {...props} isDisabled />;
  if (showcaseState === "ghost") return <YourComponent {...props} isGhost />;

  const overrides: React.CSSProperties = {};
  if (showcaseState === "hover") {
    overrides.backgroundColor = vc.hoverColor || vc.backgroundColor;
    overrides.color = vc.hoverTextColor || vc.textColor;
  } else if (showcaseState === "pressed") {
    overrides.backgroundColor = vc.pressedColor || vc.hoverColor;
    overrides.color = vc.pressedTextColor || vc.hoverTextColor;
  } else if (showcaseState === "focused") {
    overrides.boxShadow = vc.focusRingColor ? `0 0 0 2px ${vc.focusRingColor}` : "0 0 0 2px rgba(0,0,0,0.4)";
  }
  return <YourComponent {...props} className={css(overrides as Record<string, string>)} />;
};
```

#### Meta — use ComponentProps, not typeof Component
```tsx
const meta: Meta<ComponentProps> = {
  title: "Tarmac TDS/YourComponent",
  component: YourComponent,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<ComponentProps>;
```

#### Story 1 — Playground (interactive, real component)
```tsx
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: { variant: "black", size: "md", componentStyle: "primary" },
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    size: { control: "select", options: [...SIZES] },
    componentStyle: { control: "select", options: [...STYLES] },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
  },
  render: (args) => <YourComponent {...args} />,
};
```

#### Story 2 — Full Matrix (static showcase of all combos)
```tsx
const VariantSection: React.FC<{ variant: string }> = ({ variant }) => {
  const dark = variant === "white";
  const wrap = dark ? { backgroundColor: "#1a1a2e", padding: 16, borderRadius: 8 } : {};
  return (
    <div>
      <h3>{variant}</h3>
      <div style={wrap}>
        <div style={{ display: "grid", gridTemplateColumns: "130px repeat(6, 1fr)", gap: "4px 8px" }}>
          <div />{STATES.map(s => <div key={s}>{s}</div>)}
          {STYLES.flatMap(style => SIZES.map(size => (
            <React.Fragment key={`${style}-${size}`}>
              <div>{style}/{size}</div>
              {STATES.map(state => (
                <div key={state}>
                  <ShowcaseComponent showcaseState={state} variant={variant} componentStyle={style} size={size} />
                </div>
              ))}
            </React.Fragment>
          )))}
        </div>
      </div>
    </div>
  );
};

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => <div>{VARIANTS.map(v => <VariantSection key={v} variant={v} />)}</div>,
};
```

#### Stories 3-8 — Per-variant (for focused review)
```tsx
const vs = (variant: string): Story => ({
  render: () => <VariantSection variant={variant} />,
});
export const Black: Story = { name: "Black", ...vs("black") };
export const White: Story = { name: "White", ...vs("white") };
// ... etc
```

### Step 6 — Verify
1. Run storybook: `pnpm run dev` in `apps/storybook`
2. Check Playground — all controls work, hover/press/focus respond interactively
3. Check Full Matrix — all state columns render correctly, white variant on dark bg
4. Check per-variant stories — compare against Figma side by side
5. Verify no existing stories broke — check other story files still load

### Checklist Before PR
- [ ] Theme JSON tokens verified against `tarmac-variables-full.json`
- [ ] Theme JSON copied to `apps/storybook/public/`
- [ ] Component has zero hardcoded colors — all from theme
- [ ] All dimension values use consistent approach — either `px` in JSON or `toCssDimension()` in style builder (never mix within a component)
- [ ] Ghost state verified from Figma — may be skeleton layout, transparent text, or something else entirely
- [ ] Disabled state verified from Figma — check bg color, border token, and each text element's disabled token individually
- [ ] Each state variant (Default, Hover, Disabled, Ghost) fetched individually from Figma
- [ ] Font weight verified from Figma text style annotations
- [ ] No `visualState` or showcase logic in component code
- [ ] ShowcaseWrapper lives only in the stories file
- [ ] Meta uses `Meta<ComponentProps>` not `Meta<typeof Component>`
- [ ] Playground has no forced state — pure interactive button
- [ ] White variant section has dark background
- [ ] Focus ring uses `:focus` with `0 0 0 2px` spread
- [ ] `leadingIcon`/`trailingIcon` as separate props (not `icon` + `iconPosition`)
- [ ] Existing stories and components still work — no breaking changes
- [ ] Types exported from `packages/atoms/src/index.ts`
- [ ] Unit tests created in `__tests__/ComponentName.test.tsx` with ≥50 test cases
- [ ] Legacy backward compatibility tests pass (≥20 tests)
- [ ] Tarmac TDS tests pass (≥25 tests)
- [ ] Group tests pass if component has a Group variant (≥10 tests)
- [ ] All tests green: `npx jest --config=jest.config.mjs --testPathPattern="ComponentName.test" --no-coverage`
- [ ] Full test suite still passes: `npx jest --config=jest.config.mjs --no-coverage` (pre-existing failures excluded)
- [ ] No hardcoded variant/size/style lists in component code — all values come from theme JSON at runtime
- [ ] No `tarmac`-prefixed props — TDS values merged into existing `variant`/`size` props with open union types
- [ ] TDS path gated by a discriminator prop (e.g., `barType`, `badgeType`), NOT by checking variant against a hardcoded set

## Hard-Earned Lessons (Mistakes That Cost Iterations)

These are specific pitfalls discovered during the Button, Input Field, and Pills migrations. Read all of them before starting any new atom.

### Pills Migration — Token Level Guessing Is Fatal
The Pills component had 6+ wrong tokens because levels were guessed from naming conventions:
- `Surface/BG_Primary/Strongest` sounds "dark" but resolves to `#F7F7F7` (very light). The actual dark token is `Surface/BG_Primary_Inverse/Subtle` (`#333333`). The `_Inverse` family flips the light/dark semantics.
- `Weaker` vs `Weakest` — for subtle/tint backgrounds, Figma used `Weakest` (lightest tint) but we guessed `Weaker` (one step darker). The visual difference is noticeable.
- Subtle text colors used `Primary` level but Figma actually uses `Tertiary` (darker shade) for Blue, Success, Error, Legacy Blue subtle text.
- Black/Subtle and White/Subtle text tokens were swapped — Black subtle needs `_Inverse` (light text on dark bg), White subtle needs regular (dark text on light bg).
- Warning/Solid text was `Text/Warning/Primary` (#7B6414) but Figma shows `#52430D` which is `Text/Warning/Tertiary`.
- Icon colors were assumed to inherit from text `color` CSS property, but Figma uses separate `Icon/*` tokens with different hex values.
- Sizes were shifted down by one — lg had md values, md had sm values — because the Figma text style annotations (`B2/body2_default` for Large, `C1/caption1_default` for Medium, `C2/caption2_default` for Small) were not cross-referenced.
- Disabled states were a single flat config but Figma has per-variant disabled colors (each variant has its own disabled text, border, and icon tokens).

**Fix: Always resolve tokens to hex via the Python script in "Hex-Verify Every Token" section and compare against Figma. Never ship a token without hex verification.**

### Scale Tokens Resolve to Raw Numbers — Two Approaches
Scale tokens like `{{Scale/600}}` resolve to raw numbers (e.g., `16`), NOT pixel strings (`"16px"`). CSS properties like `fontSize`, `lineHeight`, `height`, `width`, `padding` need `px` units. There are two valid approaches in this codebase:

**Approach A — Append `px` in the theme JSON (used by Button, Badge, Checkbox):**
```json
"fontSize": "12px",
"padding": "{{Spacing/4}}px {{Spacing/12}}px",
"iconSize": "14px"
```
The `px` suffix is baked into the JSON string. The style builder uses values directly without conversion.

**Approach B — Use bare tokens + `toCssDimension()` (used by ProgressBar, Input Field):**
```json
"fontSize": "{{Scale/550}}",
"padding": "{{Spacing/12}}",
"iconSize": "{{Scale/700}}"
```
The style builder wraps every dimension value with `toCssDimension()` from `../../utils/toCssDimension`:
```typescript
import { toCssDimension } from '../../utils/toCssDimension';
function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}
// Usage: fontSize: dim(sc.fontSize, '14px')
```

**Pick one approach per component and be consistent.** If your theme JSON uses bare Scale/Spacing tokens without `px`, you MUST use `toCssDimension()` in the style builder. If you embed `px` in the JSON, you don't need it. Mixing approaches within a single component will cause broken dimensions.

### CRITICAL: Never Write a Simplified `dim()` Without `toCssDimension()`

During the DropdownList compound component build, a simplified `dim()` helper was written:
```typescript
// ❌ BAD — causes 640px cell heights and broken layouts
function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  if (typeof v === 'number') return `${v}px`;
  return String(v); // ← BUG: returns "12" without px for string-encoded numbers
}
```

This looks correct but fails because of how the token resolution pipeline works:
1. Theme JSON has `"paddingVertical": "{{Spacing/12}}"`
2. `getVariableByName("Spacing/12")` returns raw number `12`
3. `resolveStringValue` does `String(12)` → string `"12"`
4. The resolved theme config has `paddingVertical: "12"` (string, not number)
5. `dim("12")` → `typeof "12" === 'string'` → returns `"12"` (no `px`!)
6. CSS gets `fontSize: "12"` (unitless) and `lineHeight: "20"` (unitless)
7. Browser interprets unitless `lineHeight: 20` as a **20× multiplier** of font size → 640px line height

The fix is to ALWAYS use `toCssDimension()` which handles both raw numbers AND string-encoded numbers:
```typescript
// ✅ CORRECT — handles "12" (string), 12 (number), and "12px" (already has unit)
import { toCssDimension } from '../../utils/toCssDimension';
function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}
```

`toCssDimension` uses `isNaN()` to detect numeric values: `isNaN("12")` is `false` → appends `px`. `isNaN("12px")` is `true` → returns as-is.

**Rule: Every `dim()` helper in every file MUST use `toCssDimension()`. Never write a shortcut version that only checks `typeof v === 'number'`. The token resolver always returns strings, even for numeric tokens.**

### Ghost State May Be a Skeleton Layout
Do NOT assume Ghost state is "same structure with transparent text". In Figma, Ghost can be a completely different DOM structure — skeleton placeholder blocks with no text, icons, or borders. Always fetch the Ghost variant node from Figma to see its actual structure:
```
get_design_context(fileKey, ghostVariantNodeId)
```
Example from Input Field — Ghost renders as grey skeleton blocks (no text/icons/borders). Example from Button — Ghost uses transparent background with visible text. Each component is different. Always verify.

### Disabled State — Never Assume Colors
Do NOT assume disabled state always has a grey background or that all text turns the same disabled color. Verify from the actual Figma disabled variant node:
- Background may stay white (Input Field) or turn grey (Button)
- Different text elements may use different disabled tokens (e.g., label uses `Text/Body/Disabled` but mandatory marker uses `Text/Accent/Disabled`)
- Border may use `Border/Neutral/Secondary` (not `Border/Neutral/Disabled`)

### Helper Text vs Subtext Colors May Differ Per Type
Text elements in the same area can have different color rules. In the Input Field:
- `helperTextBottom` stays `Text/Caption/Secondary` regardless of type
- `subtext` changes per type (`Text/Success/Base`, `Text/Error/Base`, etc.)
Never assume all text in a section shares the same color — fetch the Figma node and check each text element individually.

### Border Token Levels Vary By State
Figma uses different border token levels for different interactive states. The pattern is NOT consistent across components — always verify:
- Default state may use `Border/*/Base` or `Border/*/Primary` depending on the component
- Hover/Focus typically uses a darker level (`Tertiary` or `Secondary`)
- Disabled may use `Border/Neutral/Secondary` or `Border/Neutral/Disabled`
Always check the exact CSS variable fallback hex value in the Figma output to confirm the token level.

### Font Weight — Verify From Figma, Don't Assume
The Tarmac TDS commonly uses `font-medium` (500) for component text, but this varies. Check the Figma text style annotation — it shows the exact `Font_Weight/*` token and numeric weight. Don't default to 400 without checking.

### Addon Background Token
For components with add-on/prefix sections (like Input Field Add-on Left/Right), the addon background is typically `Surface/BG_Primary/Strongest`, not `Surface/BG_Coal/Weakest`. Always verify from the Figma addon node.

### Token Names — The #1 Source of Bugs
- **Never guess token names.** Always run `grep` against `tarmac-variables-full.json` or use `get_variable_defs` from Figma MCP. A wrong token name silently fails — the `{{placeholder}}` stays as a literal string and the component renders with broken/missing colors.
- **Never guess token LEVELS.** `Surface/BG_Primary/Strongest` resolves to `#F7F7F7` (light), not dark. `Surface/BG_Primary_Inverse/Subtle` resolves to `#333333` (dark). Always hex-verify using the Python script.
- **`_Inverse` tokens flip the light/dark semantics.** `Surface/BG_Primary/Strongest` is light grey. `Surface/BG_Primary_Inverse/Subtle` is dark grey. Don't assume "Strongest" means "darkest" — it depends on the token family.
- **`Weakest` vs `Weaker` matters for subtle/tint backgrounds.** Subtle pill backgrounds use `Weakest` (lightest tint), NOT `Weaker`. The difference is visible (e.g., Blue: `Weakest`=#F0F7FE vs `Weaker`=#E6F3FE).
- **Icon tokens use different levels than text tokens.** Text may use `Tertiary` (darker) while the corresponding icon uses `Primary` (standard). Always check both independently from Figma.
- Blue variant text is `Text/Info_Blue/Primary`, NOT `Text/Blue/Primary` or `Text/Blue/Default`. The `Info_Blue` prefix is specific to the TDS naming convention.
- Border tokens follow `Border/{Color}/Primary` not `Border/{Color}/Default`. There is no `/Default` level for borders.
- The secondary black variant uses `Border/Neutral/Tertiary` for its border, NOT `Border/Greys/Tertiary` (that token doesn't exist in the variables file).
- Focus ring tokens are at the `/300` alpha level (`Alpha/Black/300`), not `/200`. Using `/200` gives a barely visible ring.
- `Surface/BG_Primary_Inverse/Stronger` doesn't exist — the pressed state for black is `Surface/BG_Primary_Inverse/Base`.
- `Surface/BG_Primary/Stronger` doesn't exist for white hover — it's `Surface/BG_Primary/Strong`.

### White Variant Is Special
- White variant buttons are designed for dark surfaces. The text tokens (`Text/Body_Inverse/Only White`, `Text/Body_Inverse/Primary`) resolve to light colors that are invisible on white backgrounds.
- In storybook, always wrap the white variant section in a dark background (`#1a1a2e`).
- Secondary white uses `Text/Body_Inverse/Only White` for text, NOT `Text/Heading_Inverse/Only White` (that's for primary style).

### Warning Variant Is Special
- Warning uses dark text on yellow background: `Text/Heading/Only Black` for primary, `Text/Warning/Primary` (#7b6414) for secondary/tertiary. Never use white text on warning.

### Storybook Public Folder
- Theme JSON must live in `apps/storybook/public/`, not `packages/atoms/public/`. The storybook dev server can only serve files from its own public folder.
- After editing the theme in `packages/atoms/public/tarmac-theme.json`, always copy it: `cp packages/atoms/public/tarmac-theme.json apps/storybook/public/tarmac-theme.json`
- The `ThemeProvider` loads via `initialSource="./tarmac-theme.json"` which fetches relative to the current page.
- **ALWAYS use `./tarmac-theme.json` (relative path), NEVER `/tarmac-theme.json` (absolute path).** The absolute path breaks on CDN deployments where Storybook is served under a sub-path like `/storybook/sb/`. The relative `./` resolves correctly in both local dev and CDN environments.

### Never Put Showcase Logic in Component Code
- We initially added a `visualState` prop to the Button component to force hover/pressed/focused states statically in the storybook matrix. This leaked storybook concerns into production code and caused bugs where `visualState="default"` disabled CSS pseudo-states.
- The fix: create a `ShowcaseComponent` wrapper that lives ONLY in the stories file. It reads theme tokens via `useTheme()` and applies Emotion `css()` overrides. The actual component stays clean with only CSS pseudo-states.
- For default/disabled/ghost states, the wrapper just passes real props (`isDisabled`, `isGhost`). For hover/pressed/focused, it reads the variant config from the theme and applies inline style overrides.

### Focus Ring
- Use `:focus` not `:focus-visible`. The TDS design shows focus on click too, and `:focus-visible` only triggers on keyboard Tab.
- Focus spread is `2px` (Figma `Scale/100 = 2`), not `3px`. The Figma effect is `DROP_SHADOW` with `spread: Scale/100, radius: 0, offset: (0,0)`.
- The `boxShadow` format is `0 0 0 2px <color>` — no blur radius, just spread.

### Icon Props
- Figma has separate `Leading Icon` and `Trailing Icon` boolean properties with `Slot` children. Both can be true simultaneously.
- Map these to `leadingIcon` and `trailingIcon` as separate `React.ReactNode` props. Do NOT use a single `icon` + `iconPosition` pattern — it can't show both sides at once.
- Keep the old `icon`/`iconPosition` API with `@deprecated` JSDoc for backward compatibility. Resolve them internally: `const resolvedLeading = leadingIcon ?? (icon && iconPosition === 'left' ? icon : undefined)`.

### Disabled States Differ Per Style
- Primary disabled: filled grey bg (`Surface/BG_Coal/Weakest`), muted text (`Text/Heading/Disabled`), no border
- Secondary disabled: transparent bg, muted text (`Text/Body/Disabled`), muted border (`Border/Neutral/Disabled`)
- Tertiary disabled: transparent bg, muted text (`Text/Body/Disabled`), no border
- The theme needs separate `disabled`, `disabledSecondary`, `disabledTertiary` state configs. The style builder picks the right one based on `buttonStyle`.

### Spinner Size Type Mismatch
- The `Spinner` component's `size` prop accepts `SpinnerSize = 'sm' | 'md' | 'lg'`, not pixel strings like `'16px'`. Passing `'16px'` was a pre-existing type error. Use `size === 'lg' ? 'md' : 'sm'` for the spinner inside buttons.

### Storybook Meta Typing
- Use `Meta<ComponentProps>` and `StoryObj<ComponentProps>`, NOT `Meta<typeof Component>`. The `Object.assign` pattern used for compound components (`Button.Text`, `Button.Icon`) creates a `ButtonComponent` type that TypeScript doesn't recognize as a valid JSX element, breaking Storybook's `argTypes` inference.

### Theme JSON Spinner Config
- The spinner section in the theme JSON uses a different structure (`variants` with `color`/`trackColor`, `sizes` with `size`/`strokeWidth`). Don't accidentally overwrite it when editing the button config. The spinner config is shared across all components.

### `fsAppend` Can Duplicate Content
- When using file append operations, the content can get duplicated if the operation is retried. Always verify the file content after appending. If you see duplicate function definitions, rewrite the entire file.

### `strReplace` Whitespace Sensitivity
- The `strReplace` tool requires exact whitespace matching. Files in this repo use spaces (not tabs). If a replacement fails, check for hidden characters with `od -c` or use `sed` as a fallback.
- The `index.ts` exports file has unusual whitespace that makes `strReplace` fail. Use `sed -i ''` for edits to that file.

### ❌ Writing a Simplified `dim()` Without `toCssDimension()`
We wrote a shortcut `dim()` in `DropdownList/index.tsx` that only checked `typeof v === 'number'` to append `px`. This missed the case where the token resolver returns string-encoded numbers (e.g., `"12"` instead of `12`). The result was `fontSize: "12"` (unitless) and `lineHeight: "20"` (unitless). The browser interpreted unitless `lineHeight: 20` as a 20× multiplier, producing 640px-tall cells instead of ~52px.

**Fix:** Every `dim()` helper MUST use `toCssDimension()` from `../../utils/toCssDimension`. Never write a shortcut that only checks `typeof === 'number'` — the token resolution pipeline (`getVariableByName` → `String()` in `resolveStringValue`) always produces strings, even for numeric Scale/Spacing tokens.

### Backward Compatibility Pattern
- New props default to values that match old behavior: `buttonStyle = 'primary'`, `buttonType = 'button'`
- The `styles` config in theme JSON is checked first, with fallback to flat `variants` — old themes without `styles` still work
- New story files are separate from old ones (`ButtonTarmac.stories.tsx` vs `Button.stories.tsx`)
- Theme JSON additions are additive — new component configs don't affect existing ones

## Boundary Rules — What Goes Where

The single biggest source of wasted iterations was putting code in the wrong place. Follow these strictly.

### Component Code (`packages/atoms/src/components/`) — ONLY production logic
- CSS pseudo-states: `:hover`, `:active`, `:focus`, `:disabled` — these are the ONLY way to handle interactive states
- Props for real user-controlled states: `isDisabled`, `isGhost`, `isLoading`
- Theme reading via `useTheme()` + fallback to `defaultThemeConfig`
- Emotion `css()` for dynamic styles based on theme tokens
- NEVER add: `visualState`, `showcaseState`, `forceHover`, `simulateFocus`, or any prop that exists only for storybook rendering
- NEVER add: inline hardcoded hex colors — everything from theme config
- NEVER add: storybook-specific conditional logic (`if (isStorybook)` etc.)
- NEVER add: hardcoded variant/size/style lists (`new Set([...])`, `const VARIANTS = [...]`) — the theme JSON is the single source of truth for available variants. Component code must pass the variant string directly to `config.variants?.[variant]` or `config.styles?.[style]?.[variant]`.
- NEVER add: `tarmac`-prefixed props (`tarmacVariant`, `tarmacSize`) — merge TDS values into existing props and use a discriminator prop for path selection

### Style Builder (`useComponentStyles.ts`) — ONLY Emotion CSS generation
- Receives resolved theme config values (already resolved from `{{tokens}}`)
- Returns `css()` class strings
- Contains pseudo-state selectors (`:hover`, `:active`, `:focus`)
- Contains disabled/ghost class-based overrides (`&.disabled`, `&.ghost`)
- NEVER add: `visualState` branching or static color resolution for showcase
- NEVER add: React hooks or component logic

### Theme JSON (`tarmac-theme.json`) — ONLY token references
- All values use `{{TokenName}}` syntax
- Structure: `base` → `styles` → `variants` (fallback) → `sizes` → `states`
- NEVER add: resolved hex colors — always use `{{token}}` placeholders
- NEVER modify: the `spinner` section when editing button config (or vice versa)
- After ANY edit: copy to `apps/storybook/public/`

### Storybook Stories (`apps/storybook/src/stories/`) — ALL showcase logic lives here
- `ShowcaseComponent` wrapper that reads theme tokens and applies Emotion overrides for static state rendering
- Dark background wrappers for white variant
- Grid/matrix layout code
- State labels, section headers, layout styles
- The `ShowcaseComponent` is the ONLY place that simulates hover/pressed/focused states statically
- NEVER import showcase utilities from the component package

### Package Index (`packages/atoms/src/index.ts`) — ONLY public API
- Export component defaults and named exports
- Export public types (Props, Variant, Size, Style, Type unions)
- NEVER export: storybook-only types like `ShowcaseState` or `ButtonState`
- NEVER export: internal style builder functions

## Anti-Patterns That Wasted Iterations

### ❌ Adding `visualState` prop to the component
We added `visualState: 'hover' | 'pressed' | 'focused' | 'disabled' | 'ghost'` to the Button to render static states in the storybook matrix. This:
- Leaked storybook concerns into production code
- Required complex branching in the style builder (static vs interactive paths)
- Broke default interactive behavior when `visualState="default"` was passed
- Had to be fully ripped out and replaced with a storybook-only `ShowcaseButton` wrapper

**Fix:** Showcase state simulation belongs in the stories file. The wrapper reads theme tokens via `useTheme()` and applies `css()` overrides.

### ❌ Inlining the theme JSON in the stories file
We initially copied the entire theme config as a JS object inside the stories file. This:
- Duplicated 200+ lines of config that drifted from the source JSON
- Made token fixes require edits in two places
- Was error-prone when the theme structure changed

**Fix:** Use `<ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">`. Keep one source of truth in `packages/atoms/public/tarmac-theme.json`, copy to `apps/storybook/public/`. Always use `./` (relative), never `/` (absolute) — absolute paths break on CDN sub-path deployments.

### ❌ Using `icon` + `iconPosition` instead of `leadingIcon`/`trailingIcon`
The Figma component has separate Leading Icon and Trailing Icon boolean slots. A single `icon` prop with `iconPosition` can't show both simultaneously. We had to add `leadingIcon`/`trailingIcon` and deprecate the old API.

**Fix:** Always check Figma's boolean properties and slot structure before designing the prop API. If Figma has two independent toggles, use two separate props.

### ❌ Using `:focus-visible` instead of `:focus`
`:focus-visible` only triggers on keyboard navigation. The TDS design shows focus ring on click too. Users reported "focus not working" because clicking didn't show the ring.

**Fix:** Use `:focus` for the focus ring. The TDS explicitly defines Focused as a visual state that appears on any focus method.

### ❌ Guessing token names from Figma variable references
The Figma design context shows CSS variables like `var(--text/body/primary, #2b2b2b)`. We assumed the token name was `Text/Body/Primary` but the actual variable in `tarmac-variables-full.json` might use different casing or naming. For blue, the Figma shows `text/info_blue/primary` but the token is `Text/Info_Blue/Primary`.

**Fix:** Always cross-reference against the actual JSON file. Run: `grep '"name":' tarmac-variables-full.json | grep -i "blue"` to find exact names.

### ❌ Forgetting to copy theme JSON to storybook public
The theme file lives in `packages/atoms/public/` but storybook can only serve from `apps/storybook/public/`. Forgetting the copy step means the storybook loads with no theme and everything renders with fallback colors.

**Fix:** After every theme edit, run: `cp packages/atoms/public/tarmac-theme.json apps/storybook/public/tarmac-theme.json`

### ❌ Using `Meta<typeof Component>` with compound components
The `Object.assign(ButtonBase, { Text, Icon })` pattern creates a type that Storybook can't use for arg inference. `argTypes` and `args` silently fail — the controls panel shows nothing.

**Fix:** Always use `Meta<ComponentProps>` and `StoryObj<ComponentProps>` with the props interface directly.

### ❌ Not accounting for per-style disabled states
We initially had one `disabled` state config. But Figma shows:
- Primary disabled: grey filled background
- Secondary disabled: transparent bg + muted border
- Tertiary disabled: transparent bg, no border

Using one config made secondary/tertiary disabled buttons look like primary disabled.

**Fix:** Add `disabledSecondary` and `disabledTertiary` to the theme states. The style builder picks the right one based on the current `buttonStyle`.

### ❌ Overwriting spinner config when editing button config
The theme JSON has both `button` and `spinner` under `components`. A careless rewrite of the file replaced the spinner config with a different structure, breaking the Spinner component.

**Fix:** When editing theme JSON, only touch the specific component section. Read the full file first, make targeted edits, verify the spinner section is unchanged.

### ❌ Hardcoding variant lists in component code
We created `const TDS_VARIANTS: ReadonlySet<string> = new Set(['black', 'coal', 'blue', 'green', 'dlv_red'])` and used `.has(variant)` to gate the TDS rendering path. This means adding a new variant (e.g., `purple`) requires a code change — defeats the entire purpose of runtime theme configuration via JSON.

**Fix:** Use a discriminator prop (e.g., `barType`, `badgeType`) as the sole gate for the TDS path. Pass `variant` as a plain string straight to `config.variants?.[variant]`. The style builder reads whatever key exists in the theme JSON. New variants = JSON change only, zero code changes.

### ❌ Creating `tarmac`-prefixed props
We added `tarmacVariant`, `tarmacSize` as separate props instead of merging TDS values into the existing `variant`/`size` props. This creates a confusing dual API where consumers have to know which prop to use for which rendering path.

**Fix:** Merge TDS values into the existing prop unions. Use an open union type: `type Variant = 'legacy1' | 'legacy2' | (string & {})`. The discriminator prop (e.g., `barType`) determines which rendering path runs — the variant/size props are shared across both paths.

## Unit Testing Rules

### Every Atom Must Have Tests
Create `__tests__/ComponentName.test.tsx` inside the component folder. Tests are mandatory before PR. Aim for **50+ test cases** per component — cover every prop, every variant, every state, and every combination that matters.

### Mock ThemeProvider
The `figma-variables-resolver.js` uses ESM imports that Jest can't handle. Always mock ThemeProvider at the top of every test file.

When the component has a Tarmac rendering path, the mock MUST include the Tarmac config so both legacy and Tarmac paths are exercised. The legacy path is still used when `tarmacVariant` (or equivalent) is not set.

```tsx
// Provide tarmac config in the mock so Tarmac path tests work
const tarmacConfig = {
  base: { transition: "all 0.15s ease-in-out", borderWidth: "1px", /* ... */ },
  variants: {
    standard: { borderColor: "#e6e6e6", checkedBackgroundColor: "#000", /* ... */ },
    blue: { /* ... */ },
    // ... all variants with resolved hex values (not {{tokens}})
  },
  sizes: { lg: { /* ... */ }, md: { /* ... */ }, sm: { /* ... */ } },
  states: { disabled: { /* ... */ } },
};

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: { components: { yourComponent_tarmac: tarmacConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
```

### Test File Structure — Three Describe Blocks
Every test file for a Tarmac-migrated component MUST have three `describe` blocks:

```
describe("Component — Legacy (backward compatibility)")  // ≥20 tests
describe("Component — Tarmac TDS")                       // ≥25 tests
describe("ComponentGroup")                               // if applicable, ≥10 tests
```

### What to Test — Legacy Backward Compatibility (≥20 tests)
These verify the existing API still works identically after Tarmac code was added:

**Rendering:**
1. Renders with `children`
2. Renders with `text` prop (if applicable)
3. Renders without children (standalone)
4. Renders correct HTML element (`<button>`, `<label>`, `<span>`)
5. Renders correct DOM structure (e.g., label wraps input)

**All Variants/Sizes/Styles:**
6. Each size renders without error (individual tests, not a loop — `sm`, `md`, `lg`)
7. All variant values render without error
8. All style/type values render without error

**States:**
9. Controlled checked/value state
10. Toggling controlled state on rerender
11. Uncontrolled with `defaultChecked`/`defaultValue`
12. Indeterminate state (Checkbox)
13. Disabled state — native input/button is disabled
14. Disabled state — `aria-disabled` is set

**Events:**
15. `onChange` fires with correct event shape (check `target.checked`, `stopPropagation`, `preventDefault`)
16. `onChange` does NOT fire when disabled
17. `onClick` fires

**HTML Attributes Pass-Through:**
18. `className` prop is applied
19. `id` prop reaches the input/button
20. `name` prop reaches the input
21. `value` prop reaches the input
22. `tabIndex` prop reaches the input
23. `required` prop reaches the input
24. `title` prop reaches the wrapper
25. `style` (inline) prop is applied

**Backward Compatibility Guards:**
26. New Tarmac-only props (e.g., `tarmacStyle`, `subtext`) are ignored when `tarmacVariant` is not set
27. Component renders via legacy path (Tailwind classes present) when `tarmacVariant` is absent

### What to Test — Tarmac TDS (≥25 tests)
These exercise the new Tarmac rendering path:

**Rendering:**
1. Renders when `tarmacVariant` is set
2. Renders without label/children (component-only)
3. Correct DOM structure in Tarmac path

**All Variants (individual tests):**
4. Standard variant
5. Blue variant
6. Green variant
7. DLV Red variant
8. (Add more per component — info, success, error, warning, etc.)

**All Sizes (individual tests):**
9. Size sm
10. Size md
11. Size lg

**All Styles (individual tests):**
12. Box/primary style
13. Rounded/secondary style
14. Default style when prop is omitted

**Exhaustive Combo Test:**
15. All variant × style × size combinations render without error (single test with nested loops)

**States:**
16. Checked/active state — input reflects it
17. Unchecked/inactive state
18. Indeterminate — native input + `aria-checked="mixed"`
19. `aria-checked="true"` for checked (non-indeterminate)
20. Disabled — native input disabled
21. Disabled — `aria-disabled="true"`
22. Disabled + checked combo
23. Disabled + indeterminate combo

**Events:**
24. `onChange` fires when clicked
25. `onChange` does NOT fire when disabled
26. `onClick` fires

**Tarmac-Specific Features:**
27. Subtext/supporting text renders when provided
28. Subtext renders without main label
29. No subtext wrapper when neither children nor subtext
30. Leading/trailing icon render (if applicable)

**HTML Attributes Pass-Through (in Tarmac mode):**
31. `className` applied
32. `id` reaches input
33. `name` reaches input
34. `value` reaches input
35. `title` reaches wrapper

### What to Test — Group Component (if applicable, ≥10 tests)
1. Renders string options
2. Renders number options
3. Renders object options with `label`/`value`
4. `onChange` fires with selected values on check
5. `onChange` accumulates values on multiple checks
6. `onChange` removes value on uncheck
7. Controlled `value` prop
8. Uncontrolled `defaultValue` prop
9. Group `disabled` blocks all children
10. Individual `option.disabled` blocks that option only
11. Renders `children` instead of `options`
12. `className` applied to group wrapper
13. `role="group"` present
14. `aria-orientation` horizontal by default
15. `aria-orientation` vertical when `vertical=true` or `orientation="vertical"`
16. `size` prop passes to child components

### What NOT to Test
- Specific Emotion CSS class names (they're dynamic hashes)
- Specific color values (those come from theme tokens, tested via visual regression)
- Tailwind utility classes (we use Emotion, not Tailwind in atoms)
- Hover/focus visual appearance (tested via Storybook visual regression)

### Run Tests After Every Change
```bash
# Run specific component tests
npx jest --config=jest.config.mjs --testPathPattern="Checkbox.test" --no-coverage

# Run all tests to check for regressions
npx jest --config=jest.config.mjs --no-coverage
```
If any existing test breaks, find the root cause and fix it — don't skip or delete tests.

### Test Count Expectations
| Component Type | Legacy Tests | Tarmac Tests | Group Tests | Total |
|---------------|-------------|-------------|-------------|-------|
| Simple (Badge) | ~20 | ~25 | N/A | ~45 |
| Interactive (Checkbox, Radio) | ~27 | ~33 | ~17 | ~77 |
| Complex (Button) | ~25 | ~30 | N/A | ~55 |

If your test count is under 40 for a simple component or under 60 for an interactive one, you're missing coverage. Go back and add more.

### Pixel-Level Verification Rule
After building any component, always verify against Figma using `get_design_context` on specific variant nodes. Check these values pixel by pixel:
- **padding** — uniform vs asymmetric, exact px values
- **fontSize** and **lineHeight** — match the Figma text style (C1/caption1 vs C2/caption2)
- **iconSize** — matches the Icon Container size in Figma
- **gap** — matches Figma auto-layout gap
- **borderWidth** — Figma uses `Stroke/small = 0.5px`, not `1px`
- **borderRadius** — matches `Radius/Default`
- **borderColor** for outlined variants — verify the exact token (e.g., Black outlined uses `Border/Neutral_Inverse/Primary`, not `Border/Neutral/Tertiary`)

The mistakes we made on Badge:
- Padding was `2px 6px` (asymmetric) but Figma uses uniform `6px` for lg/md and `4px` for sm
- Medium font was `12px/16px` but Figma Medium actually uses `10px/12px` (C2/caption2)
- Border width was `1px` but Figma uses `0.5px` (Stroke/small)
- Outlined Black border used wrong token (`Border/Neutral/Tertiary` → should be `Border/Neutral_Inverse/Primary`)

Always fetch at least 3 specific Figma nodes (one per size) via `get_design_context` and cross-check every CSS property before considering the component done.

## Dark Mode Support

### Architecture — One JSON, Two Modes
The TDS uses a single `tarmac-theme.json` for both light and dark modes. Do NOT create separate files.

The flow:
```
tarmac-theme.json                    ThemeProvider                     figma-variables-resolver
  {{Surface/BG_Primary/Default}}  →  resolveTemplatePlaceholders()  →  getVariableByName("Surface/BG_Primary/Default", modeOverrides)
                                                                        ↓
                                                                    resolveModeIds({ "DLV_Mapped ": "Dark" })
                                                                        ↓
                                                                    variable.valuesByMode["845:3"]  ← Dark mode value
                                                                        ↓
                                                                    rgbaToCSS() → "#1a1a1a" (dark) instead of "#ffffff" (light)
```

The `{{token}}` placeholders are mode-agnostic. The same token name resolves to different hex values depending on which mode is active. Components never know about modes.

### The DLV_Mapped Collection
The Figma variables file has a collection called `"DLV_Mapped "` (note trailing space) with two modes:
- `"Light"` (modeId: `845:2`) — default when no override is passed
- `"Dark"` (modeId: `845:3`)

This collection contains all semantic tokens (`Surface/*`, `Text/*`, `Border/*`, `Alpha/*`). The `Brand` and other collections have only one mode.

### How to Use

Light mode (default — no override needed):
```tsx
<ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
```

Dark mode — pass `modeOverrides`:
```tsx
<ThemeProvider
  initialSource="./tarmac-theme.json"
  activeTheme="tarmac-theme"
  modeOverrides={{ "DLV_Mapped ": "Dark" }}
>
```

The `ThemeProvider` passes `modeOverrides` to `resolveTemplatePlaceholders` in a `useMemo` (line ~166 of ThemeProvider/index.tsx). This means changing `modeOverrides` triggers a re-resolve of all tokens.

### Storybook — Always Add a Light vs Dark Story
Every Tarmac component story file must include a "Light vs Dark Mode" comparison story:
```tsx
const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider
    initialSource="./tarmac-theme.json"
    activeTheme="tarmac-theme"
    modeOverrides={{ "DLV_Mapped ": "Dark" }}
  >
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);
```
Show light on the left, dark on the right, side by side. This catches token resolution issues where a color looks fine in light but breaks in dark.

### Why No Separate JSON Files
- Token names are identical in both modes — `{{Surface/BG_Primary/Default}}` is the same string
- Only the resolved values differ (e.g., `#ffffff` in light → `#1a1a1a` in dark)
- The resolver handles the mode switch internally via `valuesByMode`
- Maintaining two JSON files would mean duplicating all token references and keeping them in sync — unnecessary complexity

### Rule: Always Check Variable Modes Before Building
```bash
grep -B15 '"modes"' packages/atoms/src/components/ThemeProvider/tarmac-variables-full.json | grep -E '"name"|"modeId"'
```
If a collection has multiple modes, test the component in all modes via storybook.

## Interactive Elements — Hover, Focus, Cursor

### Focusability
HTML `<span>` and `<div>` elements are NOT focusable by default. If a component has a Figma "Focused" state, it MUST have `tabIndex={0}` (or accept it as a prop with a sensible default). Without `tabIndex`, `:focus` CSS never triggers.

```tsx
// Bad — span can't receive focus
<span className={styles}>content</span>

// Good — always focusable
<span className={styles} tabIndex={tabIndex ?? 0}>content</span>
```

### Cursor
- Interactive components (Button, Avatar with onClick): `cursor: 'pointer'` in default state AND in `&:hover` block
- Non-interactive display components (Badge): no cursor change needed
- Disabled: `cursor: 'default'`
- Ghost: `pointerEvents: 'none'`

### Hover/Focus Fallback Colors Must Be Distinct
When the theme hasn't loaded yet (async fetch), `config.default` is `{}`. All `dc.hoverBackgroundColor` etc. are `undefined`. If fallbacks chain back to the same value, hover looks identical to default.

```typescript
// Bad — hover falls back to same color as default
backgroundColor: dc.hoverBackgroundColor || dc.backgroundColor,  // both undefined → same fallback

// Good — distinct fallback values matching Figma
backgroundColor: dc.hoverBackgroundColor || '#0d0d0d',  // visually different from default '#000000'
```

Always use the actual Figma hex values as fallbacks, not references to other config properties.

### Emotion Pseudo-State Checklist
When writing `&:hover` or `&:focus` blocks in Emotion `css()`:
1. Include `borderStyle: 'solid'` explicitly if changing `borderWidth` — some browsers reset border style in pseudo-states
2. The `cursor` property must be set in BOTH the base styles AND the `&:hover` block
3. Test hover in the Playground story by actually hovering — don't assume it works
4. Test focus by clicking the element (needs `tabIndex`) or tabbing to it
5. If hover/focus changes are subtle (e.g., `#000000` → `#0d0d0d`), verify in DevTools that the styles are actually being applied — the visual difference may be intentionally minimal per Figma

### Avatar-Specific Gotcha
The Avatar hover effect in Figma is intentionally subtle — bg changes from `#000000` to `#0d0d0d` (barely visible). The real visual cue is the border thickening from `0.5px` to `1px` and border color shifting from `#e6e6e6` to `#cccccc`. This is by design. Don't add extra visual effects to "fix" it.

## MANDATORY: Tests Must Accompany Every Code Change

This is a **BLOCKING REQUIREMENT**. Every time component code, style builder code, or theme config is modified, the corresponding test file MUST be updated in the SAME change. No exceptions.

### Rules
1. **Every new prop** added to a component MUST have at least one test verifying it renders correctly and one test verifying the default/fallback behavior.
2. **Every new utility function** (e.g., `placementToArrowPosition`) MUST have unit tests covering all input→output mappings.
3. **Every behavioral change** (positioning logic, auto-flip, arrow direction, gap changes) MUST have tests that verify the new behavior.
4. **Every bug fix** MUST include a regression test that would have caught the bug.
5. **Never ship a code change without updating `__tests__/ComponentName.test.tsx`** — if the test file doesn't exist yet, create it.

### What to Test for Each Axis
- **Variants**: Loop through all variant values, verify render without error
- **Types/Styles**: Test each combination (standard×singleText, standard×dualText, ctas×singleText, ctas×dualText)
- **Arrow positions**: All 12 positions render correct SVG dimensions
- **Auto-positional mapping**: All 12 placements map to correct arrow positions
- **Boolean props** (leadingIcon, trailingIcon, renderInline): Test true, false, and both-true
- **Click handlers**: Verify each CTA button fires its onClick
- **Accessibility**: role="tooltip", tabIndex, button elements, type="button"
- **Backward compatibility**: Legacy variants still work identically

### Anti-Pattern: Code Without Tests
If you modify `index.tsx` or `useComponentStyles.ts` and do NOT touch the test file, you have violated this rule. The PR/change is incomplete. Go back and add the tests before considering the work done.

## Sub-Component Reuse Rule — Use Orca Components, Not Raw HTML

### Tarmac Spinner Rule
When a Tarmac component needs a loading spinner internally, it MUST use the Tarmac Spinner (`tarmacVariant` prop) — NOT the legacy Spinner (`variant` prop). The mapping:
- **Primary style** (filled colored background) → `tarmacVariant="tarmac-03"` (white spinner, visible on dark/colored bg)
- **Secondary/Tertiary style** (transparent background) → `tarmacVariant="tarmac-01"` (dark spinner, visible on light bg)
- **Size mapping**: Button `lg` → Spinner `20px`, Button `md`/`sm` → Spinner `16px`

Example in Button:
```tsx
// Tarmac variant detected
<Spinner tarmacVariant="tarmac-03" tarmacSize="16px" />

// Legacy variant — keep using legacy spinner
<Spinner size="sm" variant="primary" />
```

### The Mistake
When building the Alert/InlineMessage component, we used raw `<button>` elements with inline styles for the CTA section in storybook stories. The Figma design clearly shows Button instances (Style=Primary/Secondary, Size=Small/Medium) as sub-components. We should have used the actual Orca `Button` component configured with the correct variant, size, and style props.

### The Rule
When a Figma component contains instances of other TDS components (Button, Badge, Icon Container, etc.), **ALWAYS use the corresponding Orca component** from `@delhivery/tarmac` — never recreate them with raw HTML or inline styles.

Specifically:
1. **Read the Figma descendant instances** — `get_context_for_code_connect` shows `INSTANCE[Button]` with its variant/style/size/state properties. Use those exact props on the Orca `<Button>` component.
2. **Match the Figma Button configuration exactly**:
   - Figma `Style=Primary, Variant=Black, Size=Small` → `<Button buttonStyle="primary" variant="black" size="sm" text="Proceed" />`
   - Figma `Style=Secondary, Variant=Black, Size=Small` → `<Button buttonStyle="secondary" variant="black" size="sm" text="Cancel" />`
   - Figma `Style=Tertiary` → `<Button buttonStyle="tertiary" ... />`
3. **For the Alert CTA section**: The component should accept `ctaActions` as `React.ReactNode` so consumers can pass Orca Buttons directly. In storybook stories, always demonstrate with real `<Button>` components, not raw HTML.
4. **For Badge sub-components**: Use the Orca `<Badge>` component with the correct type/variant/size.
5. **Never use inline styles or raw `<button>` elements** to simulate what an Orca component already provides.

### Figma → Orca Button Mapping
| Figma Property | Orca Prop | Values |
|---|---|---|
| Style (Primary/Secondary/Tertiary) | `buttonStyle` | `'primary' \| 'secondary' \| 'tertiary'` |
| Variant (Black/White/Blue/Success/Error/Warning) | `variant` | `'black' \| 'white' \| 'info' \| 'success' \| 'error' \| 'warning'` |
| Size (Large/Medium/Small) | `size` | `'lg' \| 'md' \| 'sm'` |
| Label | `text` or `children` | string |
| Leading Icon | `leadingIcon` | `React.ReactNode` |
| Trailing Icon | `trailingIcon` | `React.ReactNode` |

### Alert-Specific CTA Pattern
The Alert Figma shows different Button variants per alert type. The mapping is:

| Alert Variant | Button Variant (Cancel=tertiary, Proceed=primary) |
|---|---|
| white | black |
| black | white |
| coal | white |
| success | success |
| error | error |
| info (Blue) | info |
| warning | warning |

The component has a built-in `ALERT_TO_BUTTON_VARIANT` map. When `showCtas=true` and no `ctaActions` is provided, it renders default Orca Buttons with the correct variant automatically. Consumers can override with `ctaActions` for custom CTA layouts.

In storybook stories, prefer using the built-in defaults (just pass `showCtas`) rather than manually constructing `ctaActions` with hardcoded button variants — this ensures the variant mapping stays in sync.

```tsx
// Good — uses built-in variant mapping
<Alert variant="error" showCtas title="Something failed" />

// Also good — custom override when needed
<Alert variant="error" showCtas ctaActions={<Button buttonStyle="primary" variant="error" text="Retry" />} />
```

- **Large size**: Buttons use `size="md"` (Regular - 36px)
- **Small size**: Buttons use `size="sm"` (Small - 28px)

### Why This Matters
- Raw HTML buttons don't pick up theme tokens, hover/pressed states, or focus rings
- The visual output won't match Figma because font family, padding, border-radius, and colors differ
- It defeats the purpose of a design system — components should compose from existing atoms
- Storybook stories serve as documentation; they must show the correct usage pattern

### ❌ Using Same Button Variant for All Alert Types
We initially hardcoded `variant="black"` for all alert CTA buttons. But Figma shows each alert type uses a matching button variant (error alert → error buttons, success alert → success buttons, etc.). The black/coal/white alerts use inverted button variants (white alert → black buttons, black alert → white buttons).

**Fix:** Build a `ALERT_TO_BUTTON_VARIANT` mapping in the component that maps each alert variant to the correct Orca Button variant. Fetch ALL 7 Figma alert variant nodes to verify the button instances before assuming a single mapping.

### ❌ Using Wrong Token Level for Dark Alert Backgrounds (Coal)
The coal alert in Figma uses `Surface/BG_Coal/Strong` (#46516c, dark blue-grey) — it's a DARK variant like black. We initially used `Surface/BG_Coal/Weakest` (very light grey) because we assumed coal was a light variant. This made the background nearly white, and the `white` button variant (light text) became invisible against it. The text tokens were also wrong — we used `Text/Body/Only Black` (dark text) instead of `Text/Body_Inverse/Primary` (light text).

**Fix:** Always fetch the specific Figma node for EVERY variant and check the actual CSS variable fallback values. Coal's Figma data clearly shows `var(--surface/bg_coal/strong, #46516c)` and `var(--text/body/primary, #e6e6e6)` — both indicating a dark surface. Don't assume token levels (Weakest/Weaker/Default/Strong/Stronger) based on the variant name — verify against Figma.

### ❌ Using Neutral Text Tokens for Colored Alert Variants
For success/error/info/warning alerts, we used generic neutral tokens (`Text/Body/Only Black` for title, `Text/Body/Secondary` for description). But Figma shows each colored variant uses its own colored text tokens:
- Success: title=`Text/Success/Tertiary` (#127049), description=`Text/Success/Primary` (#1ba86e)
- Error: title=`Text/Error/Tertiary` (#930d28), description=`Text/Error/Primary` (#dc143c)
- Info: title=`Text/Info_Blue/Tertiary` (#1764a7), description=`Text/Info_Blue/Primary` (#2396fb)
- Warning: title=`Text/Warning/Tertiary` (#312808), description=`Text/Warning/Primary` (#7b6414)

Only white uses neutral tokens (`Text/Body/Only Black`, `Text/Body/Secondary`). Black and coal use inverse tokens.

**Fix:** Never assume all variants share the same text color tokens. Fetch each variant's Figma node individually and read the exact CSS variable references. The pattern is: title uses `Text/{Color}/Tertiary` (darker shade) and description uses `Text/{Color}/Primary` (standard shade).


## Sub-Component Reuse — Only Use Tarmac-Themed Atoms

### The Rule
When building or refactoring a Tarmac component that needs sub-components (buttons, inputs, chips, etc.), **only use atoms that have Tarmac theme support**. Do NOT import atoms that haven't been migrated to the Tarmac TDS.

### How to Identify Tarmac-Themed Atoms
An atom has Tarmac theme support if it meets ANY of these criteria:
- It has a `*Tarmac.stories.tsx` file in `apps/storybook/src/stories/atoms/`
- It has a `tarmacVariant` prop (like Checkbox)
- Its theme config in `tarmac-theme.json` drives all styling via tokens

Check which atoms are Tarmac-ready:
```bash
ls apps/storybook/src/stories/atoms/*Tarmac* | sed 's/.*\///' | sed 's/Tarmac.stories.tsx//'
```

### Current Tarmac-Themed Atoms (update this list as new atoms are migrated)
- Alert
- Avatar
- Badge
- Button
- Checkbox
- Chip
- Pill
- Table
- Tooltip

### What to Do When a Sub-Component Isn't Tarmac-Ready
If the Figma design uses a sub-component that hasn't been migrated to Tarmac yet (e.g., Input, Tabs):
1. **Use a raw HTML element** (`<input>`, `<button>`, `<div>`) with Emotion CSS from the style builder
2. **Read tokens from the parent component's theme config** (e.g., `tableHeader.search.*` tokens)
3. **Do NOT import the non-Tarmac atom** — it will use its own legacy styling system which won't match the Tarmac design
4. **Add a TODO comment** noting which atom should replace the raw element once it's migrated:
   ```tsx
   {/* TODO: Replace with <Input> once Input is migrated to Tarmac TDS */}
   <input className={styleMap.searchField} ... />
   ```

### The Mistake We Made
In the Table Header refactor, we imported the `<Input>` component for the search field. Input doesn't have Tarmac theme support — it uses its own legacy styling with Tailwind classes and a different theme config structure. This meant the search field looked inconsistent with the rest of the Tarmac-themed Table Header.

We correctly used `<Button>` (Tarmac-ready) and `<Chip>` (Tarmac-ready) for action buttons and filter dropdowns, but should have kept the search field as a raw `<input>` with Emotion CSS until Input gets its own Tarmac migration.

### Decision Tree
```
Need a sub-component inside a Tarmac atom?
├── Is the sub-component Tarmac-themed? (check list above)
│   ├── YES → Import and use it with correct variant/style/size props
│   └── NO → Use raw HTML element + Emotion CSS from style builder
└── Add TODO comment for future migration
```

## Storybook Stories — Figma Sub-Component Fidelity

### The Rule
When a Figma design shows specific sub-component showcases (e.g., "Table Header with 1-5 filters", "Table Text Cells with Texts+Icons", "Table Cells Add-ons"), the Storybook stories MUST reproduce those exact visual compositions — not simplified versions with plain text.

### The Mistake We Made
The Figma Table design shows rich sub-component variants:
- **Table Text Cells** — title + subtext + location icons
- **Table Cells Add-ons** — checkbox/radio + badge + title + subtext combos
- **Table Badge/Pill Rows** — inline badges and pills in cells
- **Table Status Indicator Rows** — colored dots + status text
- **Table Button Rows** — action buttons inside cells
- **Table Header** — tabs + search + 1-5 filter dropdowns + CTA buttons

But the initial stories used basic text columns (`{ title: "Name", dataIndex: "name" }`) without custom `render` functions. This made the stories useless for visual verification against Figma.

### What Stories Must Include
For every Figma sub-component showcase, the story MUST:

1. **Use custom `render` functions in columns** to match the Figma cell content:
   ```tsx
   // Figma shows: Title + Subtext in a column layout
   render: (_, record) => (
     <div style={{ display: "flex", flexDirection: "column" }}>
       <span style={titleStyle}>{record.name}</span>
       <span style={subtextStyle}>{record.subtext}</span>
     </div>
   )
   ```

2. **Use existing Tarmac atoms for cell content** where applicable:
   ```tsx
   // Figma shows Badge instances inside cells
   render: (_, record) => (
     <div style={{ display: "flex", gap: 4 }}>
       {record.badges.map(b => <Badge key={b} type="blue" size="sm">{b}</Badge>)}
     </div>
   )
   ```

3. **Match the Figma data structure** — if Figma shows 5 rows with specific content (names, IDs, locations, statuses), create sample data that mirrors it.

4. **Use `useState` for interactive stories** — tabs, search, filters must have real state management, not `() => {}` no-op callbacks. Static `args`-based stories with function props don't work in Storybook because functions get serialized away.

### Story Naming Convention
Match the Figma frame names:
| Figma Frame | Story Name |
|---|---|
| Table Text Cells — Texts + Icons | "Text Rows (Title + Subtext + Icons)" |
| Table Checkbox Rows | "Checkbox Rows" |
| Table Status Indicator Rows | "Status Indicator Rows" |
| Table Cell Badge/Pills | "Badge & Pill Rows" |
| Table Cells Add-ons | "Cell Add-ons (Title + Badge + Subtext)" |
| Table Button Rows | "Button Rows" |
| Table Header (1-5 filters) | "Table Header (Filters + Tabs + Search + CTAs)" |

### Interactive vs Static Stories
- **Interactive stories** (with tabs/search/filters): Use `render` with a React component that has `useState`. Never use `args` for function props.
- **Static showcase stories** (cell content variants): Can use `args` with `dataSource` and `columns` since they don't need state.
- **Playground story**: Uses `args` for Storybook controls (variant, size, bordered, etc.)

### Checklist for Figma-Faithful Stories
- [ ] Every Figma sub-component showcase has a matching story
- [ ] Cell content uses custom `render` functions, not plain text
- [ ] Badges, pills, status indicators use actual Tarmac atoms (if available)
- [ ] Interactive elements (tabs, search, filters) use `useState`
- [ ] Sample data matches the Figma content structure
- [ ] Story names match Figma frame names
- [ ] Filter count variants (1-5) each have their own story
- [ ] Light vs Dark mode comparison story exists


## Theme Loading — initialSource Path Rules

### The Rule
In Storybook stories, ALWAYS use a relative path for `initialSource`:
```tsx
// CORRECT — works locally AND on CDN
<ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">

// WRONG — breaks on CDN sub-path deployments
<ThemeProvider initialSource="/tarmac-theme.json" activeTheme="tarmac-theme">
```

### Why Absolute Paths Break on CDN
The Storybook deployment structure is:
```
CDN root/
├── storybook/           ← auth-shell (base: "/storybook/")
│   ├── index.html
│   └── sb/              ← storybook-static copied here
│       ├── iframe.html  ← Storybook renders stories inside this iframe
│       └── tarmac-theme.json  ← from apps/storybook/public/
```

When the iframe at `https://cdn.example.com/storybook/sb/iframe.html` fetches `/tarmac-theme.json`:
- Browser resolves to `https://cdn.example.com/tarmac-theme.json` — **404, file doesn't exist there**

When it fetches `./tarmac-theme.json`:
- Browser resolves to `https://cdn.example.com/storybook/sb/tarmac-theme.json` — **correct path**

### ThemeProvider Path Handling
The `loadThemeFromSource` function in ThemeProvider handles two path formats:
- Paths starting with `/` or `./` → passed directly to `fetch()`
- Bare filenames like `tarmac-theme.json` → get `/` prepended for backward compat

### The Mistake We Made
All 9 Tarmac story files originally used `initialSource="/tarmac-theme.json"`. This worked locally because Vite serves `public/` at the domain root. But on the CDN where Storybook is deployed under `/storybook/sb/`, the absolute path resolved to the wrong location and the theme JSON never loaded — all Tarmac components fell back to default styles.

### Checklist
- [ ] All `initialSource` values in story files use `./tarmac-theme.json` (relative)
- [ ] No story file uses `/tarmac-theme.json` (absolute)
- [ ] ThemeProvider code handles both `./` and `/` prefixes without prepending extra `/`
- [ ] After any new Tarmac story is created, verify the `initialSource` uses `./`

## Lessons from TextArea & Dropdown Migrations

These lessons were discovered during the TextArea Tarmac migration and the Dropdown requirements preparation. They address gaps in the original guidelines that caused multiple revision cycles.

### Requirements Phase — Exhaustive Figma Exploration Before Writing

#### MANDATORY: Screenshot Every Figma Section Before Writing Requirements
The TextArea spec initially missed the correct DOM structure (status text position, trailing icon placement, resize handle, subtext layout) because the Figma was not explored node-by-node before writing requirements. The Dropdown spec initially missed grouped lists, footer CTAs, scrollbar, and Drop Cell boolean toggles.

**Rule:** Before writing a single requirement:
1. Take a screenshot of the full Figma Playground (`get_screenshot`)
2. Take a screenshot of EACH sub-component section individually
3. Call `get_design_context` on at least one variant of each sub-component to get the exact DOM structure
4. Call `get_design_context` on the component description node to read the Figma component documentation (it lists all properties, boolean toggles, styles, states, and behavior)
5. List ALL boolean toggles from the Figma component description — don't guess from screenshots
6. Identify ALL footer/header/action areas in list-type components
7. Identify ALL sub-component instances (Checkbox, Avatar, Button, Chip, etc.) and verify they're Tarmac-ready

#### MANDATORY: Check Existing Tarmac Components for Reuse
The TextArea initially used legacy `Pill` instead of Tarmac `Chip` for tags. The Dropdown initially missed that Drop Cells use Tarmac Checkbox and Avatar.

**Rule:** Before writing requirements, run:
```bash
ls apps/storybook/src/stories/atoms/*Tarmac* | sed 's/.*\///' | sed 's/Tarmac.stories.tsx//'
```
Then for each sub-component instance found in Figma, check if it's in the Tarmac-ready list. If yes, the requirement MUST specify using the Tarmac component. If no, the requirement MUST specify using raw HTML + Emotion CSS with a TODO comment.

#### MANDATORY: Read the Existing Legacy Component Props
The Dropdown spec initially missed several legacy props in the backward compatibility requirement. Always read the full props interface of the existing component before writing backward compatibility requirements:
```bash
grep -A 50 'interface.*Props' packages/atoms/src/components/ComponentName/index.tsx
```

### Component Implementation — DOM Structure Must Match Figma Exactly

#### CRITICAL: Verify DOM Structure Against Figma Before Coding
The TextArea had multiple layout issues because the DOM structure was assumed rather than verified:
- Status text ("99+") was placed outside the bordered box instead of inside it
- Trailing icon was inline with textarea text instead of at the bottom-right
- Tags were rendered before the textarea text instead of after
- Subtext and helper text bottom were in the wrong layout (stacked instead of side-by-side)
- The resize handle was a custom SVG instead of the native browser resize

**Rule:** After calling `get_design_context` on a Figma variant, map the Figma DOM tree to your React JSX 1:1:
- Figma `flex-row` → React `display: flex; flex-direction: row`
- Figma `flex-col` → React `display: flex; flex-direction: column`
- Figma `items-start` → React `align-items: flex-start`
- Figma `flex-[1_0_0]` → React `flex: 1 0 0`
- Figma `absolute bottom-right` → React `position: absolute; bottom: 0; right: 0`
- Figma `overflow-clip` → React `overflow: clip` (but use `overflow: auto` if `resize` is needed)

#### CRITICAL: Native HTML Element Behavior
The TextArea had issues with the native `<textarea>` element:
- Browser focus outline showed as a blue box with its own resize handle — needed `outline: none`, `box-shadow: none` on `:focus` and `:focus-visible`
- `resize: none` on the textarea killed the resize functionality — put `resize: vertical` on the OUTER container instead
- `overflow: clip` on the container prevented CSS `resize` from working — use `overflow: auto` when resize is needed
- `appearance: none` was needed to suppress browser-specific textarea chrome

**Rule:** For any component using native form elements (`<textarea>`, `<input>`, `<select>`):
1. Always set `outline: none; box-shadow: none` on `:focus` and `:focus-visible`
2. Put `resize` on the outer container, not the native element
3. Use `overflow: auto` (not `clip`) on resizable containers
4. Test in the actual browser, not just JSDOM — native element behavior differs

### Storybook — Build Pipeline Awareness

#### CRITICAL: Storybook Reads from `dist/`, Not `src/`
The TextArea tag removal appeared broken for many iterations because Storybook imports from `@delhivery/tarmac` which resolves to `packages/atoms/dist/index.js` (the built output), NOT the source files. Every source change requires a rebuild:
```bash
pnpm --filter @delhivery/tarmac build
```

Additionally, Storybook has a Vite cache at `apps/storybook/node_modules/.cache/` that can serve stale code even after rebuilding. Always clear it when debugging:
```bash
rm -rf apps/storybook/node_modules/.cache
```

**Rule:** After ANY component source change:
1. Rebuild: `pnpm --filter @delhivery/tarmac build`
2. Clear cache: `rm -rf apps/storybook/node_modules/.cache`
3. Restart Storybook
4. Hard refresh the browser (Ctrl+Shift+R)

#### ShowcaseWrapper CSS Selectors Must Use data-testid
The TextArea ShowcaseWrapper initially used fragile CSS child selectors (`& > div:nth-child(2) > div:first-child`) that broke when the DOM structure changed. These selectors also accidentally targeted the wrong elements (title container instead of input container).

**Rule:** Add `data-testid` attributes to key structural elements in the component, then target them in the ShowcaseWrapper:
```tsx
// Component
<div data-testid="textarea-input-container" className={inputContainerStyles}>

// ShowcaseWrapper (stories only)
const overrides = css({
  '& [data-testid="textarea-input-container"]': {
    borderColor: `${tc.hoverBorderColor} !important`,
  },
});
return <div className={overrides}><TextArea {...props} /></div>;
```

### Sub-Component Click Handling

#### Chip/Pill onClick May Not Work as Expected
The TextArea tag removal went through 5+ iterations trying to make Chip's `onClick` work. The Chip component's internal `handleClick` checks `if (isDisabled || isGhost) return` before calling the passed `onClick`. Additionally, clicking on the trailing icon SVG inside the Chip may not propagate correctly in all browsers.

**Working pattern:** Pass `onClick` directly to the Chip component. If that doesn't work in the browser (but passes in JSDOM tests), the issue is likely Storybook's build cache — not the click handler. Always rebuild + clear cache before debugging click issues.

**Alternative pattern (if Chip onClick truly doesn't work):** Wrap the Chip in a `<span>` with `position: relative` and overlay a transparent `<button>` with `position: absolute; inset: 0; z-index: 1`:
```tsx
<span style={{ position: 'relative', display: 'inline-flex' }}>
  <Chip ... />
  <button type="button" onClick={handleRemove}
    style={{ position: 'absolute', inset: 0, background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 1 }} />
</span>
```

### Playground Story — Tags/Arrays Can't Be Storybook Controls
Storybook controls can't handle array props (like `tags: TagItem[]`). For components with array-based features (tags, options, selected values), the Playground story MUST use a stateful wrapper component with `useState`:
```tsx
const PlaygroundRender: React.FC<Props> = (args) => {
  const [tags, setTags] = React.useState([{ value: "Tag 1" }]);
  const isWithTags = args.styleVariant === "withTags";
  return <Component {...args} tags={isWithTags ? tags : undefined} onTagsChange={isWithTags ? setTags : undefined} />;
};

export const Playground: Story = {
  render: (args) => <PlaygroundRender {...args} />,
};
```

### Requirements Completeness Checklist

Before finalizing any requirements document, verify ALL of these:

- [ ] Every Figma sub-component section has been screenshotted and explored via `get_design_context`
- [ ] The Figma component description has been read (lists all properties, boolean toggles, styles, states, behavior, accessibility)
- [ ] All boolean toggles from the Figma description are listed as requirements (not just the ones visible in screenshots)
- [ ] All sub-component instances (Checkbox, Avatar, Button, Chip, Badge, etc.) are identified and checked against the Tarmac-ready list
- [ ] Footer/header/action areas in list-type components are covered
- [ ] Grouped/sectioned layouts are covered (section headers, captions)
- [ ] Scrollbar behavior is covered for scrollable areas
- [ ] The existing legacy component's full props interface has been read and all props listed in backward compatibility
- [ ] Correctness properties (property-based testing) are defined
- [ ] The `options` prop structure supports all Figma features (groups, avatars, icons, subtext, disabled items)
- [ ] Multi-select pill/chip rendering specifies which Tarmac component to use
- [ ] Add-on sections specify distinct background colors and content patterns
- [ ] The theme JSON requirement covers ALL sub-sections (base, inputField, dropCell, list, sectionHeader, footer, states, scrollbar)


## Spec Generation Rules — Avoiding Cross-Document Inconsistencies

These rules prevent the gaps found during the Dropdown spec audit where requirements, design, and tasks fell out of sync.

### MANDATORY: Cross-Reference Audit After Spec Generation

After generating all three spec documents (requirements → design → tasks), perform a cross-reference audit:

1. **Every requirement acceptance criterion** must be referenced by at least one task
2. **Every task** must reference the correct requirement numbers
3. **Prop names** must be identical across all three documents (e.g., don't use `variant` in requirements but `tarmacVariant` in design)
4. **Function names** must be identical across design and tasks (e.g., don't reference `buildDropdownStyles` in requirements when the design names it `buildInputFieldStyles`)
5. **Line limits** must be consistent (if design overrides the default 150-line limit, update the requirement too)
6. **Export lists** must match between requirements and design (every type in the design's export section must be in the requirement)
7. **Theme JSON sub-sections** must match between requirements and design (if design adds a `search` section, requirements must list it)
8. **CSS pseudo-selectors** must be accurate — `:disabled` only works on native form elements, not `<div>` triggers

### MANDATORY: No Optional Tasks

All property-based tests are REQUIRED, not optional. Never mark tasks with `*` (optional). Every correctness property defined in the design must have a corresponding required task. Property tests catch bugs that unit tests miss — they are not nice-to-haves.

### MANDATORY: Requirement Reference Completeness

Every task must reference ALL requirement acceptance criteria it covers. Missing references cause traceability gaps. When a task implements behavior from multiple requirements, list ALL of them:

```markdown
_Requirements: 2.1, 2.2, 2.3, 3.5, 5.2, 5.3, 9.1, 9.3, 9.4_
```

Not just the primary ones:
```markdown
_Requirements: 2.1, 9.1_  ← WRONG: missing 2.2, 2.3, 3.5, 5.2, 5.3, 9.3, 9.4
```

### MANDATORY: Use Actual Component API Names

When requirements reference sub-component props (e.g., Checkbox, Avatar, Button), use the ACTUAL prop names from the component's TypeScript interface — not the Figma property names. Always check the component source:

```bash
grep -A 20 'interface.*Props' packages/atoms/src/components/Checkbox/index.tsx
```

Example:
- Figma says: `variant="Standard"`, `size="Medium"`, `style="Box"`
- Actual API: `tarmacVariant="Standard"`, `size="md"`, `tarmacStyle="box"`
- Requirements MUST use the actual API names

### MANDATORY: Process Requirements in Tasks

Requirements about developer process (e.g., "fetch each Figma variant node", "build a token mapping table", "verify each state variant individually") must be included as explicit bullet points in the relevant task — not just referenced by number. These process steps are easy to skip if they're only a requirement number.

### Spec Consistency Checklist

Before finalizing any spec, verify:
- [ ] All prop names match across requirements ↔ design ↔ tasks
- [ ] All function names match across requirements ↔ design ↔ tasks
- [ ] All type/export names match across requirements ↔ design ↔ tasks
- [ ] All theme JSON sub-sections match across requirements ↔ design ↔ tasks
- [ ] Line limits are consistent across all documents
- [ ] No optional tasks — all property tests are required
- [ ] Every requirement criterion is referenced by at least one task
- [ ] Process requirements (Figma fetching, token verification) are explicit task bullet points
- [ ] CSS pseudo-selectors are accurate for the element type (`:disabled` only for native form elements)
- [ ] Keyboard navigation keys are consistent between behavioral requirements and correctness properties


## Sub-Component Reuse Rule — Mandatory Pre-Implementation Verification

### Problem This Solves
During the SearchDropdown migration, multiple iterations were needed because:
- Chip was used instead of Pill for tags (wrong component entirely)
- Checkbox onChange handler was wrong (didn't match the Tarmac Checkbox API)
- Button size was wrong (sm instead of md for footer CTAs)
- Tag icons were wrong (cross instead of add-circle-outline)
- Placeholder text was wrong ("Search" instead of "..")
- Internal state management was missing (checkbox didn't toggle)

All of these could have been caught by checking the Figma node structure BEFORE writing code.

### Mandatory Steps for Composite Components

When a Figma component contains instances of OTHER components (Tags, Checkbox, Button, Icon Container, etc.), you MUST:

#### Step 1: Identify Every Sub-Component Instance
From `get_design_context` output, find ALL `<instance>` or named sub-components. For each one, record:
- Figma component name (e.g., `Tags/Blue/Subtle/Default/Medium`, `Checkbox`, `Button`)
- Exact prop values shown in Figma (e.g., `leadingIcon={false}`, `trailingIcon={true}`)
- Size/variant/style values (e.g., `size="Medium"`, `variant="Standard"`, `style="Box"`)

#### Step 2: Map to Existing Tarmac Components
For each sub-component instance, find the matching Tarmac component in the codebase:
```
Figma: Tags/Blue/Subtle/Default/Medium → Tarmac: Pill (pillVariant="blue", pillType="subtle", size="md")
Figma: Checkbox (Standard/Box/Medium) → Tarmac: Checkbox (tarmacVariant="standard", tarmacStyle="box", size="md")
Figma: Button (tertiary/black) → Tarmac: Button (buttonStyle="tertiary", variant="black")
```

Read the actual component file (`index.tsx`) to verify:
- What props activate the Tarmac rendering path
- What the prop names and values are (they may differ from Figma names)
- How onChange/onClick handlers work (event signature)

#### Step 3: Check How Similar Components Use the Same Sub-Components
Search the codebase for existing usage patterns:
```bash
grep -r "tarmacVariant" packages/atoms/src/components/*/index.tsx
grep -r "pillVariant" packages/atoms/src/components/*/index.tsx
grep -r "buttonStyle" packages/atoms/src/components/*/index.tsx
```
Copy the EXACT same pattern — don't reinvent.

#### Step 4: Verify State Management
If the sub-component needs to toggle state (like Checkbox checked/unchecked):
- Check how the parent Dropdown component manages `selectedValues` state
- Copy the same internal state + useEffect sync pattern
- Never rely solely on external `value` prop for visual state

### Sub-Component Size Rule
Sub-component sizes are FIXED in Figma — they do NOT scale with the parent component size. For example:
- `Tags/Blue/Subtle/Default/Medium` is ALWAYS `size="md"` regardless of whether the search field is Large, Default, or Small
- Verify this by fetching the same sub-component instance across different parent sizes

### Icon Verification
For every icon in Figma, check the `data-name` attribute in the `get_design_context` output:
- `search` → magnifying glass icon
- `highlight-off` → circle with X (⊗)
- `add-circle-outline` → circle with plus (⊕)
- `close` → plain X

Never guess which icon to use. The Figma node name tells you exactly.

### Placeholder Text Verification
Always check the actual text content in the Figma node. Common mistakes:
- Figma shows `".."` but code uses `"Search..."`
- Figma shows `"Search"` but code uses `"Select an option"`
- Figma shows `"Text here"` (placeholder content) but code uses something else

Read the `<p>` or `<text>` node content from `get_design_context` output.


## Compound Component Pattern — Composition, Accessibility & Reuse (DropdownV1 Reference)

This section codifies the compound component architecture established by DropdownV1. Use it as the canonical reference when building any new composite Tarmac atom that has multiple sub-parts (e.g., dropdowns, comboboxes, date pickers, multi-select fields, form groups).

### Architecture Overview

A compound component is a set of related sub-components that share implicit state via React Context. The parent "Container" owns the context; children consume it. The consumer composes only the pieces they need — no monolithic prop bag.

```
DropdownV1 (compound export via Object.assign)
├── Container     — context provider, theme reader, ghost skeleton
├── Title         — label + mandatory marker + helper text + icon
├── InputGroup    — flex row wrapper with focus-within ring + addon border adjustments
├── Addon         — left/right addon (text | button | icon | dropdown)
├── Trigger       — the clickable area that opens the menu + keyboard nav
└── (DropdownV1List — separate compound for menu items)
    ├── Cell          — row container, injects props to children via cloneElement
    ├── Checkbox      — Tarmac Checkbox sub-component
    ├── Avatar        — Tarmac Avatar sub-component
    ├── Content       — label + optional subtext
    ├── LeadingIcon   — icon slot before content
    ├── TrailingIcon  — icon slot after content
    ├── Pills         — Tarmac Pill sub-component
    └── GroupName     — section header for grouped lists
```

### How to Structure a New Compound Component

#### Step 1: Context Provider (Container)

The root component creates a React Context that holds shared state (size, disabled, ghost, theme config, style params). Every child reads from this context — no prop drilling.

```tsx
interface MyComponentContextValue {
  size: string
  isDisabled: boolean
  isGhost: boolean
  config: MyComponentConfig
  sp: MyComponentStyleParams
}

const MyComponentCtx = createContext<MyComponentContextValue>(/* defaults */)

const Container: React.FC<ContainerProps> = ({ size, isDisabled, isGhost, children }) => {
  const { theme } = useTheme()
  const config = theme.components?.myComponent_tarmac || {}
  const sp = { config, size, isDisabled, isGhost }
  const ctx = useMemo(() => ({ size, isDisabled, isGhost, config, sp }), [size, isDisabled, isGhost, config])

  if (isGhost) return <GhostSkeleton sp={sp} />

  return (
    <MyComponentCtx.Provider value={ctx}>
      <div className={buildContainerStyles(sp)}>{children}</div>
    </MyComponentCtx.Provider>
  )
}
```

Key rules:
- `useMemo` the context value to prevent unnecessary re-renders
- Ghost state renders a skeleton layout directly — no Provider, no children
- Theme config is read once in the Container, not in every child
- The context shape includes the raw `config` AND the pre-built `sp` (style params) so children can call style builders directly

#### Step 2: Child Sub-Components Consume Context

Each child calls `useContext(MyComponentCtx)` to get shared state. No props needed for size/disabled/ghost — they come from context.

```tsx
const Title: React.FC<TitleProps> = ({ title, mandatory, helperText }) => {
  const { sp } = useContext(MyComponentCtx)
  const styles = buildTitleStyles(sp)
  return (
    <div className={styles.container}>
      <label className={styles.label}>{title}</label>
      {mandatory && <span className={styles.mandatory}>*</span>}
      {helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  )
}
```

#### Step 3: Injected Props Pattern (Cell → Sub-Components)

For list items where a parent Cell needs to pass state (isSelected, isDisabled, style config) to its children without the consumer knowing, use `React.cloneElement` to inject private `_`-prefixed props:

```tsx
interface CellInjectedProps {
  _cellStyle?: string
  _isSelected?: boolean
  _isDisabled?: boolean
  _styleConfig?: StyleConfig
  _sizeConfig?: SizeConfig
  _onToggle?: () => void
}

const Cell: React.FC<CellProps> = ({ isSelected, isDisabled, onClick, children }) => {
  const injected: CellInjectedProps = { _isSelected: isSelected, _isDisabled: isDisabled, _onToggle: onClick }
  return (
    <div role="option" aria-selected={isSelected} aria-disabled={isDisabled} onClick={onClick}>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<CellInjectedProps>, injected)
          : child
      )}
    </div>
  )
}
```

Rules:
- Prefix injected props with `_` to signal they are internal (not part of the public API)
- The consumer never passes `_isSelected` — the parent Cell or Dropdown Trigger injects it
- Sub-components like `Checkbox`, `Content`, `LeadingIcon` read `_isDisabled` to adjust their styling
- The `_onToggle` callback lets Checkbox trigger the Cell's click handler without the consumer wiring it

#### Step 4: Compound Export via Object.assign

```tsx
const MyComponent = Object.assign(Container, {
  Container,
  Title,
  InputGroup,
  Addon,
  Trigger,
})
export default MyComponent
```

This enables both `<MyComponent>` (which is the Container) and `<MyComponent.Title>`, `<MyComponent.Trigger>`, etc.

When the component has a separate list/menu sub-component tree, export it as a second compound:

```tsx
const MyComponentList = Object.assign(Cell, {
  Cell,
  Checkbox: CellCheckbox,
  Avatar: CellAvatar,
  Content: CellContent,
  LeadingIcon,
  TrailingIcon,
  Pills: CellPills,
  GroupName,
})
export default MyComponentList
```

### Consumer Usage Pattern

The consumer composes only what they need:

```tsx
// Minimal — just trigger + options
<DropdownV1 size="large">
  <DropdownV1.Title title="Country" mandatory />
  <DropdownV1.InputGroup>
    <DropdownV1.Trigger placeholder="Select country" onSelect={handleSelect}>
      <DropdownV1List.Cell value="us">
        <DropdownV1List.Content label="United States" />
      </DropdownV1List.Cell>
    </DropdownV1.Trigger>
  </DropdownV1.InputGroup>
</DropdownV1>

// Full — addons + search + multi-select + grouped + footer
<DropdownV1 size="large">
  <DropdownV1.Title title="Assign to" mandatory helperText="Required" />
  <DropdownV1.InputGroup>
    <DropdownV1.Addon pos="left" as="icon"><FlagIcon /></DropdownV1.Addon>
    <DropdownV1.Trigger
      placeholder="Search people"
      selectionMode="multi"
      searchable
      showFooter
      footerActions={<Button buttonStyle="tertiary" text="Clear All" />}
    >
      <DropdownV1List.GroupName>Team A</DropdownV1List.GroupName>
      <DropdownV1List.Cell value="alice">
        <DropdownV1List.Checkbox />
        <DropdownV1List.Avatar src="/alice.jpg" />
        <DropdownV1List.Content label="Alice" subtext="Engineering" />
        <DropdownV1List.Pills label="Lead" />
      </DropdownV1List.Cell>
    </DropdownV1.Trigger>
    <DropdownV1.Addon pos="right" as="button" onClick={handleClear}>✕</DropdownV1.Addon>
  </DropdownV1.InputGroup>
</DropdownV1>
```

### Accessibility Requirements for Compound Components

#### ARIA Roles & Attributes

| Element | Role | Required Attributes |
|---------|------|-------------------|
| Trigger (main clickable area) | `combobox` | `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls` (points to listbox id when open), `aria-activedescendant` (points to focused option id) |
| Menu/List panel | `listbox` | `id` (matches `aria-controls`) |
| Each Cell/Option | `option` | `aria-selected`, `aria-disabled` (when disabled), `id` (for `aria-activedescendant`) |
| Addon (dropdown mode) | `combobox` | Same as Trigger — `aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-label` |
| Title label | native `<label>` | `htmlFor` pointing to trigger `id` |
| Mandatory marker | `<span>` | `aria-hidden="true"` (decorative, screen readers get info from `required` or label text) |

#### Keyboard Navigation

Every compound component with a dropdown/menu MUST implement this keyboard contract:

| Key | Closed State | Open State |
|-----|-------------|-----------|
| `Enter` / `Space` | Open menu, focus first enabled item | Select focused item (single: close menu; multi: toggle + keep open) |
| `Escape` | — | Close menu, return focus to trigger |
| `ArrowDown` | Open menu, focus first enabled item | Move focus to next enabled item |
| `ArrowUp` | Open menu, focus last enabled item | Move focus to previous enabled item |
| `Home` | — | Move focus to first enabled item |
| `End` | — | Move focus to last enabled item |
| `Tab` | Normal tab behavior | Close menu, move focus to next focusable element |
| Printable character | — | Type-ahead: jump to first matching option (accumulates chars within 500ms timeout) |

Implementation pattern:
```tsx
const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
  if (isDisabled || isGhost) return
  switch (e.key) {
    case 'Enter': case ' ':
      e.preventDefault()
      if (isOpen && focusedIndex >= 0) selectFocusedItem()
      else toggle()
      break
    case 'Escape':
      e.preventDefault()
      setIsOpen(false)
      triggerRef.current?.focus()
      break
    case 'ArrowDown':
      e.preventDefault()
      if (!isOpen) { setIsOpen(true); focusFirst() }
      else focusNext()
      break
    case 'ArrowUp':
      e.preventDefault()
      if (!isOpen) { setIsOpen(true); focusLast() }
      else focusPrev()
      break
    case 'Home': if (isOpen) { e.preventDefault(); focusFirst() } break
    case 'End': if (isOpen) { e.preventDefault(); focusLast() } break
    case 'Tab': if (isOpen) { setIsOpen(false) } break
    default: // type-ahead for printable chars
  }
}, [/* deps */])
```

#### Focus Management Rules

1. The trigger element MUST have `tabIndex={isDisabled ? -1 : 0}` — disabled elements are not focusable
2. When the menu opens, focus stays on the trigger (not the menu). Use `aria-activedescendant` to indicate the visually focused option
3. When the menu closes (Escape, Tab, single-select pick), focus MUST return to the trigger via `triggerRef.current?.focus()`
4. Keyboard-focused items use `data-kb-focused` attribute + CSS selector `&[data-kb-focused]` for visual highlight — NOT actual DOM focus
5. Mouse hover syncs with keyboard focus via `onMouseEnter` → `setFocusedIndex`
6. Scroll focused option into view: `optionEl.scrollIntoView({ block: 'nearest' })`
7. When searchable, the search input gets actual DOM focus. Arrow/Escape/Enter keys bubble from search input to the trigger's `handleKeyDown` via explicit forwarding:
   ```tsx
   onKeyDown={(e) => {
     if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Escape'].includes(e.key)) {
       handleKeyDown(e) // forward to trigger's handler
       return
     }
     e.stopPropagation() // typing stays in search
   }}
   ```

#### Disabled Item Navigation

The `findNextEnabled` helper skips disabled items during keyboard navigation:
```tsx
const findNextEnabled = useCallback((from: number, direction: 1 | -1): number => {
  let idx = from
  while (idx >= 0 && idx < cellChildren.length) {
    if (!cellChildren[idx].disabled) return idx
    idx += direction
  }
  return -1
}, [cellChildren])
```

This ensures ArrowDown/ArrowUp never land on a disabled option.

#### Outside Click Dismissal

Every dropdown MUST close when clicking outside:
```tsx
useEffect(() => {
  if (!isOpen) return
  const handler = (e: MouseEvent) => {
    if (triggerRef.current?.contains(e.target as Node)) return
    if (menuRef.current?.contains(e.target as Node)) return
    setIsOpen(false)
  }
  document.addEventListener('mousedown', handler)
  return () => document.removeEventListener('mousedown', handler)
}, [isOpen])
```

Use `mousedown` (not `click`) to dismiss before the click completes — prevents the menu from briefly reopening.

#### Multi-Select Accessibility

When `selectionMode="multi"`:
- Menu stays open after selection (unlike single-select which closes)
- Each Cell gets a Checkbox sub-component that visually indicates selection
- `aria-selected` on each option reflects the current selection state
- The Checkbox `onChange` calls `_onToggle` (injected by Cell) which calls `handleMultiToggle` on the Trigger
- Controlled mode: pass `selectedValues` array; uncontrolled: internal `Set` state

### Reusing Existing Tarmac Components Inside Compound Components

#### Current Tarmac-Ready Atoms (check before every build)
```bash
ls apps/storybook/src/stories/atoms/*Tarmac* | sed 's/.*\///' | sed 's/Tarmac.stories.tsx//'
```

#### Reuse Rules

1. When a Figma design shows an instance of another TDS component (Checkbox, Avatar, Button, Pill, Badge, etc.), ALWAYS use the actual Tarmac atom — never recreate with raw HTML
2. Match the Figma sub-component props exactly:
   - Figma `Checkbox (Standard/Box/Medium)` → `<Checkbox tarmacVariant="standard" tarmacStyle="box" size="md" />`
   - Figma `Avatar (Image/Small/Round)` → `<AvatarComponent avatarType="image" size="sm" shape="round" />`
   - Figma `Tags/Blue/Subtle/Default/Medium` → `<Pill pillVariant="blue" pillType="subtle" size="md" />`
   - Figma `Button (Tertiary/Black)` → `<Button buttonStyle="tertiary" variant="black" />`
3. Read the actual component's `index.tsx` to verify prop names — Figma property names often differ from React prop names
4. Sub-component sizes are FIXED in Figma — they do NOT scale with the parent component size. Verify by fetching the same sub-component across different parent sizes
5. If a needed sub-component is NOT Tarmac-ready, use raw HTML + Emotion CSS from the style builder and add a TODO:
   ```tsx
   {/* TODO: Replace with <Input> once Input is migrated to Tarmac TDS */}
   <input className={searchFieldStyles} />
   ```

#### How DropdownV1 Reuses Existing Atoms

| Sub-Component | Tarmac Atom Used | Props Pattern |
|--------------|-----------------|---------------|
| CellCheckbox | `Checkbox` | `tarmacVariant={cellStyle === 'infoBlue' ? 'blue' : 'standard'} tarmacStyle="box" size="md"` |
| CellAvatar | `AvatarComponent` | `avatarType={src ? 'image' : 'initials'} size="sm" shape="round"` |
| CellPills | `Pill` | `pillVariant={variant || (cellStyle === 'infoBlue' ? 'blue' : 'black')} pillType="solid" size="sm"` |
| Search field | `Input` (Tarmac) | `inputStyle="tarmac-01" inputType="regular" inputSize="sm" styleVariant="standard"` |
| Footer CTAs | `Button` (Tarmac) | Consumer passes via `footerActions` prop — e.g., `<Button buttonStyle="tertiary" variant="black" text="Clear" />` |

#### Event Handler Wiring for Reused Components

When reusing a Tarmac atom inside a compound component, the event handler signature must match the atom's actual API. Common mistakes:

- `Checkbox.onChange` receives a React `ChangeEvent`, not a boolean. The DropdownV1 pattern wraps it:
  ```tsx
  <Checkbox onChange={() => { if (_onToggle) _onToggle() }} />
  ```
- `Checkbox` click events need `e.stopPropagation()` on the wrapper `<span>` to prevent the Cell's `onClick` from double-firing
- `Input.onChange` receives a standard `ChangeEvent<HTMLInputElement>` — read `e.target.value`

#### Theme Config Separation

Each compound component reads from its own theme key. The Container (DropdownV1) reads `dropdownV1_tarmac` while the List (DropdownV1List) reads `dropdown_tarmac`. This separation allows independent theming of the trigger area vs the menu items.

When building a new compound component:
- Use `myComponent_tarmac` for the main container/trigger theme config
- Use `myComponent_list_tarmac` (or similar) for the menu/list theme config if the list has its own visual identity
- Never share a single theme key between structurally different parts — it makes per-section token overrides impossible

### Checklist for New Compound Components

- [ ] Root Container creates a React Context with `useMemo`-ed value
- [ ] Ghost state renders skeleton directly in Container — no Provider, no children
- [ ] All children use `useContext` — no prop drilling for size/disabled/ghost
- [ ] List Cell uses `React.cloneElement` with `_`-prefixed injected props
- [ ] Compound export uses `Object.assign(Container, { SubComponent1, SubComponent2, ... })`
- [ ] Trigger has `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`, `aria-activedescendant`
- [ ] Menu has `role="listbox"` with matching `id`
- [ ] Each option has `role="option"`, `aria-selected`, `aria-disabled`, unique `id`
- [ ] Full keyboard navigation: Enter/Space, Escape, ArrowDown/Up, Home/End, Tab, type-ahead
- [ ] `tabIndex={isDisabled ? -1 : 0}` on trigger
- [ ] Focus returns to trigger on Escape/Tab/single-select
- [ ] `data-kb-focused` attribute for visual keyboard focus (not DOM focus)
- [ ] Mouse hover syncs with keyboard focus index
- [ ] Focused option scrolls into view
- [ ] Outside click closes menu (via `mousedown` listener)
- [ ] Disabled items are skipped during keyboard navigation
- [ ] Searchable mode: search input gets DOM focus, arrow/escape keys forwarded to trigger handler
- [ ] All reused sub-components are Tarmac-ready atoms (not raw HTML)
- [ ] Sub-component event handlers match the atom's actual API (verify from source)
- [ ] `e.stopPropagation()` on interactive sub-components (Checkbox) to prevent double-fire
- [ ] Separate theme config keys for container vs list sections
- [ ] `data-testid` attributes on all structural elements for testing and ShowcaseWrapper targeting
- [ ] Storybook Meta uses `Meta<ComponentProps>` not `Meta<typeof Component>` (Object.assign breaks type inference)

### MANDATORY: Test Cases for New Components

Every new component MUST include a test file alongside the component files. The test file lives at `packages/atoms/src/components/<ComponentName>/__tests__/<ComponentName>.test.tsx`.

#### File Structure with Tests
```
ComponentName/
├── index.tsx
├── useComponentStyles.ts
└── __tests__/
    └── ComponentName.test.tsx
```

#### Test Setup
```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../ThemeProvider';
import Component from '../index';

const renderWithTheme = (ui: React.ReactElement) =>
  render(
    <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
      {ui}
    </ThemeProvider>
  );
```

#### Required Test Categories

1. **Rendering & Props** — verify the component renders with default props, and each prop combination produces the expected output:
   - Renders without crashing with default props
   - Renders correct content/children
   - Applies correct `data-testid` attributes
   - Each variant renders without errors
   - Each size renders without errors
   - Each style renders without errors
   - Optional props (icons, labels, sub-components) render when provided

2. **Functionality & Behavior** — verify interactive behavior works correctly:
   - `onClick` / `onChange` / `onToggle` callbacks fire with correct arguments
   - Controlled vs uncontrolled state works as expected
   - Toggle/open/close behavior works (for dropdowns, modals, collapsibles)
   - Selection logic (single-select closes menu, multi-select keeps it open)
   - Search/filter functionality filters options correctly
   - Keyboard navigation (Enter, Escape, ArrowDown, ArrowUp, Tab) triggers correct actions
   - Focus management (focus returns to trigger on close, disabled elements are not focusable)
   - Outside click dismissal works
   - Disabled state prevents all interactions (`onClick` does not fire, `tabIndex` is `-1`)
   - Ghost/skeleton state renders the skeleton layout, not the interactive component
   - Loading state shows loader and disables interaction

3. **Theme Integration** — verify the component reads from theme and does NOT use hardcoded styles:
   - Component renders correctly inside `<ThemeProvider>`
   - Component falls back to `defaultThemeConfig` when no theme is provided (render without `ThemeProvider`)
   - Variant-specific theme tokens are applied (spot-check a known variant's background/text color from theme JSON)
   - No hardcoded color values (`#xxx`, `rgb(...)`, `rgba(...)`) exist in the component source — all colors come from `theme.components.yourComponent`
   - No hardcoded spacing/padding/margin values — all dimensions come from theme config or `dim()` helper
   - No hardcoded font sizes or font families — all typography comes from theme config

#### Example Test Structure
```tsx
describe('ComponentName', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      renderWithTheme(<Component />);
      expect(screen.getByTestId('component-root')).toBeInTheDocument();
    });

    it('renders all variants without errors', () => {
      const variants = ['black', 'white', 'info', 'success', 'error', 'warning'];
      variants.forEach((variant) => {
        const { unmount } = renderWithTheme(<Component variant={variant} />);
        expect(screen.getByTestId('component-root')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Functionality & Behavior', () => {
    it('calls onClick when clicked', async () => {
      const onClick = jest.fn();
      renderWithTheme(<Component onClick={onClick} />);
      await userEvent.click(screen.getByTestId('component-root'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const onClick = jest.fn();
      renderWithTheme(<Component onClick={onClick} isDisabled />);
      await userEvent.click(screen.getByTestId('component-root'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('handles keyboard interaction', async () => {
      const onAction = jest.fn();
      renderWithTheme(<Component onAction={onAction} />);
      const el = screen.getByTestId('component-root');
      el.focus();
      await userEvent.keyboard('{Enter}');
      expect(onAction).toHaveBeenCalled();
    });
  });

  describe('Theme Integration', () => {
    it('renders with ThemeProvider', () => {
      renderWithTheme(<Component variant="info" />);
      expect(screen.getByTestId('component-root')).toBeInTheDocument();
    });

    it('renders with default config when no ThemeProvider', () => {
      render(<Component variant="black" />);
      expect(screen.getByTestId('component-root')).toBeInTheDocument();
    });
  });
});
```

#### Rules
- Every new component PR must include tests — no exceptions
- Tests must use `renderWithTheme` helper to wrap components in `ThemeProvider`
- Use `data-testid` attributes for querying elements — never query by class name or Emotion-generated selectors
- Test real user interactions via `@testing-library/user-event` — not synthetic `fireEvent` for clicks and typing
- Never assert on Emotion class names or inline style strings — assert on visible behavior, rendered content, and callback invocations
- For compound components, test each sub-component in isolation AND the composed behavior together

### MANDATORY: Use Theme Tokens — No Hardcoded Styles

All visual properties MUST come from the theme config. This is non-negotiable.

#### What Counts as Hardcoded (FORBIDDEN)
```tsx
// ❌ Hardcoded colors
backgroundColor: '#333333',
color: 'rgb(255, 0, 0)',
borderColor: 'red',

// ❌ Hardcoded spacing
padding: '12px',
gap: '8px',
margin: '16px 24px',

// ❌ Hardcoded typography
fontSize: '14px',
fontFamily: 'Inter, sans-serif',
fontWeight: 500,

// ❌ Hardcoded radii
borderRadius: '4px',
```

#### What to Use Instead (REQUIRED)
```tsx
// ✅ From theme config
backgroundColor: vc.backgroundColor,        // resolved from {{Surface/BG_Blue/Default}}
color: vc.textColor,                         // resolved from {{Text/Info_Blue/Primary}}
borderColor: vc.borderColor,                 // resolved from {{Border/Info/Primary}}

// ✅ From size config via dim() helper
fontSize: dim(sc.fontSize, '14px'),          // fallback only used if theme value is missing
padding: dim(sc.padding),                    // resolved from {{Spacing/12}}
gap: dim(sc.gap),                            // resolved from {{Spacing/8}}
borderRadius: dim(base.borderRadius, '4px'), // resolved from {{Radius/Default}}

// ✅ From base config
fontFamily: base.fontFamily,                 // resolved from {{Font_Family/body}}, sans-serif
```

#### Allowed Exceptions
- `0` / `0px` — zero values don't need tokens
- `none`, `transparent`, `inherit`, `currentColor` — CSS keywords are fine
- `100%`, `auto`, `fit-content` — layout keywords are fine
- `1px` for border width — only when the theme doesn't define a border width token
- Fallback values in `dim()` second argument — these are safety nets when theme is missing, not the primary source

#### Enforcement
- During code review, grep the style builder for any raw hex/rgb/px values that aren't inside a `dim()` fallback
- The test suite should verify the component renders correctly with ThemeProvider (tokens resolve) and without (falls back to `defaultThemeConfig`)
- If you find yourself writing a hardcoded value, add it to the theme JSON instead and reference it via the config object


## MANDATORY: Verify Component Props via MCP Before Using in Stories

When writing or updating Storybook stories that use any Tarmac TDS component, you **MUST** verify the component's props via the Tarmac MCP tool before using them. Do NOT guess or assume prop names from memory or other files.

### Rule
Before using any component in a story file, call:
```
mcp_tarmac_mcp_getComponentsProps(["ComponentName"])
```
This returns the correct prop names, types, required status, defaults, and code examples.

### Why This Is Mandatory
Prop names in the Tarmac TDS do not always follow intuitive naming conventions. Common mistakes this prevents:
- Using `primaryText` instead of the correct `message` prop on Snackbar
- Using `showLeadingIcon` (boolean) instead of passing `leadingIcon` (ReactNode) directly
- Using `closable` instead of the current `trailingIcon` prop
- Passing props that don't exist on the component, causing silent failures or TypeScript errors

### Workflow
1. Identify all Tarmac TDS components used in the story (e.g., `Button`, `Badge`, `Snackbar`, `Chip`)
2. Call `mcp_tarmac_mcp_getComponentsProps` with all component names
3. Cross-reference the returned props against your story code
4. Fix any mismatched, deprecated, or non-existent props before committing

### Applies To
- New story files
- Updates to existing story files
- Any file that imports and renders Tarmac TDS components (`@delhivery/tarmac`)

**Rule: If you cannot confirm a prop exists via MCP, do NOT use it in the story.**
