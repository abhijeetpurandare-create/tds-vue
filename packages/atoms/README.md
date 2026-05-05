# Orca18 Atoms Package

This package contains the fundamental UI building blocks (atoms) for the Orca18 design system, built on React 18. These components are designed to be simple, reusable, and customizable to suit the needs of the Delhivery design ecosystem.

## Repository Structure

The `Orca18/packages/atoms` package is organized as follows:

```
Orca18/packages/atoms/
├── dist/               # Built output files
├── src/                # Source code
│   ├── components/     # UI components
│   │   ├── Avatar/     
│   │   ├── BottomSheet/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Dropdown/
│   │   ├── FloatingButton/
│   │   ├── Icon/
│   │   ├── Modal/
│   │   ├── OrcaButton/
│   │   ├── Pill/
│   │   ├── Spinner/
│   │   ├── Switch/
│   │   ├── ThemeProvider/
│   │   └── navbar/
│   ├── config/         # Configuration files
│   ├── docs/           # Documentation
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── index.ts        # Main entry point
│   ├── index.css       # Global styles
│   ├── tailwind.js     # Tailwind configuration
│   └── variables.ts    # Theme variables and constants
├── public/             # Static assets
├── node_modules/       # Dependencies
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite build configuration
├── jest.config.mjs     # Test configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

This package is part of a larger monorepo structure:

```
Orca18/
├── apps/
│   └── storybook/      # Storybook for component documentation
├── packages/
│   ├── atoms/          # Atomic UI components (this package)
│   └── molecules/      # Composite components built from atoms
```

Each component directory typically follows this pattern:

```
ComponentName/
├── index.ts               # Exports the component
├── ComponentName.tsx      # Main component implementation
├── ComponentName.test.tsx # Component tests
└── types.ts               # Component-specific type definitions (optional)
```

## Available Components

The following atom components are available in this package:

*   **OrcaAvatar** - Avatar/profile picture component
*   **BottomSheet** - Mobile-friendly slide-up panel
*   **Button** - Standard button component
*   **OrcaButton** - Extended button component with Orca-specific styling
*   **OrcaCard** - Card container component
*   **Dropdown** - Select/dropdown component
*   **OrcaFloatingButton** - Floating action button component
*   **OrcaIcon** - Icon component with various icon options
*   **OrcaModal** - Dialog/modal window component
*   **OrcaNavbar** - Navigation bar component
*   **OrcaPill** - Badge/pill component for statuses and tags
*   **Spinner** - Loading indicator component
*   **Switch** - Toggle switch component
*   **ThemeProvider** - Context provider for theming support

## Installation

```bash
# If using npm
npm install @delhivery/tarmac

# If using yarn
yarn add @delhivery/tarmac

# If using pnpm
pnpm add @delhivery/tarmac
```

## Font Requirement

This design system uses Noto Sans as its primary typeface. The package declares the font via CSS but does not bundle the font files — your application must load it.

Add this to your app's `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

Or via CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap');
```

Without this, components will fall back to the system sans-serif font and won't match the Tarmac TDS designs.

## Basic Usage

```jsx
import { Button, OrcaPill, ThemeProvider } from '@delhivery/tarmac';
import '@delhivery/tarmac/dist/style.css'; // Import the styles

function App() {
  return (
    <ThemeProvider>
      <div>
        <Button variant="primary">Click Me</Button>
        <Pill text="Status" variant="success" />
      </div>
    </ThemeProvider>
  );
}
```

## Development

### Creating New Atoms

1. Create a new directory for your component under `src/components/`
2. Create the following files:
   - `index.ts` - Export your component
   - `ComponentName.tsx` - Main component implementation
   - (Optional) `ComponentName.test.tsx` - Tests for your component
3. Implement your React component logic
4. Export your component from the package's `src/index.ts`
5. Add Storybook stories in `apps/storybook` for documentation and development

Example component structure:
```
src/
  components/
    NewComponent/
      index.ts
      NewComponent.tsx
      NewComponent.test.tsx
```

### Running Locally

*   **Interactive Development (Recommended):** Use Storybook for component development with hot reloading:
    ```bash
    # From the monorepo root or storybook directory
    pnpm run storybook
    ```

*   **Development Server:** Run a standalone Vite development server:
    ```bash
    pnpm run dev:server
    ```

*   **Watch Mode:** For continuous building during development:
    ```bash
    pnpm run dev
    ```

### Building

To create a production-ready build:

```bash
# Build the CSS first, then build the package
pnpm run build

# This runs both the CSS build and package build
```

The output will be in the `dist/` directory, which includes:
- JavaScript modules (ESM format)
- TypeScript declaration files
- CSS styles

### Testing

```bash
# Run tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Generate test coverage report
pnpm run coverage
```

### Deployment

This package is published to GitHub Packages. To publish a new version:

1. Ensure all changes are committed and pushed
2. Update the version in `package.json` according to semantic versioning
3. Build the package: `pnpm run build`
4. Make sure you're authenticated with GitHub Packages:
   ```bash
   npm login --registry=https://npm.pkg.github.com
   ```
5. Publish the package:
   ```bash
   pnpm publish
   ```

## Utility Exports

In addition to components, this package exports utility functions:

* `createDynamicStyles`, `combineCss` - Emotion CSS utilities
* `useThemedStyles`, `getVariantColors`, `convertThemeVars` - Theme utilities
* `useComponentConfig`, `useDynamicColors`, `getTailwindClasses`, `combineStyles` - Component styling utilities
* `useTheme` - Theme hook 