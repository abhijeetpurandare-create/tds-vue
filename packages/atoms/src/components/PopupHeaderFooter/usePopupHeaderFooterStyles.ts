import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

export interface PopupHeaderFooterConfig {
  base?: Record<string, string>;
  sizes?: Record<string, Record<string, string>>;
}

export interface StyleParams {
  config: PopupHeaderFooterConfig;
  size: string;
  variant: 'header' | 'footer';
}

function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}

export function buildHeaderStyles({ config, size }: StyleParams): string {
  const b = config.base || {};
  const sc = config.sizes?.[size] || {};
  const r = dim(sc.headerBorderRadius, '8px');
  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim(b.gap, '8px'),
    padding: dim(sc.padding, '16px'),
    backgroundColor: b.backgroundColor || '#ffffff',
    borderRadius: `${r} ${r} 0 0`,
    width: '100%',
    boxSizing: 'border-box',
  });
}

export function buildFooterStyles({ config, size }: StyleParams): string {
  const b = config.base || {};
  const sc = config.sizes?.[size] || {};
  const h = sc.footerHeight;
  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: dim(b.gap, '8px'),
    padding: dim(sc.padding, '16px'),
    backgroundColor: b.backgroundColor || '#ffffff',
    borderRadius: sc.footerBorderRadius || '0 0 6px 6px',
    width: '100%',
    boxSizing: 'border-box',
    ...(h && h !== 'auto' ? { height: h } : {}),
  });
}

export function buildTextsStyles({ config }: StyleParams): string {
  const b = config.base || {};
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: dim(b.textGap, '4px'),
    flex: '1 1 0',
    minWidth: 0,
  });
}

export function buildHeadingStyles({ config, size }: StyleParams): string {
  const b = config.base || {};
  const sc = config.sizes?.[size] || {};
  return css({
    fontFamily: sc.headingFontFamily || 'Noto Sans, sans-serif',
    fontSize: dim(sc.headingFontSize, '16px'),
    fontWeight: sc.headingFontWeight || 500,
    lineHeight: sc.headingLineHeight || '1.5',
    color: b.textColor || '#2b2b2b',
    margin: 0,
  });
}

export function buildSubtextStyles({ config, size }: StyleParams): string {
  const b = config.base || {};
  const sc = config.sizes?.[size] || {};
  return css({
    fontFamily: sc.subtextFontFamily || 'Noto Sans, sans-serif',
    fontSize: dim(sc.subtextFontSize, '14px'),
    fontWeight: sc.subtextFontWeight || 400,
    lineHeight: sc.subtextLineHeight || '1.43',
    color: b.textColor || '#2b2b2b',
    margin: 0,
  });
}

export function buildIconWrapStyles({ config, size }: StyleParams): string {
  const sc = config.sizes?.[size] || {};
  const iconSz = dim(sc.iconSize, '24px');
  return css({
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: '2px 0',
    flexShrink: 0,
    '& > svg, & > img': { width: iconSz, height: iconSz },
  });
}

export function buildCloseButtonStyles({ config, size }: StyleParams): string {
  const b = config.base || {};
  const sc = config.sizes?.[size] || {};
  const iconSz = dim(sc.closeIconSize || sc.iconSize, '24px');
  return css({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 0',
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexShrink: 0,
    color: b.textColor || '#2b2b2b',
    '& > svg': { width: iconSz, height: iconSz },
  });
}

export function buildBadgesStyles({ config }: { config: PopupHeaderFooterConfig }): string {
  const b = config.base || {};
  return css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    gap: dim(b.badgeGap, '4px'),
    flexShrink: 0,
    paddingTop: '2px',
  });
}

export function buildButtonSetStyles(): string {
  return css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: '8px',
    flex: '1 1 0',
  });
}

export function buildSlotWrapStyles({ config, size }: StyleParams): string {
  const sc = config.sizes?.[size] || {};
  const slotSz = dim(sc.slotSize, '40px');
  return css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: '2px 0',
    '& > *': { width: slotSz, height: slotSz },
  });
}
