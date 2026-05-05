import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

interface DividerConfig {
  base?: {
    color?: string;
    dashPattern?: string;
  };
  sizes?: Record<string, { strokeWeight?: string | number }>;
}

export interface BuildDividerStylesParams {
  dividerConfig?: DividerConfig;
  dividerType: string;
  size: string;
  color?: string;
  orientation: 'horizontal' | 'vertical';
}

export function buildDividerStyles(params: BuildDividerStylesParams): string {
  const { dividerConfig, dividerType, size, color, orientation } = params;
  const cfg = dividerConfig || {};
  const base = cfg.base || {};
  const sc = cfg.sizes?.[size] || {};

  const strokeWeight = dim(sc.strokeWeight, `${size}px`);
  const resolvedColor = color || base.color || '#b3b1b1';
  const isDash = dividerType === 'dash';
  const isVertical = orientation === 'vertical';

  if (isVertical) {
    return css({
      border: 'none',
      width: strokeWeight,
      height: '100%',
      margin: 0,
      padding: 0,
      flexShrink: 0,
      backgroundColor: isDash ? 'transparent' : resolvedColor,
      backgroundImage: isDash
        ? `repeating-linear-gradient(to bottom, ${resolvedColor} 0px, ${resolvedColor} 6px, transparent 6px, transparent 12px)`
        : 'none',
    });
  }

  return css({
    border: 'none',
    height: strokeWeight,
    width: '100%',
    margin: 0,
    padding: 0,
    flexShrink: 0,
    backgroundColor: isDash ? 'transparent' : resolvedColor,
    backgroundImage: isDash
      ? `repeating-linear-gradient(to right, ${resolvedColor} 0px, ${resolvedColor} 6px, transparent 6px, transparent 12px)`
      : 'none',
  });
}
