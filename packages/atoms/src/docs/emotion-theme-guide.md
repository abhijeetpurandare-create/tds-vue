# Emotion CSS Theming Guide for Orca18

This guide explains how to use Emotion CSS for dynamic, theme-based styling in the Orca18 component library, while still leveraging Tailwind CSS for static styling.

## Core Principles

1. **Use Tailwind for static/layout styling**
   - Use Tailwind classes for component layout, spacing, and static styling
   - Example: `className="flex items-center justify-between"`

2. **Use Emotion CSS for dynamic/theme-based styling**
   - Use Emotion CSS for styles that need to be computed from props or theme values
   - Example: Colors, borders, shadows, and other theme-dependent styles

## Theme Utilities

Orca18 provides several utilities to help you work with themes:

### 1. `useThemedStyles`

A hook that provides access to the theme and a function to create styles based on it:

```tsx
import { useThemedStyles } from '@delhivery/tarmac';

const MyComponent = ({ variant = 'primary', size = 'md' }) => {
  const { createThemedStyles } = useThemedStyles();
  
  // Create dynamic styles based on the current theme
  const buttonStyles = createThemedStyles((theme) => ({
    backgroundColor: theme.colors[variant] || '#5b80f7',
    color: theme.textColors[variant] || 'white',
    padding: theme.spacing[size] || '0.5rem',
    borderRadius: theme.borderRadius.md || '0.375rem',
    '&:hover': {
      backgroundColor: theme.hoverColors[variant] || '#4a6fe6',
    }
  }));
  
  return (
    <button className={`flex items-center justify-center ${buttonStyles}`}>
      Click me
    </button>
  );
};
```

### 2. `getVariantColors`

A utility function to consistently retrieve color variants from the theme:

```tsx
import { getVariantColors, useThemedStyles } from '@delhivery/tarmac';

const MyButton = ({ variant = 'primary' }) => {
  const { theme } = useTheme();
  const { createThemedStyles } = useThemedStyles();
  
  // Get color values for the specified variant
  const variantColors = getVariantColors(variant, theme);
  
  const buttonStyles = createThemedStyles(() => ({
    backgroundColor: variantColors.backgroundColor,
    color: variantColors.color,
    borderColor: variantColors.borderColor,
    '&:hover': {
      backgroundColor: variantColors.hoverBackgroundColor,
    },
    '&:focus': {
      boxShadow: `0 0 0 3px ${variantColors.focusRingColor}`,
    }
  }));
  
  return <button className={buttonStyles}>Click me</button>;
};
```

### 3. `convertThemeVars`

Converts CSS variable format to JavaScript object format for use with Emotion:

```tsx
import { convertThemeVars } from '@delhivery/tarmac';
import themeVariables from '../variables';

// Convert CSS variables to camelCase object properties
const themeColors = convertThemeVars(themeVariables);

// Usage
const styles = css({
  color: themeColors.delhiveryRed, // Converted from --delhivery-red
  backgroundColor: themeColors.successBgLightest // Converted from --success-bg-lightest
});
```

## Component Implementation Pattern

Here's a recommended pattern for implementing components with Emotion theming:

```tsx
import React from 'react';
import { css } from '@emotion/css';
import { useThemedStyles } from '@delhivery/tarmac';

interface MyComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

const MyComponent: React.FC<MyComponentProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
}) => {
  const { createThemedStyles } = useThemedStyles();
  
  // Static styles with Tailwind
  const staticClasses = 'flex items-center font-medium';
  
  // Size classes with Tailwind
  const sizeClasses = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5',
  };
  
  // Dynamic styles with Emotion
  const dynamicStyles = createThemedStyles((theme) => ({
    backgroundColor: theme.colors?.[variant] || '#5b80f7',
    color: variant === 'primary' ? 'white' : '#111827',
    borderRadius: theme.borderRadius?.md || '0.375rem',
    transition: 'all 150ms ease',
    
    '&:hover': {
      backgroundColor: theme.hoverColors?.[variant] || '#4a6fe6',
    },
    
    '&:focus': {
      boxShadow: `0 0 0 2px ${theme.focusColors?.[variant] || 'rgba(91, 128, 247, 0.4)'}`,
      outline: 'none',
    },
  }));
  
  return (
    <div className={`${staticClasses} ${sizeClasses[size]} ${dynamicStyles} ${className}`}>
      {children}
    </div>
  );
};

export default MyComponent;
```

## Best Practices

1. **Be consistent in styling approach**
   - Use Tailwind for layout, spacing, and typography
   - Use Emotion for theme-dependent styles and dynamic styling

2. **Keep theme values in the theme object**
   - Don't hardcode colors, spacing or other theme values
   - Provide fallbacks for missing theme values

3. **Use descriptive variable names**
   - Name your style variables based on their purpose
   - For example: `buttonStyles`, `headerStyles`, etc.

4. **Organize styles logically**
   - Group related styles together
   - Separate static and dynamic styles
   - Comment complex style logic

5. **Optional styles with spreads**
   - Use spread syntax to conditionally include styles:

   ```tsx
   const styles = {
     // Base styles
     ...baseStyles,
     
     // Conditional styles
     ...(isHoverable && {
       '&:hover': {
         transform: 'translateY(-2px)',
       }
     }),
     
     // More conditional styles
     ...(disabled && {
       opacity: 0.5,
       cursor: 'not-allowed',
     }),
   };
   ```

## Theme Structure

The Orca18 theme object has the following structure:

```typescript
interface Theme {
  colors?: {
    // Brand colors
    primary?: string;
    secondary?: string;
    success?: string;
    error?: string;
    warning?: string;
    information?: string;
    
    // Text colors
    heading?: string;
    body?: string;
    muted?: string;
    
    // UI colors
    border?: string;
    cardBg?: string;
    // etc.
  };
  
  borderRadius?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    // etc.
  };
  
  spacing?: {
    sm?: string;
    md?: string;
    lg?: string;
    // etc.
  };
  
  shadows?: {
    sm?: string;
    md?: string;
    lg?: string;
    // etc.
  };
  
  // Component-specific theme values
  components?: {
    button?: {
      // Button-specific theme values
    };
    card?: {
      // Card-specific theme values
    };
    // etc.
  };
  
  // And more theme values...
}
```

## Advanced Patterns

### Compound Components with Emotion

For compound components, you can pass the styled classes down to child components:

```tsx
import React from 'react';
import { css } from '@emotion/css';
import { useThemedStyles } from '@delhivery/tarmac';

// Parent component
const Menu = ({ children, className }) => {
  const { createThemedStyles } = useThemedStyles();
  
  const menuStyles = createThemedStyles((theme) => ({
    backgroundColor: theme.colors.menuBg || 'white',
    borderRadius: theme.borderRadius.md || '0.375rem',
    boxShadow: theme.shadows.md || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  }));
  
  return (
    <div className={`${menuStyles} ${className || ''}`}>
      {children}
    </div>
  );
};

// Child component
const MenuItem = ({ children, className }) => {
  const { createThemedStyles } = useThemedStyles();
  
  const menuItemStyles = createThemedStyles((theme) => ({
    padding: '0.5rem 1rem',
    color: theme.colors.menuText || '#111827',
    '&:hover': {
      backgroundColor: theme.colors.menuHover || '#F3F4F6',
    },
  }));
  
  return (
    <div className={`${menuItemStyles} ${className || ''}`}>
      {children}
    </div>
  );
};

// Compound component
Menu.Item = MenuItem;

export default Menu;
```

By following this guide, you can create consistent, themeable components that leverage the best of both Tailwind CSS and Emotion CSS in your Orca18 application. 