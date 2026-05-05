import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

export interface DatePickerBottomSheetConfig {
  base?: Record<string, string>;
  header?: Record<string, string>;
  picker?: Record<string, string>;
  footer?: Record<string, string>;
}

export interface BuildStylesParams {
  config: DatePickerBottomSheetConfig;
}

export function buildDatePickerBottomSheetStyles({ config }: BuildStylesParams) {
  const base = config.base || {};
  const header = config.header || {};
  const picker = config.picker || {};
  const footer = config.footer || {};

  const sheet = css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: base.backgroundColor || '#ffffff',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    fontFamily: base.fontFamily || 'sans-serif',
  });

  const headerRow = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: dim(header.padding, '16px'),
    alignSelf: 'stretch',
  });

  const titleBlock = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  });

  const titleText = css({
    fontSize: dim(header.titleFontSize, '14px'),
    lineHeight: dim(header.titleLineHeight, '20px'),
    fontWeight: header.titleFontWeight || '500',
    color: header.titleTextColor || '#2b2b2b',
    margin: 0,
  });

  const subtextText = css({
    fontSize: dim(header.subtextFontSize, '10px'),
    lineHeight: dim(header.subtextLineHeight, '12px'),
    fontWeight: header.subtextFontWeight || '400',
    color: header.subtextTextColor || '#2b2b2b',
    margin: 0,
  });

  const closeBtn = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(header.iconSize, '20px'),
    height: dim(header.iconSize, '20px'),
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: header.iconColor || '#2b2b2b',
    padding: 0,
    flexShrink: 0,
  });

  const pickerSection = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: dim(picker.padding, '16px'),
    alignSelf: 'stretch',
    position: 'relative',
  });

  const overlay = css({
    position: 'absolute',
    left: dim(picker.overlayInsetX, '21px'),
    right: dim(picker.overlayInsetX, '21px'),
    height: dim(picker.overlayHeight, '36px'),
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: picker.overlayBackgroundColor || 'rgba(35,150,251,0.1)',
    borderRadius: dim(picker.overlayBorderRadius, '4px'),
    pointerEvents: 'none',
    zIndex: 0,
  });

  const columnsRow = css({
    display: 'flex',
    flexDirection: 'row',
    gap: dim(picker.columnGap, '10px'),
    position: 'relative',
    zIndex: 1,
  });

  // Per-column wrappers — controls width per column, ScrollWheel handles its own height/scroll
  const makeColumn = (width: string) => css({
    width,
    flexShrink: 0,
    display: 'flex',
  });

  const dayColumn = makeColumn(dim(picker.dayColumnWidth, '73px'));
  const monthColumn = makeColumn(dim(picker.monthColumnWidth, '73px'));
  const yearColumn = makeColumn(dim(picker.yearColumnWidth, '73px'));

  const footerRow = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: dim(footer.gap, '8px'),
    padding: dim(footer.padding, '8px'),
    alignSelf: 'stretch',
  });

  return { sheet, headerRow, titleBlock, titleText, subtextText, closeBtn, pickerSection, overlay, columnsRow, dayColumn, monthColumn, yearColumn, footerRow };
}
