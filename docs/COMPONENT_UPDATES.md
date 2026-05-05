# Component Updates Documentation

This document outlines the updates made to various components in the Orca18 UI library to align with the new coding standards, specifically using Tailwind for static styling and Emotion for dynamic styling.

## Overall Approach

All updated components now follow a consistent pattern:

1. **Static Styling with Tailwind**:
   - Layout and structure
   - Spacing, padding, margins
   - Fixed dimensions
   - Border radius and shadows (when not dynamic)
   
2. **Dynamic Styling with Emotion**:
   - Theme-based colors
   - Interactive states (hover, focus, active)
   - Animations
   - Prop-based conditional styling

3. **Class Composition**:
   - Tailwind classes are combined into string variables
   - Emotion styles are applied using the `css` function
   - Final className combines both: `` `${tailwindClasses} ${dynamicStyles} ${className}` ``

## Component Updates

### ButtonAnt

The `ButtonAnt` component was updated to:

- Use Tailwind for structural concerns (layout, spacing, sizing)
- Use Emotion for dynamic styling based on variants and props
- Improve the organization of code with clear comments
- Add better TypeScript typing
- Support dynamic themes through the `ThemeProvider`

Key code changes:
```tsx
// STATIC STYLING WITH TAILWIND
const baseClasses = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none';
const sizeClasses = buttonConfig.sizes?.[size]?.className || {
  sm: 'text-sm py-1.5 px-3',
  md: 'text-base py-2 px-4',
  lg: 'text-lg py-2.5 px-5',
}[size];

// DYNAMIC STYLING WITH EMOTION
const colorStyles = css({
  backgroundColor: backgroundColor || variantConfig.backgroundColor || '#3B82F6',
  '&:hover:not(:disabled):not(.disabled)': {
    backgroundColor: hoverColor || variantConfig.hoverColor || variantConfig.backgroundColor,
  },
});
```

### FloatingButton

The `FloatingButton` component was updated to:

- Share code patterns with ButtonAnt while adding position-specific logic
- Use Tailwind for fixed structural elements
- Use Emotion for positioning, colors, and animations
- Support multiple positioning options and customization

Key code changes:
```tsx
// STATIC STYLING WITH TAILWIND
const baseClasses = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none';
const shadowClasses = shadow || 'shadow-lg';

// DYNAMIC STYLING WITH EMOTION
const positionStyles = css({
  position: 'fixed',
  zIndex: zIndex,
  ...(position === 'bottom-right' && { bottom: '1rem', right: '1rem' }),
});
```

### Modal

The `Modal` component was updated to:

- Handle complex layout requirements with Tailwind
- Use Emotion for animations, transitions, and theme-based styling
- Support different modal variants and sizes
- Implement proper accessibility features
- Provide a responsive version that adapts to different screen sizes

Key code changes:
```tsx
// STATIC STYLING WITH TAILWIND
const baseClasses = 'fixed inset-0 flex items-center justify-center';
const maskClasses = 'absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm';

// DYNAMIC STYLING WITH EMOTION
const transitionStyles = css({
  transition: `all ${animation.duration}ms ${animation.timingFunction}`,
  opacity: isOpen ? 1 : 0,
});

const variantStyles = css({
  backgroundColor: variantConfig.backgroundColor || 'white',
  color: variantConfig.textColor || '#111827',
});
```

### Pill

The `Pill` component was updated to:

- Use Tailwind for its compact layout structure
- Apply Emotion for dynamic styling based on variant, state, and props
- Support icons, close buttons, and visibility toggling
- Maintain consistent styling patterns with other components

Key code changes:
```tsx
// STATIC STYLING WITH TAILWIND
const baseClasses = 'inline-flex items-center';
const sizeClasses = pillConfig.sizes?.[size]?.className || {
  sm: 'text-xs py-0.5 px-2',
  md: 'text-sm py-1 px-2.5',
  lg: 'text-base py-1.5 px-3',
}[size];

// DYNAMIC STYLING WITH EMOTION
const variantStyles = css({
  backgroundColor: backgroundColor || variantConfig.backgroundColor,
  color: variantConfig.textColor,
  borderColor: variantConfig.borderColor,
});
```

### Spinner

The `Spinner` component was updated to:

- Use Tailwind for sizing and positioning
- Apply Emotion for color management and animations
- Support different sizes and variants
- Add cross-browser compatible animation

Key code changes:
```tsx
// STATIC STYLING WITH TAILWIND
const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}[size];

// DYNAMIC STYLING WITH EMOTION
const spinnerColorStyles = css({
  borderColor: spinnerConfig.variants[variant]?.color || 'currentColor',
  borderTopColor: 'transparent',
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' }
  },
  animation: 'spin 0.6s linear infinite'
});
```

## Consistent Benefits Across Components

These updates have provided several benefits to the entire component library:

1. **Consistency**: All components now follow the same styling approach
2. **Maintainability**: Clear separation of concerns between static and dynamic styling
3. **Performance**: Tailwind classes are applied without runtime overhead
4. **Flexibility**: Dynamic styling with Emotion allows for complex interactions
5. **Theme support**: Components adapt to the global theme configuration
6. **TypeScript integration**: Improved type safety throughout the components

## Next Steps

Components that still need to be updated following the same pattern:
- Input
- Select
- Checkbox
- Radio
- Toggle
- Dropdown
- Tooltip
- Tabs 