---
inclusion: always
---
# Tailwind CSS + Tarmac TDS Best Practices

## Core Principles
- **Tarmac tokens only**: use `tds-` prefixed classes for all colors, spacing, radius, and fonts
- **Minimal DOM**: use the fewest divs possible — leverage flexbox, grid, and pseudo-elements
- **Mobile-First**: always start with base styles, then add responsive breakpoints
- **Semantic HTML**: use proper HTML5 elements before adding divs

## Color System — Tarmac TDS Tokens

All colors come from the Tarmac TDS preset (`@delhivery/tarmac/tailwind-preset`), which is auto-generated from the same Figma tokens that Tarmac atoms use. This ensures custom elements and Tarmac components always show the same colors.

### Setup (one-time)
```js
// tailwind.config.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  presets: [require('@delhivery/tarmac/tailwind-preset')],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
}
```

### Available Token Categories

#### Surface / Background Colors
```
bg-tds-surface-bg-primary-default          // White (#ffffff)
bg-tds-surface-bg-coal-weakest          // Light grey section bg (#f9f9fb)
bg-tds-surface-bg-coal-subtle         // Disabled bg (#e0e3eb)
bg-tds-surface-bg-primary-inverse-default             // Black (#000000)
bg-tds-surface-bg-primary-inverse-subtle      // Dark grey (#333333)
bg-tds-surface-bg-coal-weak        // Light coal (#eff1f5)
bg-tds-surface-bg-blue-default     // Blue (#2396fb)
bg-tds-surface-bg-blue-weakest     // Lightest blue tint (#f0f8ff)
bg-tds-surface-bg-legacy-blue-default      // Legacy blue / CTA (#5b80f7)
bg-tds-surface-bg-success-default  // Green (#1ba86e)
bg-tds-surface-bg-success-weakest  // Lightest green tint (#f4fbf8)
bg-tds-surface-bg-error-default    // Red (#dc143c)
bg-tds-surface-bg-error-weakest    // Lightest red tint (#fdf2f4)
bg-tds-surface-bg-warning-default  // Yellow (#f5c828)
bg-tds-surface-bg-warning-weakest  // Lightest yellow tint (#fefaec)
bg-tds-surface-bg-dlv-red-default          // Delhivery red (#ed1b36)
```

#### Text Colors
```
text-tds-text-heading-primary   // Darkest heading (#121212)
text-tds-text-body-primary      // Primary body text (#2b2b2b)
text-tds-text-body-secondary    // Secondary body text (#3b3b3b)
text-tds-text-body-disabled     // Disabled text (#cdcbcb)
text-tds-text-caption-primary   // Caption text (#454545)
text-tds-text-caption-secondary // Light caption (#666666)
text-tds-text-info-blue-primary      // Blue info text (#2396fb)
text-tds-text-success-primary   // Green success text (#1ba86e)
text-tds-text-error-primary     // Red error text (#dc143c)
text-tds-text-warning-primary   // Warning text (#7b6414)
text-tds-text-body-inverse-primary // Light text on dark bg (#e6e6e6)
text-tds-text-heading-inverse-only-white // White text (#ffffff)
```

#### Border Colors
```
border-tds-border-neutral-primary   // Default border (#e6e6e6)
border-tds-border-neutral-secondary // Darker border (#d9d9d9)
border-tds-border-neutral-disabled  // Disabled border (#ededed)
border-tds-border-info-primary              // Blue border (#48a7fc)
border-tds-border-success-primary           // Green border (#41b686)
border-tds-border-error-primary             // Red border (#e23b5d)
border-tds-border-warning-primary           // Yellow border (#f5c828)
```

#### Icon Colors
```
text-tds-icon-body-primary          // Primary icon (#2b2b2b)
text-tds-icon-body-disabled         // Disabled icon (#cdcbcb)
text-tds-icon-info-blue-primary          // Blue icon (#2396fb)
text-tds-icon-success-primary       // Green icon (#1ba86e)
text-tds-icon-error-primary         // Red icon (#dc143c)
text-tds-icon-warning-primary       // Warning icon (#7b6414)
```

#### Alpha / Overlay Colors
```
bg-tds-alpha-black-50   // 5% black overlay
bg-tds-alpha-black-100  // 10% black overlay
bg-tds-alpha-black-200  // 20% black overlay
bg-tds-alpha-black-300  // 40% black overlay
bg-tds-alpha-white-100  // 10% white overlay
bg-tds-alpha-white-200  // 20% white overlay
bg-tds-alpha-white-300  // 40% white overlay
```

#### Spacing (padding, margin, gap)
```
p-tds-4    // 4px
p-tds-8    // 8px
p-tds-12   // 12px
p-tds-16   // 16px
gap-tds-8  // 8px gap
m-tds-24   // 24px margin
```

#### Border Radius
```
rounded-tds-none     // 0px
rounded-tds-sm       // 2px
rounded-tds-default  // 4px
rounded-tds-md       // 8px
rounded-tds-lg       // 12px
rounded-tds-xl       // 16px
rounded-tds-full     // 999px (pill)
```

#### Font Family
```
font-tds-body     // Noto Sans, sans-serif
font-tds-heading  // Noto Sans, sans-serif
font-tds-caption  // Noto Sans, sans-serif
font-tds-display  // Noto Sans, sans-serif
```

### Opacity Modifiers
All hex-based `tds-` colors support Tailwind opacity modifiers:
```html
<div class="bg-tds-surface-bg-blue-default/10">10% blue tint</div>
<div class="bg-tds-surface-bg-primary-inverse-default/90">90% dark overlay</div>
<span class="text-tds-text-error-primary/50">50% error text</span>
```
Note: Alpha tokens (`tds-alpha-*`) already have built-in opacity. Stacking an opacity modifier on them is unusual but technically works.

## Utility Class Ordering
Follow this order for consistency:
1. Display & Position: `flex`, `grid`, `relative`, `absolute`
2. Layout: `w-full`, `h-screen`, `max-w-md`
3. Spacing: `p-tds-8`, `m-tds-4`, `gap-tds-16`
4. Typography: `text-lg`, `font-semibold`, `font-tds-body`
5. Colors: `bg-tds-surface-bg-primary-default`, `text-tds-text-body-primary`, `border-tds-border-neutral-primary`
6. Effects: `shadow-lg`, `rounded-tds-md`, `transition-all`
7. States: `hover:bg-tds-surface-bg-coal-weak`, `focus:ring-2`
8. Responsive: `sm:text-xl`, `md:grid-cols-2`, `lg:p-tds-16`

## Common Patterns

### Card Component
```html
<article class="bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-md p-tds-16 shadow-sm hover:shadow-md transition-shadow">
  <h2 class="text-xl font-semibold text-tds-text-heading-primary mb-tds-4">Title</h2>
  <p class="text-tds-text-body-secondary leading-relaxed">Content</p>
</article>
```

### Button (custom, when Tarmac atom isn't suitable)
```html
<button class="bg-tds-surface-bg-legacy-blue-default text-tds-text-heading-inverse-only-white px-tds-16 py-tds-8 rounded-tds-default font-medium hover:bg-tds-surface-bg-legacy-blue-default/90 focus:ring-2 focus:ring-tds-alpha-black-300 transition-colors">
  Action
</button>
```

### Error State
```html
<div class="bg-tds-surface-bg-error-weakest border border-tds-border-error-primary rounded-tds-default p-tds-12">
  <span class="text-tds-text-error-primary">Something went wrong</span>
</div>
```

### Dark Section
```html
<section class="bg-tds-surface-bg-primary-inverse-default p-tds-24">
  <h1 class="text-tds-text-heading-inverse-only-white">Dark section heading</h1>
  <p class="text-tds-text-body-inverse-primary">Light text on dark background</p>
</section>
```

### Responsive Grid
```html
<section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-tds-8 sm:gap-tds-12 lg:gap-tds-16">
  <!-- Items -->
</section>
```

## Migration from Old Tokens

### Deprecated → New Mapping
| Old (deprecated) | New (Tarmac TDS) |
|---|---|
| `bg-surface-default` | `bg-tds-surface-bg-primary-default` |
| `bg-surface-section` | `bg-tds-surface-bg-coal-weakest` |
| `text-text-primary` | `text-tds-text-body-primary` |
| `text-text-secondary` | `text-tds-text-body-secondary` |
| `text-text-disabled` | `text-tds-text-body-disabled` |
| `border-border-default` | `border-tds-border-neutral-primary` |
| `bg-background-dark` | `bg-tds-surface-bg-primary-inverse-default` |
| `bg-cta-primary` | `bg-tds-surface-bg-legacy-blue-default` |
| `text-context-error` | `text-tds-text-error-primary` |
| `text-context-success` | `text-tds-text-success-primary` |
| `bg-brand-red` | `bg-tds-surface-bg-dlv-red-default` |

**Important**: The old and new tokens resolve to DIFFERENT hex values (the old ones were manually picked, the new ones come from Figma). Visual differences are intentional — the Tarmac tokens are the design team's current source of truth.

## Rules
- **Never** use hardcoded colors like `bg-red-500`, `text-blue-600`, `text-[#3D445C]`
- **Never** use old non-prefixed tokens (`bg-surface-default`) in new code — use `tds-` versions
- **Never** change existing `tds-` token names in the preset — they're auto-generated from Figma
- **Always** use `tds-` tokens for any color, spacing, radius, or font in new code
- **Rule**: never rename/remove existing Tailwind config classes; only add new ones if absolutely required
