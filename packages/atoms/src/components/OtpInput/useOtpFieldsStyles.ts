import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

// ─── Config Shape Interfaces ─────────────────────────────────────────────────

export interface StyleConfig {
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  hoverBorderColor?: string;
  hoverBackgroundColor?: string;
  hoverTitleColor?: string;
  hoverTitleIconColor?: string;
  hoverHelperTextColor?: string;
  activeBorderColor?: string;
  focusBorderColor?: string;
  focusRingColor?: string;
  titleColor?: string;
  titleIconColor?: string;
  helperTextTopColor?: string;
  helperTextBottomColor?: string;
  subtextColor?: string;
}

export interface SizeConfig {
  inputBoxHeight?: string;
  inputBoxWidth?: string;
  inputFontSize?: string;
  inputLineHeight?: string;
  titleFontSize?: string;
  titleLineHeight?: string;
  captionFontSize?: string;
  captionLineHeight?: string;
  titleFontWeight?: string;
}

export interface DisabledStateConfig {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  placeholderColor?: string;
  titleColor?: string;
  titleIconColor?: string;
  helperTextTopColor?: string;
  helperTextBottomColor?: string;
  subtextColor?: string;
  cursor?: string;
}

export interface GhostStateConfig {
  skeletonBackgroundColor?: string;
  skeletonRadius?: string;
  skeletonTitleRadius?: string;
  pointerEvents?: string;
  cursor?: string;
}

export interface BaseConfig {
  fontFamily?: string;
  captionFontFamily?: string;
  fontWeight?: string;
  radius?: string;
  borderWidth?: string;
  transition?: string;
  focusRingSpread?: string;
  inputBoxGap?: string;
  rowGap?: string;
  titleIconGap?: string;
  titleIconSize?: string;
}

export interface OtpFieldsConfig {
  base: BaseConfig;
  styles: Record<string, StyleConfig>;
  sizes: Record<string, SizeConfig>;
  states: { disabled?: DisabledStateConfig; ghost?: GhostStateConfig };
}

export interface OtpFieldsStyleParams {
  config: OtpFieldsConfig;
  otpFieldStyle: string;
  otpSize: string;
  isDisabled: boolean;
  isGhost: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert raw number or string to CSS dimension (e.g. 16 → "16px", "16px" → "16px") */
function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}

// Stable class names for container-level hover propagation
const TITLE_TEXT_CLS = 'otp-title-text';
const TITLE_ICON_CLS = 'otp-title-icon';
const HELPER_TEXT_CLS = 'otp-helper-text';

// ─── Main Style Builder ──────────────────────────────────────────────────────

export function buildOtpFieldsStyles(params: OtpFieldsStyleParams): {
  container: string;
  topRow: string;
  titleArea: string;
  titleIcon: string;
  titleText: string;
  helperTextTop: string;
  inputRow: string;
  inputBox: string;
  bottomRow: string;
  subtext: string;
  helperTextBottom: string;
  ghostContainer: string;
  ghostTopRow: string;
  ghostTitleBlock: string;
  ghostHelperTopBlock: string;
  ghostInputRow: string;
  ghostInputBox: string;
  ghostBottomRow: string;
  ghostSubtextBlock: string;
  ghostHelperBottomBlock: string;
} {
  const { config, otpFieldStyle, otpSize, isDisabled } = params;
  const base = config.base || {};
  const sc = config.styles?.[otpFieldStyle] || {};
  const sz = config.sizes?.[otpSize] || {};
  const ds = config.states?.disabled || {};
  const gs = config.states?.ghost || {};

  // ── Container ──────────────────────────────────────────────────────────────
  const container = css({
    display: 'flex',
    flexDirection: 'column',
    gap: dim(base.rowGap, '6px'),
    alignItems: 'flex-start',
    width: 'fit-content',

    // Container-level hover propagates color changes to title, icon, helper text
    ...(!isDisabled && {
      '&:hover': {
        [`& .${TITLE_TEXT_CLS}`]: { color: sc.hoverTitleColor },
        [`& .${TITLE_ICON_CLS}`]: { color: sc.hoverTitleIconColor },
        [`& .${HELPER_TEXT_CLS}`]: { color: sc.hoverHelperTextColor },
      },
    }),

    // Disabled overrides — suppress hover propagation and apply disabled colors
    ...(isDisabled && {
      [`& .${TITLE_TEXT_CLS}`]: { color: ds.titleColor },
      [`& .${TITLE_ICON_CLS}`]: { color: ds.titleIconColor },
      [`& .${HELPER_TEXT_CLS}`]: { color: ds.helperTextTopColor },
    }),
  });

  // ── Top Row ────────────────────────────────────────────────────────────────
  const topRow = css({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  });

  // ── Title Area (icon + text) ───────────────────────────────────────────────
  const titleArea = css({
    display: 'flex',
    alignItems: 'center',
    gap: dim(base.titleIconGap, '4px'),
    flex: '1 0 0',
    minWidth: '1px',
  });

  // ── Title Icon ─────────────────────────────────────────────────────────────
  const titleIconSize = dim(base.titleIconSize, '20px');
  const titleIcon = css({
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    width: titleIconSize,
    height: titleIconSize,
    color: isDisabled ? ds.titleIconColor : sc.titleIconColor,
    overflow: 'clip',
    '& > *': {
      width: titleIconSize,
      height: titleIconSize,
    },
  });

  // ── Title Text ─────────────────────────────────────────────────────────────
  const titleText = css({
    fontFamily: base.fontFamily,
    fontWeight: sz.titleFontWeight || base.fontWeight,
    fontSize: dim(sz.titleFontSize, '14px'),
    lineHeight: dim(sz.titleLineHeight, '20px'),
    color: isDisabled ? ds.titleColor : sc.titleColor,
    margin: 0,
    whiteSpace: 'nowrap',
  });

  // ── Helper Text Top ────────────────────────────────────────────────────────
  const helperTextTop = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontWeight: base.fontWeight,
    fontSize: dim(sz.captionFontSize, '12px'),
    lineHeight: dim(sz.captionLineHeight, '16px'),
    color: isDisabled ? ds.helperTextTopColor : sc.helperTextTopColor,
    margin: 0,
    whiteSpace: 'nowrap',
    flex: '1 0 0',
    textAlign: 'right' as const,
    minWidth: '1px',
  });

  // ── Input Row ──────────────────────────────────────────────────────────────
  const inputRow = css({
    display: 'flex',
    alignItems: 'center',
    gap: dim(base.inputBoxGap, '8px'),
  });

  // ── Input Box ──────────────────────────────────────────────────────────────
  const inputBox = css({
    width: dim(sz.inputBoxWidth, '48px'),
    height: dim(sz.inputBoxHeight, '48px'),
    fontSize: dim(sz.inputFontSize, '16px'),
    lineHeight: dim(sz.inputLineHeight, '24px'),
    fontFamily: base.fontFamily,
    fontWeight: base.fontWeight,
    textAlign: 'center',
    border: `${dim(base.borderWidth, '1px')} solid ${isDisabled ? ds.borderColor : sc.borderColor}`,
    borderRadius: dim(base.radius, '6px'),
    backgroundColor: isDisabled ? ds.backgroundColor : sc.backgroundColor,
    color: isDisabled ? ds.textColor : sc.textColor,
    transition: base.transition,
    outline: 'none',
    cursor: isDisabled ? ds.cursor || 'default' : 'text',
    boxSizing: 'border-box',

    '&::placeholder': {
      color: isDisabled ? ds.placeholderColor : sc.placeholderColor,
    },

    // Hover — suppressed when disabled
    ...(!isDisabled && {
      '&:hover': {
        borderColor: sc.hoverBorderColor,
        backgroundColor: sc.hoverBackgroundColor,
      },
    }),

    // Focus ring — suppressed when disabled
    ...(!isDisabled && {
      '&:focus': {
        borderColor: sc.focusBorderColor,
        boxShadow: sc.focusRingColor
          ? `0 0 0 ${dim(base.focusRingSpread, '2px')} ${sc.focusRingColor}`
          : undefined,
      },
    }),

    // Number input spinner removal
    '&[type=number]::-webkit-inner-spin-button, &[type=number]::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '&[type=number]': {
      MozAppearance: 'textfield',
      appearance: 'textfield',
    },
  });

  // ── Bottom Row ─────────────────────────────────────────────────────────────
  const bottomRow = css({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  });

  // ── Subtext ────────────────────────────────────────────────────────────────
  const subtext = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontWeight: base.fontWeight,
    fontSize: dim(sz.captionFontSize, '12px'),
    lineHeight: dim(sz.captionLineHeight, '16px'),
    color: isDisabled ? ds.subtextColor : sc.subtextColor,
    margin: 0,
  });

  // ── Helper Text Bottom ─────────────────────────────────────────────────────
  const helperTextBottom = css({
    fontFamily: base.captionFontFamily || base.fontFamily,
    fontWeight: base.fontWeight,
    fontSize: dim(sz.captionFontSize, '12px'),
    lineHeight: dim(sz.captionLineHeight, '16px'),
    color: isDisabled ? ds.helperTextBottomColor : sc.helperTextBottomColor,
    margin: 0,
    whiteSpace: 'nowrap',
    flex: '1 0 0',
    textAlign: 'right' as const,
    minWidth: '1px',
  });

  // ── Ghost Skeleton Styles ──────────────────────────────────────────────────
  const ghostBg = gs.skeletonBackgroundColor;
  const ghostRadius = dim(gs.skeletonRadius, '6px');
  const ghostTitleRadius = dim(gs.skeletonTitleRadius, '12px');

  const ghostContainer = css({
    display: 'flex',
    flexDirection: 'column',
    gap: dim(base.rowGap, '6px'),
    alignItems: 'flex-start',
    width: 'fit-content',
    pointerEvents: (gs.pointerEvents as 'none') || 'none',
    cursor: gs.cursor || 'default',
  });

  const ghostTopRow = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: dim(base.inputBoxGap, '8px'),
  });

  const ghostTitleBlock = css({
    width: '80px',
    height: dim(sz.titleLineHeight, '20px'),
    borderRadius: ghostTitleRadius,
    backgroundColor: ghostBg,
    flexShrink: 0,
  });

  const ghostHelperTopBlock = css({
    width: '60px',
    height: dim(sz.captionLineHeight, '16px'),
    borderRadius: ghostTitleRadius,
    backgroundColor: ghostBg,
    flexShrink: 0,
  });

  const ghostInputRow = css({
    display: 'flex',
    alignItems: 'center',
    gap: dim(base.inputBoxGap, '8px'),
  });

  const ghostInputBox = css({
    width: dim(sz.inputBoxWidth, '48px'),
    height: dim(sz.inputBoxHeight, '48px'),
    borderRadius: ghostRadius,
    backgroundColor: ghostBg,
    flexShrink: 0,
  });

  const ghostBottomRow = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: dim(base.inputBoxGap, '8px'),
  });

  const ghostSubtextBlock = css({
    width: '80px',
    height: dim(sz.captionLineHeight, '16px'),
    borderRadius: ghostTitleRadius,
    backgroundColor: ghostBg,
    flexShrink: 0,
  });

  const ghostHelperBottomBlock = css({
    width: '60px',
    height: dim(sz.captionLineHeight, '16px'),
    borderRadius: ghostTitleRadius,
    backgroundColor: ghostBg,
    flexShrink: 0,
  });

  return {
    container,
    topRow,
    titleArea,
    titleIcon,
    titleText,
    helperTextTop,
    inputRow,
    inputBox,
    bottomRow,
    subtext,
    helperTextBottom,
    ghostContainer,
    ghostTopRow,
    ghostTitleBlock,
    ghostHelperTopBlock,
    ghostInputRow,
    ghostInputBox,
    ghostBottomRow,
    ghostSubtextBlock,
    ghostHelperBottomBlock,
  };
}

// Re-export class name constants for use in the component
export { TITLE_TEXT_CLS, TITLE_ICON_CLS, HELPER_TEXT_CLS };
