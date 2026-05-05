import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert raw number or string to CSS dimension (e.g. 16 → "16px", "16px" → "16px") */
function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}

// ─── Config Shape Interfaces ─────────────────────────────────────────────────

export interface SelectionCardSizeConfig {
  padding?: string;
  gap?: string;
  titleFontSize?: string;
  titleLineHeight?: string;
  subtextFontSize?: string;
  subtextLineHeight?: string;
  trailingIconSize?: string;
  statusDotSize?: string;
}

export interface SelectionCardStateConfig {
  borderColor?: string;
  backgroundColor?: string;
  titleColor?: string;
  subtextColor?: string;
  iconColor?: string;
  focusRingColor?: string;
  cursor?: string;
  pointerEvents?: string;
  [key: string]: any;
}

export interface InfoCardStyleConfig {
  slotLeadingSize?: string;
  slotLeadingBg?: string;
  slotLeadingRadius?: string;
  slotTrailingSize?: string;
  slotTrailingBg?: string;
  slotTrailingRadius?: string;
  titleFontFamily?: string;
  titleFontWeight?: string;
  titleFontSize?: string;
  titleLineHeight?: string;
  subtextTopFontSize?: string;
  subtextTopLineHeight?: string;
  subtextBottomFontSize?: string;
  subtextBottomLineHeight?: string;
  trailingIconSize?: string;
  infoIconSize?: string;
  imageAreaHeight?: string;
  subtitleFontSize?: string;
  subtitleLineHeight?: string;
  bannerHeight?: string;
  contentPadding?: string;
  padding?: string;
  gap?: string;
  contentRowGap?: string;
}

export interface InfoCardStateConfig {
  borderColor?: string;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  subtextColor?: string;
  iconColor?: string;
  focusRingColor?: string;
  cursor?: string;
  pointerEvents?: string;
  [key: string]: any;
}

export interface CardBaseConfig {
  padding?: string;
  gap?: string;
  borderWidth?: string;
  borderRadius?: string;
  width?: string;
  headerGap?: string;
  subitemsGap?: string;
  subitemInnerGap?: string;
  buttonsGap?: string;
  iconSize?: string;
  stepperIconSize?: string;
  titleFontSize?: string;
  titleLineHeight?: string;
  titleFontWeight?: string;
  captionFontSize?: string;
  captionLineHeight?: string;
}

export interface CardVariantConfig {
  bannerHeight?: string;
  infoSetGap?: string;
  labelFontSize?: string;
  labelLineHeight?: string;
  valueFontSize?: string;
  valueLineHeight?: string;
  valueFontWeight?: string;
  [key: string]: any;
}

export interface CardStateConfig {
  borderColor?: string;
  backgroundColor?: string;
  titleColor?: string;
  subtextColor?: string;
  iconColor?: string;
  subitemLabelColor?: string;
  stepperBgColor?: string;
  stepperTextColor?: string;
  statusIndicatorColor?: string;
  focusRingColor?: string;
  cursor?: string;
  pointerEvents?: string;
  [key: string]: any;
}

export interface CardTarmacConfig {
  base: {
    fontFamily?: string;
    headingFontFamily?: string;
    captionFontFamily?: string;
    fontWeight?: string;
    radius?: string;
    transition?: string;
    focusRingSpread?: string;
  };
  selectionCard: {
    types: Record<string, { indicatorComponent?: string }>;
    sizes: Record<string, SelectionCardSizeConfig>;
    states: Record<string, SelectionCardStateConfig>;
  };
  infoCard: {
    styles: Record<string, InfoCardStyleConfig>;
    states: Record<string, InfoCardStateConfig>;
  };
  card: {
    base: CardBaseConfig;
    variants: Record<string, CardVariantConfig>;
    states: Record<string, CardStateConfig>;
  };
}

// ─── Style Params Interfaces ─────────────────────────────────────────────────

export interface SelectionCardStyleParams {
  config: CardTarmacConfig;
  selectionType: string;
  size: string;
  selected: boolean;
  isDisabled: boolean;
  isGhost: boolean;
}

export interface InfoCardStyleParams {
  config: CardTarmacConfig;
  infoStyle: string;
  isDisabled: boolean;
  isGhost: boolean;
  hasOnClick: boolean;
}

export interface CardStyleParams {
  config: CardTarmacConfig;
  cardVariant: string;
  isDisabled: boolean;
  isGhost: boolean;
  hasOnClick: boolean;
}

// ─── Config Accessors ────────────────────────────────────────────────────────

function getSelectionSizeConfig(config: CardTarmacConfig, size: string): SelectionCardSizeConfig {
  return config.selectionCard?.sizes?.[size] || {};
}

function getSelectionStateConfig(config: CardTarmacConfig, state: string): SelectionCardStateConfig {
  return config.selectionCard?.states?.[state] || {};
}

// ─── Selection Card Container Styles ─────────────────────────────────────────
// Figma: flex-row, gap, padding, border=1px solid, border-radius, bg, transition
// Pseudo-states: :hover, :active, :focus with selected/disabled/ghost overrides

export function buildSelectionCardStyles(params: SelectionCardStyleParams): string {
  const { config, size, selected, isDisabled, isGhost } = params;
  const base = config.base || {};
  const sc = getSelectionSizeConfig(config, size);
  const defaultState = getSelectionStateConfig(config, 'default');
  const hoverState = getSelectionStateConfig(config, 'hover');
  const pressedState = getSelectionStateConfig(config, 'pressed');
  const focusedState = getSelectionStateConfig(config, 'focused');
  const selectedState = getSelectionStateConfig(config, 'selected');
  const disabledState = getSelectionStateConfig(config, 'disabled');
  const ghostState = getSelectionStateConfig(config, 'ghost');

  const borderColor = selected
    ? (selectedState.borderColor || defaultState.borderColor)
    : defaultState.borderColor;
  const backgroundColor = selected
    ? (selectedState.backgroundColor || defaultState.backgroundColor)
    : defaultState.backgroundColor;

  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: dim(sc.padding, '16px'),
    gap: dim(sc.gap, '12px'),
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: borderColor,
    borderRadius: dim(base.radius, '4px'),
    backgroundColor: backgroundColor,
    fontFamily: base.fontFamily,
    transition: base.transition || 'all 0.15s ease-in-out',
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    overflow: 'hidden',

    '&:hover': {
      borderColor: hoverState.borderColor || borderColor,
      backgroundColor: hoverState.backgroundColor || backgroundColor,
    },
    '&:active': {
      borderColor: pressedState.borderColor || hoverState.borderColor || borderColor,
      backgroundColor: pressedState.backgroundColor || hoverState.backgroundColor || backgroundColor,
    },
    '&:focus': {
      boxShadow: focusedState.focusRingColor
        ? `0 0 0 ${dim(base.focusRingSpread, '2px')} ${focusedState.focusRingColor}`
        : undefined,
      outline: 'none',
    },

    // Disabled overrides
    ...(isDisabled && {
      borderColor: disabledState.borderColor || defaultState.borderColor,
      backgroundColor: disabledState.backgroundColor || defaultState.backgroundColor,
      cursor: disabledState.cursor || 'default',
      pointerEvents: 'auto' as const,
      '&:hover': {},
      '&:active': {},
      '&:focus': {},
    }),

    // Ghost overrides
    ...(isGhost && {
      borderColor: ghostState.borderColor || 'transparent',
      backgroundColor: ghostState.backgroundColor || defaultState.backgroundColor,
      cursor: ghostState.cursor || 'default',
      pointerEvents: (ghostState.pointerEvents as 'none') || 'none',
      '&:hover': {},
      '&:active': {},
      '&:focus': {},
    }),
  });
}

// ─── Selection Card Content Styles ───────────────────────────────────────────
// Returns an object with class strings for title, subtext, status indicator dot,
// and trailing icon within the selection card.

export function buildSelectionCardContentStyles(params: SelectionCardStyleParams): {
  contentArea: string;
  textsColumn: string;
  title: string;
  subtext: string;
  trailingIcon: string;
} {
  const { config, size, isDisabled } = params;
  const base = config.base || {};
  const sc = getSelectionSizeConfig(config, size);
  const defaultState = getSelectionStateConfig(config, 'default');
  const disabledState = getSelectionStateConfig(config, 'disabled');

  const titleColor = isDisabled
    ? (disabledState.titleColor || defaultState.titleColor)
    : defaultState.titleColor;
  const subtextColor = isDisabled
    ? (disabledState.subtextColor || defaultState.subtextColor)
    : defaultState.subtextColor;
  const iconColor = isDisabled
    ? (disabledState.iconColor || defaultState.iconColor)
    : defaultState.iconColor;

  const contentArea = css({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: dim('4px', '4px'),
    alignItems: 'flex-start',
    minWidth: 0,
  });

  const textsColumn = css({
    display: 'flex',
    flexDirection: 'column',
    gap: dim('0px', '0px'),
    alignItems: 'flex-start',
    width: '100%',
  });

  const title = css({
    fontFamily: base.fontFamily,
    fontWeight: base.fontWeight || '500',
    fontSize: dim(sc.titleFontSize, '16px'),
    lineHeight: dim(sc.titleLineHeight, '24px'),
    color: titleColor,
    margin: 0,
    whiteSpace: 'nowrap',
  });

  const subtext = css({
    fontFamily: size === 'sm' ? (base.captionFontFamily || base.fontFamily) : base.fontFamily,
    fontWeight: '400',
    fontSize: dim(sc.subtextFontSize, '14px'),
    lineHeight: dim(sc.subtextLineHeight, '20px'),
    color: subtextColor,
    margin: 0,
    minWidth: '100%',
    width: 'min-content',
  });

  const trailingIcon = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sc.trailingIconSize, '24px'),
    height: dim(sc.trailingIconSize, '24px'),
    color: iconColor,
    flexShrink: 0,
    overflow: 'hidden',
  });

  return { contentArea, textsColumn, title, subtext, trailingIcon };
}

// ─── Selection Card Ghost Skeleton Styles ────────────────────────────────────
// Returns an Emotion css() class string for the selection card ghost skeleton
// placeholder blocks.

export function buildSelectionCardGhostStyles(params: SelectionCardStyleParams): {
  wrapper: string;
  block1: string;
  block2: string;
} {
  const { config } = params;
  const base = config.base || {};
  const ghostState = getSelectionStateConfig(config, 'ghost');
  const blockBg = ghostState.skeletonBlockBg || ghostState.backgroundColor || '#d4d4d4';
  const blockRadius = dim(ghostState.skeletonRadius || base.radius, '6px');

  const wrapper = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  });

  const block1 = css({
    width: '86px',
    height: '10px',
    borderRadius: blockRadius,
    backgroundColor: blockBg,
    flexShrink: 0,
  });

  const block2 = css({
    width: '125px',
    height: '12px',
    borderRadius: blockRadius,
    backgroundColor: blockBg,
    flexShrink: 0,
  });

  return { wrapper, block1, block2 };
}

// ─── Info Card Config Accessors ──────────────────────────────────────────────

function getInfoStyleConfig(config: CardTarmacConfig, style: string): InfoCardStyleConfig {
  return config.infoCard?.styles?.[style] || {};
}

function getInfoStateConfig(config: CardTarmacConfig, state: string): InfoCardStateConfig {
  return config.infoCard?.states?.[state] || {};
}

// ─── Info Card Container Styles ──────────────────────────────────────────────
// Figma: flex-col, padding, border=1px solid, border-radius, bg, transition
// Pseudo-states: :hover, :focus with disabled/ghost overrides

export function buildInfoCardStyles(params: InfoCardStyleParams): string {
  const { config, infoStyle, isDisabled, isGhost, hasOnClick } = params;
  const base = config.base || {};
  const sc = getInfoStyleConfig(config, infoStyle);
  const defaultState = getInfoStateConfig(config, 'default');
  const hoverState = getInfoStateConfig(config, 'hover');
  const focusedState = getInfoStateConfig(config, 'focused');
  const disabledState = getInfoStateConfig(config, 'disabled');
  const ghostState = getInfoStateConfig(config, 'ghost');

  const isSlotTop = infoStyle === 'slotTop';
  const isSlotBanner = infoStyle === 'slotBanner';

  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: dim(sc.gap || '8px', '0px'),
    // Figma: Slot Top → alignItems:center, Slot Banner → alignItems:stretch,
    // Slots/Regular → no alignItems (defaults to stretch)
    ...(isSlotTop && { alignItems: 'center' as const }),
    ...(isSlotBanner && { alignItems: 'stretch' as const }),
    justifyContent: (isSlotTop || isSlotBanner) ? undefined : 'center',
    padding: dim(sc.contentPadding || sc.padding || '12px', '12px'),
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: defaultState.borderColor,
    borderRadius: dim(base.radius, '6px'),
    backgroundColor: defaultState.backgroundColor,
    fontFamily: base.fontFamily,
    transition: base.transition || 'all 0.15s ease-in-out',
    cursor: hasOnClick ? 'pointer' : 'default',
    outline: 'none',
    boxSizing: 'border-box',

    '&:hover': {
      borderColor: hoverState.borderColor || defaultState.borderColor,
      backgroundColor: hoverState.backgroundColor || defaultState.backgroundColor,
    },
    '&:focus': {
      boxShadow: focusedState.focusRingColor
        ? `0 0 0 ${dim(base.focusRingSpread, '2px')} ${focusedState.focusRingColor}`
        : undefined,
      outline: 'none',
    },

    // Disabled overrides
    ...(isDisabled && {
      borderColor: disabledState.borderColor || defaultState.borderColor,
      backgroundColor: disabledState.backgroundColor || defaultState.backgroundColor,
      cursor: disabledState.cursor || 'default',
      pointerEvents: 'auto' as const,
      overflow: 'hidden' as const,
      '&:hover': {},
      '&:focus': {},
    }),

    // Ghost overrides
    ...(isGhost && {
      borderColor: ghostState.borderColor || defaultState.borderColor,
      backgroundColor: ghostState.backgroundColor || defaultState.backgroundColor,
      cursor: ghostState.cursor || 'default',
      pointerEvents: (ghostState.pointerEvents as 'none') || 'none',
      '&:hover': {},
      '&:focus': {},
    }),
  });
}

// ─── Info Card Slots Layout Styles ───────────────────────────────────────────
// Returns object with class strings for slots layout: slot leading area (48px
// square, blue bg), text set column (subtextTop, title, subtextBottom), slot
// trailing area (32px square, blue bg), trailing icon.

export function buildInfoCardSlotsStyles(params: InfoCardStyleParams): {
  slotsRow: string;
  innerRow: string;
  slotLeading: string;
  textSet: string;
  subtextTop: string;
  title: string;
  subtextBottom: string;
  slotTrailing: string;
  trailingIcon: string;
} {
  const { config, infoStyle, isDisabled } = params;
  const base = config.base || {};
  const sc = getInfoStyleConfig(config, infoStyle);
  const defaultState = getInfoStateConfig(config, 'default');
  const disabledState = getInfoStateConfig(config, 'disabled');

  const titleColor = isDisabled
    ? (disabledState.titleColor || defaultState.titleColor)
    : defaultState.titleColor;
  const subtextColor = isDisabled
    ? (disabledState.subtextColor || defaultState.subtextColor)
    : defaultState.subtextColor;
  const iconColor = isDisabled
    ? (disabledState.iconColor || defaultState.iconColor)
    : defaultState.iconColor;

  // Figma Frame 2085662520: row, gap=4px — fills card width
  const slotsRow = css({
    display: 'flex',
    flexDirection: 'row',
    gap: dim(sc.contentRowGap || '4px', '4px'),
    width: '100%',
  });

  // Figma Frame 2085662519: row, gap=8px — takes remaining space
  const innerRow = css({
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    flex: '1 1 0',
    minWidth: 0,
  });

  const slotLeading = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sc.slotLeadingSize, '48px'),
    height: dim(sc.slotLeadingSize, '48px'),
    backgroundColor: sc.slotLeadingBg,
    borderRadius: dim(sc.slotLeadingRadius || base.radius, '4px'),
    flexShrink: 0,
    padding: '10px',
    boxSizing: 'border-box',
  });

  const textSet = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 0,
  });

  const subtextTop = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontSize: dim(sc.subtextTopFontSize, '12px'),
    lineHeight: dim(sc.subtextTopLineHeight, '16px'),
    fontWeight: '400',
    color: subtextColor,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    alignSelf: 'stretch',
  });

  const title = css({
    fontFamily: sc.titleFontFamily || base.headingFontFamily || base.fontFamily,
    fontWeight: sc.titleFontWeight || '600',
    fontSize: dim(sc.titleFontSize, '24px'),
    lineHeight: dim(sc.titleLineHeight, '32px'),
    color: titleColor,
    margin: 0,
  });

  const subtextBottom = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontSize: dim(sc.subtextBottomFontSize, '12px'),
    lineHeight: dim(sc.subtextBottomLineHeight, '16px'),
    fontWeight: '400',
    color: subtextColor,
    margin: 0,
  });

  const slotTrailing = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sc.slotTrailingSize, '32px'),
    height: dim(sc.slotTrailingSize, '32px'),
    backgroundColor: sc.slotTrailingBg,
    borderRadius: dim(sc.slotTrailingRadius || base.radius, '4px'),
    flexShrink: 0,
    padding: '10px',
    boxSizing: 'border-box',
  });

  const trailingIcon = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sc.trailingIconSize, '20px'),
    height: dim(sc.trailingIconSize, '20px'),
    color: iconColor,
    flexShrink: 0,
  });

  return { slotsRow, innerRow, slotLeading, textSet, subtextTop, title, subtextBottom, slotTrailing, trailingIcon };
}

// ─── Info Card Slot Top Layout Styles ────────────────────────────────────────
// Returns object with class strings for slot top layout: image area on top,
// title, subtitle below.

export function buildInfoCardSlotTopStyles(params: InfoCardStyleParams): {
  contentRow: string;
  innerColumn: string;
  slotLeading: string;
  textSet: string;
  subtextTop: string;
  title: string;
  subtextBottom: string;
  trailingIcon: string;
} {
  const { config, infoStyle, isDisabled } = params;
  const base = config.base || {};
  const sc = getInfoStyleConfig(config, infoStyle);
  const defaultState = getInfoStateConfig(config, 'default');
  const disabledState = getInfoStateConfig(config, 'disabled');

  const titleColor = isDisabled
    ? (disabledState.titleColor || defaultState.titleColor)
    : defaultState.titleColor;
  const subtextColor = isDisabled
    ? (disabledState.subtextColor || defaultState.subtextColor)
    : defaultState.subtextColor;
  const iconColor = isDisabled
    ? (disabledState.iconColor || defaultState.iconColor)
    : defaultState.iconColor;

  // Figma Frame 2085662520: row, gap=4px — fills card width
  const contentRow = css({
    display: 'flex',
    flexDirection: 'row',
    gap: dim(sc.contentRowGap || '4px', '4px'),
    width: '100%',
  });

  // Figma Frame 2085662519: column, gap=8px — takes remaining space
  const innerColumn = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: '1 1 0',
    minWidth: 0,
  });

  const slotLeading = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sc.slotLeadingSize, '48px'),
    height: dim(sc.slotLeadingSize, '48px'),
    backgroundColor: sc.slotLeadingBg || '#f0f8ff',
    padding: '10px',
    boxSizing: 'border-box',
    flexShrink: 0,
  });

  // Figma Text set: column, justifyContent:center, no gap
  const textSet = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  });

  const subtextTop = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontWeight: '400',
    fontSize: dim(sc.subtextTopFontSize, '12px'),
    lineHeight: dim(sc.subtextTopLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    alignSelf: 'stretch',
  });

  const title = css({
    fontFamily: sc.titleFontFamily || base.headingFontFamily || base.fontFamily,
    fontWeight: sc.titleFontWeight || '600',
    fontSize: dim(sc.titleFontSize, '24px'),
    lineHeight: dim(sc.titleLineHeight, '32px'),
    color: titleColor,
    margin: 0,
  });

  const subtextBottom = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontWeight: '400',
    fontSize: dim(sc.subtextBottomFontSize, '12px'),
    lineHeight: dim(sc.subtextBottomLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
  });

  const trailingIcon = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sc.trailingIconSize, '20px'),
    height: dim(sc.trailingIconSize, '20px'),
    color: iconColor,
    flexShrink: 0,
    overflow: 'hidden',
  });

  return { contentRow, innerColumn, slotLeading, textSet, subtextTop, title, subtextBottom, trailingIcon };
}

// ─── Info Card Banner Layout Styles ──────────────────────────────────────────
// Returns object with class strings for slot banner layout: banner image area,
// content below.

export function buildInfoCardBannerStyles(params: InfoCardStyleParams): {
  contentRow: string;
  innerColumn: string;
  slotLeading: string;
  textSet: string;
  subtextTop: string;
  title: string;
  subtextBottom: string;
} {
  const { config, infoStyle, isDisabled } = params;
  const base = config.base || {};
  const sc = getInfoStyleConfig(config, infoStyle);
  const defaultState = getInfoStateConfig(config, 'default');
  const disabledState = getInfoStateConfig(config, 'disabled');

  const titleColor = isDisabled
    ? (disabledState.titleColor || defaultState.titleColor)
    : defaultState.titleColor;
  const subtextColor = isDisabled
    ? (disabledState.subtextColor || defaultState.subtextColor)
    : defaultState.subtextColor;

  // Figma Frame 2085662520: row, alignSelf:stretch, gap:4px, fill
  const contentRow = css({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: dim(sc.contentRowGap || '4px', '4px'),
  });

  // Figma Frame 2085662519: column, gap:8px, fill
  const innerColumn = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: '1 0 0',
    minWidth: 0,
  });

  // Figma Slot Leading: full-width stretch, centered, padding:10px
  const slotLeading = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: sc.slotLeadingBg || '#f0f8ff',
    padding: '10px',
    boxSizing: 'border-box',
  });

  // Figma Text set: column, justifyContent:center, no gap
  const textSet = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  });

  const subtextTop = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontWeight: '400',
    fontSize: dim(sc.subtextTopFontSize, '12px'),
    lineHeight: dim(sc.subtextTopLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    alignSelf: 'stretch',
  });

  const title = css({
    fontFamily: sc.titleFontFamily || base.headingFontFamily || base.fontFamily,
    fontWeight: sc.titleFontWeight || '600',
    fontSize: dim(sc.titleFontSize, '24px'),
    lineHeight: dim(sc.titleLineHeight, '32px'),
    color: titleColor,
    margin: 0,
  });

  const subtextBottom = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontWeight: '400',
    fontSize: dim(sc.subtextBottomFontSize, '12px'),
    lineHeight: dim(sc.subtextBottomLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
  });

  return { contentRow, innerColumn, slotLeading, textSet, subtextTop, title, subtextBottom };
}

// ─── Info Card Regular Layout Styles ─────────────────────────────────────────
// Returns object with class strings for regular layout: horizontal row with
// Slot Leading (32px) + Text Set + Trailing Icon. Title uses B2/body2_semibold.

export function buildInfoCardRegularStyles(params: InfoCardStyleParams): {
  contentRow: string;
  innerRow: string;
  slotLeading: string;
  textSet: string;
  subtextTop: string;
  title: string;
  subtextBottom: string;
  trailingIcon: string;
} {
  const { config, infoStyle, isDisabled } = params;
  const base = config.base || {};
  const sc = getInfoStyleConfig(config, infoStyle);
  const defaultState = getInfoStateConfig(config, 'default');
  const disabledState = getInfoStateConfig(config, 'disabled');

  const titleColor = isDisabled
    ? (disabledState.titleColor || defaultState.titleColor)
    : defaultState.titleColor;
  const subtextColor = isDisabled
    ? (disabledState.subtextColor || defaultState.subtextColor)
    : defaultState.subtextColor;
  const iconColor = isDisabled
    ? (disabledState.iconColor || defaultState.iconColor)
    : defaultState.iconColor;

  // Figma Frame 2085662520: row, gap=4px — fills card width
  const contentRow = css({
    display: 'flex',
    flexDirection: 'row',
    gap: dim(sc.contentRowGap || '4px', '4px'),
    width: '100%',
  });

  // Figma Frame 2085662519: row, gap=8px — takes remaining space
  const innerRow = css({
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    flex: '1 1 0',
    minWidth: 0,
  });

  // Figma Regular: Slot Leading is 32x32px
  const slotLeading = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sc.slotLeadingSize, '32px'),
    height: dim(sc.slotLeadingSize, '32px'),
    backgroundColor: sc.slotLeadingBg || '#f0f8ff',
    borderRadius: dim(sc.slotLeadingRadius || base.radius, '4px'),
    padding: '10px',
    boxSizing: 'border-box',
    flexShrink: 0,
  });

  // Figma Text set: column, justifyContent:center, no gap
  const textSet = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 0,
    flex: '1 0 0',
  });

  const subtextTop = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontWeight: '400',
    fontSize: dim(sc.subtextTopFontSize, '12px'),
    lineHeight: dim(sc.subtextTopLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    alignSelf: 'stretch',
  });

  // Figma Regular: B2/body2_semibold — 14px/20px, weight 600
  const title = css({
    fontFamily: sc.titleFontFamily || base.fontFamily,
    fontWeight: sc.titleFontWeight || '600',
    fontSize: dim(sc.titleFontSize, '14px'),
    lineHeight: dim(sc.titleLineHeight, '20px'),
    color: titleColor,
    margin: 0,
  });

  const subtextBottom = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontWeight: '400',
    fontSize: dim(sc.subtextBottomFontSize, '12px'),
    lineHeight: dim(sc.subtextBottomLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
  });

  const trailingIcon = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sc.trailingIconSize, '20px'),
    height: dim(sc.trailingIconSize, '20px'),
    color: iconColor,
    flexShrink: 0,
  });

  return { contentRow, innerRow, slotLeading, textSet, subtextTop, title, subtextBottom, trailingIcon };
}

// ─── Info Card Ghost Skeleton Styles ─────────────────────────────────────────
// Returns an Emotion css() class string for the info card ghost skeleton
// placeholder blocks.

export function buildInfoCardGhostStyles(params: InfoCardStyleParams): string {
  const { config, infoStyle } = params;
  const base = config.base || {};
  const ghostState = getInfoStateConfig(config, 'ghost');
  const bg = ghostState.skeletonBlockBg || '#d4d4d4';

  // Ghost renders two skeleton blocks positioned absolutely
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    padding: '12px',
    boxSizing: 'border-box',
    '&::before': {
      content: '""',
      display: 'block',
      width: '86px',
      height: '10px',
      borderRadius: dim(ghostState.skeletonRadius || base.radius, '6px'),
      backgroundColor: bg,
    },
    '&::after': {
      content: '""',
      display: 'block',
      width: '125px',
      height: '12px',
      borderRadius: dim(ghostState.skeletonRadius || base.radius, '6px'),
      backgroundColor: bg,
    },
  });
}

// ─── Card Config Accessors ───────────────────────────────────────────────────

function getCardBaseConfig(config: CardTarmacConfig): CardBaseConfig {
  return config.card?.base || {};
}

function getCardVariantConfig(config: CardTarmacConfig, variant: string): CardVariantConfig {
  return config.card?.variants?.[variant] || {};
}

function getCardStateConfig(config: CardTarmacConfig, state: string): CardStateConfig {
  return config.card?.states?.[state] || {};
}

// ─── Card Container Styles ───────────────────────────────────────────────────
// Figma: flex-col, gap=8px, padding=12px, border=1px solid, border-radius, bg,
// width=328px, transition. Pseudo-states: :hover, :focus with disabled/ghost overrides.

export function buildCardContainerStyles(params: CardStyleParams): string {
  const { config, isDisabled, isGhost, hasOnClick } = params;
  const base = config.base || {};
  const cb = getCardBaseConfig(config);
  const defaultState = getCardStateConfig(config, 'default');
  const hoverState = getCardStateConfig(config, 'hover');
  const focusedState = getCardStateConfig(config, 'focused');
  const disabledState = getCardStateConfig(config, 'disabled');
  const ghostState = getCardStateConfig(config, 'ghost');

  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: dim(cb.gap, '8px'),
    padding: dim(cb.padding, '12px'),
    borderWidth: dim(cb.borderWidth, '1px'),
    borderStyle: 'solid',
    borderColor: defaultState.borderColor,
    borderRadius: dim(cb.borderRadius || base.radius, '6px'),
    backgroundColor: defaultState.backgroundColor,
    width: dim(cb.width, '328px'),
    fontFamily: base.fontFamily,
    transition: base.transition || 'all 0.15s ease-in-out',
    cursor: hasOnClick ? 'pointer' : 'default',
    outline: 'none',
    boxSizing: 'border-box',
    overflow: 'hidden',

    '&:hover': {
      borderColor: hoverState.borderColor || defaultState.borderColor,
      backgroundColor: hoverState.backgroundColor || defaultState.backgroundColor,
    },
    '&:focus': {
      boxShadow: focusedState.focusRingColor
        ? `0 0 0 ${dim(base.focusRingSpread, '2px')} ${focusedState.focusRingColor}`
        : undefined,
      outline: 'none',
    },

    // Disabled overrides
    ...(isDisabled && {
      borderColor: disabledState.borderColor || defaultState.borderColor,
      backgroundColor: disabledState.backgroundColor || defaultState.backgroundColor,
      cursor: disabledState.cursor || 'default',
      pointerEvents: 'auto' as const,
      '&:hover': {},
      '&:focus': {},
    }),

    // Ghost overrides
    ...(isGhost && {
      borderColor: ghostState.borderColor || 'transparent',
      backgroundColor: ghostState.backgroundColor || defaultState.backgroundColor,
      cursor: ghostState.cursor || 'default',
      pointerEvents: (ghostState.pointerEvents as 'none') || 'none',
      '&:hover': {},
      '&:focus': {},
    }),
  });
}

// ─── Card Header Row Styles ──────────────────────────────────────────────────
// Returns object with class strings for header row: number (stepper icon),
// leading icon, text column, badge area, trailing icon.

export function buildCardHeaderRowStyles(params: CardStyleParams): {
  headerRow: string;
  numberArea: string;
  leadingIcon: string;
  textColumn: string;
  badgeArea: string;
  trailingIcon: string;
} {
  const { config, isDisabled } = params;
  const cb = getCardBaseConfig(config);
  const defaultState = getCardStateConfig(config, 'default');
  const disabledState = getCardStateConfig(config, 'disabled');

  const iconColor = isDisabled
    ? (disabledState.iconColor || defaultState.iconColor)
    : defaultState.iconColor;

  // Figma Frame 2085662507: row, alignSelf:stretch, gap:8px, fill
  const headerRow = css({
    display: 'flex',
    flexDirection: 'row',
    gap: dim(cb.headerGap, '8px'),
    alignSelf: 'stretch',
  });

  const numberArea = css({
    flexShrink: 0,
  });

  const leadingIcon = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(cb.iconSize, '20px'),
    height: dim(cb.iconSize, '20px'),
    color: iconColor,
    flexShrink: 0,
  });

  // Figma Frame 2085662506: column, alignItems:stretch, gap:6px, fill
  const textColumn = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '6px',
    flex: '1 1 0',
    minWidth: 0,
  });

  // Figma Badges: row, justifyContent:flex-end, alignItems:center, gap:4px
  const badgeArea = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
  });

  const trailingIcon = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(cb.iconSize, '20px'),
    height: dim(cb.iconSize, '20px'),
    color: iconColor,
    flexShrink: 0,
  });

  return { headerRow, numberArea, leadingIcon, textColumn, badgeArea, trailingIcon };
}

// ─── Card Text Column Styles ─────────────────────────────────────────────────
// Returns object with class strings for text column: subtextTop, title, subtextBottom.

export function buildCardTextColumnStyles(params: CardStyleParams): {
  subtextTop: string;
  title: string;
  subtextBottom: string;
} {
  const { config, isDisabled } = params;
  const base = config.base || {};
  const cb = getCardBaseConfig(config);
  const defaultState = getCardStateConfig(config, 'default');
  const disabledState = getCardStateConfig(config, 'disabled');

  const titleColor = isDisabled
    ? (disabledState.titleColor || defaultState.titleColor)
    : defaultState.titleColor;
  const subtextColor = isDisabled
    ? (disabledState.subtextColor || defaultState.subtextColor)
    : defaultState.subtextColor;

  // Figma Texts Set: column, alignItems:stretch, alignSelf:stretch, fill
  const subtextTop = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontSize: dim(cb.captionFontSize, '12px'),
    lineHeight: dim(cb.captionLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
    alignSelf: 'stretch',
  });

  // Figma title: B2/body2_default — 14px/20px, weight 500
  const title = css({
    fontFamily: base.fontFamily,
    fontWeight: cb.titleFontWeight || '500',
    fontSize: dim(cb.titleFontSize, '14px'),
    lineHeight: dim(cb.titleLineHeight, '20px'),
    color: titleColor,
    margin: 0,
    alignSelf: 'stretch',
  });

  const subtextBottom = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontSize: dim(cb.captionFontSize, '12px'),
    lineHeight: dim(cb.captionLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
    alignSelf: 'stretch',
  });

  return { subtextTop, title, subtextBottom };
}

// ─── Card Subitems Styles ────────────────────────────────────────────────────
// Returns object with class strings for subitems row: icon + label pairs with
// gap=39px between items, each subitem as flex-row with gap=4px.

export function buildCardSubitemsStyles(params: CardStyleParams): {
  subitemsRow: string;
  subitem: string;
  subitemIcon: string;
  subitemLabel: string;
} {
  const { config, isDisabled } = params;
  const cb = getCardBaseConfig(config);
  const defaultState = getCardStateConfig(config, 'default');
  const disabledState = getCardStateConfig(config, 'disabled');

  const iconColor = isDisabled
    ? (disabledState.iconColor || defaultState.iconColor)
    : defaultState.iconColor;
  const labelColor = isDisabled
    ? (disabledState.subitemLabelColor || defaultState.subitemLabelColor)
    : defaultState.subitemLabelColor;

  const subitemsRow = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim(cb.subitemsGap, '39px'),
    width: '100%',
  });

  const subitem = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim(cb.subitemInnerGap, '4px'),
    flex: '1 0 0',
    minWidth: 0,
    minHeight: 0,
  });

  const subitemIcon = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(cb.iconSize, '20px'),
    height: dim(cb.iconSize, '20px'),
    color: iconColor,
    flexShrink: 0,
  });

  const subitemLabel = css({
    fontFamily: config.base?.fontFamily,
    fontWeight: '500',
    fontSize: dim(cb.titleFontSize, '14px'),
    lineHeight: dim(cb.titleLineHeight, '20px'),
    color: labelColor,
    margin: 0,
    whiteSpace: 'nowrap',
  });

  return { subitemsRow, subitem, subitemIcon, subitemLabel };
}

// ─── Card Buttons Row Styles ─────────────────────────────────────────────────
// Emotion css() class string for CTA buttons row: flex-row, gap=6px.

export function buildCardButtonsRowStyles(params: CardStyleParams): string {
  const { config } = params;
  const cb = getCardBaseConfig(config);

  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim(cb.buttonsGap, '6px'),
    width: '100%',
  });
}

// ─── Card Stepper Icon Styles ────────────────────────────────────────────────
// Emotion css() class string for stepper icon: 20px circle with numeric value,
// background and text colors from theme.

export function buildCardStepperIconStyles(params: CardStyleParams): string {
  const { config, isDisabled } = params;
  const cb = getCardBaseConfig(config);
  const defaultState = getCardStateConfig(config, 'default');
  const disabledState = getCardStateConfig(config, 'disabled');

  const bgColor = isDisabled
    ? (disabledState.stepperBgColor || defaultState.stepperBgColor)
    : defaultState.stepperBgColor;
  const textColor = isDisabled
    ? (disabledState.stepperTextColor || defaultState.stepperTextColor)
    : defaultState.stepperTextColor;

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(cb.stepperIconSize, '20px'),
    height: dim(cb.stepperIconSize, '20px'),
    borderRadius: '999px',
    backgroundColor: bgColor || '#f7f7f7',
    color: textColor || '#454545',
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '16px',
    flexShrink: 0,
    boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    padding: 0,
  });
}

// ─── Card Status Indicator Styles ────────────────────────────────────────────
// Emotion css() class string for status indicator: icon + text, color from theme.

export function buildCardStatusIndicatorStyles(params: CardStyleParams): string {
  const { config, isDisabled } = params;
  const base = config.base || {};
  const defaultState = getCardStateConfig(config, 'default');
  const disabledState = getCardStateConfig(config, 'disabled');

  const indicatorColor = isDisabled
    ? (disabledState.statusIndicatorColor || defaultState.statusIndicatorColor)
    : defaultState.statusIndicatorColor;

  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
    color: indicatorColor,
    fontFamily: base.fontFamily,
    fontSize: '12px',
    lineHeight: '16px',
  });
}

// ─── Card Chips Area Styles ──────────────────────────────────────────────────
// Emotion css() class string for chips/pills area for Standard + Pills variant.

export function buildCardChipsAreaStyles(params: CardStyleParams): string {
  const { config } = params;
  const cb = getCardBaseConfig(config);

  return css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: dim(cb.subitemInnerGap, '4px'),
    width: '100%',
  });
}

// ─── Card Info Sets Styles ───────────────────────────────────────────────────
// Returns object with class strings for info sets: label + value metric groups
// with gap, font sizes, font weights from theme.

export function buildCardInfoSetsStyles(params: CardStyleParams): {
  infoSetsRow: string;
  infoSetItem: string;
  infoSetLabel: string;
  infoSetValue: string;
} {
  const { config, cardVariant, isDisabled } = params;
  const base = config.base || {};
  const cb = getCardBaseConfig(config);
  const vc = getCardVariantConfig(config, cardVariant);
  const defaultState = getCardStateConfig(config, 'default');
  const disabledState = getCardStateConfig(config, 'disabled');

  const titleColor = isDisabled
    ? (disabledState.titleColor || defaultState.titleColor)
    : defaultState.titleColor;
  const subtextColor = isDisabled
    ? (disabledState.subtextColor || defaultState.subtextColor)
    : defaultState.subtextColor;

  const infoSetsRow = css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: dim(vc.infoSetGap, '16px'),
    width: '100%',
  });

  const infoSetItem = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  });

  const infoSetLabel = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontSize: dim(vc.labelFontSize || cb.captionFontSize, '12px'),
    lineHeight: dim(vc.labelLineHeight || cb.captionLineHeight, '16px'),
    color: subtextColor,
    margin: 0,
  });

  const infoSetValue = css({
    fontFamily: base.fontFamily,
    fontWeight: vc.valueFontWeight || '600',
    fontSize: dim(vc.valueFontSize, '16px'),
    lineHeight: dim(vc.valueLineHeight, '24px'),
    color: titleColor,
    margin: 0,
  });

  return { infoSetsRow, infoSetItem, infoSetLabel, infoSetValue };
}

// ─── Card Banner Styles ──────────────────────────────────────────────────────
// Emotion css() class string for slot banner: banner image area with height
// from theme.

export function buildCardBannerStyles(params: CardStyleParams): string {
  const { config, cardVariant } = params;
  const vc = getCardVariantConfig(config, cardVariant);

  return css({
    width: '100%',
    height: dim(vc.bannerHeight, '120px'),
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  });
}

// ─── Card Ghost Skeleton Styles ──────────────────────────────────────────────
// Emotion css() class string for card ghost skeleton placeholder blocks.

export function buildCardGhostStyles(params: CardStyleParams): string {
  const { config } = params;
  const base = config.base || {};
  const ghostState = getCardStateConfig(config, 'ghost');
  const bg = ghostState.backgroundColor || '#ededed';

  return css({
    width: ghostState.skeletonWidth || '100%',
    height: dim(ghostState.skeletonHeight, '120px'),
    borderRadius: dim(ghostState.skeletonRadius || base.radius, '4px'),
    backgroundColor: bg,
    flexShrink: 0,
  });
}
