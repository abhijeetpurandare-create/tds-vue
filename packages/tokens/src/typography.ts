/**
 * Tarmac Design System — Typography Tokens
 *
 * Font families and weights used across the design system.
 * Matches the Tailwind config and Figma variable definitions.
 */

export const fontFamily = {
  sans: ['"IBM Plex Sans"', 'sans-serif'],
  display: ['"Noto Sans"', 'sans-serif'],
  heading: ['"Noto Sans"', 'sans-serif'],
  body: ['"Noto Sans"', 'sans-serif'],
  caption: ['"Noto Sans"', 'sans-serif'],
} as const;

export const fontWeight = {
  display: 900,
  bold: 700,
  semibold: 600,
  medium: 500,
  regular: 400,
  light: 300,
} as const;

export type FontFamily = typeof fontFamily;
export type FontWeight = typeof fontWeight;
