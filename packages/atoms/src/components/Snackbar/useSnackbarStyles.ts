import { css } from '@emotion/css';

export type SnackbarVariant = 'black' | 'white' | 'info' | 'positive' | 'negative' | 'warning' | (string & {});
export type SnackbarStyle = 'filled' | 'subtle' | 'outlined';
export type SnackbarSize = 'sm' | 'md' | 'lg';

interface VariantStyleConfig {
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  borderColor?: string;
  ctaColor?: string;
}

interface SizeConfig {
  padding?: string;
  paddingSingleText?: string;
  paddingDualText?: string;
  fontSize?: string;
  lineHeight?: string;
  titleFontWeight?: string;
  descFontSize?: string;
  descLineHeight?: string;
  descFontWeight?: string;
  iconSize?: string;
  gap?: string;
  textGap?: string;
  ctaFontSize?: string;
  ctaLineHeight?: string;
  ctaPadding?: string;
}

interface BaseConfig {
  fontFamily?: string;
  borderRadius?: string;
  shadow?: string;
  transition?: string;
  borderWidth?: string;
}

export interface SnackbarThemeConfig {
  base?: BaseConfig;
  styles?: Record<string, Record<string, VariantStyleConfig>>;
  sizes?: Record<string, SizeConfig>;
}

export interface BuildSnackbarStylesParams {
  snackbarConfig: SnackbarThemeConfig;
  variant: string;
  snackbarStyle: SnackbarStyle;
  size: SnackbarSize;
  isVisible: boolean;
}

/* ── Figma-derived fallback defaults ─────────────────────────────────────── */

const DEFAULT_SIZE_CONFIGS: Record<SnackbarSize, Required<SizeConfig>> = {
  lg: {
    padding: '8px 12px',
    paddingSingleText: '8px 12px',
    paddingDualText: '12px 16px',
    fontSize: '16px',
    lineHeight: '24px',
    titleFontWeight: '400',
    descFontSize: '14px',
    descLineHeight: '20px',
    descFontWeight: '400',
    iconSize: '24px',
    gap: '12px',
    textGap: '4px',
    ctaFontSize: '14px',
    ctaLineHeight: '20px',
    ctaPadding: '8px',
  },
  md: {
    padding: '8px 12px',
    paddingSingleText: '8px 12px',
    paddingDualText: '12px',
    fontSize: '14px',
    lineHeight: '20px',
    titleFontWeight: '400',
    descFontSize: '12px',
    descLineHeight: '16px',
    descFontWeight: '300',
    iconSize: '20px',
    gap: '12px',
    textGap: '4px',
    ctaFontSize: '12px',
    ctaLineHeight: '16px',
    ctaPadding: '6px',
  },
  sm: {
    padding: '6px 12px',
    paddingSingleText: '6px 12px',
    paddingDualText: '8px 12px',
    fontSize: '12px',
    lineHeight: '16px',
    titleFontWeight: '400',
    descFontSize: '10px',
    descLineHeight: '12px',
    descFontWeight: '300',
    iconSize: '20px',
    gap: '12px',
    textGap: '2px',
    ctaFontSize: '12px',
    ctaLineHeight: '16px',
    ctaPadding: '6px',
  },
};

const DEFAULT_FILLED_VARIANTS: Record<string, VariantStyleConfig> = {
  black: { backgroundColor: '#000000', textColor: '#f2f2f2', titleColor: '#f2f2f2', descriptionColor: '#e6e6e6', ctaColor: '#e6e6e6' },
  white: { backgroundColor: '#ffffff', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#3b3b3b', ctaColor: '#2b2b2b' },
  info: { backgroundColor: '#2396fb', textColor: '#e6e6e6', titleColor: '#e6e6e6', descriptionColor: '#e6e6e6', ctaColor: '#e6e6e6' },
  positive: { backgroundColor: '#1ba86e', textColor: '#e6e6e6', titleColor: '#e6e6e6', descriptionColor: '#e6e6e6', ctaColor: '#e6e6e6' },
  negative: { backgroundColor: '#dc143c', textColor: '#e6e6e6', titleColor: '#e6e6e6', descriptionColor: '#e6e6e6', ctaColor: '#e6e6e6' },
  warning: { backgroundColor: '#f5c828', textColor: '#7b6414', titleColor: '#52430d', descriptionColor: '#7b6414', ctaColor: '#2b2b2b' },
};

const DEFAULT_SUBTLE_VARIANTS: Record<string, VariantStyleConfig> = {
  black: { backgroundColor: '#333333', textColor: '#f2f2f2', titleColor: '#f2f2f2', descriptionColor: '#e6e6e6', ctaColor: '#e6e6e6' },
  white: { backgroundColor: '#f7f7f7', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#3b3b3b', borderColor: '#e6e6e6', ctaColor: '#2b2b2b' },
  info: { backgroundColor: '#e6f3fe', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#2b2b2b', ctaColor: '#2396fb' },
  positive: { backgroundColor: '#ecf8f3', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#2b2b2b', ctaColor: '#1ba86e' },
  negative: { backgroundColor: '#fce9ed', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#2b2b2b', ctaColor: '#dc143c' },
  warning: { backgroundColor: '#fdf4d4', textColor: '#7b6414', titleColor: '#52430d', descriptionColor: '#7b6414', ctaColor: '#f5c828' },
};

const DEFAULT_OUTLINED_VARIANTS: Record<string, VariantStyleConfig> = {
  black: { backgroundColor: 'transparent', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#2b2b2b', borderColor: '#2b2b2b', ctaColor: '#000000' },
  white: { backgroundColor: 'transparent', textColor: '#e6e6e6', titleColor: '#e6e6e6', descriptionColor: '#e6e6e6', borderColor: '#e6e6e6', ctaColor: '#ffffff' },
  info: { backgroundColor: 'transparent', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#2b2b2b', borderColor: '#48a7fc', ctaColor: '#2396fb' },
  positive: { backgroundColor: 'transparent', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#2b2b2b', borderColor: '#41b686', ctaColor: '#1ba86e' },
  negative: { backgroundColor: 'transparent', textColor: '#2b2b2b', titleColor: '#2b2b2b', descriptionColor: '#2b2b2b', borderColor: '#e23b5d', ctaColor: '#dc143c' },
  warning: { backgroundColor: 'transparent', textColor: '#7b6414', titleColor: '#52430d', descriptionColor: '#7b6414', borderColor: '#f5c828', ctaColor: '#f5c828' },
};

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function getVariantConfig(config: SnackbarThemeConfig, snackbarStyle: string, variant: string): VariantStyleConfig {
  const themeVC = config.styles?.[snackbarStyle]?.[variant];
  const fallbackMap = snackbarStyle === 'outlined' ? DEFAULT_OUTLINED_VARIANTS
    : snackbarStyle === 'subtle' ? DEFAULT_SUBTLE_VARIANTS
    : DEFAULT_FILLED_VARIANTS;
  const fallback = fallbackMap[variant] || fallbackMap.black;
  return { ...fallback, ...themeVC };
}

function getSizeConfig(config: SnackbarThemeConfig, size: SnackbarSize): Required<SizeConfig> {
  const themeSC = config.sizes?.[size];
  const fallback = DEFAULT_SIZE_CONFIGS[size] || DEFAULT_SIZE_CONFIGS.md;
  const merged = { ...fallback, ...themeSC };
  // Theme may provide a single `padding` key — use it for both single/dual if specific keys aren't set
  if (merged.padding && !themeSC?.paddingSingleText) {
    merged.paddingSingleText = merged.padding;
  }
  if (merged.padding && !themeSC?.paddingDualText) {
    merged.paddingDualText = merged.padding;
  }
  return merged as Required<SizeConfig>;
}

/* ── Style builders ──────────────────────────────────────────────────────── */

export function buildSnackbarContainerStyles(params: BuildSnackbarStylesParams, isDualText: boolean): string {
  const { snackbarConfig, variant, snackbarStyle, size, isVisible } = params;
  const base = snackbarConfig.base || {};
  const vc = getVariantConfig(snackbarConfig, snackbarStyle, variant);
  const sc = getSizeConfig(snackbarConfig, size);

  const padding = isDualText ? sc.paddingDualText : sc.paddingSingleText;
  const borderWidth = base.borderWidth || '1px';

  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: sc.gap,
    width: '100%',
    padding,
    borderRadius: base.borderRadius || '4px',
    backgroundColor: vc.backgroundColor,
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    boxShadow: base.shadow || '0px 4px 12px 0px rgba(0,0,0,0.1)',
    transition: base.transition || 'all 0.3s ease-in-out',
    border: vc.borderColor ? `${borderWidth} solid ${vc.borderColor}` : 'none',
    opacity: isVisible ? 1 : 0,
    transform: `translateY(${isVisible ? '0' : '12px'})`,
    boxSizing: 'border-box',
  });
}

export function buildSnackbarIconWrapStyles(params: BuildSnackbarStylesParams, align: 'center' | 'start' = 'center'): string {
  const { snackbarConfig, variant, snackbarStyle, size } = params;
  const vc = getVariantConfig(snackbarConfig, snackbarStyle, variant);
  const sc = getSizeConfig(snackbarConfig, size);

  return css({
    display: 'flex',
    alignItems: align === 'start' ? 'flex-start' : 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingTop: align === 'start' ? '4px' : undefined,
    flexShrink: 0,
    color: vc.textColor,
    '& > *': { width: sc.iconSize, height: sc.iconSize },
  });
}

export function buildSnackbarTextBlockStyles(params: BuildSnackbarStylesParams): string {
  const { snackbarConfig, size } = params;
  const sc = getSizeConfig(snackbarConfig, size);

  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: sc.textGap,
    flex: '1 1 0%',
    minWidth: 0,
    overflow: 'hidden',
    justifyContent: 'center',
  });
}

export function buildSnackbarTitleStyles(params: BuildSnackbarStylesParams): string {
  const { snackbarConfig, variant, snackbarStyle, size } = params;
  const base = snackbarConfig.base || {};
  const vc = getVariantConfig(snackbarConfig, snackbarStyle, variant);
  const sc = getSizeConfig(snackbarConfig, size);

  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(sc.titleFontWeight),
    fontSize: sc.fontSize,
    lineHeight: sc.lineHeight,
    color: vc.titleColor || vc.textColor,
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
}

export function buildSnackbarDescriptionStyles(params: BuildSnackbarStylesParams): string {
  const { snackbarConfig, variant, snackbarStyle, size } = params;
  const base = snackbarConfig.base || {};
  const vc = getVariantConfig(snackbarConfig, snackbarStyle, variant);
  const sc = getSizeConfig(snackbarConfig, size);

  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(sc.descFontWeight),
    fontSize: sc.descFontSize,
    lineHeight: sc.descLineHeight,
    color: vc.descriptionColor || vc.textColor,
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
}

export function buildSnackbarSingleTextStyles(params: BuildSnackbarStylesParams): string {
  const { snackbarConfig, variant, snackbarStyle, size } = params;
  const base = snackbarConfig.base || {};
  const vc = getVariantConfig(snackbarConfig, snackbarStyle, variant);
  const sc = getSizeConfig(snackbarConfig, size);

  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: 400,
    fontSize: sc.fontSize,
    lineHeight: sc.lineHeight,
    color: vc.textColor,
    flex: '1 1 0%',
    minWidth: 0,
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
}

export function buildSnackbarCtaContainerStyles(): string {
  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    flexShrink: 0,
  });
}

export function buildSnackbarCtaButtonStyles(params: BuildSnackbarStylesParams, weight: 'light' | 'medium'): string {
  const { snackbarConfig, variant, snackbarStyle, size } = params;
  const base = snackbarConfig.base || {};
  const vc = getVariantConfig(snackbarConfig, snackbarStyle, variant);
  const sc = getSizeConfig(snackbarConfig, size);

  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    padding: sc.ctaPadding,
    border: 'none',
    borderRadius: '4px',
    background: 'none',
    cursor: 'pointer',
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: weight === 'medium' ? 500 : 300,
    fontSize: sc.ctaFontSize,
    lineHeight: sc.ctaLineHeight,
    color: vc.ctaColor || '#2396fb',
    whiteSpace: 'nowrap',
    '&:hover': { opacity: 0.8 },
    '&:active': { opacity: 0.6 },
  });
}

export function buildSnackbarTrailingIconStyles(params: BuildSnackbarStylesParams): string {
  const { snackbarConfig, variant, snackbarStyle, size } = params;
  const vc = getVariantConfig(snackbarConfig, snackbarStyle, variant);
  const sc = getSizeConfig(snackbarConfig, size);

  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: sc.iconSize,
    height: sc.iconSize,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: vc.textColor,
    padding: 0,
    opacity: 0.7,
    '&:hover': { opacity: 1 },
  });
}
