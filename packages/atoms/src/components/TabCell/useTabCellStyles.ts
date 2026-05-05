import { css } from '@emotion/css';

export interface TabCellConfig {
  base?: Record<string, string>;
  styles?: Record<string, Record<string, string>>;
  sizes?: Record<string, Record<string, string>>;
}

export interface TabCellStyleParams {
  config: TabCellConfig;
  tabStyle: string;
  size: string;
  tabType: string;
  orientation: string;
  isPressed: boolean;
  isGhost: boolean;
  isDisabled: boolean;
  inGroup: boolean;
}

export function buildTabCellStyles(p: TabCellStyleParams): string {
  const b = p.config.base || {};
  const sc = p.config.sizes?.[p.size] || {};
  const st = p.config.styles?.[p.tabStyle] || {};
  const isButton = p.tabType === 'button';
  const isVertical = p.orientation === 'vertical';
  const padding = isButton
    ? (isVertical && sc.buttonVerticalPadding ? sc.buttonVerticalPadding : sc.buttonPadding || sc.padding)
    : sc.padding;

  if (p.isGhost) {
    const ghostPad = sc.ghostPadding || '16px';
    return css({
      display: 'flex', flexDirection: 'row',
      gap: sc.ghostSkeletonGap || '12px', padding: ghostPad,
      backgroundColor: b.ghostBackgroundColor || '#f7f7f7',
      borderRadius: isButton ? '999px' : '0',
      cursor: 'default',
    });
  }

  const insetShadow = (color: string) =>
    isVertical ? `inset 0 -2px 0 0 ${color}` : `inset 2px 0 0 0 ${color}`;

  const base: Record<string, any> = {
    display: 'flex', flexDirection: 'row',
    gap: sc.gap || '8px', padding: padding || '12px 16px',
    backgroundColor: b.backgroundColor || '#ffffff',
    borderRadius: isButton ? '999px' : '0',
    cursor: p.isDisabled ? 'default' : 'pointer',
    fontFamily: b.fontFamily || 'Noto Sans, sans-serif',
    color: p.isDisabled ? (b.disabledTextColor || '#cdcbcb') : (b.titleColor || '#2b2b2b'),
    border: 'none', outline: 'none',
    transition: 'all 0.15s ease-in-out',
    userSelect: 'none' as const,
  };

  if (p.isDisabled) return css(base);

  if (p.isPressed) {
    base.backgroundColor = isButton
      ? (st.buttonPressedBg || '#0d0d0d')
      : (isVertical ? (st.verticalPressedBg || st.pressedBackgroundColor || '#f7f7f7') : (st.pressedBackgroundColor || '#f7f7f7'));
    if (isButton && p.tabStyle === 'black') {
      base.color = st.buttonPressedTextColor || '#e6e6e6';
    }
    if (!isButton) {
      const borderColor = isVertical ? (st.verticalPressedBorderColor || '#1a1a1a') : (st.pressedBorderColor || '#1a1a1a');
      const mainShadow = insetShadow(borderColor);
      const needsRightBorder = p.inGroup && isVertical && p.tabStyle !== 'black';
      base.boxShadow = needsRightBorder
        ? `${mainShadow}, inset -0.5px 0 0 0 ${borderColor}`
        : mainShadow;
    }
    return css(base);
  }

  // Default state with hover/active
  if (!isButton) {
    base['&:hover'] = {
      backgroundColor: st.hoverBackgroundColor || '#f7f7f7',
      boxShadow: insetShadow(isVertical ? (st.verticalHoverBorderColor || '#e6e6e6') : (st.hoverBorderColor || '#2b2b2b')),
    };
    const activeColor = isVertical ? (st.verticalPressedBorderColor || '#1a1a1a') : (st.pressedBorderColor || '#1a1a1a');
    const activeShadow = insetShadow(activeColor);
    const needsRight = p.inGroup && isVertical && p.tabStyle !== 'black';
    base['&:active'] = {
      backgroundColor: isVertical ? (st.verticalPressedBg || st.pressedBackgroundColor || '#f7f7f7') : (st.pressedBackgroundColor || '#f7f7f7'),
      boxShadow: needsRight ? `${activeShadow}, inset -0.5px 0 0 0 ${activeColor}` : activeShadow,
    };
  } else {
    base['&:hover'] = { backgroundColor: st.buttonHoverBg || '#f2f2f2' };
    base['&:active'] = {
      backgroundColor: st.buttonPressedBg || '#0d0d0d',
      color: p.tabStyle === 'black' ? (st.buttonPressedTextColor || '#e6e6e6') : undefined,
    };
  }

  return css(base);
}

export function buildTitleStyles(p: TabCellStyleParams): string {
  const sc = p.config.sizes?.[p.size] || {};
  return css({
    fontSize: sc.titleFontSize || '14px',
    lineHeight: sc.titleLineHeight || '20px',
    fontWeight: Number(sc.titleFontWeight || 500),
    whiteSpace: 'nowrap' as const,
  });
}

export function buildSubtextStyles(p: TabCellStyleParams): string {
  const b = p.config.base || {};
  const sc = p.config.sizes?.[p.size] || {};
  const st = p.config.styles?.[p.tabStyle] || {};
  const isButtonBlackPressed = p.tabType === 'button' && p.tabStyle === 'black' && p.isPressed;
  return css({
    fontSize: sc.subtextFontSize || '12px',
    lineHeight: sc.subtextLineHeight || '16px',
    fontWeight: 400,
    whiteSpace: 'nowrap' as const,
    color: p.isDisabled ? (b.disabledTextColor || '#cdcbcb')
      : isButtonBlackPressed ? (st.buttonPressedSubtextColor || st.buttonPressedTextColor || '#f2f2f2')
      : (b.subtextColor || '#454545'),
  });
}

export function buildGhostSkeletonStyles(size: string, config?: TabCellConfig): string {
  const sc = config?.sizes?.[size] || {};
  const b = config?.base || {};
  const gap = sc.ghostSkeletonGap || (size === 'sm' ? '6px' : '12px');
  const skeletonColor = b.ghostSkeletonColor || '#e6e6e6';
  return css({
    display: 'flex', flexDirection: 'column', gap,
    '& > div': { backgroundColor: skeletonColor, borderRadius: '2px', height: '12px' },
  });
}
