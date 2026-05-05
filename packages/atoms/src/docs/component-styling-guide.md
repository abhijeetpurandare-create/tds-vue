# Orca18 Component Styling Guide

This guide outlines the recommended approach for styling components in the Orca18 library.

## Core Principles

1. **Use Tailwind for all structural styling**
   - Layout, spacing, typography, borders, shadows, etc.
   - Example: `className="flex items-center justify-between p-4 rounded-lg"`

2. **Use Emotion CSS only for dynamic color styling**
   - Colors that depend on theme, variant, or state
   - Dynamic styling that can't be achieved with Tailwind

3. **Use theme configuration for component styles**
   - Components should read from their config in the theme
   - Provide sensible defaults for when theme config is not available

## Component Configuration Structure

Each component has a configuration in `defaultThemeConfig` that follows this pattern:

```typescript
// Example structure for Button config
{
  components: {
    button: {
      // Base style properties for all buttons
      base: {
        className: 'inline-flex items-center justify-center font-medium transition-all focus:outline-none',
        disabledOpacity: 0.6,
        disabledBackgroundColor: '#E5E7EB',
        disabledColor: '#9CA3AF',
        disabledBorderColor: 'transparent',
        radius: {
          default: 'rounded-md',
          rounded: 'rounded-full'
        },
        focusRingColor: 'rgba(59, 130, 246, 0.5)'
      },
      
      // Size-specific properties
      sizes: {
        sm: {
          className: 'text-sm py-1.5 px-3',
          iconSpacing: 'gap-1.5'
        },
        md: {
          className: 'text-base py-2 px-4', 
          iconSpacing: 'gap-2'
        },
        lg: {
          className: 'text-lg py-2.5 px-5',
          iconSpacing: 'gap-2.5'
        }
      },
      
      // Variant-specific properties (mostly colors)
      variants: {
        primary: {
          backgroundColor: '#3B82F6',
          color: 'white',
          borderColor: 'transparent',
          hoverBackgroundColor: '#2563EB',
          focusRingColor: 'rgba(59, 130, 246, 0.5)'
        },
        secondary: {
          backgroundColor: '#6B7280',
          color: 'white',
          borderColor: 'transparent',
          hoverBackgroundColor: '#4B5563',
          focusRingColor: 'rgba(107, 114, 128, 0.5)'
        },
        // Other variants...
      }
    },
    
    // Other component configs...
  }
}
```

## Implementation Pattern

Here's the recommended pattern for implementing components:

```tsx
import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../components/ThemeProvider';
import { defaultThemeConfig } from '../config/config';

interface MyComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  // Other props...
  className?: string;
}

const MyComponent: React.FC<MyComponentProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  // Other props...
}) => {
  const { theme } = useTheme();
  
  // Get component config from theme or default
  const componentConfig = theme.components?.myComponent || defaultThemeConfig.components.myComponent;
  
  // 1. STATIC STYLING WITH TAILWIND
  
  // Base classes from config
  const baseClasses = componentConfig.base.className || 'default-tailwind-classes';
  
  // Size classes
  const sizeClasses = componentConfig.sizes?.[size]?.className || {
    sm: 'text-sm py-1.5',
    md: 'text-base py-2',
    lg: 'text-lg py-2.5'
  }[size];
  
  // Other static classes based on props
  const otherClasses = ''; // Determine based on props
  
  // Combine all Tailwind classes
  const tailwindClasses = [
    baseClasses,
    sizeClasses,
    otherClasses
  ].filter(Boolean).join(' ');
  
  // 2. DYNAMIC COLOR STYLING WITH EMOTION
  
  // Get variant config
  const variantConfig = componentConfig.variants[variant] || {};
  
  // Create dynamic color styles
  const colorStyles = css({
    backgroundColor: variantConfig.backgroundColor || '#3B82F6',
    color: variantConfig.color || 'white',
    borderColor: variantConfig.borderColor || 'transparent',
    
    '&:hover': {
      backgroundColor: variantConfig.hoverBackgroundColor || '#2563EB',
    },
    
    // Other dynamic styles...
  });
  
  // 3. COMBINE CLASSES
  const combinedClassName = `${tailwindClasses} ${colorStyles} ${className}`;
  
  return (
    <div className={combinedClassName}>
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

## Styling Rules

### 1. Use Tailwind for:

- Layout (flex, grid, positioning)
- Spacing (margin, padding)
- Typography (font size, weight, line height)
- Dimensions (width, height)
- Borders (except color)
- Border radius
- Opacity
- Transitions and animations (except keyframes)

### 2. Use Emotion for:

- All color properties (background, text, border)
- Custom keyframe animations
- Dynamic styles that depend on component state
- Complex pseudo-selectors not easily handled by Tailwind
- Styles that need to be computed

### 3. Component Config Pattern:

- `base`: Common properties for all variants
- `sizes`: Size-specific properties
- `variants`: Variant-specific properties (mostly colors)

## Utility Functions

The library provides several utility functions for component styling:

### 1. `useComponentConfig`

```tsx
import { useComponentConfig } from '../../utils/componentStyles';

// Inside component:
const config = useComponentConfig('button');
```

### 2. `useDynamicColors`

```tsx
import { useDynamicColors } from '../../utils/componentStyles';

// Inside component:
const colorStyles = useDynamicColors('button', variant);
```

### 3. `getTailwindClasses`

```tsx
import { getTailwindClasses } from '../../utils/componentStyles';

// Inside component:
const tailwindClasses = getTailwindClasses('button', size, { isFullWidth: true });
```

### 4. `combineStyles`

```tsx
import { combineStyles } from '../../utils/componentStyles';

// Inside component:
const className = combineStyles(tailwindClasses, colorStyles, additionalClasses);
```

By following this structured approach, we ensure consistent styling across all components while maintaining flexibility for theming and customization. 