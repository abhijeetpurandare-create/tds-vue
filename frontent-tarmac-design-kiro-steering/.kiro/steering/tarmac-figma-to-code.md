---
inclusion: always
---

# Figma to Code — Tarmac TDS Workflow

## Core Principles

- Use TypeScript with strict types.
- Use Tailwind CSS with `tds-` prefixed Tarmac tokens for all styling.
- Use functional React components only.
- **Tarmac-first**: if a Tarmac atom exists in `@delhivery/tarmac`, use it directly. For custom elements, use `tds-` Tailwind classes.
- Use the Storybook MCP (tarmac-props) to check available Tarmac components and their props before building custom elements.
- Use the Figma MCP to get design context, variable definitions, and token names from Figma design links.

## MCP Workflow — Figma Link to Code

When given a Figma design link, follow this exact sequence:

### Step 1 — Get the design from Figma
Extract fileKey and nodeId from the URL (e.g., figma.com/design/:fileKey/:fileName?node-id=1-2).
Call `mcp_figma_official_get_design_context(fileKey, nodeId)` to get the layout, colors, typography, and component structure.

### Step 2 — Check what Tarmac atoms are available
Call `mcp_tarmac_props_getComponentList()` to get the full list of Tarmac TDS components.
Look for matches between the Figma design elements and the "Tarmac TDS/" components in the list.

### Step 3 — Get props for matching atoms
For each Figma element that matches a Tarmac atom, call `mcp_tarmac_props_getComponentsProps(["Tarmac TDS/ComponentName"])` to get the exact props, types, defaults, and code examples.

### Step 4 — Build the code
- For elements that match Tarmac atoms: use the atom with props from Step 3
- For elements that don't match any atom: build with `tds-` Tailwind classes
- For Figma token values (colors, spacing): map to the nearest `tds-` class from the token reference below

## Layout & Structure

- Always design **mobile-first**, then scale to desktop using Tailwind breakpoints.
- Maintain **pixel-perfect fidelity** based on Figma measurements.
- Use `flex` or `grid` based on Figma auto-layout settings.
- Respect spacing, padding, and margin exactly as in Figma.

## Styling Rules — Tarmac TDS Tokens

- **Never hardcode colors, spacing, fonts** — always use `tds-` prefixed Tailwind classes from the Tarmac preset.
- The `tds-` classes resolve to the exact same Figma token values that Tarmac atoms use internally.
- Use `className={cn(...)}` for conditional classes.

### Color Token Quick Reference
```
Surfaces:    bg-tds-surface-bg-primary-default, bg-tds-surface-bg-coal-weakest, bg-tds-surface-bg-primary-inverse-default
Text:        text-tds-text-body-primary, text-tds-text-body-secondary, text-tds-text-caption-primary
Borders:     border-tds-border-neutral-primary, border-tds-border-error-primary
Semantic:    bg-tds-surface-bg-error-weakest, text-tds-text-success-primary, border-tds-border-warning-primary
Icons:       text-tds-icon-body-primary, text-tds-icon-error-primary
Alpha:       bg-tds-alpha-black-100, bg-tds-alpha-white-200
Spacing:     p-tds-8, m-tds-12, gap-tds-16
Radius:      rounded-tds-default, rounded-tds-md, rounded-tds-full
Fonts:       font-tds-body, font-tds-heading, font-tds-caption
```

### Opacity Modifiers Work
```html
<div class="bg-tds-surface-bg-blue-default/10">Light blue tint</div>
<span class="text-tds-text-error-primary/50">Semi-transparent error text</span>
```

### Wrong vs Correct
```tsx
// ❌ Wrong
<div className="bg-[#F9F9FB] text-[#3D445C]">

// ✅ Correct
<div className="bg-tds-surface-bg-primary-default text-tds-text-body-primary border-tds-border-neutral-primary">
```

## Component Rules

- Repeated Figma elements = reusable component.
- Component names should match Figma layers using PascalCase.
- Support `className`, `...props`, and `children` for flexibility.
- Add `data-testid` attributes for testability if interactive.

## Asset Management

- **NEVER** use direct Figma asset URLs (they are temporary and will break in production).
- Download assets locally and import from local paths.
- Prefer FontAwesome icons already in deps before downloading custom assets.

## Accessibility

- Use semantic HTML (`<button>`, `<section>`, `<nav>`, etc.).
- All images must include `alt` text.
- Inputs must be labeled correctly for screen readers.

## Responsive Behavior

- All components must be responsive by default.
- Use Tailwind's responsive classes (`sm:`, `md:`, `lg:`, etc.) in a mobile-first approach.
- Avoid fixed pixel widths unless explicitly defined in Figma.
