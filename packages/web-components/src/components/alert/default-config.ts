/**
 * Default Alert Configuration
 *
 * Mirrors the defaultAlertStyles from packages/atoms/src/config/config.ts.
 * Used as fallback when no theme provider is present.
 */

export const defaultAlertConfig = {
  base: {
    fontFamily: 'sans-serif',
    fontWeight: '500',
    transition: 'all 0.15s ease-in-out',
    radius: '0.5rem',
    padding: '1rem',
  },
  variants: {
    default: {
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      borderColor: '#E5E7EB',
      iconColor: '#6B7280',
    },
    primary: {
      backgroundColor: '#93C5FD20',
      textColor: '#1D4ED8',
      borderColor: '#93C5FD',
      iconColor: '#3B82F6',
    },
    destructive: {
      backgroundColor: '#FCA5A520',
      textColor: '#B91C1C',
      borderColor: '#FCA5A5',
      iconColor: '#EF4444',
    },
    success: {
      backgroundColor: '#A7F3D020',
      textColor: '#047857',
      borderColor: '#A7F3D0',
      iconColor: '#10B981',
    },
    warning: {
      backgroundColor: '#FCD34D20',
      textColor: '#B45309',
      borderColor: '#FCD34D',
      iconColor: '#F59E0B',
    },
    info: {
      backgroundColor: '#93C5FD20',
      textColor: '#1D4ED8',
      borderColor: '#93C5FD',
      iconColor: '#3B82F6',
    },
  },
  sizes: {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', iconSize: '1rem' },
    md: { padding: '1rem', fontSize: '1rem', iconSize: '1.25rem' },
    lg: { padding: '1.25rem', fontSize: '1.125rem', iconSize: '1.5rem' },
  },
};
