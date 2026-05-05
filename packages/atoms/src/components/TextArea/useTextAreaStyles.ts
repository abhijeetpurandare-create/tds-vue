import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

// ─── Config Shape Interfaces ─────────────────────────────────────────────────

export interface TextAreaTypeConfig {
  borderColor?: string;
  textColor?: string;
  placeholderColor?: string;
  helperTextColor?: string;
  statusTextColor?: string;
  hoverBorderColor?: string;
  activeBorderColor?: string;
  focusRingColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  labelColor?: string;
  subtextColor?: string;
  descriptionColor?: string;
  iconColor?: string;
  // Per-type disabled tokens
  disabledBorderColor?: string;
  disabledTextColor?: string;
  disabledLabelColor?: string;
  disabledHelperTextColor?: string;
  disabledIconColor?: string;
  disabledStatusTextColor?: string;
  disabledSubtextColor?: string;
  disabledDescriptionColor?: string;
}

export interface TextAreaSizeConfig {
  minHeight?: string;
  fontSize?: string;
  lineHeight?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
  iconSize?: string;
  iconGap?: string;
  titleFontSize?: string;
  titleLineHeight?: string;
  helperFontSize?: string;
  helperLineHeight?: string;
  descriptionFontSize?: string;
  descriptionLineHeight?: string;
  titleIconSize?: string;
  containerGap?: string;
  tagsGap?: string;
}

export interface TextAreaStateConfig {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  labelColor?: string;
  placeholderColor?: string;
  helperTextColor?: string;
  mandatoryColor?: string;
  statusTextColor?: string;
  subtextColor?: string;
  descriptionColor?: string;
  cursor?: string;
  pointerEvents?: string;
}

export interface TextAreaConfig {
  base: {
    fontFamily?: string;
    fontWeight?: string;
    radius?: string;
    transition?: string;
    focusRingSpread?: string;
  };
  types: Record<string, TextAreaTypeConfig>;
  sizes: Record<string, TextAreaSizeConfig>;
  states: {
    disabled?: TextAreaStateConfig & { [key: string]: any };
    ghost?: TextAreaStateConfig & { [key: string]: any };
  };
}

export interface TextAreaStyleParams {
  config: TextAreaConfig;
  textAreaType: string;
  textAreaSize: string;
  styleVariant: string;
  isDisabled: boolean;
  isGhost: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert raw number or string to CSS dimension (e.g. 16 → "16px", "16px" → "16px") */
function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}

function getTypeConfig(config: TextAreaConfig, textAreaType: string): TextAreaTypeConfig {
  return config.types?.[textAreaType] || {};
}

function getSizeConfig(config: TextAreaConfig, textAreaSize: string): TextAreaSizeConfig {
  return config.sizes?.[textAreaSize] || {};
}

// ─── Outer Container Styles ──────────────────────────────────────────────────
// Figma: flex-col, gap=containerGap, items-start, w-full

export function buildTextAreaContainerStyles(params: TextAreaStyleParams): string {
  const { config, textAreaSize, isGhost } = params;
  const sc = getSizeConfig(config, textAreaSize);

  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: dim(sc.containerGap, '8px'),
    alignItems: 'flex-start',
    width: '100%',
    ...(isGhost && { pointerEvents: 'none' }),
  });
}

// ─── Textarea Input Container Styles (bordered area with pseudo-states) ──────
// Figma: flex-col, border=1px solid, rounded, bg, transition, padding, gap

export function buildTextAreaInputContainerStyles(params: TextAreaStyleParams): string {
  const { config, textAreaType, textAreaSize, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, textAreaType);
  const sc = getSizeConfig(config, textAreaSize);
  const disabledState = config.states?.disabled || {};
  const ghostState = config.states?.ghost || {};

  const radius = dim(base.radius, '6px');
  const padV = dim(sc.paddingVertical, '12px');
  const padH = dim(sc.paddingHorizontal, '12px');

  return css({
    display: 'flex',
    // Figma: flex row with items-start, gap=4px
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    minHeight: '100px',
    resize: 'vertical' as any,
    backgroundColor: tc.backgroundColor,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tc.borderColor,
    borderRadius: radius,
    transition: base.transition || 'all 0.15s ease-in-out',
    padding: `${padV} ${padH}`,
    gap: dim(sc.iconGap, '4px'),
    boxSizing: 'border-box',
    overflow: 'auto',

    '&:hover:not(.disabled):not(.ghost)': {
      borderColor: tc.hoverBorderColor,
      backgroundColor: tc.hoverBackgroundColor,
    },
    '&:active:not(.disabled):not(.ghost)': {
      borderColor: tc.activeBorderColor,
    },
    '&:focus-within:not(.disabled):not(.ghost)': {
      boxShadow: tc.focusRingColor
        ? `0 0 0 ${base.focusRingSpread || '2px'} ${tc.focusRingColor}`
        : undefined,
      borderColor: tc.activeBorderColor,
    },

    // Disabled overrides — use per-type disabled tokens when available
    ...(isDisabled && {
      backgroundColor: tc.disabledBorderColor ? (disabledState.backgroundColor || tc.backgroundColor) : disabledState.backgroundColor,
      borderColor: tc.disabledBorderColor || disabledState.borderColor,
      color: tc.disabledTextColor || disabledState.textColor,
      cursor: disabledState.cursor || 'default',
    }),
    // Ghost overrides
    ...(isGhost && {
      backgroundColor: ghostState.backgroundColor,
      borderColor: ghostState.borderColor,
      color: ghostState.textColor,
      cursor: ghostState.cursor || 'default',
      pointerEvents: (ghostState.pointerEvents as 'none') || 'none',
    }),
  });
}

// ─── Textarea Element Styles (native <textarea>) ─────────────────────────────
// Figma: flex-1, no border, transparent bg, font, resize

export function buildTextAreaElementStyles(
  params: TextAreaStyleParams,
  resize: string = 'vertical',
): string {
  const { config, textAreaType, textAreaSize, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, textAreaType);
  const sc = getSizeConfig(config, textAreaSize);
  const disabledState = config.states?.disabled || {};
  const ghostState = config.states?.ghost || {};

  return css({
    flex: '1 0 0',
    width: '100%',
    minWidth: '1px',
    minHeight: '1px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 500,
    fontSize: dim(sc.fontSize, '14px'),
    lineHeight: dim(sc.lineHeight, '20px'),
    color: tc.textColor,
    padding: 0,
    resize: 'none',
    // Suppress all native textarea chrome
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    boxShadow: 'none',
    '&:focus': { outline: 'none', boxShadow: 'none' },
    '&:focus-visible': { outline: 'none', boxShadow: 'none' },

    '&::placeholder': { color: tc.placeholderColor },

    // Disabled — use per-type disabled tokens
    ...(isDisabled && {
      color: tc.disabledTextColor || disabledState.textColor,
      cursor: disabledState.cursor || 'default',
      '&::placeholder': { color: disabledState.placeholderColor },
    }),
    // Ghost
    ...(isGhost && {
      color: ghostState.textColor,
      cursor: ghostState.cursor || 'default',
    }),
  });
}

// ─── Title Section Styles ────────────────────────────────────────────────────
// Figma: Title container is flex-col with title row + description.
//   Title row: flex, gap=4px, items-center (titleIcon + label + mandatory + helperTextTop)

export function buildTitleSectionStyles(params: TextAreaStyleParams): {
  titleContainer: string;
  titleRow: string;
  labelStyles: string;
  mandatoryStyles: string;
  titleIconStyles: string;
  descriptionStyles: string;
} {
  const { config, textAreaType, textAreaSize, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, textAreaType);
  const sc = getSizeConfig(config, textAreaSize);
  const disabledState = config.states?.disabled || {};
  const ghostState = config.states?.ghost || {};

  const labelColor = isGhost
    ? (ghostState.labelColor || 'transparent')
    : isDisabled
      ? (tc.disabledLabelColor || disabledState.labelColor || tc.labelColor)
      : tc.labelColor;

  const mandatoryColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (disabledState.mandatoryColor || '#ed1b36')
      : '#ed1b36';

  const descriptionColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (tc.disabledDescriptionColor || disabledState.descriptionColor || tc.descriptionColor)
      : tc.descriptionColor;

  const titleContainer = css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  });

  const titleRow = css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    width: '100%',
  });

  const labelStyles = css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 500,
    fontSize: dim(sc.titleFontSize, '14px'),
    lineHeight: dim(sc.titleLineHeight, '20px'),
    color: labelColor,
    margin: 0,
    whiteSpace: 'nowrap',
  });

  const mandatoryStyles = css({
    color: mandatoryColor,
    fontWeight: Number(base.fontWeight) || 500,
    fontSize: dim(sc.titleFontSize, '14px'),
    lineHeight: dim(sc.titleLineHeight, '20px'),
  });

  const titleIconStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    width: dim(sc.titleIconSize, '20px'),
    height: dim(sc.titleIconSize, '20px'),
    overflow: 'clip',
    '& > *': {
      width: dim(sc.titleIconSize, '20px'),
      height: dim(sc.titleIconSize, '20px'),
    },
  });

  const descriptionStyles = css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 500,
    fontSize: dim(sc.descriptionFontSize, '12px'),
    lineHeight: dim(sc.descriptionLineHeight, '16px'),
    color: descriptionColor,
    margin: 0,
  });

  return { titleContainer, titleRow, labelStyles, mandatoryStyles, titleIconStyles, descriptionStyles };
}

// ─── Helper Text Styles ──────────────────────────────────────────────────────

export function buildHelperTextStyles(params: TextAreaStyleParams): {
  helperTextTopWrapperStyles: string;
  helperTextTopStyles: string;
  helperTextBottomStyles: string;
} {
  const { config, textAreaType, textAreaSize, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, textAreaType);
  const sc = getSizeConfig(config, textAreaSize);
  const disabledState = config.states?.disabled || {};

  const helperColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (tc.disabledHelperTextColor || disabledState.helperTextColor || tc.helperTextColor)
      : tc.helperTextColor;

  const shared = {
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 500,
    fontSize: dim(sc.helperFontSize, '12px'),
    lineHeight: dim(sc.helperLineHeight, '16px'),
    color: helperColor,
    margin: 0,
    whiteSpace: 'nowrap' as const,
  };

  const helperTextTopWrapperStyles = css({
    display: 'flex',
    flex: '1 0 0',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minWidth: '1px',
    minHeight: '1px',
  });

  return {
    helperTextTopWrapperStyles,
    helperTextTopStyles: css(shared),
    helperTextBottomStyles: css(shared),
  };
}

// ─── Subtext Container Styles ────────────────────────────────────────────────
// Figma: flex, items-center, w-full > inner: flex, flex-1, gap=6px, items-center

export function buildSubtextContainerStyles(params: TextAreaStyleParams): {
  subtextContainer: string;
  subtextStyles: string;
} {
  const { config, textAreaType, textAreaSize, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, textAreaType);
  const sc = getSizeConfig(config, textAreaSize);
  const disabledState = config.states?.disabled || {};

  const subtextColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (tc.disabledSubtextColor || disabledState.subtextColor || tc.subtextColor)
      : tc.subtextColor;

  const subtextContainer = css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexShrink: 0,
    '& > div': {
      display: 'flex',
      flex: '1 0 0',
      gap: '6px',
      alignItems: 'center',
      minWidth: '1px',
      minHeight: '1px',
    },
  });

  const subtextStyles = css({
    flex: '1 0 0',
    minWidth: '1px',
    minHeight: '1px',
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 500,
    fontSize: dim(sc.helperFontSize, '12px'),
    lineHeight: dim(sc.helperLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
  });

  return { subtextContainer, subtextStyles };
}

// ─── Icon Container Styles ───────────────────────────────────────────────────

export function buildIconContainerStyles(params: TextAreaStyleParams): string {
  const { config, textAreaType, textAreaSize, isDisabled, isGhost } = params;
  const tc = getTypeConfig(config, textAreaType);
  const sc = getSizeConfig(config, textAreaSize);
  const disabledState = config.states?.disabled || {};
  const size = dim(sc.iconSize, '20px');

  const iconColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (tc.disabledIconColor || disabledState.textColor || tc.iconColor)
      : tc.iconColor;

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: size,
    height: size,
    overflow: 'clip',
    color: iconColor,
    '& > *': { width: size, height: size },
  });
}

// ─── Status Text Styles ──────────────────────────────────────────────────────

export function buildStatusTextStyles(params: TextAreaStyleParams): string {
  const { config, textAreaType, textAreaSize, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, textAreaType);
  const sc = getSizeConfig(config, textAreaSize);

  const color = isGhost
    ? 'transparent'
    : isDisabled
      ? (tc.disabledStatusTextColor || config.states?.disabled?.statusTextColor || tc.statusTextColor)
      : tc.statusTextColor;

  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 500,
    fontSize: dim(sc.helperFontSize, '12px'),
    lineHeight: dim(sc.helperLineHeight, '16px'),
    color,
    margin: 0,
    whiteSpace: 'nowrap',
  });
}

// ─── Tags Container Styles ───────────────────────────────────────────────────
// Figma: flex, flex-wrap, gap=tagsGap, items-center

export function buildTagsContainerStyles(params: TextAreaStyleParams): string {
  const { config, textAreaSize } = params;
  const sc = getSizeConfig(config, textAreaSize);

  return css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: dim(sc.tagsGap, '4px'),
    alignItems: 'center',
    width: '100%',
  });
}

// ─── Ghost Skeleton Styles ───────────────────────────────────────────────────
// Figma Ghost state: simple grey skeleton blocks, no text/icons/borders

export function buildGhostSkeletonStyles(params: TextAreaStyleParams): {
  skeletonTitle: string;
  skeletonInput: string;
} {
  const { config } = params;
  const base = config.base || {};
  const ghostState = config.states?.ghost || {};
  const bg = ghostState.backgroundColor || '#ededed';

  const skeletonTitle = css({
    width: (ghostState as any).skeletonTitleWidth || '100px',
    height: (ghostState as any).skeletonTitleHeight || '12px',
    borderRadius: dim((ghostState as any).skeletonTitleRadius, '12px'),
    backgroundColor: bg,
    flexShrink: 0,
  });

  const skeletonInput = css({
    width: '100%',
    height: (ghostState as any).skeletonInputHeight || '80px',
    borderRadius: dim((ghostState as any).skeletonInputRadius || base.radius, '6px'),
    backgroundColor: bg,
    flexShrink: 0,
  });

  return { skeletonTitle, skeletonInput };
}
