/**
 * @tarmac/tokens
 *
 * Framework-agnostic design tokens for the Tarmac Design System.
 * Single source of truth consumed by React, Web Components, and Vue packages.
 */

// CSS Variables (legacy + semantic)
export { themeVariables, default as themeVariablesDefault } from './variables';

// Structured token categories
export { colors, brandColors } from './colors';
export type { Colors, BrandColors } from './colors';

export { fontFamily, fontWeight } from './typography';
export type { FontFamily, FontWeight } from './typography';

export { scale, borderWidth, borderRadius } from './spacing';
export type { Scale, BorderWidth, BorderRadius } from './spacing';

// Utilities
export { injectTokens, removeTokens, tokensToCssString } from './inject';
export { loadTheme } from './theme-loader';
export type { Theme, ThemeLoaderOptions } from './theme-loader';

// CSS import (side-effect)
import './tokens.css';
