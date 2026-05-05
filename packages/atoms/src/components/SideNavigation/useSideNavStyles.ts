import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

export interface SideNavConfig {
  base?: Record<string, string>;
  styles?: Record<string, Record<string, string>>;
}

export interface SideNavStyleParams {
  config: SideNavConfig;
  navStyle: string;
  isCollapsed: boolean;
  isOverlay?: boolean;
}

function getStyleConfig(config: SideNavConfig, navStyle: string): Record<string, string> {
  return (config.styles?.[navStyle] || config.styles?.['standard'] || {}) as Record<string, string>;
}

// ─── Container ────────────────────────────────────────────────────────────────
export function buildContainerStyles(params: SideNavStyleParams & { navType?: string }): string {
  const { config, navStyle, isCollapsed, isOverlay } = params;
  const sc = getStyleConfig(config, navStyle);
  const base = config.base || {};

  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: dim(base.gap, '8px'),
    padding: dim(base.padding, '8px'),
    width: isCollapsed ? dim(base.collapsedWidth, '60px') : dim(base.expandedWidth, '240px'),
    height: '100%',
    backgroundColor: sc.backgroundColor || '#ffffff',
    borderRight: `${sc.borderWidth || '1px'} solid ${sc.borderColor || '#e6e6e6'}`,
    boxSizing: 'border-box',
    transition: 'width 0.2s ease-in-out',
    overflowX: 'hidden',
    overflowY: 'auto',
    fontFamily: `${base.fontFamily || 'Noto Sans'}, sans-serif`,
    ...(isOverlay ? {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      zIndex: 100,
    } : {}),
  });
}

// ─── Nav Cell ─────────────────────────────────────────────────────────────────
export function buildNavCellStyles(
  params: SideNavStyleParams & { isActive?: boolean; isDisabled?: boolean }
): string {
  const { config, navStyle, isCollapsed, isActive, isDisabled } = params;
  const sc = getStyleConfig(config, navStyle);

  const activeBg = sc.activeBg || sc.pressedBg || '#f2f2f2';
  const hoverBg = sc.hoverBg || '#f7f7f7';
  const pressedBg = sc.pressedBg || '#f2f2f2';
  const defaultBg = sc.defaultBg || 'transparent';
  const defaultText = sc.textColor || '#2b2b2b';
  const activeText = sc.activeTextColor || defaultText;
  const hoverText = sc.hoverTextColor || defaultText;
  const pressedText = sc.pressedTextColor || defaultText;
  const disabledText = sc.disabledTextColor || '#cdcbcb';

  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: dim(sc.cellGap, '4px'),
    padding: dim(sc.cellPadding, '8px 12px'),
    borderRadius: dim(sc.cellRadius, '8px'),
    width: isCollapsed ? 'auto' : '100%',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: isActive ? activeBg : defaultBg,
    background: isActive ? activeBg : defaultBg,
    color: isDisabled ? disabledText : (isActive ? activeText : defaultText),
    boxSizing: 'border-box',
    transition: 'background-color 0.15s ease, color 0.15s ease',
    textDecoration: 'none',
    border: 'none',
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
    textAlign: 'left',
    outline: 'none',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': isDisabled ? {} : {
      backgroundColor: isActive ? activeBg : hoverBg,
      background: isActive ? activeBg : hoverBg,
      color: isActive ? activeText : hoverText,
      cursor: 'pointer',
    },
    '&:active': isDisabled ? {} : {
      backgroundColor: pressedBg,
      background: pressedBg,
      color: pressedText,
    },
  });
}

// ─── Icon wrapper ─────────────────────────────────────────────────────────────
export function buildNavCellIconStyles(
  params: SideNavStyleParams & { isActive?: boolean; isDisabled?: boolean }
): string {
  const { config, navStyle, isActive, isDisabled } = params;
  const sc = getStyleConfig(config, navStyle);

  const defaultIcon = sc.iconColor || '#2b2b2b';
  const activeIcon = sc.activeIconColor || sc.activeTextColor || defaultIcon;
  const disabledIcon = sc.disabledIconColor || sc.disabledTextColor || '#cdcbcb';
  // Pressed icon color — falls back to pressedTextColor so it matches the text
  const pressedIcon = sc.pressedIconColor || sc.pressedTextColor || defaultIcon;
  const hoverIcon = sc.hoverIconColor || sc.hoverTextColor || defaultIcon;

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sc.iconSize, '20px'),
    height: dim(sc.iconSize, '20px'),
    flexShrink: 0,
    color: isDisabled ? disabledIcon : (isActive ? activeIcon : defaultIcon),
    'button:hover:not(:disabled) &': isDisabled ? {} : { color: isActive ? activeIcon : hoverIcon },
    'button:active:not(:disabled) &': isDisabled ? {} : { color: pressedIcon },
    '& > svg': {
      width: '100%',
      height: '100%',
    },
  });
}

// ─── Label ────────────────────────────────────────────────────────────────────
export function buildNavCellLabelStyles(params: SideNavStyleParams): string {
  const { config, isCollapsed } = params;
  const base = config.base || {};

  return css({
    flex: 1,
    fontSize: dim(base.fontSize, '14px'),
    fontWeight: base.fontWeight || '500',
    lineHeight: base.lineHeight || '1.43em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    opacity: isCollapsed ? 0 : 1,
    transition: 'opacity 0.1s ease',
  });
}

// ─── Subtext ──────────────────────────────────────────────────────────────────
// Figma: caption/regular — fontSize=12, lineHeight=16px, fontWeight=400
export function buildNavCellSubtextStyles(params: SideNavStyleParams): string {
  const { config, navStyle, isCollapsed } = params;
  const sc = getStyleConfig(config, navStyle);
  const base = config.base || {};

  return css({
    fontSize: dim(base.captionFontSize, '12px'),
    fontWeight: '400',
    lineHeight: '16px',
    color: sc.subtextColor || sc.textColor || '#454545',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    opacity: isCollapsed ? 0 : 1,
    transition: 'opacity 0.1s ease',
  });
}

// ─── Trailing chevron ─────────────────────────────────────────────────────────
export function buildTrailingIconStyles(
  params: SideNavStyleParams & { isExpanded?: boolean }
): string {
  const { config, navStyle, isExpanded, isCollapsed } = params;
  const sc = getStyleConfig(config, navStyle);

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim(sc.iconSize, '20px'),
    height: dim(sc.iconSize, '20px'),
    flexShrink: 0,
    color: 'currentColor',
    transition: 'transform 0.2s ease, opacity 0.1s ease',
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
    opacity: isCollapsed ? 0 : 1,
  });
}

// ─── Sub-nav ──────────────────────────────────────────────────────────────────
// Figma: gap=2px, sub-cells have px-20px (not a wrapper indent)
export function buildSubNavStyles(_params: SideNavStyleParams): string {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '2px',
  });
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function buildDividerStyles(params: SideNavStyleParams): string {
  const { config, navStyle } = params;
  const sc = getStyleConfig(config, navStyle);

  return css({
    height: '1px',
    // dividerColor is a separate token from borderColor (which is the container's right border)
    backgroundColor: sc.dividerColor || sc.borderColor || '#e6e6e6',
    margin: '4px 0',
    flexShrink: 0,
  });
}

// ─── Slot ─────────────────────────────────────────────────────────────────────
export function buildSlotStyles(): string {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '8px',
  });
}

// ─── Nav group ────────────────────────────────────────────────────────────────
export function buildNavGroupStyles(): string {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '8px',
  });
}
