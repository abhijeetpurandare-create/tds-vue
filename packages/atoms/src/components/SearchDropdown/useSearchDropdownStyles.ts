import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

// ─── Config Shape Interfaces ─────────────────────────────────────────────────

export interface SearchFieldConfig {
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  iconColor?: string;
  hoverBorderColor?: string;
  hoverBackgroundColor?: string;
  activeBorderColor?: string;
  activeBackgroundColor?: string;
  focusRingColor?: string;
  borderWidth?: string;
  sizes?: Record<string, SearchFieldSizeConfig>;
}

export interface SearchFieldSizeConfig {
  height?: string;
  fontSize?: string;
  lineHeight?: string;
  padding?: string;
  paddingHorizontal?: string;
  paddingVertical?: string;
  gap?: string;
  iconSize?: string;
}

export interface SearchCellStyleConfig {
  textColor?: string;
  descriptionColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
  disabledTextColor?: string;
  iconColor?: string;
}

export interface SearchCellSizeConfig {
  fontSize?: string;
  lineHeight?: string;
  descriptionFontSize?: string;
  descriptionLineHeight?: string;
  padding?: string;
  gap?: string;
  iconSize?: string;
}

export interface ListConfig {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadiusBottomLeft?: string;
  borderRadiusBottomRight?: string;
  scrollbarColor?: string;
  scrollbarWidth?: string;
  scrollbarRadius?: string;
  scrollbarPaddingX?: string;
  scrollbarPaddingY?: string;
}

export interface TagsRowConfig {
  padding?: string;
  gap?: string;
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

export interface SearchHistoryLabelConfig {
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  iconSize?: string;
  padding?: string;
  gap?: string;
}

export interface DividerConfig {
  color?: string;
  height?: string;
}

export interface FooterConfig {
  borderTopColor?: string;
  padding?: string;
  gap?: string;
}

export interface SearchDropdownStateConfig {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  placeholderColor?: string;
  iconColor?: string;
  cursor?: string;
  pointerEvents?: string;
  [key: string]: any;
}

export interface SearchDropdownTarmacConfig {
  base: {
    fontFamily?: string;
    captionFontFamily?: string;
    fontWeight?: string;
    radius?: string;
    listRadius?: string;
    transition?: string;
    focusRingSpread?: string;
  };
  searchField: SearchFieldConfig;
  searchCell: {
    styles: Record<string, SearchCellStyleConfig>;
    sizes: Record<string, SearchCellSizeConfig>;
  };
  list: ListConfig;
  tagsRow: TagsRowConfig;
  sectionHeader: SectionHeaderConfig;
  searchHistoryLabel: SearchHistoryLabelConfig;
  divider: DividerConfig;
  footer: FooterConfig;
  states: {
    disabled?: SearchDropdownStateConfig;
    ghost?: SearchDropdownStateConfig;
  };
}

// ─── Style Params Interfaces ─────────────────────────────────────────────────

export interface SearchDropdownStyleParams {
  config: SearchDropdownTarmacConfig;
  size: string;
  fieldVariant: string;
  isDisabled: boolean;
  isGhost: boolean;
  isOpen: boolean;
}

export interface SearchCellStyleParams {
  config: SearchDropdownTarmacConfig;
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

function getSearchFieldSizeConfig(config: SearchDropdownTarmacConfig, size: string): SearchFieldSizeConfig {
  return config.searchField?.sizes?.[size] || {};
}

// ─── Outer Container Styles ──────────────────────────────────────────────────
// Figma: flex-col, position relative, w-full

export function buildContainerStyles(params: SearchDropdownStyleParams): string {
  const { isGhost } = params;

  return css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    ...(isGhost && { pointerEvents: 'none' }),
  });
}

// ─── Search Field Styles (bordered trigger with pseudo-states) ───────────────
// Figma: flex, items-center, border, rounded, bg, transition,
// :hover, :active, :focus-within pseudo-states, disabled + ghost overrides

export function buildSearchFieldStyles(params: SearchDropdownStyleParams): string {
  const { config, size, isDisabled, isGhost, isOpen } = params;
  const base = config.base || {};
  const sf = config.searchField || {};
  const sc = getSearchFieldSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};
  const ghostState = config.states?.ghost || {};

  const radius = dim(base.radius, '6px');
  // When expanded, only top corners are rounded (field + list form connected unit)
  const borderRadius = isOpen ? `${radius} ${radius} 0 0` : radius;

  return css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: dim(sc.height),
    backgroundColor: sf.backgroundColor,
    borderWidth: dim(sf.borderWidth, '1px'),
    borderStyle: 'solid',
    borderColor: sf.borderColor,
    borderRadius,
    transition: base.transition || 'all 0.15s ease-in-out',
    boxSizing: 'border-box',
    cursor: 'pointer',
    outline: 'none',

    '&:hover:not(.disabled):not(.ghost)': {
      borderColor: sf.hoverBorderColor,
      backgroundColor: sf.hoverBackgroundColor,
    },
    '&:active:not(.disabled):not(.ghost)': {
      borderColor: sf.activeBorderColor,
      backgroundColor: sf.activeBackgroundColor,
    },
    '&:focus-within:not(.disabled):not(.ghost)': {
      boxShadow: sf.focusRingColor
        ? `0 0 0 ${dim(base.focusRingSpread, '2px')} ${sf.focusRingColor}`
        : undefined,
      borderColor: sf.activeBorderColor,
      outline: 'none',
    },

    // Disabled overrides
    ...(isDisabled && {
      backgroundColor: disabledState.backgroundColor || sf.backgroundColor,
      borderColor: disabledState.borderColor || sf.borderColor,
      color: disabledState.textColor,
      cursor: disabledState.cursor || 'default',
      '&:hover': {},
      '&:active': {},
      '&:focus-within': {},
    }),
    // Ghost overrides
    ...(isGhost && {
      backgroundColor: ghostState.backgroundColor,
      borderColor: ghostState.borderColor || 'transparent',
      color: ghostState.textColor || 'transparent',
      cursor: ghostState.cursor || 'default',
      pointerEvents: (ghostState.pointerEvents as 'none') || 'none',
      '&:hover': {},
      '&:active': {},
      '&:focus-within': {},
    }),
  });
}

// ─── Input Row Styles (inner row: flex, items-center, gap) ───────────────────
// Figma: flex, items-center, gap, flex-1, padding

export function buildInputRowStyles(params: SearchDropdownStyleParams): string {
  const { config, size, isDisabled, isGhost } = params;
  const base = config.base || {};
  const sf = config.searchField || {};
  const sc = getSearchFieldSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};

  const textColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (disabledState.textColor || sf.textColor)
      : sf.textColor;

  const placeholderColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (disabledState.placeholderColor || sf.placeholderColor)
      : sf.placeholderColor;

  // Support paddingHorizontal/paddingVertical (Figma small size uses different vertical padding)
  const paddingH = dim((sc as any).paddingHorizontal || sc.padding, '12px');
  const paddingV = dim((sc as any).paddingVertical || sc.padding, '12px');

  return css({
    display: 'flex',
    alignItems: 'center',
    flex: '1 0 0',
    minWidth: '1px',
    minHeight: '1px',
    gap: dim(sc.gap, '4px'),
    padding: `${paddingV} ${paddingH}`,
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 500,
    fontSize: dim(sc.fontSize, '14px'),
    lineHeight: dim(sc.lineHeight, '20px'),
    color: textColor,
    overflow: 'hidden',

    '& input': {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      color: 'inherit',
      flex: '1 0 0',
      minWidth: '40px',
      padding: 0,
      margin: 0,
    },
    '& input::placeholder': {
      color: placeholderColor,
    },
  });
}

// ─── Icon Container Styles ───────────────────────────────────────────────────
// Figma: leading/trailing icon containers (width/height from iconSize, flex-shrink: 0)

export function buildIconContainerStyles(params: SearchDropdownStyleParams): string {
  const { config, size, isDisabled, isGhost } = params;
  const sf = config.searchField || {};
  const sc = getSearchFieldSizeConfig(config, size);
  const disabledState = config.states?.disabled || {};

  const iconSize = dim(sc.iconSize, '20px');
  const iconColor = isGhost
    ? 'transparent'
    : isDisabled
      ? (disabledState.iconColor || sf.iconColor)
      : sf.iconColor;

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

// ─── Tags Container Styles ───────────────────────────────────────────────────
// Figma: tags flex-wrap container inside With Tags field (flex, wrap, gap, items-center)

export function buildTagsContainerStyles(params: SearchDropdownStyleParams): string {
  return css({
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
  });
}

// ─── Ghost Skeleton Styles ───────────────────────────────────────────────────
// Figma Ghost state: simple grey skeleton placeholder blocks (field and block),
// no text, icons, or interactive elements

export function buildGhostSkeletonStyles(params: SearchDropdownStyleParams): {
  field: string;
  block: string;
} {
  const { config } = params;
  const ghostState = config.states?.ghost || {};
  const bg = ghostState.backgroundColor || '#ededed';

  const field = css({
    width: '100%',
    height: dim((ghostState as any).skeletonFieldHeight, '44px'),
    borderRadius: dim((ghostState as any).skeletonFieldRadius, '6px'),
    backgroundColor: bg,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    padding: dim(config.searchField?.sizes?.md?.padding, '12px'),
    boxSizing: 'border-box',
  });

  const block = css({
    width: '40%',
    height: '60%',
    borderRadius: dim((ghostState as any).skeletonFieldRadius, '6px'),
    backgroundColor: bg,
    opacity: 0.6,
  });

  return { field, block };
}

// ─── Scrollbar Styles ────────────────────────────────────────────────────────
// Figma: custom scrollbar (grey, 4px width, Radius/Max) using
// ::-webkit-scrollbar pseudo-elements

export function buildScrollbarStyles(params: SearchDropdownStyleParams): string {
  const { config } = params;
  const list = config.list || {};

  return css({
    paddingLeft: dim(list.scrollbarPaddingX, '4px'),
    paddingRight: dim(list.scrollbarPaddingX, '4px'),
    paddingTop: dim(list.scrollbarPaddingY, '24px'),
    paddingBottom: dim(list.scrollbarPaddingY, '24px'),

    '&::-webkit-scrollbar': {
      width: dim(list.scrollbarWidth, '4px'),
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: list.scrollbarColor || '#d4d4d4',
      borderRadius: dim(list.scrollbarRadius, '999px'),
    },
  });
}

// ─── Search Cell Styles (individual list items with pseudo-states) ────────────
// Figma: flex, items-center, gap, padding, bg, transition,
// :hover, :active pseudo-states, Regular and Blue style support,
// disabled overrides, selected state styling

function getSearchCellStyleConfig(config: SearchDropdownTarmacConfig, cellStyle: string): SearchCellStyleConfig {
  return config.searchCell?.styles?.[cellStyle] || {};
}

function getSearchCellSizeConfig(config: SearchDropdownTarmacConfig, size: string): SearchCellSizeConfig {
  return config.searchCell?.sizes?.[size] || {};
}

export function buildSearchCellStyles(params: SearchCellStyleParams): string {
  const { config, cellStyle, size, isSelected, isDisabled } = params;
  const base = config.base || {};
  const sc = getSearchCellStyleConfig(config, cellStyle);
  const sz = getSearchCellSizeConfig(config, size);

  return css({
    display: 'flex',
    alignItems: 'center',
    gap: dim(sz.gap, '8px'),
    padding: dim(sz.padding, '12px'),
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(base.fontWeight) || 500,
    fontSize: dim(sz.fontSize, '14px'),
    lineHeight: dim(sz.lineHeight, '20px'),
    color: sc.textColor,
    backgroundColor: isSelected ? sc.hoverBackgroundColor : (sc.backgroundColor || 'transparent'),
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: base.transition || 'all 0.15s ease-in-out',
    userSelect: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: sc.hoverBackgroundColor,
    },
    '&:active': {
      backgroundColor: sc.activeBackgroundColor,
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

// ─── Cell Text Container Styles ──────────────────────────────────────────────
// Figma: vertical flex container for primary text + description text

export function buildCellTextContainerStyles(params: SearchCellStyleParams): string {
  const { config, cellStyle, size } = params;
  const sc = getSearchCellStyleConfig(config, cellStyle);
  const sz = getSearchCellSizeConfig(config, size);
  const base = config.base || {};

  return css({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    minWidth: 0,

    '& > span:first-child': {
      fontSize: dim(sz.fontSize, '14px'),
      lineHeight: dim(sz.lineHeight, '20px'),
      color: sc.textColor,
    },
    '& > span:last-child:not(:first-child)': {
      fontFamily: base.captionFontFamily || 'Noto Sans, sans-serif',
      fontSize: dim(sz.descriptionFontSize, '12px'),
      lineHeight: dim(sz.descriptionLineHeight, '16px'),
      color: sc.descriptionColor,
    },
  });
}

// ─── List Panel Styles (dropdown panel) ──────────────────────────────────────
// Figma: position absolute, border, bg, bottom-only radius, max-height,
// z-index, overflow-y auto, scrollbar styles inline

export function buildListPanelStyles(params: SearchDropdownStyleParams): string {
  const { config } = params;
  const list = config.list || {};

  return css({
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    overflowY: 'auto',
    backgroundColor: list.backgroundColor,
    borderWidth: dim(list.borderWidth, '1px'),
    borderStyle: 'solid',
    borderColor: list.borderColor || 'transparent',
    borderTop: 'none',
    borderRadius: `0 0 ${dim(list.borderRadiusBottomRight, '6px')} ${dim(list.borderRadiusBottomLeft, '6px')}`,
    zIndex: 50,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',

    // Inline scrollbar styles
    '&::-webkit-scrollbar': {
      width: dim(list.scrollbarWidth, '4px'),
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: list.scrollbarColor || '#d4d4d4',
      borderRadius: dim(list.scrollbarRadius, '999px'),
    },
  });
}

// ─── Section Header Styles ───────────────────────────────────────────────────
// Figma: caption text for section group headers

export function buildSectionHeaderStyles(params: SearchDropdownStyleParams): string {
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
    boxSizing: 'border-box',
    userSelect: 'none',
  });
}

// ─── Search History Label Styles ─────────────────────────────────────────────
// Figma: search history label with icon (caption text, icon container, gap)

export function buildSearchHistoryLabelStyles(params: SearchDropdownStyleParams): string {
  const { config } = params;
  const hl = config.searchHistoryLabel || {};

  return css({
    display: 'flex',
    alignItems: 'center',
    gap: dim(hl.gap, '4px'),
    padding: dim(hl.padding, '8px'),
    color: hl.color,
    fontFamily: hl.fontFamily || 'Noto Sans, sans-serif',
    fontSize: dim(hl.fontSize, '12px'),
    lineHeight: dim(hl.lineHeight, '16px'),
    boxSizing: 'border-box',
    userSelect: 'none',

    '& > span:first-child': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim(hl.iconSize, '16px'),
      height: dim(hl.iconSize, '16px'),
      flexShrink: 0,
      '& > *': {
        width: dim(hl.iconSize, '16px'),
        height: dim(hl.iconSize, '16px'),
      },
    },
  });
}

// ─── Tags Row Styles ─────────────────────────────────────────────────────────
// Figma: tags row at top of list panel (flex, wrap, padding, gap)

export function buildTagsRowStyles(params: SearchDropdownStyleParams): string {
  const { config } = params;
  const tr = config.tagsRow || {};

  return css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: dim(tr.padding, '8px'),
    gap: dim(tr.gap, '4px'),
    boxSizing: 'border-box',
  });
}

// ─── Divider Styles ──────────────────────────────────────────────────────────
// Figma: horizontal divider between consecutive cells

export function buildDividerStyles(params: SearchDropdownStyleParams): string {
  const { config } = params;
  const dv = config.divider || {};

  return css({
    width: '100%',
    height: dim(dv.height, '1px'),
    backgroundColor: dv.color,
    flexShrink: 0,
  });
}

// ─── List Footer Styles ──────────────────────────────────────────────────────
// Figma: footer container (border-top, padding, button spacing via gap)

export function buildListFooterStyles(params: SearchDropdownStyleParams): string {
  const { config } = params;
  const ft = config.footer || {};

  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: dim(ft.gap, '8px'),
    padding: dim(ft.padding, '8px'),
    borderTop: `1px solid ${ft.borderTopColor || 'transparent'}`,
    boxSizing: 'border-box',
  });
}
