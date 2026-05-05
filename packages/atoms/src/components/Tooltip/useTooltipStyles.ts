import { css } from '@emotion/css';

export type TarmacTooltipVariant = 'white' | 'black' | 'coal';
export type TarmacTooltipType = 'standard' | 'ctas';
export type TarmacTooltipStyle = 'singleText' | 'dualText';

// Arrow position = which edge of the tooltip the arrow sits on + alignment along that edge
// e.g. "bottom-mid" = arrow on bottom edge, centered — tooltip is ABOVE trigger, arrow points DOWN
export type TarmacArrowPosition =
  | 'top-left' | 'top-mid' | 'top-right'
  | 'bottom-left' | 'bottom-mid' | 'bottom-right'
  | 'left-top' | 'left-mid' | 'left-bottom'
  | 'right-top' | 'right-mid' | 'right-bottom';

export type TooltipPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

interface VariantConfig {
  backgroundColor?: string;
  textColor?: string;
  arrowColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  dividerColor?: string;
  ctaPrimaryTextColor?: string;
  ctaSecondaryTextColor?: string;
  ctaHighlightTextColor?: string;
  iconColor?: string;
}

interface BaseConfig {
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  lineHeight?: string;
  borderRadius?: string;
  shadow?: string;
  padding?: string;
  gap?: string;
  arrowWidth?: string;
  arrowHeight?: string;
  iconSize?: string;
  transition?: string;
  ctaFontFamily?: string;
  ctaFontSize?: string;
  ctaLineHeight?: string;
  ctaFontWeight?: string;
  dividerHeight?: string;
}

export interface TooltipThemeConfig {
  base?: BaseConfig;
  variants?: Record<string, VariantConfig>;
}

export interface BuildTooltipStylesParams {
  tooltipConfig: TooltipThemeConfig;
  variant: TarmacTooltipVariant;
}

function getVariantConfig(config: TooltipThemeConfig, variant: string): VariantConfig {
  return config.variants?.[variant] || {};
}

/**
 * Maps tooltip placement (where tooltip appears relative to trigger)
 * to the correct arrow position (which edge of tooltip the arrow sits on).
 *
 * placement=top → tooltip is above trigger → arrow on bottom edge pointing down
 * placement=bottom → tooltip is below trigger → arrow on top edge pointing up
 * placement=left → tooltip is left of trigger → arrow on right edge pointing right
 * placement=right → tooltip is right of trigger → arrow on left edge pointing left
 */
export function placementToArrowPosition(placement: TooltipPlacement): TarmacArrowPosition {
  switch (placement) {
    case 'top':         return 'bottom-mid';
    case 'top-start':   return 'bottom-left';
    case 'top-end':     return 'bottom-right';
    case 'bottom':      return 'top-mid';
    case 'bottom-start': return 'top-left';
    case 'bottom-end':  return 'top-right';
    case 'left':        return 'right-mid';
    case 'left-start':  return 'right-top';
    case 'left-end':    return 'right-bottom';
    case 'right':       return 'left-mid';
    case 'right-start': return 'left-top';
    case 'right-end':   return 'left-bottom';
    default:            return 'bottom-mid';
  }
}

export function buildTooltipContainerStyles(params: BuildTooltipStylesParams): string {
  const { tooltipConfig } = params;
  const base = tooltipConfig.base || {};
  return css({
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
    gap: '0px', boxShadow: base.shadow || '-1px 1px 6px 0px rgba(0,0,0,0.2)', position: 'relative',
  });
}

export function buildTooltipBodyStyles(params: BuildTooltipStylesParams): string {
  const { tooltipConfig, variant } = params;
  const base = tooltipConfig.base || {};
  const vc = getVariantConfig(tooltipConfig, variant);
  return css({
    display: 'flex', gap: base.gap || '4px', alignItems: 'flex-start',
    padding: base.padding || '8px 12px', borderRadius: base.borderRadius || '4px',
    backgroundColor: vc.backgroundColor || '#ffffff',
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: parseInt(base.fontWeight || '500'),
    fontSize: base.fontSize || '14px', lineHeight: base.lineHeight || '20px',
    color: vc.textColor || '#2b2b2b', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
    // No box-shadow here — shadow lives on the outer wrapper so arrow + body share one unified shadow
    position: 'relative', zIndex: 2,
  });
}

export function buildTooltipTextStyles(params: BuildTooltipStylesParams): string {
  const vc = getVariantConfig(params.tooltipConfig, params.variant);
  return css({ color: vc.textColor || '#2b2b2b' });
}

export function buildTooltipTitleStyles(params: BuildTooltipStylesParams): string {
  const { tooltipConfig, variant } = params;
  const base = tooltipConfig.base || {};
  const vc = getVariantConfig(tooltipConfig, variant);
  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: parseInt(base.fontWeight || '500'),
    fontSize: base.fontSize || '14px', lineHeight: base.lineHeight || '20px',
    color: vc.titleColor || vc.textColor || '#2b2b2b',
  });
}

export function buildTooltipDescriptionStyles(params: BuildTooltipStylesParams): string {
  const { tooltipConfig, variant } = params;
  const base = tooltipConfig.base || {};
  const vc = getVariantConfig(tooltipConfig, variant);
  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: parseInt(base.fontWeight || '500'),
    fontSize: base.fontSize || '14px', lineHeight: base.lineHeight || '20px',
    color: vc.descriptionColor || vc.textColor || '#454545',
  });
}

export function buildTooltipDividerStyles(params: BuildTooltipStylesParams): string {
  const base = params.tooltipConfig.base || {};
  const vc = getVariantConfig(params.tooltipConfig, params.variant);
  return css({ width: '100%', height: '0px', borderTop: `${base.dividerHeight || '0.5px'} solid ${vc.dividerColor || '#2b2b2b'}` });
}

export function buildTooltipCtaStyles(params: BuildTooltipStylesParams, ctaType: 'primary' | 'secondary' | 'highlight'): string {
  const base = params.tooltipConfig.base || {};
  const vc = getVariantConfig(params.tooltipConfig, params.variant);
  const colorMap = { primary: vc.ctaPrimaryTextColor || '#2b2b2b', secondary: vc.ctaSecondaryTextColor || '#2396fb', highlight: vc.ctaHighlightTextColor || '#6cb9fc' };
  return css({
    fontFamily: base.ctaFontFamily || 'Noto Sans, sans-serif',
    fontWeight: parseInt(base.ctaFontWeight || '500'),
    fontSize: base.ctaFontSize || '10px', lineHeight: base.ctaLineHeight || '12px',
    color: colorMap[ctaType], padding: '6px', borderRadius: base.borderRadius || '6px',
    cursor: 'pointer', background: 'none', border: 'none', whiteSpace: 'nowrap',
  });
}

export function buildTooltipIconWrapStyles(params: BuildTooltipStylesParams): string {
  const base = params.tooltipConfig.base || {};
  return css({
    display: 'flex', alignItems: 'center', padding: '2px 0', flexShrink: 0,
    '& > *': { width: base.iconSize || '16px', height: base.iconSize || '16px' },
  });
}

/**
 * CSS-only arrow using the ::before pseudo-element pattern.
 *
 * A rotated square sits on the tooltip edge. The body (z-index:2) covers
 * the inner half so only the outward triangle + its shadow are visible.
 *
 * Figma arrow bounding box: 8×14 (left/right) or 14×8 (top/bottom).
 * A 10px rotated square produces a ~14px diagonal — matching the design.
 *
 * Shadow: -1px 1px 6px 0px rgba(0,0,0,0.2) — Figma "Raised/secondary".
 */

const NOTCH_SIZE = 14;   // rotated square side length (px) — diagonal ~14px matches Figma 14×8 / 8×14 arrow
const EDGE_OFFSET_H = 16;  // horizontal edge offset for top/bottom arrows (Figma: padding 0px 16px)
const EDGE_OFFSET_V = 16;   // vertical edge offset for left/right arrows (Figma: padding 8px 0px)
const TOOLTIP_SHADOW = 'drop-shadow(-1px 1px 6px rgba(0, 0, 0, 0.20))';

export function buildCssArrowStyles(arrowPosition: TarmacArrowPosition, bgColor: string): string {
  const edge = arrowPosition.split('-')[0] as 'top' | 'bottom' | 'left' | 'right';
  const align = arrowPosition.split('-')[1] as 'left' | 'mid' | 'right' | 'top' | 'bottom';

  // Edge position: half the notch sticks out
  const edgePos: Record<string, Record<string, string>> = {
    top:    { top: `${-(NOTCH_SIZE / 2) + 1}px` },
    bottom: { bottom: `${-(NOTCH_SIZE / 2) + 1}px` },
    left:   { left: `${-(NOTCH_SIZE / 2)+ 1}px` },
    right:  { right: `${-(NOTCH_SIZE / 2)+ 1}px` },
  };

  // Alignment along the edge
  let alignPos: Record<string, string> = {};
  if (edge === 'top' || edge === 'bottom') {
    switch (align) {
      case 'left':  alignPos = { left: `${EDGE_OFFSET_H}px` }; break;
      case 'right': alignPos = { right: `${EDGE_OFFSET_H}px` }; break;
      default:      alignPos = { left: `calc(50% - ${NOTCH_SIZE / 2}px)` }; break;
    }
  } else {
    switch (align) {
      case 'top':    alignPos = { top: `${EDGE_OFFSET_V}px` }; break;
      case 'bottom': alignPos = { bottom: `${EDGE_OFFSET_V}px` }; break;
      default:       alignPos = { top: `calc(50% - ${NOTCH_SIZE / 2}px)` }; break;
    }
  }

  return css({
    '&::before': {
      content: '""',
      position: 'absolute',
      width: `${NOTCH_SIZE}px`,
      height: `${NOTCH_SIZE}px`,
      background: bgColor,
      transform: 'rotate(45deg)',
      borderRadius: '2px',
      // No box-shadow here — the outer wrapper uses filter: drop-shadow
      // which casts a unified shadow around body + arrow combined
      zIndex: 1,
      ...edgePos[edge],
      ...alignPos,
    },
  });
}

/**
 * Outer wrapper uses filter: drop-shadow() instead of box-shadow.
 * drop-shadow follows the actual rendered pixel shape (body + ::before arrow),
 * producing one unified shadow around the entire tooltip — arrow included.
 * This is what makes the arrow look like a seamless part of the card.
 */
export function buildTooltipOuterStyles(_arrowPosition: TarmacArrowPosition): string {
  return css({
    position: 'relative',
    filter: TOOLTIP_SHADOW,
  });
}
