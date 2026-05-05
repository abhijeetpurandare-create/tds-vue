import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

// ─── Config Shape Interfaces ─────────────────────────────────────────────────

export interface TypeConfig {
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
  addonBackgroundColor?: string;
  addonTextColor?: string;
  addonBorderColor?: string;
}

export interface SizeConfig {
  height?: string;
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
  titleIconSize?: string;
  containerGap?: string;
}

export interface StateConfig {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  labelColor?: string;
  placeholderColor?: string;
  cursor?: string;
  pointerEvents?: string;
}

export interface InputFieldConfig {
  base: {
    fontFamily?: string;
    fontWeight?: string;
    radius?: string;
    transition?: string;
    focusRingSpread?: string;
  };
  types: Record<string, TypeConfig>;
  sizes: Record<string, SizeConfig>;
  states: { disabled?: StateConfig; ghost?: StateConfig };
}

export interface InputFieldStyleParams {
  config: InputFieldConfig;
  inputType: string;
  inputSize: string;
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

function getTypeConfig(config: InputFieldConfig, inputType: string): TypeConfig {
  return config.types?.[inputType] || {};
}

function getSizeConfig(config: InputFieldConfig, inputSize: string): SizeConfig {
  return config.sizes?.[inputSize] || {};
}

// ─── Main Input Container Styles (used by buildInputFieldStyles for PBT compat) ──

export function buildInputFieldStyles(params: InputFieldStyleParams): string {
  const { config, inputType, inputSize, styleVariant, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, inputType);
  const sc = getSizeConfig(config, inputSize);
  const disabledState = config.states?.disabled || {};
  const ghostState = config.states?.ghost || {};

  const isAddon = styleVariant === 'addonLeft' || styleVariant === 'addonRight';
  const radius = dim(base.radius, '6px');
  const padding = dim(sc.paddingHorizontal, '12px');

  return css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: dim(sc.height),
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: 500,
    fontSize: dim(sc.fontSize, '14px'),
    lineHeight: dim(sc.lineHeight, '20px'),
    backgroundColor: tc.backgroundColor,
    color: tc.textColor,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tc.borderColor,
    borderRadius: isAddon ? undefined : radius,
    transition: base.transition || 'all 0.15s ease-in-out',
    padding,
    gap: dim(sc.iconGap, '4px'),
    boxSizing: 'border-box',
    outline: 'none',
    overflow: 'clip',

    '&::placeholder': { color: tc.placeholderColor },

    '&:hover:not(:disabled):not(.disabled):not(.ghost)': {
      borderColor: tc.hoverBorderColor,
      backgroundColor: tc.hoverBackgroundColor,
    },
    '&:active:not(:disabled):not(.disabled):not(.ghost)': {
      borderColor: tc.activeBorderColor,
    },
    '&:focus:not(:disabled):not(.disabled):not(.ghost)': {
      boxShadow: tc.focusRingColor
        ? `0 0 0 ${base.focusRingSpread || '2px'} ${tc.focusRingColor}`
        : undefined,
      borderColor: tc.activeBorderColor,
      outline: 'none',
    },
    '&:disabled, &.disabled': {
      backgroundColor: disabledState.backgroundColor,
      borderColor: disabledState.borderColor,
      color: disabledState.textColor,
      cursor: disabledState.cursor || 'default',
      '&::placeholder': { color: disabledState.placeholderColor },
    },
    '&.ghost': {
      backgroundColor: ghostState.backgroundColor,
      borderColor: ghostState.borderColor,
      color: ghostState.textColor,
      cursor: ghostState.cursor || 'default',
      pointerEvents: (ghostState.pointerEvents as 'none') || 'none',
    },

    ...(isDisabled && {
      backgroundColor: disabledState.backgroundColor,
      borderColor: disabledState.borderColor,
      color: disabledState.textColor,
      cursor: disabledState.cursor || 'default',
    }),
    ...(isGhost && {
      backgroundColor: ghostState.backgroundColor,
      borderColor: ghostState.borderColor,
      color: ghostState.textColor,
      cursor: ghostState.cursor || 'default',
      pointerEvents: (ghostState.pointerEvents as 'none') || 'none',
    }),
  });
}

// ─── Title Section Styles ────────────────────────────────────────────────────
// Figma: Title container is a row with justify-between.
//   Left side: title + mandatory + titleIcon (flex-1, gap=4px)
//   Right side: helperTextTop (flex-1, justify-end)

export function buildTitleSectionStyles(params: InputFieldStyleParams): {
  titleContainer: string;
  titleRow: string;
  label: string;
  subtext: string;
  mandatoryMarker: string;
  badgeWrapper: string;
  titleIcon: string;
  helperTextTopWrapper: string;
} {
  const { config, inputType, inputSize, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, inputType);
  const sc = getSizeConfig(config, inputSize);
  const disabledState = config.states?.disabled || {};
  const ghostState = config.states?.ghost || {};

  const labelColor = isGhost
    ? (ghostState.labelColor || 'transparent')
    : isDisabled
      ? (disabledState.labelColor || tc.labelColor)
      : tc.labelColor;

  const subtextColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (disabledState.textColor || tc.subtextColor)
      : tc.subtextColor;

  // Figma: outer title container is flex row, items-end, justify-between
  const titleContainer = css({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  });

  // Figma: left side title row — flex, gap=4px, items-center, flex-1
  const titleRow = css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flex: '1 0 0',
    minWidth: '1px',
    minHeight: '1px',
  });

  const label = css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: 500,
    fontSize: dim(sc.titleFontSize, '14px'),
    lineHeight: dim(sc.titleLineHeight, '20px'),
    color: labelColor,
    margin: 0,
    whiteSpace: 'nowrap',
  });

  const subtext = css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: 500,
    fontSize: dim(sc.helperFontSize, '12px'),
    lineHeight: dim(sc.helperLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
  });

  const mandatoryMarker = css({
    color: '#ed1b36', // Figma: text/accent/primary
    fontWeight: 500,
    fontSize: dim(sc.titleFontSize, '14px'),
    lineHeight: dim(sc.titleLineHeight, '20px'),
  });

  const badgeWrapper = css({
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: '4px',
  });

  const titleIcon = css({
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

  // Figma: right side helperTextTop wrapper — flex-1, justify-end, items-end
  const helperTextTopWrapper = css({
    display: 'flex',
    flex: '1 0 0',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minWidth: '1px',
    minHeight: '1px',
  });

  return { titleContainer, titleRow, label, subtext, mandatoryMarker, badgeWrapper, titleIcon, helperTextTopWrapper };
}

// ─── Helper Text Styles ──────────────────────────────────────────────────────

export function buildHelperTextStyles(params: InputFieldStyleParams): {
  helperTextTop: string;
  helperTextBottom: string;
} {
  const { config, inputType, inputSize, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, inputType);
  const sc = getSizeConfig(config, inputSize);
  const disabledState = config.states?.disabled || {};

  const helperColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (disabledState.textColor || tc.helperTextColor)
      : tc.helperTextColor;

  // Figma: caption font, 12px/16px, caption/secondary color
  const shared = {
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: 500,
    fontSize: dim(sc.helperFontSize, '12px'),
    lineHeight: dim(sc.helperLineHeight, '16px'),
    color: helperColor,
    margin: 0,
    whiteSpace: 'nowrap' as const,
  };

  return { helperTextTop: css(shared), helperTextBottom: css(shared) };
}

// ─── Addon Styles ────────────────────────────────────────────────────────────
// Figma: addon has bg=strongest, border on 3 sides (no border on the side touching input),
// rounded corners only on the outer side, padding=12px uniform

export function buildAddonStyles(params: InputFieldStyleParams): string {
  const { config, inputType, inputSize, styleVariant, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, inputType);
  const sc = getSizeConfig(config, inputSize);
  const disabledState = config.states?.disabled || {};

  const bgColor = isDisabled
    ? (disabledState.backgroundColor || tc.addonBackgroundColor)
    : tc.addonBackgroundColor;
  const textColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (disabledState.textColor || tc.addonTextColor)
      : tc.addonTextColor;
  const borderColor = isDisabled
    ? (disabledState.borderColor || tc.addonBorderColor)
    : tc.addonBorderColor;

  const isLeft = styleVariant === 'addonLeft';
  const radius = dim(base.radius, '6px');
  const padV = dim(sc.paddingVertical, '12px');
  const padH = dim(sc.paddingHorizontal, '12px');

  return css({
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: `${padV} ${padH}`,
    backgroundColor: bgColor,
    color: textColor,
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: 500,
    fontSize: dim(sc.fontSize, '14px'),
    lineHeight: dim(sc.lineHeight, '20px'),
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    flexShrink: 0,
    // Figma: 3-sided border (no border on the side touching input)
    borderStyle: 'solid',
    borderColor,
    ...(isLeft
      ? {
          borderWidth: '1px',
          borderRightWidth: '0',
          borderRadius: `${radius} 0 0 ${radius}`,
        }
      : {
          borderWidth: '1px',
          borderLeftWidth: '0',
          borderRadius: `0 ${radius} ${radius} 0`,
        }),
  });
}

// ─── Icon Container Styles ───────────────────────────────────────────────────

export function buildIconContainerStyles(params: InputFieldStyleParams): string {
  const { config, inputSize } = params;
  const sc = getSizeConfig(config, inputSize);
  const size = dim(sc.iconSize, '20px');

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: size,
    height: size,
    overflow: 'clip',
    '& > *': { width: size, height: size },
  });
}

// ─── Outer Container Styles ──────────────────────────────────────────────────
// Figma: flex-col, gap=8px (Spacing/8), items-start

export function buildContainerStyles(params: InputFieldStyleParams): string {
  const { isGhost } = params;

  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', // Figma: Spacing/8
    alignItems: 'flex-start',
    width: '100%',
    ...(isGhost && { pointerEvents: 'none' }),
  });
}

// ─── Input Section Styles (wraps input row + subtext container) ──────────────
// Figma: flex-col, gap=6px (Spacing/6), items-start, w-full

export function buildInputSectionStyles(): string {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px', // Figma: Spacing/6
    alignItems: 'flex-start',
    width: '100%',
    flexShrink: 0,
  });
}

// ─── Input Row Styles (wraps addon + input container) ────────────────────────
// Figma: flex, items-center, overflow-clip, rounded, w-full, bg=white

export function buildInputRowStyles(params: InputFieldStyleParams): string {
  const { config, inputType } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, inputType);
  const radius = dim(base.radius, '6px');

  return css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexShrink: 0,
    overflow: 'clip',
    borderRadius: radius,
    backgroundColor: tc.backgroundColor,
  });
}

// ─── Input Container (the bordered area with input + icons + badge) ──────────
// Figma: flex, gap=4px, items-center, p=12px, border=1px solid, rounded, bg=white, flex-1

export function buildInputContainerStyles(params: InputFieldStyleParams): string {
  const { config, inputType, inputSize, styleVariant, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, inputType);
  const sc = getSizeConfig(config, inputSize);
  const disabledState = config.states?.disabled || {};
  const ghostState = config.states?.ghost || {};

  const isAddonLeft = styleVariant === 'addonLeft';
  const isAddonRight = styleVariant === 'addonRight';
  const isAddon = isAddonLeft || isAddonRight;
  const radius = dim(base.radius, '6px');
  const padV = dim(sc.paddingVertical, '12px');
  const padH = dim(sc.paddingHorizontal, '12px');

  let borderRadius = radius;
  if (isAddonLeft) borderRadius = `0 ${radius} ${radius} 0`;
  if (isAddonRight) borderRadius = `${radius} 0 0 ${radius}`;

  return css({
    display: 'flex',
    alignItems: 'center',
    flex: '1 0 0',
    minWidth: '1px',
    minHeight: '1px',
    backgroundColor: tc.backgroundColor,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tc.borderColor,
    borderRadius,
    transition: base.transition || 'all 0.15s ease-in-out',
    padding: `${padV} ${padH}`,
    gap: dim(sc.iconGap, '4px'),
    boxSizing: 'border-box',
    overflow: 'clip',

    '&:hover:not(.disabled):not(.ghost)': {
      borderColor: tc.hoverBorderColor,
      backgroundColor: tc.hoverBackgroundColor,
    },
    '&:focus-within:not(.disabled):not(.ghost)': {
      boxShadow: tc.focusRingColor
        ? `0 0 0 ${base.focusRingSpread || '2px'} ${tc.focusRingColor}`
        : undefined,
      borderColor: tc.activeBorderColor,
    },

    ...(isDisabled && {
      backgroundColor: disabledState.backgroundColor,
      borderColor: disabledState.borderColor,
      color: disabledState.textColor,
      cursor: disabledState.cursor || 'default',
    }),
    ...(isGhost && {
      backgroundColor: ghostState.backgroundColor,
      borderColor: ghostState.borderColor,
      color: ghostState.textColor,
      cursor: ghostState.cursor || 'default',
    }),
  });
}

// ─── Input Element Styles ────────────────────────────────────────────────────

export function buildInputElementStyles(params: InputFieldStyleParams): string {
  const { config, inputType, inputSize, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, inputType);
  const sc = getSizeConfig(config, inputSize);
  const disabledState = config.states?.disabled || {};
  const ghostState = config.states?.ghost || {};

  return css({
    flex: '1 0 0',
    minWidth: '1px',
    minHeight: '1px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: 500,
    fontSize: dim(sc.fontSize, '14px'),
    lineHeight: dim(sc.lineHeight, '20px'),
    color: tc.textColor,
    padding: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    '&::placeholder': { color: tc.placeholderColor },

    ...(isDisabled && {
      color: disabledState.textColor,
      cursor: disabledState.cursor || 'default',
      '&::placeholder': { color: disabledState.placeholderColor },
    }),
    ...(isGhost && {
      color: ghostState.textColor,
      cursor: ghostState.cursor || 'default',
    }),
  });
}

// ─── Subtext Container Styles ────────────────────────────────────────────────
// Figma: flex, items-center, w-full > inner: flex, flex-1, gap=6px, items-center

export function buildSubtextContainerStyles(_params: InputFieldStyleParams): string {
  return css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexShrink: 0,
    '& > div': {
      display: 'flex',
      flex: '1 0 0',
      gap: '6px', // Figma: Spacing/6
      alignItems: 'center',
      minWidth: '1px',
      minHeight: '1px',
    },
  });
}

// ─── Status Text Styles ──────────────────────────────────────────────────────

export function buildStatusTextStyles(params: InputFieldStyleParams): string {
  const { config, inputType, inputSize, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getTypeConfig(config, inputType);
  const sc = getSizeConfig(config, inputSize);
  const disabledState = config.states?.disabled || {};

  const color = isGhost
    ? 'transparent'
    : isDisabled
      ? (disabledState.textColor || tc.statusTextColor)
      : tc.statusTextColor;

  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: 500,
    fontSize: dim(sc.helperFontSize, '12px'),
    lineHeight: dim(sc.helperLineHeight, '16px'),
    color,
    margin: 0,
    whiteSpace: 'nowrap',
  });
}

// ─── Status Indicator Dot Styles ─────────────────────────────────────────────

const STATUS_INDICATOR_COLORS: Record<string, string> = {
  success: '#2e7d32',
  failed: '#c62828',
  information: '#1565c0',
};

export function buildStatusIndicatorStyles(type: string): string {
  const color = STATUS_INDICATOR_COLORS[type] || '#6b6b6b';
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color,
    flexShrink: 0,
  });
}

// ─── Ghost Skeleton Styles ───────────────────────────────────────────────────
// Figma Ghost state: simple grey skeleton blocks, no text/icons/borders

export function buildGhostSkeletonStyles(params: InputFieldStyleParams): {
  titleBlock: string;
  inputBlock: string;
} {
  const { config } = params;
  const base = config.base || {};
  const ghostState = config.states?.ghost || {};
  const bg = ghostState.backgroundColor || '#ededed';

  const titleBlock = css({
    width: (ghostState as any).skeletonTitleWidth || '100px',
    height: (ghostState as any).skeletonTitleHeight || '12px',
    borderRadius: dim((ghostState as any).skeletonTitleRadius, '12px'),
    backgroundColor: bg,
    flexShrink: 0,
  });

  const inputBlock = css({
    width: '100%',
    height: (ghostState as any).skeletonInputHeight || '44px',
    borderRadius: dim((ghostState as any).skeletonInputRadius || base.radius, '6px'),
    backgroundColor: bg,
    flexShrink: 0,
  });

  return { titleBlock, inputBlock };
}
