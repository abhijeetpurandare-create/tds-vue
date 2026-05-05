/**
 * Tarmac Design System — Tailwind Color Tokens
 *
 * These mirror the Tailwind config from packages/atoms/tailwind.config.js
 * so that any framework can consume the same palette without Tailwind.
 */

export const colors = {
  text: {
    primary: '#5B80F7',
    heading: '#3D445C',
    body: '#525B7A',
    muted: '#A3AAC2',
    badge: '#474747',
  },
  bg: {
    surface: '#F9F9FB',
    dark: '#1F222E',
  },
  border: {
    default: '#E0E3EB',
    badge: '#9d9d9d',
  },
} as const;

export const brandColors = {
  delhiveryRed: '#ED4136',
  delhiveryBlue: '#5b80f7',
} as const;

export type Colors = typeof colors;
export type BrandColors = typeof brandColors;
