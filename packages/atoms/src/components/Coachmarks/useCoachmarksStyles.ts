import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

export type CoachmarksVariant = 'white' | 'black' | (string & {});
export type CoachmarksSize = 'sm' | 'lg' | (string & {});
export type CoachmarksArrowPosition =
  | 'top-left' | 'top-mid' | 'top-right'
  | 'bottom-left' | 'bottom-mid' | 'bottom-right'
  | 'left-top' | 'left-mid' | 'left-bottom'
  | 'right-top' | 'right-mid' | 'right-bottom';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

interface VariantConfig {
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  imageBackgroundColor?: string;
  shadow?: string;
  arrowColor?: string;
}

interface SizeConfig {
  width?: string | number;
  imageHeight?: string | number;
  titleFontSize?: string | number;
  titleLineHeight?: string | number;
  titleFontWeight?: string | number;
  descFontSize?: string | number;
  descLineHeight?: string | number;
  padding?: string | number;
  gap?: string | number;
  ctaGap?: string | number;
}

interface BaseConfig {
  fontFamily?: string;
  borderRadius?: string | number;
  imageRadius?: string | number;
  transition?: string;
}

export interface CoachmarksThemeConfig {
  base?: BaseConfig;
  variants?: Record<string, VariantConfig>;
  sizes?: Record<string, SizeConfig>;
}

export interface BuildCoachmarksStylesParams {
  config: CoachmarksThemeConfig;
  variant: CoachmarksVariant;
  size: CoachmarksSize;
}

function getVariantConfig(config: CoachmarksThemeConfig, variant: string): VariantConfig {
  return config.variants?.[variant] || {};
}

function getSizeConfig(config: CoachmarksThemeConfig, size: string): SizeConfig {
  return config.sizes?.[size] || {};
}

const NOTCH_SIZE = 14;
const EDGE_OFFSET_H = 16;
const EDGE_OFFSET_V = 16;

function buildArrowStyles(arrowPosition: CoachmarksArrowPosition, bgColor: string): string {
  const [edge, align] = arrowPosition.split('-') as [string, string];

  const edgePos: Record<string, Record<string, string>> = {
    top:    { top: `${-(NOTCH_SIZE / 2) + 1}px` },
    bottom: { bottom: `${-(NOTCH_SIZE / 2) + 1}px` },
    left:   { left: `${-(NOTCH_SIZE / 2) + 1}px` },
    right:  { right: `${-(NOTCH_SIZE / 2) + 1}px` },
  };

  let alignPos: Record<string, string> = {};
  if (edge === 'top' || edge === 'bottom') {
    if (align === 'left')  alignPos = { left: `${EDGE_OFFSET_H}px` };
    else if (align === 'right') alignPos = { right: `${EDGE_OFFSET_H}px` };
    else alignPos = { left: `calc(50% - ${NOTCH_SIZE / 2}px)` };
  } else {
    if (align === 'top')    alignPos = { top: `${EDGE_OFFSET_V}px` };
    else if (align === 'bottom') alignPos = { bottom: `${EDGE_OFFSET_V}px` };
    else alignPos = { top: `calc(50% - ${NOTCH_SIZE / 2}px)` };
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
      zIndex: 1,
      ...edgePos[edge],
      ...alignPos,
    },
  });
}

export function buildCoachmarksOuterStyles(
  params: BuildCoachmarksStylesParams,
  arrowPosition: CoachmarksArrowPosition
): string {
  const vc = getVariantConfig(params.config, params.variant);
  const shadow = vc.shadow || 'drop-shadow(0px 0px 6px rgba(0,0,0,0.2))';
  const arrowColor = vc.arrowColor || vc.backgroundColor || '#ffffff';
  const arrowCls = buildArrowStyles(arrowPosition, arrowColor);
  return `${css({ position: 'relative', filter: shadow, display: 'inline-block' })} ${arrowCls}`;
}

export function buildCoachmarksBodyStyles(params: BuildCoachmarksStylesParams): string {
  const { config, variant, size } = params;
  const base = config.base || {};
  const vc = getVariantConfig(config, variant);
  const sc = getSizeConfig(config, size);
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: dim(sc.gap, '8px'),
    padding: dim(sc.padding, '12px'),
    borderRadius: dim(base.borderRadius, '6px'),
    backgroundColor: vc.backgroundColor || '#ffffff',
    width: dim(sc.width, '264px'),
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 2,
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
  });
}

export function buildCoachmarksImageStyles(params: BuildCoachmarksStylesParams): string {
  const { config, variant, size } = params;
  const base = config.base || {};
  const vc = getVariantConfig(config, variant);
  const sc = getSizeConfig(config, size);
  return css({
    width: '100%',
    height: dim(sc.imageHeight, '100px'),
    borderRadius: dim(base.imageRadius, '4px'),
    backgroundColor: vc.imageBackgroundColor || '#f2f2f2',
    overflow: 'hidden',
    flexShrink: 0,
    '& > *': { width: '100%', height: '100%', objectFit: 'cover' },
  });
}

export function buildCoachmarksBadgeRowStyles(): string {
  return css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    alignItems: 'center',
  });
}

export function buildCoachmarksTitleStyles(params: BuildCoachmarksStylesParams): string {
  const { config, variant, size } = params;
  const base = config.base || {};
  const vc = getVariantConfig(config, variant);
  const sc = getSizeConfig(config, size);
  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(sc.titleFontWeight) || 500,
    fontSize: dim(sc.titleFontSize, '14px'),
    lineHeight: dim(sc.titleLineHeight, '20px'),
    color: vc.titleColor || '#2b2b2b',
    margin: 0,
  });
}

export function buildCoachmarksDescStyles(params: BuildCoachmarksStylesParams): string {
  const { config, variant, size } = params;
  const base = config.base || {};
  const vc = getVariantConfig(config, variant);
  const sc = getSizeConfig(config, size);
  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: 400,
    fontSize: dim(sc.descFontSize, '12px'),
    lineHeight: dim(sc.descLineHeight, '16px'),
    color: vc.descriptionColor || '#3b3b3b',
    margin: 0,
  });
}

export function buildCoachmarksCtaRowStyles(params: BuildCoachmarksStylesParams): string {
  const { config, size } = params;
  const sc = getSizeConfig(config, size);
  return css({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: dim(sc.ctaGap, '4px'),
  });
}
