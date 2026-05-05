# Styling Guide: Using Emotion CSS with Tailwind

This guide explains our approach to styling components in the Orca18 UI library, which combines the benefits of Tailwind CSS for static styling with Emotion CSS for dynamic styling.

## Core Principles

1. **Use Tailwind for static styles**
   - Tailwind is great for consistent, predefined styling
   - Use Tailwind classes for common UI patterns and layouts
   - Example: `className="flex items-center justify-between p-4 rounded-lg"`

2. **Use Emotion CSS for dynamic styles**
   - Emotion is perfect for computed/conditional styles that depend on props or state
   - Use Emotion when you need to generate styles programmatically
   - Example: Creating a custom shadow based on an elevation prop

## When to Use Each Approach

### Use Tailwind When:
- Applying consistent, predefined styles
- Working with layout, spacing, typography, and colors from your design system
- Applying static styles that don't depend on props or component state

### Use Emotion When:
- Styles need to be computed based on props or component state
- Creating complex hover/focus effects that depend on component state
- Implementing theme variations that require conditional logic
- Applying styles that can't be easily expressed with Tailwind classes

## Implementation Example

Here's a basic pattern for combining Tailwind and Emotion in components:

```tsx
import React from 'react';
import { css } from '@emotion/css';

interface CardProps {
  title: string;
  elevation: number;
  backgroundColor?: string;
}

const Card: React.FC<CardProps> = ({ title, elevation, backgroundColor }) => {
  // Static styles with Tailwind
  const staticClasses = 'p-4 rounded-lg flex flex-col';
  
  // Dynamic styles with Emotion
  const dynamicStyles = css({
    backgroundColor: backgroundColor || 'white',
    boxShadow: `0 ${elevation * 2}px ${elevation * 4}px rgba(0, 0, 0, 0.1)`,
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    }
  });
  
  // Combine Tailwind and Emotion classes
  const className = `${staticClasses} ${dynamicStyles}`;
  
  return (
    <div className={className}>
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
  );
};
```

## Best Practices

1. **Keep static and dynamic styles separate**
   - Clearly separate your Tailwind classes from Emotion styles for readability

2. **Avoid duplicating styles**
   - Don't use Emotion for something that can be done with Tailwind
   - Don't mix approaches for the same styling property

3. **Be consistent within components**
   - If you start using Emotion for a styling concern in a component, continue using it for that concern

4. **Document dynamic styling patterns**
   - When creating a component with complex dynamic styling, add comments explaining the approach

## Theming with Emotion

For theming that requires dynamic values, Emotion is particularly powerful:

```tsx
const buttonStyles = css({
  backgroundColor: variant === 'primary' ? theme.colors.primary : 'transparent',
  color: variant === 'primary' ? 'white' : theme.colors.primary,
  borderColor: theme.colors.primary,
  borderRadius: `${theme.radii.button}px`,
  // Other dynamic styles...
});
```

By following these guidelines, we can maintain a consistent, maintainable codebase while leveraging the strengths of both Tailwind and Emotion CSS. 