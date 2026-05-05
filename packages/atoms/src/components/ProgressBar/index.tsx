import React from 'react';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import {
  buildTrackStyles,
  buildIndicatorStyles,
  buildWrapperStyles,
  buildTitleRowStyles,
  buildSubtextRowStyles,
} from './useProgressBarStyles';
import type {
  ProgressBarBarType,
  ProgressBarThemeConfig,
} from './useProgressBarStyles';

// Legacy types (backward compat)
export type ProgressBarType = 'horizontal' | 'circular';

// Legacy size union kept for backward compat; TDS maps sm→sm, everything else→lg
export type ProgressBarSize = 'sm' | 'md' | 'lg';
// Open union: legacy values + any string from theme JSON
export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default' | (string & {});

export type { ProgressBarBarType, ProgressBarThemeConfig };

export interface ProgressBarProps {
  value: number;
  type?: ProgressBarType;
  size?: ProgressBarSize;
  variant?: ProgressBarVariant;
  showPercentage?: boolean;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  gradientFrom?: string;
  gradientTo?: string;
  trackColor?: string;
  textColor?: string;
  strokeWidth?: number;
  /** Setting barType activates the TDS rendering path */
  barType?: ProgressBarBarType;
  title?: string;
  titleNumber?: string;
  subtext?: string;
  subtextNumber?: string;
  showTitle?: boolean;
  showSubtext?: boolean;
  showTitleNumber?: boolean;
  showSubtextNumber?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      type = 'horizontal',
      size = 'md',
      variant = 'primary',
      showPercentage = true,
      icon,
      className = '',
      style,
      gradientFrom,
      gradientTo,
      trackColor,
      textColor,
      strokeWidth,
      barType,
      title,
      titleNumber,
      subtext,
      subtextNumber,
      showTitle = true,
      showSubtext = true,
      showTitleNumber = true,
      showSubtextNumber = true,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const normalizedValue = Math.max(0, Math.min(100, value));

    // ── TDS path: activated when barType is set ──
    if (barType) {
      const config: ProgressBarThemeConfig = theme.components?.progressBar || {};
      const tdsSize = size === 'sm' ? 'sm' : 'lg';
      const styleParams = { config, variant: variant as string, size: tdsSize, barType, value: normalizedValue };

      const trackCls = buildTrackStyles(styleParams);
      const indicatorCls = buildIndicatorStyles(styleParams);

      const hasTitle = showTitle && (title || (showTitleNumber && titleNumber));
      const hasSubtext = showSubtext && (subtext || (showSubtextNumber && subtextNumber));

      if (!hasTitle && !hasSubtext) {
        return (
          <div
            ref={ref}
            role="progressbar"
            aria-valuenow={normalizedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            className={`${trackCls} ${className}`.trim()}
            {...props}
          >
            <div className={indicatorCls} />
          </div>
        );
      }

      const wrapperCls = buildWrapperStyles(config);
      const titleRowCls = buildTitleRowStyles(config, tdsSize);
      const subtextRowCls = buildSubtextRowStyles(config, tdsSize);

      return (
        <div ref={ref} className={`${wrapperCls} ${className}`.trim()} {...props}>
          {hasTitle && (
            <div className={titleRowCls}>
              {showTitle && title && <span style={{ flex: '1 0 0', minWidth: 1 }}>{title}</span>}
              {showTitleNumber && titleNumber && <span style={{ flexShrink: 0, textAlign: 'center' }}>{titleNumber}</span>}
            </div>
          )}
          <div
            role="progressbar"
            aria-valuenow={normalizedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            className={trackCls}
          >
            <div className={indicatorCls} />
          </div>
          {hasSubtext && (
            <div className={subtextRowCls}>
              {showSubtext && subtext && <span style={{ flex: '1 0 0', minWidth: 1 }}>{subtext}</span>}
              {showSubtextNumber && subtextNumber && <span style={{ flexShrink: 0, textAlign: 'center' }}>{subtextNumber}</span>}
            </div>
          )}
        </div>
      );
    }

    // ── Legacy path (unchanged) ──
    const defaultGradient: Record<string, [string, string]> = {
      primary: ['#60A5FA', '#1D4ED8'],
      success: ['#6EE7B7', '#059669'],
      warning: ['#FDE68A', '#F59E0B'],
      error: ['#FCA5A5', '#B91C1C'],
      info: ['#93C5FD', '#2563EB'],
      default: ['#6EE7B7', '#059669'],
    };

    const gradientPair = defaultGradient[variant] || defaultGradient.default;
    const [from, to] = [gradientFrom || gradientPair[0], gradientTo || gradientPair[1]];
    const track = trackColor || '#E5E7EB';
    const text = textColor || '#6B7280';

    const sizes: Record<string, { height: number; radius: number; font: string; stroke: number }> = {
      sm: { height: 6, radius: 18, font: '0.625rem', stroke: 4 },
      md: { height: 10, radius: 36, font: '0.75rem', stroke: 6 },
      lg: { height: 16, radius: 48, font: '0.875rem', stroke: 8 },
    };

    const sz = sizes[size] || sizes.md;

    if (type === 'horizontal') {
      const barContainerStyles = css({ display: 'flex', alignItems: 'center', gap: 8, width: '100%', ...style });
      const barStyles = css({ flex: 1, height: sz.height, background: track, borderRadius: sz.height / 2, overflow: 'hidden', position: 'relative' as const });
      const fillStyles = css({ height: '100%', width: `${normalizedValue}%`, background: `linear-gradient(90deg, ${from}, ${to})`, borderRadius: sz.height / 2, transition: 'width 0.3s' });
      const labelStyles = css({ fontSize: sz.font, color: text, fontWeight: 400, whiteSpace: 'nowrap' as const });

      return (
        <div ref={ref} role="progressbar" className={`${barContainerStyles} ${className}`} {...props}>
          <div className={barStyles}><div className={fillStyles} /></div>
          {showPercentage && <div className={labelStyles}>{`${Math.round(value)}%`}</div>}
        </div>
      );
    }

    // Circular progress bar
    const radius = sz.radius;
    const stroke = strokeWidth || sz.stroke;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (normalizedValue / 100) * circumference;
    const svgSize = radius * 2 + stroke;

    const reactId = React.useId();
    const safeId = reactId.replace(/[^a-zA-Z0-9_-]/g, '-');
    const timestamp = React.useRef(Date.now());
    const gradientId = `progress-gradient-${variant}-${size}-${safeId}-${timestamp.current}`;

    const circularStyles = css({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' as const, width: svgSize, height: svgSize, ...style });
    const circularLabelStyles = css({ position: 'absolute' as const, top: 0, left: 0, width: svgSize, height: svgSize, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: sz.font, color: text, fontWeight: 400, pointerEvents: 'none' as const });

    return (
      <div ref={ref} role="progressbar" className={`${circularStyles} ${className}`} {...props}>
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} style={{ transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          </defs>
          <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} stroke={track} strokeWidth={stroke} fill="none" />
          {normalizedValue > 0 && (
            <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} stroke={`url(#${gradientId})`} strokeWidth={stroke} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.3s' }} />
          )}
          {normalizedValue > 0 && (
            <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} stroke={to} strokeWidth={stroke} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.3s', opacity: 0 }} className="mobile-fallback-progress" />
          )}
        </svg>
        <div className={circularLabelStyles}>{showPercentage ? `${Math.round(value)}%` : icon}</div>
        <style dangerouslySetInnerHTML={{ __html: `@media(max-width:768px){.mobile-fallback-progress{opacity:1!important}circle[stroke*="url(#${gradientId})"]{opacity:0!important}}@supports not(stroke:url(#test)){.mobile-fallback-progress{opacity:1!important}circle[stroke*="url(#${gradientId})"]{opacity:0!important}}` }} />
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
