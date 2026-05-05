import React from 'react';

/**
 * Utility for building class names in a readable and maintainable way
 */

/**
 * Join class names and filter out falsy values
 * @param classes - Array of class names or expressions that might resolve to class names
 * @returns String of joined class names
 */
export function cx(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ').trim();
}

/**
 * Build class names from an object where keys are class names and values are boolean conditions
 * @param classMap - Object with class names as keys and conditions as values
 * @returns String of joined class names where conditions are true
 */
export function classNames(classMap: Record<string, boolean | undefined | null>): string {
  return Object.entries(classMap)
    .filter(([_, condition]) => Boolean(condition))
    .map(([className]) => className)
    .join(' ')
    .trim();
}

/**
 * Create a style object from CSS properties with custom values
 * If value is undefined, the property will be omitted
 * @param styles - Object with CSS properties as keys and values
 * @returns Style object for inline styles
 */
export function createStyles(styles: Record<string, string | number | undefined>): React.CSSProperties {
  return Object.entries(styles)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

/**
 * Create CSS variable with value
 * @param name - CSS variable name (without --)
 * @param value - CSS variable value
 * @returns CSS variable with value
 */
export function cssVar(name: string, value?: string): string {
  return value ? `var(--${name}, ${value})` : `var(--${name})`;
}

/**
 * Build Tailwind utility classes with conditional values
 * @param prefix - Tailwind prefix (like 'bg' for background)
 * @param value - Value to append (like 'red-500')
 * @returns Tailwind class name or empty string if value is undefined
 */
export function tw(prefix: string, value?: string): string {
  return value ? `${prefix}-[${value}]` : '';
} 