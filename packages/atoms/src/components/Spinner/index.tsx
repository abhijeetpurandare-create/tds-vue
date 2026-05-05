import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultThemeConfig } from '../../config/config';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type TarmacSpinnerVariant = 'tarmac-01' | 'tarmac-02' | 'tarmac-03' | 'tarmac-04' | (string & {});
export type TarmacSpinnerSize = '16px' | '20px' | '24px' | '28px' | '32px' | '36px' | '40px' | '44px' | (string & {});

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  trackColor?: string;
  /** @description Tarmac TDS variant (tarmac-01/02/03/04) — activates Tarmac rendering path */
  tarmacVariant?: TarmacSpinnerVariant;
  /** @description Tarmac TDS size (16px–44px) */
  tarmacSize?: TarmacSpinnerSize;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  style,
  color,
  trackColor,
  tarmacVariant,
  tarmacSize = '24px',
}) => {
  const { theme } = useTheme();
  const spinnerConfig = theme.components?.spinner || defaultThemeConfig.components.spinner;

  // ─── Tarmac TDS rendering path ───
  if (tarmacVariant) {
    const vc = spinnerConfig.variants?.[tarmacVariant] || {};
    const sc = spinnerConfig.sizes?.[tarmacSize] || {};
    const spinnerColor = color || vc.color || '#000000';
    const spinnerTrack = trackColor || vc.trackColor || '#d4d4d4';
    const pxSize = sc.size || tarmacSize;
    const sw = sc.strokeWidth || 3;

    const animStyle = css({
      animation: 'spin 1s linear infinite',
      '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    });

    return (
      <div
        role="status"
        className={`${animStyle} ${className}`.trim()}
        style={{ width: pxSize, height: pxSize, ...style }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={spinnerTrack}
            strokeWidth={sw}
            opacity={0.3}
          />
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12"
            stroke={spinnerColor}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
        <span className={css({ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', borderWidth: 0 })}>Loading...</span>
      </div>
    );
  }

  // STATIC STYLING WITH TAILWIND
  
  // 1. Size classes based on configuration
  const sizeClasses = {
    sm: spinnerConfig.sizes.sm.size || 'h-4 w-4',
    md: spinnerConfig.sizes.md.size || 'h-6 w-6',
    lg: spinnerConfig.sizes.lg.size || 'h-8 w-8',
  }[size];
  
  // 2. Animation class 
  const animationClass = 'animate-spin';
  
  // 3. Combine Tailwind classes
  const tailwindClasses = `${animationClass} ${sizeClasses}`;
  
  // DYNAMIC STYLING WITH EMOTION
  
  // 1. Get variant configuration
  const variantConfig = spinnerConfig.variants[variant] || spinnerConfig.variants.default;
  
  // 2. Track color styles - use prop override or get from theme
  const trackColorValue = trackColor || variantConfig.trackColor || '#E5E7EB';
  const trackColorStyle = css({
    stroke: trackColorValue,
    opacity: 0.3,
  });
  
  // 3. Spinner color styles - use prop override or get from theme
  const spinnerColorValue = color || variantConfig.color || '#3B82F6';
  const spinnerColorStyle = css({
    stroke: spinnerColorValue,
  });
  
  // 4. Animation styles for better cross-browser support
  const animationStyle = css({
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  });

  return (
    <div
      role="status"
      className={`${tailwindClasses} ${animationStyle} ${className}`}
      style={style}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={trackColorStyle}
          cx="12"
          cy="12"
          r="10"
          strokeWidth={spinnerConfig.sizes[size].strokeWidth || 2}
        />
        <path
          className={spinnerColorStyle}
          d="M12 2C6.47715 2 2 6.47715 2 12"
          strokeWidth={spinnerConfig.sizes[size].strokeWidth || 2}
          strokeLinecap="round"
        />
      </svg>
      {/* <span className="sr-only">Loading...</span> */}
    </div>
  );
};

export default Spinner; 