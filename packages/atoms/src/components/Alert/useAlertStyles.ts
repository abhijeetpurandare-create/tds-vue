import { css } from '@emotion/css';

export type TarmacAlertVariant = 'white' | 'black' | 'coal' | 'success' | 'error' | 'info' | 'warning';
export type TarmacAlertStyle = 'singleText' | 'dualText';
export type TarmacAlertSize = 'lg' | 'sm';

interface VariantConfig {
  backgroundColor?: string;
  borderColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  iconColor?: string;
  singleTextColor?: string;
}

interface SizeConfig {
  padding?: string;
  titleFontSize?: string;
  titleLineHeight?: string;
  titleFontWeight?: string;
  descriptionFontSize?: string;
  descriptionLineHeight?: string;
  singleTextFontSize?: string;
  singleTextLineHeight?: string;
  iconSize?: string;
  contentGap?: string;
  iconGap?: string;
  textGap?: string;
}

interface BaseConfig {
  fontFamily?: string;
  captionFontFamily?: string;
  borderRadius?: string;
  shadow?: string;
  transition?: string;
}

export interface AlertThemeConfig {
  base?: BaseConfig;
  variants?: Record<string, VariantConfig>;
  sizes?: Record<string, SizeConfig>;
}

export interface BuildAlertStylesParams {
  alertConfig: AlertThemeConfig;
  variant: TarmacAlertVariant;
  size: TarmacAlertSize;
}

function getVariantConfig(config: AlertThemeConfig, variant: string): VariantConfig {
  return config.variants?.[variant] || {};
}

function getSizeConfig(config: AlertThemeConfig, size: string): SizeConfig {
  return config.sizes?.[size] || {};
}

/**
 * Outer container: flex row, gap=0, items-start, padding=12px, bg, shadow, radius.
 * Figma: the container is a horizontal flex with gap=0.
 * Children: innerColumn + (optional) close button at same level.
 */
export function buildAlertContainerStyles(params: BuildAlertStylesParams): string {
  const { alertConfig } = params;
  const base = alertConfig.base || {};
  const vc = getVariantConfig(alertConfig, params.variant);
  const sc = getSizeConfig(alertConfig, params.size);

  return css({
    display: 'flex',
    alignItems: 'flex-start',
    gap: 0,
    width: '100%',
    padding: sc.padding || '12px',
    borderRadius: base.borderRadius || '4px',
    boxShadow: base.shadow || '0px 0px 4px 0px rgba(0,0,0,0.1)',
    backgroundColor: vc.backgroundColor || '#ffffff',
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    transition: base.transition || 'all 0.15s ease-in-out',
    boxSizing: 'border-box',
    position: 'relative',
  });
}

/**
 * Inner column wrapper: flex col, gap=contentGap, flex-1.
 * Figma: flex-[1_0_0], flex-col, gap=8px(lg)/10px(sm), items-start, min-h-px, min-w-px.
 * Holds: row + CTAs.
 */
export function buildAlertInnerColumnStyles(params: BuildAlertStylesParams): string {
  const sc = getSizeConfig(params.alertConfig, params.size);
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: sc.contentGap || '8px',
    flex: '1 1 0%',
    alignItems: 'flex-start',
    minWidth: 0,
    minHeight: '1px',
  });
}

/**
 * Row: icon + textColumn + trailingIcon, horizontal flex.
 * Figma: flex, gap=10px(lg)/6px(sm), items-start, w-full.
 */
export function buildAlertRowStyles(params: BuildAlertStylesParams): string {
  const sc = getSizeConfig(params.alertConfig, params.size);
  return css({
    display: 'flex',
    alignItems: 'flex-start',
    gap: sc.iconGap || '10px',
    width: '100%',
  });
}

/**
 * Text column: holds textBlock + badges.
 * Figma: flex-[1_0_0], flex-col, gap=8px (contentGap), items-start, min-h-px, min-w-px.
 */
export function buildAlertTextColumnStyles(params: BuildAlertStylesParams): string {
  const sc = getSizeConfig(params.alertConfig, params.size);
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: sc.contentGap || '8px',
    flex: '1 1 0%',
    alignItems: 'flex-start',
    minWidth: 0,
    minHeight: '1px',
  });
}

/**
 * Text block: title + description stacked.
 * Figma: flex-col, gap=4px (textGap), items-start, w-full.
 */
export function buildAlertTextBlockStyles(params: BuildAlertStylesParams): string {
  const sc = getSizeConfig(params.alertConfig, params.size);
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: sc.textGap || '4px',
    alignItems: 'flex-start',
    width: '100%',
  });
}

/**
 * Dual text title.
 * Figma lg: font-family=body, font-weight=regular(400), 16px/24px, color=Only Black #121212.
 * Figma sm: font-family=body, font-weight=medium(500), 14px/20px, color=Only Black #121212.
 */
export function buildAlertTitleStyles(params: BuildAlertStylesParams): string {
  const { alertConfig, variant, size } = params;
  const base = alertConfig.base || {};
  const vc = getVariantConfig(alertConfig, variant);
  const sc = getSizeConfig(alertConfig, size);

  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: sc.titleFontWeight ? Number(sc.titleFontWeight) : (size === 'sm' ? 500 : 400),
    fontSize: sc.titleFontSize || '16px',
    lineHeight: sc.titleLineHeight || '24px',
    color: vc.titleColor || '#121212',
    margin: 0,
    width: '100%',
  });
}

/**
 * Dual text description.
 * Figma lg: font-family=body, font-weight=regular(400), 14px/20px, color=Secondary #3b3b3b.
 * Figma sm: font-family=caption, font-weight=regular(400), 12px/16px, color=Secondary #3b3b3b.
 */
export function buildAlertDescriptionStyles(params: BuildAlertStylesParams): string {
  const { alertConfig, variant, size } = params;
  const base = alertConfig.base || {};
  const vc = getVariantConfig(alertConfig, variant);
  const sc = getSizeConfig(alertConfig, size);

  return css({
    fontFamily: size === 'sm'
      ? (base.captionFontFamily || base.fontFamily || 'Noto Sans, sans-serif')
      : (base.fontFamily || 'Noto Sans, sans-serif'),
    fontWeight: 400,
    fontSize: sc.descriptionFontSize || '14px',
    lineHeight: sc.descriptionLineHeight || '20px',
    color: vc.descriptionColor || '#3b3b3b',
    margin: 0,
    width: '100%',
  });
}

/**
 * Single text body.
 * Figma lg: font-family=body, font-weight=regular(400), 16px/24px, color=Primary #2b2b2b.
 * Figma sm: same pattern but 14px/20px.
 */
export function buildAlertSingleTextStyles(params: BuildAlertStylesParams): string {
  const { alertConfig, variant, size } = params;
  const base = alertConfig.base || {};
  const vc = getVariantConfig(alertConfig, variant);
  const sc = getSizeConfig(alertConfig, size);

  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: 400,
    fontSize: sc.singleTextFontSize || sc.titleFontSize || '16px',
    lineHeight: sc.singleTextLineHeight || sc.titleLineHeight || '24px',
    color: vc.singleTextColor || vc.descriptionColor || '#2b2b2b',
    margin: 0,
    width: '100%',
  });
}

/**
 * Icon wrapper: flex, items-center, shrink-0.
 * Figma: flex, items-center, padding=0, shrink-0.
 */
export function buildAlertIconWrapStyles(params: BuildAlertStylesParams): string {
  const { alertConfig, variant, size } = params;
  const vc = getVariantConfig(alertConfig, variant);
  const sc = getSizeConfig(alertConfig, size);
  const iconSize = sc.iconSize || '24px';

  return css({
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    color: vc.iconColor || '#2b2b2b',
    '& > *': { width: iconSize, height: iconSize },
  });
}

/** CTAs row: right-aligned, full width. Figma: flex, gap=8px, items-center, justify-end, w-full. */
export function buildAlertCtaStyles(): string {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8px',
    width: '100%',
  });
}

/** Close button styles (for legacy closable support). */
export function buildAlertCloseButtonStyles(params: BuildAlertStylesParams): string {
  const vc = getVariantConfig(params.alertConfig, params.variant);
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: '4px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: vc.iconColor || '#2b2b2b',
    opacity: 0.6,
    transition: 'opacity 0.15s',
    '&:hover': { opacity: 1 },
  });
}
