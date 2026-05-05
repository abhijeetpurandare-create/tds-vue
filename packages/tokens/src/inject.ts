/**
 * Tarmac Design System — CSS Variable Injection Utility
 *
 * Injects design tokens as CSS custom properties onto a target element.
 * Works in any framework — just pass the element (or document.documentElement).
 */

import { themeVariables } from './variables';

/**
 * Apply all Tarmac CSS variables to a target element's inline style.
 * Defaults to :root (document.documentElement).
 */
export function injectTokens(
  target: HTMLElement = document.documentElement,
  overrides: Record<string, string> = {},
): void {
  const merged = { ...themeVariables, ...overrides };
  for (const [key, value] of Object.entries(merged)) {
    target.style.setProperty(key, value);
  }
}

/**
 * Remove all Tarmac CSS variables from a target element.
 */
export function removeTokens(
  target: HTMLElement = document.documentElement,
): void {
  for (const key of Object.keys(themeVariables)) {
    target.style.removeProperty(key);
  }
}

/**
 * Generate a CSS string containing all token variables under :root.
 * Useful for injecting into Shadow DOM or <style> tags.
 */
export function tokensToCssString(
  overrides: Record<string, string> = {},
): string {
  const merged = { ...themeVariables, ...overrides };
  const declarations = Object.entries(merged)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  return `:host, :root {\n${declarations}\n}`;
}
