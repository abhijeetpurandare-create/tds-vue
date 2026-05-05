import { css } from '@emotion/css';

export interface TimePickerTarmacConfig {
  base?: Record<string, any>;
  input?: Record<string, any>;
  dropdown?: Record<string, any>;
  footer?: Record<string, any>;
}

export interface BuildTimePickerStylesParams {
  config: TimePickerTarmacConfig;
  isOpen?: boolean;
  hasValue?: boolean;
}

// Each item = 20px line-height + 8px gap = 28px per step
export const ITEM_HEIGHT = 28;
// Visible column height
export const COL_HEIGHT = 264;
// How many items visible above/below center
export const VISIBLE_ITEMS = Math.floor(COL_HEIGHT / ITEM_HEIGHT); // ~9
// Padding so first/last item can reach center
export const CENTER_OFFSET = Math.floor((COL_HEIGHT - ITEM_HEIGHT) / 2); // 118px

export function buildTimePickerStyles(params: BuildTimePickerStylesParams) {
  const { config, isOpen, hasValue } = params;
  const inp = config.input || {};
  const dd = config.dropdown || {};
  const ft = config.footer || {};
  const base = config.base || {};

  const wrapper = css({
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    width: '320px',
  });

  const inputField = css({
    display: 'flex',
    alignItems: 'center',
    gap: inp.gap || '4px',
    padding: inp.padding || '12px',
    backgroundColor: inp.backgroundColor || 'white',
    border: `${inp.borderWidth || '1px'} solid ${isOpen ? (inp.activeBorderColor || '#ccc') : (inp.borderColor || '#e6e6e6')}`,
    borderRadius: inp.borderRadius || '6px',
    width: '100%',
    cursor: 'pointer',
    overflow: 'clip',
    fontFamily: base.fontFamily || 'sans-serif',
    transition: base.transition || 'all 0.15s ease-in-out',
    '&:hover': { borderColor: inp.hoverBorderColor || '#ccc' },
  });

  const inputText = css({
    flex: '1 0 0',
    fontSize: inp.fontSize || '14px',
    lineHeight: inp.lineHeight || '20px',
    fontWeight: inp.fontWeight || 500,
    color: hasValue ? (inp.textColor || '#2b2b2b') : (inp.placeholderColor || '#2b2b2b'),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    textAlign: 'left' as const,
  });

  const inputIcon = css({
    width: inp.iconSize || '20px',
    height: inp.iconSize || '20px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: inp.textColor || '#2b2b2b',
  });

  const dropdownContainer = css({
    position: 'absolute',
    top: '48px',
    right: 0,
    width: dd.width || '256px',
    backgroundColor: dd.backgroundColor || 'white',
    borderRadius: dd.borderRadius || '4px',
    boxShadow: dd.shadow || '0px 0px 6px 0px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9999,
    fontFamily: base.fontFamily || 'sans-serif',
  });

  const middleSection = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: dd.middlePadding || '16px',
    width: '100%',
    position: 'relative',
  });

  // Each column scrolls independently — CSS snap handles smooth snapping
  const scrollColumn = css({
    flex: '1 0 0',
    height: `${COL_HEIGHT}px`,
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    zIndex: 1,
    scrollbarWidth: 'none' as const,
    scrollSnapType: 'y mandatory',
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': { display: 'none' },
  });

  // Inner list — no padding needed for looping columns, 3× items provide scroll space
  const columnInner = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });

  // AM/PM column — click to toggle, centered vertically
  const ampmColumn = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `${COL_HEIGHT}px`,
    minWidth: '50px',
    gap: '8px',
  });

  const ampmItem = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '4px 8px',
    fontSize: dd.itemFontSize || '14px',
    fontWeight: dd.baseFontWeight || 300,
    color: dd.baseTextColor || '#808080',
    cursor: 'pointer',
    userSelect: 'none' as const,
    fontFamily: base.fontFamily || 'sans-serif',
    borderRadius: '4px',
  });

  const ampmItemActive = css({
    fontWeight: dd.selectedFontWeight || 600,
    color: dd.selectedTextColor || '#2b2b2b',
  });

  // Padded inner for non-looping columns (AM/PM) — padding lets items reach center
  const columnInnerPadded = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: `${CENTER_OFFSET}px`,
    paddingBottom: `${CENTER_OFFSET}px`,
  });

  // Each item row — snap-align center so browser snaps to center
  const item = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: `${ITEM_HEIGHT}px`,
    minHeight: `${ITEM_HEIGHT}px`,
    fontSize: dd.itemFontSize || '14px',
    lineHeight: `${ITEM_HEIGHT}px`,
    fontWeight: dd.baseFontWeight || 300,
    color: dd.baseTextColor || '#808080',
    whiteSpace: 'nowrap' as const,
    fontFamily: base.fontFamily || 'sans-serif',
    flexShrink: 0,
    cursor: 'pointer',
    userSelect: 'none' as const,
    scrollSnapAlign: 'center',
  });

  // The item currently in the center band
  const itemActive = css({
    fontWeight: dd.selectedFontWeight || 600,
    color: dd.selectedTextColor || '#2b2b2b',
  });

  const itemDisabled = css({
    opacity: 0.4,
    cursor: 'default',
  });

  // Blue overlay band — fixed at vertical center of the scroll area
  const overlay = css({
    position: 'absolute',
    left: dd.middlePadding || '16px',
    right: dd.middlePadding || '16px',
    // Center of COL_HEIGHT: (264 - 28) / 2 = 118px from top of scroll area, plus padding
    top: `calc(${dd.middlePadding || '16px'} + ${Math.floor((COL_HEIGHT - ITEM_HEIGHT) / 2)}px)`,
    height: `${ITEM_HEIGHT}px`,
    backgroundColor: dd.overlayBackgroundColor || 'rgba(35,150,251,0.1)',
    borderRadius: dd.overlayBorderRadius || '4px',
    pointerEvents: 'none' as const,
    zIndex: 0,
  });

  const validationMsg = css({
    padding: '4px 16px 0',
    color: '#EF4444',
    fontSize: '12px',
  });

  const footerSection = css({
    display: 'flex',
    gap: ft.gap || '8px',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: ft.padding || '8px',
    height: ft.height || '52px',
    width: '100%',
  });

  return {
    wrapper, inputField, inputText, inputIcon,
    dropdownContainer, middleSection, scrollColumn, columnInner, columnInnerPadded,
    ampmColumn, ampmItem, ampmItemActive,
    item, itemActive, itemDisabled, overlay,
    validationMsg, footerSection,
  };
}
