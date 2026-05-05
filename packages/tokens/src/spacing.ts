/**
 * Tarmac Design System — Spacing / Scale Tokens
 *
 * Mirrors the --Scale-* CSS variables from the Figma-generated
 * tarmac-variables.css. Values are in pixels.
 */

export const scale: Record<string, number> = {
  '0': 0,
  '25': 0.5,
  '50': 1,
  '75': 1.5,
  '100': 2,
  '150': 3,
  '200': 4,
  '300': 6,
  '400': 8,
  '450': 10,
  '500': 12,
  '550': 14,
  '600': 16,
  '700': 20,
  '800': 24,
  '825': 26,
  '850': 28,
  '900': 32,
  '925': 34,
  '950': 36,
  '975': 38,
  '1000': 40,
  '1100': 44,
  '1125': 48,
  '1150': 52,
  '1175': 58,
  '1190': 60,
  '1200': 64,
  '1225': 68,
  '1250': 72,
  '1275': 76,
  '1290': 78,
  '1300': 80,
  '1325': 82,
  '1350': 86,
  '1375': 88,
  '1400': 92,
  '1425': 94,
  '1500': 999,
} as const;

export const borderWidth = {
  none: 0,
  small: 0.5,
  default: 1,
  medium: 1.5,
  large: 2,
  xlarge: 4,
} as const;

export const borderRadius = {
  none: 0,
  small: 2,
  default: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  max: 999,
} as const;

export type Scale = typeof scale;
export type BorderWidth = typeof borderWidth;
export type BorderRadius = typeof borderRadius;
