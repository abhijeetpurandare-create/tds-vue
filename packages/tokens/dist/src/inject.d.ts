/**
 * Tarmac Design System — CSS Variable Injection Utility
 *
 * Injects design tokens as CSS custom properties onto a target element.
 * Works in any framework — just pass the element (or document.documentElement).
 */
/**
 * Apply all Tarmac CSS variables to a target element's inline style.
 * Defaults to :root (document.documentElement).
 */
export declare function injectTokens(target?: HTMLElement, overrides?: Record<string, string>): void;
/**
 * Remove all Tarmac CSS variables from a target element.
 */
export declare function removeTokens(target?: HTMLElement): void;
/**
 * Generate a CSS string containing all token variables under :root.
 * Useful for injecting into Shadow DOM or <style> tags.
 */
export declare function tokensToCssString(overrides?: Record<string, string>): string;
