import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

// ─── Config Shape Interfaces ─────────────────────────────────────────────────

export interface NumberCellStyleConfig {
  activeBackgroundColor?: string;
  activeTextColor?: string;
}

export interface NumberCellSizeConfig {
  width?: string | number;
  height?: string | number;
  fontFamily?: string;
  fontSize?: string | number;
  lineHeight?: string | number;
  fontWeight?: string;
}

export interface NumberCellStateConfig {
  backgroundColor?: string;
  textColor?: string;
  borderTopColor?: string;
  borderColor?: string;
  borderWidth?: string | number;
  borderRadius?: string | number;
  cursor?: string;
  // Per-style overrides (hover/focused can be keyed by cellStyle)
  [key: string]: string | number | undefined;
}

export interface NumberCellPerStyleStateConfig {
  backgroundColor?: string;
  textColor?: string;
  borderTopColor?: string;
  borderColor?: string;
  borderWidth?: string | number;
  borderRadius?: string | number;
}

export interface TextCellStateConfig {
  textColor?: string;
  fontWeight?: string;
  cursor?: string;
}

export interface TextCellSizeConfig {
  iconSize?: string | number;
  fontFamily?: string;
  fontSize?: string | number;
  lineHeight?: string | number;
  gap?: string | number;
}

export interface AssembledSizeConfig {
  paddingX?: string | number;
  paddingY?: string | number;
}

export interface PaginationTarmacConfig {
  base: {
    fontFamily?: string;
    captionFontFamily?: string;
    fontWeightMedium?: string;
    fontWeightSemibold?: string;
    radius?: string | number;
    transition?: string;
  };
  numberCell: {
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string | number;
    paddingX?: string | number;
    paddingY?: string | number;
    styles?: Record<string, NumberCellStyleConfig>;
    sizes?: Record<string, NumberCellSizeConfig>;
    states?: {
      hover?: Record<string, NumberCellPerStyleStateConfig> | NumberCellPerStyleStateConfig;
      focused?: Record<string, NumberCellPerStyleStateConfig> | NumberCellPerStyleStateConfig;
      disabled?: NumberCellStateConfig;
      [key: string]: any;
    };
  };
  numberCellGroup: {
    gap?: string | number;
    sizes?: Record<string, { chevronSize?: string | number; wrapperGap?: string | number }>;
  };
  textCell: {
    padding?: string | number;
    states?: Record<string, TextCellStateConfig>;
    sizes?: Record<string, TextCellSizeConfig>;
  };
  textGroup: {
    left?: { gap?: string | number };
    right?: { gap?: string | number };
  };
  divider: {
    color?: string;
    width?: string | number;
    height?: string;
  };
  assembled: {
    backgroundColor?: string;
    justifyContent?: string;
    sizes?: Record<string, AssembledSizeConfig>;
    sizeMapping?: Record<string, { numberCell?: string; textCell?: string }>;
  };
  states: {
    disabled?: {
      textColor?: string;
      iconColor?: string;
      cursor?: string;
    };
  };
}

// ─── Params Interfaces ───────────────────────────────────────────────────────

export interface PaginationStyleParams {
  config: PaginationTarmacConfig;
  size: string;
  isDisabled: boolean;
}

export interface NumberCellStyleParams {
  config: PaginationTarmacConfig;
  size: string;
  cellStyle: string;
  isActive: boolean;
  isDisabled: boolean;
}

export interface TextCellStyleParams {
  config: PaginationTarmacConfig;
  size: string;
  isDisabled: boolean;
}

export interface TextGroupStyleParams {
  config: PaginationTarmacConfig;
  position: 'left' | 'right';
  size: string;
  textCount?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert raw number or string to CSS dimension (e.g. 16 → "16px", "16px" → "16px") */
function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}

// ─── buildNumberCellStyles ───────────────────────────────────────────────────

export function buildNumberCellBaseStyles(params: {
  config: PaginationTarmacConfig;
  size: string;
  cellStyle: string;
  isDisabled: boolean;
}): string {
  const { config, size, cellStyle, isDisabled } = params;
  const sizeConfig = config.numberCell?.sizes?.[size] || {};
  const disabledState = (config.numberCell?.states?.disabled || {}) as NumberCellStateConfig;
  const globalDisabled = config.states?.disabled || {};
  const base = config.base || {};

  // Resolve per-style hover/focused states
  const rawHover = config.numberCell?.states?.hover || {};
  const hoverState: NumberCellPerStyleStateConfig =
    (rawHover as Record<string, NumberCellPerStyleStateConfig>)?.[cellStyle] || (rawHover as NumberCellPerStyleStateConfig);
  const rawFocused = config.numberCell?.states?.focused || {};
  const focusedState: NumberCellPerStyleStateConfig =
    (rawFocused as Record<string, NumberCellPerStyleStateConfig>)?.[cellStyle] || (rawFocused as NumberCellPerStyleStateConfig);

  const defaultBg = config.numberCell?.backgroundColor || '#ffffff';
  const defaultText = config.numberCell?.textColor || '#2b2b2b';
  const defaultRadius = dim(config.numberCell?.borderRadius ?? base.radius, '4px');
  const paddingX = dim(config.numberCell?.paddingX, '8px');
  const paddingY = dim(config.numberCell?.paddingY, '4px');
  const styleConfig = config.numberCell?.styles?.[cellStyle] || {};
  const activeBg = styleConfig.activeBackgroundColor || defaultBg;
  const activeText = styleConfig.activeTextColor || defaultText;

  return css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${dim(sizeConfig.width, '40px')};
    height: ${dim(sizeConfig.height, '40px')};
    font-family: ${sizeConfig.fontFamily || base.fontFamily || 'Noto Sans, sans-serif'};
    font-size: ${dim(sizeConfig.fontSize, '16px')};
    line-height: ${dim(sizeConfig.lineHeight, '24px')};
    font-weight: ${sizeConfig.fontWeight || base.fontWeightMedium || '500'};
    background-color: ${defaultBg};
    color: ${defaultText};
    padding: ${paddingY} ${paddingX};
    border: none;
    border-radius: ${defaultRadius};
    cursor: ${isDisabled ? 'default' : 'pointer'};
    transition: ${base.transition || 'all 0.15s ease-in-out'};
    box-sizing: border-box;
    outline: none;
    font-variant-numeric: tabular-nums;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: transparent;
      transition: background-color 0.15s ease-in-out;
    }

    &:hover:not(:disabled)::after {
      background-color: ${hoverState.borderTopColor || '#e6e6e6'};
    }

    &:hover:not(:disabled) {
      background-color: ${hoverState.backgroundColor || defaultBg};
      color: ${hoverState.textColor || defaultText};
    }

    &:active:not(:disabled) {
      background-color: ${activeBg};
      color: ${activeText};
      border-radius: ${defaultRadius};
    }

    &:active:not(:disabled)::after {
      background-color: transparent;
    }

    &:focus:not(:disabled) {
      border-radius: ${dim(focusedState.borderRadius ?? config.numberCell?.borderRadius ?? base.radius, '4px')};
      background-color: ${focusedState.backgroundColor || defaultBg};
      color: ${focusedState.textColor || defaultText};
      box-shadow: inset 0 0 0 ${dim(focusedState.borderWidth, '1px')} ${focusedState.borderColor || '#e6e6e6'};
    }

    &:focus:not(:disabled)::after {
      background-color: transparent;
    }

    &:disabled {
      color: ${disabledState.textColor || globalDisabled.textColor || '#cdcbcb'};
      background-color: ${disabledState.backgroundColor || defaultBg};
      cursor: ${disabledState.cursor || globalDisabled.cursor || 'default'};
    }
  `;
}

export function buildNumberCellActiveStyles(params: {
  config: PaginationTarmacConfig;
  cellStyle: string;
}): string {
  const { config, cellStyle } = params;
  const styleConfig = config.numberCell?.styles?.[cellStyle] || {};
  const defaultBg = config.numberCell?.backgroundColor || '#ffffff';
  const defaultText = config.numberCell?.textColor || '#2b2b2b';
  const defaultRadius = dim(config.numberCell?.borderRadius ?? (config.base || {}).radius, '4px');
  const activeBg = styleConfig.activeBackgroundColor || defaultBg;
  const activeText = styleConfig.activeTextColor || defaultText;

  return css`
    background-color: ${activeBg};
    color: ${activeText};
    border-radius: ${defaultRadius};

    &::after {
      background-color: transparent !important;
    }

    &:hover:not(:disabled) {
      background-color: ${activeBg};
      color: ${activeText};
      border-radius: ${defaultRadius};
    }

    &:hover:not(:disabled)::after {
      background-color: transparent !important;
    }

    &:focus:not(:disabled) {
      background-color: ${activeBg};
      color: ${activeText};
      border-radius: ${defaultRadius};
      box-shadow: none;
    }

    &:focus:not(:disabled)::after {
      background-color: transparent !important;
    }
  `;
}

// Backward-compatible wrapper that returns a single class string
export function buildNumberCellStyles(params: NumberCellStyleParams): string {
  const { isActive, ...rest } = params;
  const baseClass = buildNumberCellBaseStyles(rest);
  if (isActive) {
    const activeClass = buildNumberCellActiveStyles({ config: rest.config, cellStyle: rest.cellStyle });
    return `${baseClass} ${activeClass}`;
  }
  return baseClass;
}

// ─── buildNumberCellGroupStyles ──────────────────────────────────────────────

export function buildNumberCellGroupStyles(params: PaginationStyleParams): string {
  const { config, size } = params;
  const groupSizeConfig = config.numberCellGroup?.sizes?.[size] || {};

  return css({
    display: 'flex',
    alignItems: 'center',
    gap: dim(groupSizeConfig.wrapperGap, '6px'),
    '& > .pagination-number-cells': {
      display: 'flex',
      alignItems: 'center',
      gap: '0',
    },
  });
}

// ─── buildChevronIconStyles ──────────────────────────────────────────────────

export function buildChevronIconStyles(params: PaginationStyleParams): string {
  const { config, size, isDisabled } = params;
  const groupSizeConfig = config.numberCellGroup?.sizes?.[size] || {};
  const globalDisabled = config.states?.disabled || {};
  const chevronSize = dim(groupSizeConfig.chevronSize, '24px');

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: chevronSize,
    height: chevronSize,
    cursor: 'pointer',
    flexShrink: 0,
    color: config.numberCell?.textColor || '#2b2b2b',

    '&:disabled': {
      color: globalDisabled.iconColor || globalDisabled.textColor || '#cdcbcb',
      cursor: globalDisabled.cursor || 'default',
    },

    ...(isDisabled && {
      color: globalDisabled.iconColor || globalDisabled.textColor || '#cdcbcb',
      cursor: globalDisabled.cursor || 'default',
    }),
  });
}

// ─── buildEllipsisStyles ─────────────────────────────────────────────────────

export function buildEllipsisStyles(params: PaginationStyleParams): string {
  const { config, size, isDisabled } = params;
  const sizeConfig = config.numberCell?.sizes?.[size] || {};
  const globalDisabled = config.states?.disabled || {};
  const base = config.base || {};

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sizeConfig.width, '40px'),
    height: dim(sizeConfig.height, '40px'),
    fontFamily: sizeConfig.fontFamily || base.fontFamily || 'Noto Sans, sans-serif',
    fontSize: dim(sizeConfig.fontSize, '16px'),
    lineHeight: dim(sizeConfig.lineHeight, '24px'),
    fontWeight: sizeConfig.fontWeight || base.fontWeightMedium || '500',
    userSelect: 'none',
    boxSizing: 'border-box',
    fontVariantNumeric: 'tabular-nums',

    ...(isDisabled && {
      color: globalDisabled.textColor || '#cdcbcb',
    }),
  });
}

// ─── buildTextCellStyles ─────────────────────────────────────────────────────

export function buildTextCellStyles(params: TextCellStyleParams): string {
  const { config, size, isDisabled } = params;
  const sizeConfig = config.textCell?.sizes?.[size] || {};
  const defaultState = config.textCell?.states?.['default'] || {};
  const hoverState = config.textCell?.states?.['hover'] || {};
  const pressedState = config.textCell?.states?.['pressed'] || {};
  const globalDisabled = config.states?.disabled || {};
  const base = config.base || {};

  const defaultText = defaultState.textColor || '#666666';
  const defaultWeight = defaultState.fontWeight || base.fontWeightMedium || '500';
  const padding = dim(config.textCell?.padding, '4px');

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: dim(sizeConfig.gap, '6px'),
    fontFamily: sizeConfig.fontFamily || base.fontFamily || 'Noto Sans, sans-serif',
    fontSize: dim(sizeConfig.fontSize, '16px'),
    lineHeight: dim(sizeConfig.lineHeight, '24px'),
    fontWeight: defaultWeight,
    color: defaultText,
    padding: padding,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    transition: base.transition || 'all 0.15s ease-in-out',
    boxSizing: 'border-box',
    outline: 'none',
    fontVariantNumeric: 'tabular-nums',

    '& > .pagination-text-cell-icon': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim(sizeConfig.iconSize, '24px'),
      height: dim(sizeConfig.iconSize, '24px'),
    },

    '&:hover:not(:disabled)': {
      color: hoverState.textColor || '#2b2b2b',
      fontWeight: hoverState.fontWeight || base.fontWeightMedium || '500',
      cursor: hoverState.cursor || 'pointer',
    },

    '&:active:not(:disabled)': {
      color: pressedState.textColor || '#2b2b2b',
      fontWeight: pressedState.fontWeight || base.fontWeightSemibold || '600',
    },

    '&:disabled': {
      color: globalDisabled.textColor || '#cdcbcb',
      cursor: globalDisabled.cursor || 'default',
    },

    ...(isDisabled && {
      color: globalDisabled.textColor || '#cdcbcb',
      cursor: globalDisabled.cursor || 'default',
    }),
  });
}

// ─── buildTextGroupStyles ────────────────────────────────────────────────────

export function buildTextGroupStyles(params: TextGroupStyleParams): string {
  const { config, position, size, textCount } = params;
  const groupConfig = position === 'left'
    ? config.textGroup?.left
    : config.textGroup?.right;
  const sizeConfig = config.textCell?.sizes?.[size] || {};
  const defaultState = config.textCell?.states?.['default'] || {};
  const base = config.base || {};

  // Single count uses 6px gap, dual/triple/quad use 2px gap (matching Figma)
  const isSingleCount = textCount === 'single' || !textCount;
  const leftGap = position === 'left'
    ? (isSingleCount ? dim(groupConfig?.gap, '6px') : '2px')
    : dim(groupConfig?.gap, '2px');

  return css({
    display: 'flex',
    alignItems: 'center',
    gap: leftGap,
    fontFamily: sizeConfig.fontFamily || base.fontFamily || 'Noto Sans, sans-serif',
    fontSize: dim(sizeConfig.fontSize, '16px'),
    lineHeight: dim(sizeConfig.lineHeight, '24px'),
    fontWeight: defaultState.fontWeight || base.fontWeightMedium || '500',
    color: defaultState.textColor || '#666666',
    fontVariantNumeric: 'tabular-nums',
  });
}

// ─── buildDividerStyles ──────────────────────────────────────────────────────

export function buildDividerStyles(config: PaginationTarmacConfig): string {
  return css({
    width: dim(config.divider?.width, '0.5px'),
    height: dim(config.divider?.height, '12px'),
    backgroundColor: config.divider?.color || '#2b2b2b',
    flexShrink: 0,
  });
}

// ─── buildAssembledStyles ────────────────────────────────────────────────────

export function buildAssembledStyles(params: PaginationStyleParams): string {
  const { config, size } = params;
  const sizeConfig = config.assembled?.sizes?.[size] || {};

  return css({
    display: 'flex',
    justifyContent: config.assembled?.justifyContent || 'space-between',
    alignItems: 'center',
    padding: `${dim(sizeConfig.paddingY, '12px')} ${dim(sizeConfig.paddingX, '12px')}`,
    backgroundColor: config.assembled?.backgroundColor || '#ffffff',
    boxSizing: 'border-box',
  });
}
