import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

// ─── Config Shape Interfaces ─────────────────────────────────────────────────

export interface InputFieldTypeConfig {
  borderColor?: string;
  textColor?: string;
  placeholderColor?: string;
  helperTextColor?: string;
  statusTextColor?: string;
  hoverBorderColor?: string;
  activeBorderColor?: string;
  focusRingColor?: string;
  focusBorderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverLabelColor?: string;
  hoverHelperTextColor?: string;
  labelColor?: string;
  subtextColor?: string;
  iconColor?: string;
  mandatoryColor?: string;
  disabledBorderColor?: string;
  disabledTextColor?: string;
  disabledLabelColor?: string;
  disabledHelperTextColor?: string;
  disabledIconColor?: string;
  disabledStatusTextColor?: string;
  disabledSubtextColor?: string;
  disabledMandatoryColor?: string;
}

export interface InputFieldSizeConfig {
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
  toggleSize?: string;
}

export interface AddonConfig {
  backgroundColor?: string;
  textColor?: string;
  rightTextColor?: string;
  borderColor?: string;
  fontWeight?: string;
  hoverBorderColor?: string;
  disabledBorderColor?: string;
}

export interface DropCellStyleConfig {
  textColor?: string;
  descriptionColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  pressedBackgroundColor?: string;
  disabledTextColor?: string;
  iconColor?: string;
  checkboxVariant?: string;
}

export interface DropCellSizeConfig {
  height?: string;
  fontSize?: string;
  lineHeight?: string;
  descriptionFontSize?: string;
  descriptionLineHeight?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
  iconSize?: string;
  gap?: string;
}

export interface ListConfig {
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  scrollbarColor?: string;
  scrollbarWidth?: string;
  zIndex?: number;
}

export interface SectionHeaderConfig {
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingHorizontal?: string;
}

export interface FooterConfig {
  borderTopColor?: string;
  padding?: string;
  gap?: string;
}

export interface SearchConfig {
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  iconColor?: string;
}

export interface DropdownStateConfig {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  labelColor?: string;
  placeholderColor?: string;
  helperTextColor?: string;
  mandatoryColor?: string;
  statusTextColor?: string;
  subtextColor?: string;
  cursor?: string;
  pointerEvents?: string;
  [key: string]: any;
}

export interface DropdownTarmacConfig {
  base: {
    fontFamily?: string;
    fontWeight?: string;
    radius?: string;
    transition?: string;
    focusRingSpread?: string;
  };
  inputField: {
    types: Record<string, InputFieldTypeConfig>;
    sizes: Record<string, InputFieldSizeConfig>;
    addon: AddonConfig;
  };
  dropCell: {
    styles: Record<string, DropCellStyleConfig>;
    sizes: Record<string, DropCellSizeConfig>;
  };
  list: ListConfig;
  sectionHeader: SectionHeaderConfig;
  footer: FooterConfig;
  search: SearchConfig;
  states: {
    disabled?: DropdownStateConfig;
    ghost?: DropdownStateConfig;
  };
}

// ─── Style Params Interfaces ─────────────────────────────────────────────────

export interface DropdownStyleParams {
  config: DropdownTarmacConfig;
  inputType: string;
  size: string;
  isDisabled: boolean;
  isGhost: boolean;
  isOpen: boolean;
}

export interface DropCellStyleParams {
  config: DropdownTarmacConfig;
  cellStyle: string;
  size: string;
  isSelected: boolean;
  isDisabled: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert raw number or string to CSS dimension (e.g. 16 → "16px", "16px" → "16px") */
function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}

function getInputTypeConfig(config: DropdownTarmacConfig, inputType: string): InputFieldTypeConfig {
  return config.inputField?.types?.[inputType] || config.inputField?.types?.['regular'] || {};
}

function getInputSizeConfig(config: DropdownTarmacConfig, size: string): InputFieldSizeConfig {
  return config.inputField?.sizes?.[size] || {};
}

// ─── Outer Container Styles ──────────────────────────────────────────────────
// Figma: flex-col, gap=containerGap, items-start, w-full

export function buildContainerStyles(params: DropdownStyleParams): string {
  const { config, size, isGhost, isDisabled } = params;
  const sc = getInputSizeConfig(config, size);
  const tc = getInputTypeConfig(config, params.inputType);

  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: dim(sc.containerGap, '8px'),
    alignItems: 'flex-start',
    width: '100%',
    position: 'relative',
    ...(isGhost && { pointerEvents: 'none' }),

    // Propagate hover to title/helper text children (Figma: label darkens on hover)
    ...(!isDisabled && !isGhost && {
      '&:hover [data-testid="dropdown-title-label"]': {
        color: tc.hoverLabelColor || tc.labelColor,
      },
      '&:hover [data-testid="dropdown-helper-text-top"]': {
        color: tc.hoverHelperTextColor || tc.helperTextColor,
      },
    }),
  });
}

// ─── InputField Styles (bordered trigger container with pseudo-states) ───────
// Figma: flex, items-center, border=1px solid, rounded, bg, transition, overflow-clip

export function buildInputFieldStyles(params: DropdownStyleParams): string {
  const { config, inputType, size, isDisabled, isGhost, isOpen } = params;
  const base = config.base || {};
  const tc = getInputTypeConfig(config, inputType);
  const disabledState = config.states?.disabled || {};
  const ghostState = config.states?.ghost || {};

  const radius = dim(base.radius, '6px');
  // When expanded, only top corners are rounded (Figma: rounded-tl + rounded-tr)
  const borderRadius = isOpen ? `${radius} ${radius} 0 0` : radius;

  return css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: tc.backgroundColor,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tc.borderColor,
    borderRadius: borderRadius,
    transition: base.transition || 'all 0.15s ease-in-out',
    boxSizing: 'border-box',
    overflow: 'clip',
    cursor: 'pointer',
    outline: 'none',
    color: tc.textColor,

    '&:hover:not(.disabled):not(.ghost)': {
      borderColor: tc.hoverBorderColor,
      backgroundColor: tc.hoverBackgroundColor,
      color: tc.hoverTextColor || tc.textColor,
    },
    '&:active:not(.disabled):not(.ghost)': {
      borderColor: tc.activeBorderColor,
    },
    '&:focus:not(.disabled):not(.ghost)': {
      boxShadow: tc.focusRingColor
        ? `0 0 0 ${base.focusRingSpread || '2px'} ${tc.focusRingColor}`
        : undefined,
      borderColor: tc.focusBorderColor || tc.activeBorderColor,
      outline: 'none',
    },

    // Disabled overrides — use per-type disabled tokens when available
    ...(isDisabled && {
      backgroundColor: disabledState.backgroundColor || tc.backgroundColor,
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

// ─── Addon Wrapper Styles ────────────────────────────────────────────────────
// Figma: Frame 23 wraps addon + input field with shared border radius and focus ring

export function buildAddonWrapperStyles(params: DropdownStyleParams): string {
  const { config, inputType, isDisabled, isGhost, isOpen } = params;
  const base = config.base || {};
  const tc = getInputTypeConfig(config, 'regular');
  const addon = config.inputField?.addon || {};
  const disabledState = config.states?.disabled || {};

  const radius = dim(base.radius, '6px');
  const borderRadius = isOpen ? `${radius} ${radius} 0 0` : radius;

  const borderColor = isDisabled
    ? (tc.disabledBorderColor || disabledState.borderColor || tc.borderColor)
    : tc.borderColor;

  return css({
    display: 'flex',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: borderColor,
    borderRadius: borderRadius,
    position: 'relative',
    cursor: isDisabled ? 'default' : 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    overflow: 'clip',

    // Hover: change wrapper border and addon separator borders
    '&:hover:not(.disabled):not(.ghost)': {
      borderColor: tc.hoverBorderColor,
      '& [data-testid="dropdown-addon-left"], & [data-testid="dropdown-addon-right"]': {
        borderColor: addon.hoverBorderColor || tc.hoverBorderColor,
      },
    },

    // Focus ring wraps the entire addon+input row (Figma: Focus/Black on Frame 23)
    '&:focus:not(.disabled):not(.ghost)': {
      boxShadow: tc.focusRingColor
        ? `0 0 0 ${base.focusRingSpread || '2px'} ${tc.focusRingColor}`
        : undefined,
      borderColor: tc.focusBorderColor || tc.activeBorderColor,
      outline: 'none',
      '& [data-testid="dropdown-addon-left"], & [data-testid="dropdown-addon-right"]': {
        borderColor: tc.focusBorderColor || tc.activeBorderColor || addon.borderColor,
      },
    },
    '&:focus-within:not(.disabled):not(.ghost)': {
      boxShadow: tc.focusRingColor
        ? `0 0 0 ${base.focusRingSpread || '2px'} ${tc.focusRingColor}`
        : undefined,
    },

    // When addonLeft is used, add a right border on the input field (separator)
    ...(inputType === 'addonLeft' && {
      '& [data-testid="dropdown-addon-left"]': {
        borderRight: `1px solid ${isDisabled ? (addon.disabledBorderColor || disabledState.borderColor || addon.borderColor) : addon.borderColor}`,
      },
    }),

    // When addonRight is used, add a left border on the input field (separator)
    ...(inputType === 'addonRight' && {
      '& [data-testid="dropdown-addon-right"]': {
        borderLeft: `1px solid ${isDisabled ? (addon.disabledBorderColor || disabledState.borderColor || addon.borderColor) : addon.borderColor}`,
      },
    }),

    ...(isDisabled && {
      borderColor: tc.disabledBorderColor || disabledState.borderColor || tc.borderColor,
      cursor: disabledState.cursor || 'default',
    }),
    ...(isGhost && {
      pointerEvents: 'none' as const,
    }),
  });
}

// ─── Input Row Styles (inner row: flex, items-center, gap) ───────────────────
// Figma: flex, items-center, gap=iconGap, flex-1, padding

export function buildInputRowStyles(params: DropdownStyleParams): string {
  const { config, inputType, size, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getInputTypeConfig(config, inputType);
  const sc = getInputSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};

  // For default state, use 'inherit' so parent hover color propagates
  // For disabled/ghost, set explicit color
  const textColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (tc.disabledTextColor || disabledState.textColor || tc.textColor)
      : 'inherit';

  return css({
    display: 'flex',
    alignItems: 'center',
    flex: '1 0 0',
    minWidth: '1px',
    minHeight: '1px',
    gap: dim(sc.iconGap, '4px'),
    padding: `${dim(sc.paddingVertical, '12px')} ${dim(sc.paddingHorizontal, '12px')}`,
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 500,
    fontSize: dim(sc.fontSize, '14px'),
    lineHeight: dim(sc.lineHeight, '20px'),
    color: textColor,
    overflow: 'hidden',
  });
}

// ─── Addon Styles ────────────────────────────────────────────────────────────
// Figma: addon has distinct bg, separator border, rounded corners only on outer side

export function buildAddonStyles(params: DropdownStyleParams & { position: 'left' | 'right' }): string {
  const { config, size, isDisabled, isGhost, position } = params;
  const base = config.base || {};
  const addon = config.inputField?.addon || {};
  const sc = getInputSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};

  const bgColor = isDisabled
    ? (addon.backgroundColor)
    : addon.backgroundColor;
  const baseTextColor = position === 'right' ? (addon.rightTextColor || addon.textColor) : addon.textColor;
  const textColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (disabledState.textColor || baseTextColor)
      : baseTextColor;
  const borderColor = isDisabled
    ? (addon.disabledBorderColor || disabledState.borderColor || addon.borderColor)
    : addon.borderColor;

  const padV = dim(sc.paddingVertical, '12px');
  const padH = dim(sc.paddingHorizontal, '12px');
  const radius = dim(base.radius, '6px');

  // Addon sits inside the wrapper which now owns the outer border.
  // The addon only needs a separator border on the inner edge (right for left addon, left for right addon).
  // The wrapper applies the separator via data-testid selectors, so addon itself has no border.
  const isLeft = position === 'left';

  return css({
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: `${padV} ${padH}`,
    backgroundColor: bgColor,
    color: textColor,
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(addon.fontWeight) || 400,
    fontSize: dim(sc.fontSize, '14px'),
    lineHeight: dim(sc.lineHeight, '20px'),
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    flexShrink: 0,
    border: 'none',
  });
}

// ─── Toggle Styles (chevron icon container) ──────────────────────────────────
// Figma: icon container with size, color, rotation for open/closed

export function buildToggleStyles(params: DropdownStyleParams): string {
  const { config, inputType, size, isOpen, isDisabled, isGhost } = params;
  const tc = getInputTypeConfig(config, inputType);
  const sc = getInputSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};

  const toggleSize = dim(sc.toggleSize, '20px');
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
    width: toggleSize,
    height: toggleSize,
    color: iconColor,
    transition: 'transform 0.15s ease-in-out',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    '& > *': { width: toggleSize, height: toggleSize },
  });
}

// ─── Title Section Styles ────────────────────────────────────────────────────
// Figma: title container (flex, gap), title row (flex, items-center, gap),
// label, mandatory marker, title icon sizing

export function buildTitleSectionStyles(params: DropdownStyleParams): {
  container: string;
  titleRow: string;
  label: string;
  mandatory: string;
  titleIcon: string;
} {
  const { config, inputType, size, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getInputTypeConfig(config, inputType);
  const sc = getInputSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};
  const ghostState = config.states?.ghost || {};

  const labelColor = isGhost
    ? (ghostState.labelColor || 'transparent')
    : isDisabled
      ? (tc.disabledLabelColor || disabledState.labelColor || tc.labelColor)
      : tc.labelColor;

  const mandatoryColor = isDisabled
    ? (tc.disabledMandatoryColor || disabledState.mandatoryColor || tc.mandatoryColor || '#ed1b36')
    : (tc.mandatoryColor || '#ed1b36');

  const container = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    width: '100%',
  });

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
    fontWeight: Number(base.fontWeight) || 400,
    fontSize: dim(sc.titleFontSize, '14px'),
    lineHeight: dim(sc.titleLineHeight, '20px'),
    color: labelColor,
    margin: 0,
    whiteSpace: 'nowrap',
  });

  const mandatory = css({
    color: mandatoryColor,
    fontWeight: Number(base.fontWeight) || 400,
    fontSize: dim(sc.titleFontSize, '14px'),
    lineHeight: dim(sc.titleLineHeight, '20px'),
  });

  const iconSize = dim(sc.titleIconSize, '20px');
  const titleIcon = css({
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    width: iconSize,
    height: iconSize,
    overflow: 'clip',
    '& > *': { width: iconSize, height: iconSize },
  });

  return { container, titleRow, label, mandatory, titleIcon };
}

// ─── Helper Text Styles ──────────────────────────────────────────────────────
// Figma: helper text top/bottom — caption font, size from helperFontSize/helperLineHeight

export function buildHelperTextStyles(params: DropdownStyleParams): {
  top: string;
  bottom: string;
} {
  const { config, inputType, size, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getInputTypeConfig(config, inputType);
  const sc = getInputSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};

  const helperColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (tc.disabledHelperTextColor || disabledState.helperTextColor || tc.helperTextColor)
      : tc.helperTextColor;

  const shared = {
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 400,
    fontSize: dim(sc.helperFontSize, '12px'),
    lineHeight: dim(sc.helperLineHeight, '16px'),
    color: helperColor,
    margin: 0,
    whiteSpace: 'nowrap' as const,
  };

  return { top: css(shared), bottom: css(shared) };
}

// ─── Subtext Container Styles ────────────────────────────────────────────────
// Figma: subtext container (flex, gap), subtext text (font-size, color)

export function buildSubtextContainerStyles(params: DropdownStyleParams): {
  container: string;
  subtext: string;
} {
  const { config, inputType, size, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getInputTypeConfig(config, inputType);
  const sc = getInputSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};

  const subtextColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (tc.disabledSubtextColor || disabledState.subtextColor || tc.subtextColor)
      : tc.subtextColor;

  const container = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexShrink: 0,
  });

  const subtext = css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 400,
    fontSize: dim(sc.helperFontSize, '12px'),
    lineHeight: dim(sc.helperLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
  });

  return { container, subtext };
}

// ─── Icon Container Styles ───────────────────────────────────────────────────
// Figma: leading/trailing icon containers (width/height from iconSize, flex-shrink: 0)

export function buildIconContainerStyles(params: DropdownStyleParams): string {
  const { config, inputType, size, isDisabled, isGhost } = params;
  const tc = getInputTypeConfig(config, inputType);
  const sc = getInputSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};

  const iconSize = dim(sc.iconSize, '20px');
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
    width: iconSize,
    height: iconSize,
    color: iconColor,
    overflow: 'clip',
    '& > *': { width: iconSize, height: iconSize },
  });
}

// ─── Status Text Styles ──────────────────────────────────────────────────────
// Figma: status text (color from statusTextColor, font-size from fontSize)

export function buildStatusTextStyles(params: DropdownStyleParams): string {
  const { config, inputType, size, isDisabled, isGhost } = params;
  const base = config.base || {};
  const tc = getInputTypeConfig(config, inputType);
  const sc = getInputSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};

  const color = isGhost
    ? 'transparent'
    : isDisabled
      ? (tc.disabledStatusTextColor || disabledState.statusTextColor || tc.statusTextColor)
      : tc.statusTextColor;

  return css({
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 400,
    fontSize: dim(sc.fontSize, '14px'),
    lineHeight: dim(sc.lineHeight, '20px'),
    color,
    margin: 0,
    whiteSpace: 'nowrap',
  });
}

// ─── Ghost Skeleton Styles ───────────────────────────────────────────────────
// Figma Ghost state: simple grey skeleton blocks for title and input areas

export function buildGhostSkeletonStyles(params: DropdownStyleParams): {
  titleSkeleton: string;
  inputSkeleton: string;
} {
  const { config } = params;
  const base = config.base || {};
  const ghostState = config.states?.ghost || {};
  const bg = ghostState.backgroundColor || '#ededed';

  const titleSkeleton = css({
    width: (ghostState as any).skeletonTitleWidth || '100px',
    height: (ghostState as any).skeletonTitleHeight || '12px',
    borderRadius: dim((ghostState as any).skeletonTitleRadius, '12px'),
    backgroundColor: bg,
    flexShrink: 0,
  });

  const inputSkeleton = css({
    width: '100%',
    height: (ghostState as any).skeletonInputHeight || '40px',
    borderRadius: dim((ghostState as any).skeletonInputRadius || base.radius, '6px'),
    backgroundColor: bg,
    flexShrink: 0,
  });

  return { titleSkeleton, inputSkeleton };
}

// ─── Drop Cell Styles ────────────────────────────────────────────────────────
// Figma: individual list item with :hover, :active pseudo-states,
// Regular and Info Blue style support, disabled overrides, selected state

export function getDropCellStyleConfig(config: DropdownTarmacConfig, cellStyle: string): DropCellStyleConfig {
  return config.dropCell?.styles?.[cellStyle] || {};
}

export function getDropCellSizeConfig(config: DropdownTarmacConfig, size: string): DropCellSizeConfig {
  return config.dropCell?.sizes?.[size] || {};
}

export function buildDropCellStyles(params: DropCellStyleParams): string {
  const { config, cellStyle, size, isSelected, isDisabled } = params;
  const base = config.base || {};
  const sc = getDropCellStyleConfig(config, cellStyle);
  const sz = getDropCellSizeConfig(config, size);

  // Figma: p-12px uniform padding, font-normal (400), bg-white default
  const padV = dim(sz.paddingVertical, '12px');
  const padH = dim(sz.paddingHorizontal, '12px');

  return css({
    display: 'flex',
    alignItems: 'center',
    gap: dim(sz.gap, '8px'),
    padding: `${padV} ${padH}`,
    boxSizing: 'border-box',
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 400,
    fontSize: dim(sz.fontSize, '14px'),
    lineHeight: dim(sz.lineHeight, '20px'),
    color: sc.textColor,
    backgroundColor: isSelected ? sc.hoverBackgroundColor : (sc.backgroundColor || 'transparent'),
    cursor: 'pointer',
    transition: base.transition || 'all 0.15s ease-in-out',
    userSelect: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: sc.hoverBackgroundColor,
    },
    '&:active': {
      backgroundColor: sc.pressedBackgroundColor,
    },

    // Disabled overrides
    ...(isDisabled && {
      color: sc.disabledTextColor,
      cursor: 'default',
      backgroundColor: sc.backgroundColor || 'transparent',
      '&:hover': {
        backgroundColor: sc.backgroundColor || 'transparent',
      },
      '&:active': {
        backgroundColor: sc.backgroundColor || 'transparent',
      },
    }),
  });
}

// ─── List Panel Styles ───────────────────────────────────────────────────────
// Figma: dropdown panel (position absolute, border 1px solid, shadow, radius,
// max-height based on maxVisibleItems, z-index, overflow-y auto, width 100%)

export function buildListPanelStyles(
  params: DropdownStyleParams,
  maxVisibleItems: number = 6,
): string {
  const { config, size } = params;
  const list = config.list || {};
  const cellSz = config.dropCell?.sizes?.[size] || {};
  const cellHeight = cellSz.height;

  // Calculate max-height from maxVisibleItems × cell height
  const maxHeightValue = cellHeight
    ? `calc(${dim(cellHeight)} * ${maxVisibleItems})`
    : `${maxVisibleItems * 40}px`;

  return css({
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    maxHeight: maxHeightValue,
    overflowY: 'auto',
    backgroundColor: list.backgroundColor,
    border: `1px solid ${list.borderColor || 'transparent'}`,
    borderTop: 'none',
    borderRadius: `0 0 ${dim(list.borderRadius, '6px')} ${dim(list.borderRadius, '6px')}`,
    boxShadow: list.boxShadow,
    zIndex: list.zIndex ?? 50,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  });
}

// ─── Scrollbar Styles ────────────────────────────────────────────────────────
// Figma: custom scrollbar (grey, 4px width) using ::-webkit-scrollbar pseudo-elements

export function buildScrollbarStyles(params: DropdownStyleParams): string {
  const { config } = params;
  const list = config.list || {};

  return css({
    '&::-webkit-scrollbar': {
      width: dim(list.scrollbarWidth, '4px'),
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: list.scrollbarColor || '#ccc',
      borderRadius: dim(list.scrollbarWidth, '4px'),
    },
  });
}

// ─── Section Header Styles ───────────────────────────────────────────────────
// Figma: section header caption text (color, font family, font size, line-height, padding)

export function buildSectionHeaderStyles(params: DropdownStyleParams): string {
  const { config } = params;
  const sh = config.sectionHeader || {};

  return css({
    color: sh.color,
    fontFamily: sh.fontFamily || 'Noto Sans, sans-serif',
    fontSize: dim(sh.fontSize, '10px'),
    lineHeight: dim(sh.lineHeight, '12px'),
    paddingTop: dim(sh.paddingTop, '8px'),
    paddingBottom: dim(sh.paddingBottom, '2px'),
    paddingLeft: dim(sh.paddingHorizontal, '8px'),
    paddingRight: dim(sh.paddingHorizontal, '8px'),
    margin: 0,
    userSelect: 'none',
  });
}

// ─── List Footer Styles ──────────────────────────────────────────────────────
// Figma: footer container (border-top 1px solid, padding, display flex,
// justify-content flex-end, gap)

export function buildListFooterStyles(params: DropdownStyleParams): string {
  const { config } = params;
  const footer = config.footer || {};
  const list = config.list || {};

  return css({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: dim(footer.gap, '6px'),
    padding: dim(footer.padding, '8px'),
    borderTop: `1px solid ${footer.borderTopColor || 'transparent'}`,
    boxSizing: 'border-box',
  });
}

// ─── Search Input Styles ─────────────────────────────────────────────────────
// Figma: search input within list panel (border-bottom, padding, font-size,
// color, placeholder color via ::placeholder, background, width 100%,
// outline none, border none except bottom)

export function buildSearchInputStyles(params: DropdownStyleParams): string {
  const { config, size } = params;
  const base = config.base || {};
  const search = config.search || {};
  const sc = getInputSizeConfig(config, size);

  return css({
    width: '100%',
    border: 'none',
    borderBottom: `1px solid ${search.borderColor || 'transparent'}`,
    padding: `${dim(sc.paddingVertical, '8px')} ${dim(sc.paddingHorizontal, '12px')}`,
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontSize: dim(sc.fontSize, '14px'),
    lineHeight: dim(sc.lineHeight, '20px'),
    color: search.textColor,
    backgroundColor: search.backgroundColor || 'transparent',
    outline: 'none',
    boxSizing: 'border-box',

    '&::placeholder': {
      color: search.placeholderColor,
    },
  });
}

// ─── Chips Container Styles ──────────────────────────────────────────────────
// Figma: multi-select chips area (display flex, flex-wrap wrap, gap 4px,
// align-items center, flex 1, min-width 0)

export function buildChipsContainerStyles(): string {
  return css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  });
}
