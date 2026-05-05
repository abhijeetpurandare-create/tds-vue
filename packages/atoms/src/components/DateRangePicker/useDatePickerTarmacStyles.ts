import { css } from '@emotion/css';

export interface DatePickerTarmacConfig {
  base?: Record<string, any>;
  input?: Record<string, any>;
  calendar?: Record<string, any>;
  footer?: Record<string, any>;
}

export interface BuildDatePickerStylesParams {
  config: DatePickerTarmacConfig;
  isOpen?: boolean;
  hasValue?: boolean;
  enableQuickSelect?: boolean;
}

export function buildDatePickerStyles(params: BuildDatePickerStylesParams) {
  const { config, isOpen, hasValue, enableQuickSelect } = params;
  const inp = config.input || {};
  const cal = config.calendar || {};
  const ft = config.footer || {};
  const base = config.base || {};
  const sb = config.sidebar || {};

  const wrapper = css({
    position: 'relative',
    display: 'inline-block',
    fontSize: '14px',
    fontFamily: base.fontFamily || 'sans-serif',
  });

  const inputField = css({
    display: 'flex',
    alignItems: 'center',
    gap: inp.gap || '4px',
    padding: inp.padding || '12px',
    backgroundColor: inp.backgroundColor || 'white',
    border: `${inp.borderWidth || '1px'} solid ${isOpen ? (inp.activeBorderColor || '#ccc') : (inp.borderColor || '#e6e6e6')}`,
    borderRadius: inp.borderRadius || '6px',
    width: '320px',
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

  const calendarContainer = css({
    position: 'absolute',
    top: '48px',
    left: 0,
    width: enableQuickSelect ? '460px' : '320px',
    backgroundColor: cal.backgroundColor || 'white',
    borderRadius: cal.borderRadius || '4px',
    boxShadow: cal.shadow || '0px 0px 6px 0px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 9999,
    fontFamily: base.fontFamily || 'sans-serif',
  });

  const sidebar = css({
    display: 'flex',
    flexDirection: 'column',
    width: sb.width || '140px',
    flexShrink: 0,
    alignSelf: 'stretch',
    padding: 0,
  });

  const sidebarItem = css({
    display: 'flex',
    alignItems: 'center',
    gap: sb.gap || '4px',
    padding: `${sb.paddingY || '8px'} ${sb.paddingX || '12px'}`,
    fontSize: sb.fontSize || '14px',
    lineHeight: sb.lineHeight || '20px',
    fontWeight: sb.fontWeight || 400,
    color: sb.textColor || '#2b2b2b',
    fontFamily: base.fontFamily || 'sans-serif',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left' as const,
    width: '100%',
    whiteSpace: 'nowrap' as const,
    transition: 'background-color 0.15s',
    '&:hover': {
      backgroundColor: sb.hoverBackgroundColor || '#f0f0f0',
    },
  });

  const sidebarItemActive = css({
    fontWeight: sb.selectedFontWeight || 600,
  });

  const sidebarDot = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '12px',
    height: '12px',
    flexShrink: 0,
    color: sb.dotColor || 'black',
  });

  const calendarPanel = css({
    display: 'flex',
    flexDirection: 'column',
    width: '320px',
    flexShrink: 0,
    padding: cal.padding || '12px',
  });

  const calendarHeader = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    marginBottom: '8px',
  });

  const navButtonGroup = css({
    display: 'flex',
    gap: cal.navButtonGap || '4px',
    alignItems: 'center',
  });

  const navButton = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: cal.navButtonPadding || '6px',
    border: `${cal.navButtonBorderWidth || '0.5px'} solid ${cal.navButtonBorderColor || '#e6e6e6'}`,
    borderRadius: cal.navButtonBorderRadius || '4px',
    cursor: 'pointer',
    background: 'none',
    color: cal.headerTextColor || '#2b2b2b',
    transition: 'color 0.2s',
    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
  });

  const navButtonIcon = css({
    width: cal.navButtonIconSize || '16px',
    height: cal.navButtonIconSize || '16px',
  });

  const headerText = css({
    flex: '1 0 0',
    textAlign: 'center' as const,
    fontSize: cal.headerFontSize || '14px',
    lineHeight: cal.headerLineHeight || '20px',
    fontWeight: 600,
    color: cal.headerTextColor || '#2b2b2b',
    whiteSpace: 'nowrap' as const,
  });

  const weekRow = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    textAlign: 'center' as const,
    fontWeight: 500,
    marginBottom: '4px',
    fontSize: '12px',
    borderTop: '1px solid #e6e6e6',
    paddingTop: '12px',
    marginTop: '12px',
  });

  const weekDayLabel = css({
    width: '100%',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: cal.weekDayFontSize || '14px',
    lineHeight: cal.weekDayLineHeight || '20px',
    fontWeight: cal.weekDayFontWeight || 300,
    color: cal.weekDayTextColor || '#98a2bc',
  });

  const daysGrid = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    textAlign: 'center' as const,
    position: 'relative',
    gap: 0,
  });

  const dayCell = css({
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: cal.dayCellTextColor || '#2b2b2b',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: cal.dayCellHoverBackgroundColor || '#f0f0f0',
    },
  });

  const dayCellSelected = css({
    backgroundColor: `${cal.dayCellPressedBackgroundColor || '#0d0d0d'} !important`,
    color: `${cal.dayCellPressedTextColor || '#f2f2f2'} !important`,
    borderRadius: cal.dayCellBorderRadius || '4px',
    zIndex: 10,
  });

  // Start of range — rounded left corners only
  const dayCellRangeStart = css({
    backgroundColor: `${cal.dayCellPressedBackgroundColor || '#0d0d0d'} !important`,
    color: `${cal.dayCellPressedTextColor || '#f2f2f2'} !important`,
    borderRadius: `${cal.dayCellBorderRadius || '4px'} 0 0 ${cal.dayCellBorderRadius || '4px'}`,
    zIndex: 10,
  });

  // End of range — rounded right corners only
  const dayCellRangeEnd = css({
    backgroundColor: `${cal.dayCellPressedBackgroundColor || '#0d0d0d'} !important`,
    color: `${cal.dayCellPressedTextColor || '#f2f2f2'} !important`,
    borderRadius: `0 ${cal.dayCellBorderRadius || '4px'} ${cal.dayCellBorderRadius || '4px'} 0`,
    zIndex: 10,
  });

  const dayCellInRange = css({
    backgroundColor: cal.rangeBackgroundColor || '#f2f2f2',
    borderRadius: 0,
  });

  const dayCellDisabled = css({
    color: `${cal.dayCellDisabledTextColor || '#cdcbcb'} !important`,
    cursor: 'not-allowed',
    '&:hover': { backgroundColor: 'transparent' },
  });

  const dayCellEmpty = css({ visibility: 'hidden' as const });

  const dayCellOutside = css({
    color: `${cal.dayCellDisabledTextColor || '#cdcbcb'} !important`,
    opacity: 0.5,
  });

  const monthYearGrid = css({
    position: 'absolute',
    border: '1px solid #e6e6e6',
    borderRadius: '4px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    zIndex: 9999,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    padding: '16px',
    marginTop: '4px',
    backgroundColor: cal.backgroundColor || 'white',
  });

  const monthYearCell = css({
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: base.fontFamily || 'sans-serif',
    '&:hover': { backgroundColor: '#f3f4f6' },
  });

  const monthYearCellActive = css({
    backgroundColor: `${cal.dayCellPressedBackgroundColor || 'black'} !important`,
    color: `${cal.dayCellPressedTextColor || 'white'} !important`,
  });

  const footerRow = css({
    borderTop: '1px solid #e6e6e6',
    marginTop: '12px',
    paddingTop: '12px',
    display: 'flex',
    gap: ft.gap || '8px',
    alignItems: 'center',
    justifyContent: 'space-between',
  });

  return {
    wrapper, inputField, inputText, inputIcon,
    calendarContainer, sidebar, sidebarItem, sidebarItemActive, sidebarDot, calendarPanel,
    calendarHeader, navButtonGroup, navButton, navButtonIcon,
    headerText, weekRow, weekDayLabel, daysGrid,
    dayCell, dayCellSelected, dayCellRangeStart, dayCellRangeEnd, dayCellInRange, dayCellDisabled, dayCellEmpty, dayCellOutside,
    monthYearGrid, monthYearCell, monthYearCellActive,
    footerRow,
  };
}
