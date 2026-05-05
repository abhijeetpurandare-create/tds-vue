/**
 * Default Button Configuration
 *
 * Mirrors the defaultButtonStyles from packages/atoms/src/config/config.ts.
 * Used as fallback when no theme provider is present.
 */

import type { ButtonConfig } from './button-styles';

const defaultColors = {
  primary: { main: '#3B82F6', light: '#93C5FD', dark: '#1D4ED8', contrast: '#FFFFFF' },
  secondary: { main: '#6B7280', light: '#D1D5DB', dark: '#374151', contrast: '#FFFFFF' },
};

export const defaultButtonConfig: ButtonConfig = {
  base: {
    fontFamily: 'sans-serif',
    fontWeight: '500',
    focus: {
      ring: '0 0 0 3px rgba(59, 130, 246, 0.5)',
    },
    radius: {
      default: '0.375rem',
      rounded: '9999px',
    },
  },
  variants: {
    primary: {
      backgroundColor: defaultColors.primary.main,
      textColor: defaultColors.primary.contrast,
      borderColor: defaultColors.primary.main,
      hoverColor: defaultColors.primary.dark,
      focusRingColor: defaultColors.primary.main,
    },
    secondary: {
      backgroundColor: defaultColors.secondary.main,
      textColor: defaultColors.secondary.contrast,
      borderColor: defaultColors.secondary.main,
      hoverColor: defaultColors.secondary.dark,
      focusRingColor: defaultColors.secondary.main,
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: defaultColors.primary.main,
      borderColor: defaultColors.primary.main,
      hoverColor: defaultColors.primary.main,
      hoverTextColor: defaultColors.primary.contrast,
      focusRingColor: defaultColors.primary.main,
    },
  },
  sizes: {
    sm: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem',
      iconSize: '1rem',
      gap: '0.375rem',
    },
    md: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      iconSize: '1.25rem',
      gap: '0.5rem',
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem',
      iconSize: '1.5rem',
      gap: '0.625rem',
    },
  },
  states: {
    disabled: {
      backgroundColor: '#E0E0E0',
      textColor: '#9E9E9E',
      cursor: 'not-allowed',
    },
    loading: {
      opacity: '0.7',
      cursor: 'wait',
    },
  },
};
