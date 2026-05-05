/**
 * Default Badge Configuration
 *
 * Mirrors the defaultBadgeStyles from packages/atoms/src/config/config.ts.
 */

import type { BadgeConfig } from './badge-styles';

export const defaultBadgeConfig: BadgeConfig = {
  base: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    borderRadius: '4px',
  },
  types: {},
  variants: {
    black: { backgroundColor: '#000000', textColor: '#e6e6e6' },
    white: { backgroundColor: '#ffffff', textColor: '#2b2b2b', borderColor: '#e6e6e6' },
    coal: { backgroundColor: '#64739b', textColor: '#f2f2f2' },
    dlv_red: { backgroundColor: '#ed1b36', textColor: '#e6e6e6' },
    info: { backgroundColor: '#2396fb', textColor: '#e6e6e6' },
    success: { backgroundColor: '#1ba86e', textColor: '#e6e6e6' },
    warning: { backgroundColor: '#f5c828', textColor: '#7b6414' },
    error: { backgroundColor: '#dc143c', textColor: '#e6e6e6' },
    cardbox: { backgroundColor: '#b88b5c', textColor: '#e6e6e6' },
  },
  sizes: {
    sm: { padding: '2px 4px', fontSize: '10px', lineHeight: '12px', iconSize: '12px', gap: '2px' },
    md: { padding: '2px 6px', fontSize: '12px', lineHeight: '16px', iconSize: '12px', gap: '2px' },
    lg: { padding: '2px 6px', fontSize: '12px', lineHeight: '16px', iconSize: '16px', gap: '2px' },
  },
  states: {
    disabled: { backgroundColor: '#e6e6e6', textColor: '#cdcbcb', borderColor: 'transparent' },
    disabledOutlined: { backgroundColor: 'transparent', textColor: '#cdcbcb', borderColor: '#ededed' },
    ghost: { backgroundColor: '#e6e6e6', textColor: 'transparent', borderColor: 'transparent' },
  },
};
