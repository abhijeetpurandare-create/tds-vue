import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

export interface BottomSheetThemeConfig {
  base?: {
    backgroundColor?: string;
    borderRadius?: string;
    shadow?: string;
    overlayColor?: string;
    fontFamily?: string;
    captionFontFamily?: string;
    transition?: string;
    titleFontSize?: string;
    titleLineHeight?: string;
    titleFontWeight?: string;
    titleColor?: string;
    subtextFontSize?: string;
    subtextLineHeight?: string;
    subtextFontWeight?: string;
    subtextColor?: string;
    bodyTitleFontSize?: string;
    bodyTitleLineHeight?: string;
    bodyTitleFontWeight?: string;
    bodyTitleColor?: string;
    bodyDescFontSize?: string;
    bodyDescLineHeight?: string;
    bodyDescFontWeight?: string;
    bodyDescColor?: string;
    checkboxTextFontSize?: string;
    checkboxTextLineHeight?: string;
    checkboxTextFontWeight?: string;
    checkboxTextColor?: string;
    padding?: string;
    headerGap?: string;
    headerIconGap?: string;
    contentGap?: string;
    textGap?: string;
    footerGap?: string;
    iconSize?: string;
    illustrationSize?: string;
    slotBgColor?: string;
  };
}

export interface BuildBottomSheetStylesParams {
  config: BottomSheetThemeConfig;
}

function getBase(config: BottomSheetThemeConfig) {
  return config.base || {};
}

export function buildHeaderStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: dim(b.headerGap, '8px'),
    padding: dim(b.padding, '12px'),
    flexShrink: 0,
  });
}

export function buildHeaderLeftStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: dim(b.headerIconGap, '4px'),
    flex: '1 1 0%',
    minWidth: 0,
  });
}

export function buildHeaderTitleBlockStyles(): string {
  return css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 1 0%',
    minWidth: 0,
  });
}

export function buildTitleStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    fontFamily: b.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(b.titleFontWeight) || 500,
    fontSize: dim(b.titleFontSize, '14px'),
    lineHeight: dim(b.titleLineHeight, '20px'),
    color: b.titleColor || '#2b2b2b',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  });
}

export function buildSubtextStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    fontFamily: b.captionFontFamily || b.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(b.subtextFontWeight) || 400,
    fontSize: dim(b.subtextFontSize, '12px'),
    lineHeight: dim(b.subtextLineHeight, '16px'),
    color: b.subtextColor || '#454545',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  });
}

export function buildIconWrapStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  const size = dim(b.iconSize, '20px');
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: size,
    height: size,
    cursor: 'pointer',
    '& > *': { width: '100%', height: '100%' },
  });
}

export function buildCloseButtonStyles(): string {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#2b2b2b',
    opacity: 0.6,
    transition: 'opacity 0.15s',
    '&:hover': { opacity: 1 },
  });
}

export function buildBodyStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: dim(b.contentGap, '4px'),
    padding: dim(b.padding, '12px'),
    overflowY: 'auto',
    flex: '1 1 auto',
  });
}

export function buildIllustrationBoxStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  const size = dim(b.illustrationSize, '48px');
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    padding: '10px',
    flexShrink: 0,
    boxSizing: 'border-box',
  });
}

export function buildBodyTextBlockStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: dim(b.textGap, '8px'),
    padding: '4px',
    width: '100%',
    textAlign: 'center',
  });
}

export function buildBodyTitleStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    fontFamily: b.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(b.bodyTitleFontWeight) || 500,
    fontSize: dim(b.bodyTitleFontSize, '14px'),
    lineHeight: dim(b.bodyTitleLineHeight, '20px'),
    color: b.bodyTitleColor || '#2b2b2b',
    margin: 0,
    width: '100%',
    textAlign: 'center',
  });
}

export function buildBodyDescStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    fontFamily: b.captionFontFamily || b.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(b.bodyDescFontWeight) || 500,
    fontSize: dim(b.bodyDescFontSize, '12px'),
    lineHeight: dim(b.bodyDescLineHeight, '16px'),
    color: b.bodyDescColor || '#454545',
    margin: 0,
    width: '100%',
    textAlign: 'center',
  });
}

export function buildCheckboxRowStyles(params: BuildBottomSheetStylesParams): string {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px',
    flexShrink: 0,
  });
}

export function buildCheckboxTextStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    fontFamily: b.captionFontFamily || b.fontFamily || 'Noto Sans, sans-serif',
    fontWeight: Number(b.checkboxTextFontWeight) || 400,
    fontSize: dim(b.checkboxTextFontSize, '12px'),
    lineHeight: dim(b.checkboxTextLineHeight, '16px'),
    color: b.checkboxTextColor || '#454545',
    margin: 0,
    whiteSpace: 'nowrap',
  });
}

export function buildFooterHorizontalStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: dim(b.footerGap, '8px'),
    padding: dim(b.padding, '12px'),
    flexShrink: 0,
  });
}

export function buildFooterVerticalStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: dim(b.footerGap, '8px'),
    padding: dim(b.padding, '12px'),
    flexShrink: 0,
  });
}

export function buildSlotStyles(params: BuildBottomSheetStylesParams): string {
  const b = getBase(params.config);
  return css({
    backgroundColor: b.slotBgColor || 'rgba(35, 150, 251, 0.05)',
    width: '100%',
    flex: '1 1 auto',
    minHeight: 0,
  });
}

export function buildSlotHeaderStyles(params: BuildBottomSheetStylesParams): string {
  return css({
    flexShrink: 0,
    width: '40px',
    height: '40px',
  });
}

export function buildSlotHeaderSmallStyles(): string {
  return css({
    flexShrink: 0,
    width: '24px',
    height: '24px',
  });
}
