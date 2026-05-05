import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert raw number or string to CSS dimension (e.g. 16 → "16px", "16px" → "16px") */
function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}

// ─── Position Maps ───────────────────────────────────────────────────────────

export type FABPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const POSITION_OFFSETS: Record<FABPosition, React.CSSProperties> = {
  'bottom-right': { bottom: 24, right: 24 },
  'bottom-left': { bottom: 24, left: 24 },
  'top-right': { top: 24, right: 24 },
  'top-left': { top: 24, left: 24 },
};

const MENU_DIRECTION: Record<FABPosition, 'up' | 'down'> = {
  'bottom-right': 'up',
  'bottom-left': 'up',
  'top-right': 'down',
  'top-left': 'down',
};

// ─── Config Shape Interfaces ─────────────────────────────────────────────────

export interface FABBaseConfig {
  fontFamily?: string;
  fontWeight?: string;
  transition?: string;
  focus?: {
    outline?: string;
    ring?: string;
  };
}

export interface TriggerConfig {
  backgroundColor?: string;
  iconColor?: string;
  labelColor?: string;
  hoverColor?: string;
  pressedColor?: string;
  focusRingColor?: string;
  shadow?: string;
}

export interface MenuConfig {
  gap?: string;
}

export interface MenuItemConfig {
  // Legacy flat fields (backward compat)
  labelBackgroundColor?: string;
  labelTextColor?: string;
  labelFontFamily?: string;
  labelFontSize?: string;
  labelPadding?: string;
  labelBorderRadius?: string;
  iconButtonBackgroundColor?: string;
  iconButtonIconColor?: string;
  iconButtonHoverColor?: string;
  iconButtonFocusRingColor?: string;
  // New single-card fields
  height?: string;
  padding?: string;
  gap?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  iconSize?: string;
}

export interface VariantTriggerConfig {
  backgroundColor?: string;
  iconColor?: string;
  labelColor?: string;
  hoverColor?: string;
  pressedColor?: string;
  focusRingColor?: string;
  shadow?: string;
}

export interface VariantMenuItemConfig {
  backgroundColor?: string;
  textColor?: string;
  hoverBackgroundColor?: string;
  pressedBackgroundColor?: string;
  iconColor?: string;
  shadow?: string;
}

export interface VariantConfig {
  trigger?: VariantTriggerConfig;
  menuItem?: VariantMenuItemConfig;
}

export interface OverlayConfig {
  backgroundColor?: string;
}

export interface SizeConfig {
  triggerSize?: string;
  triggerIconSize?: string;
  triggerPadding?: string;
  extendedTriggerPadding?: string;
  labelFontSize?: string;
  labelLineHeight?: string;
  // Legacy fields (backward compat)
  menuItemIconButtonSize?: string;
  menuItemIconSize?: string;
}

export interface DisabledStateConfig {
  opacity?: string;
  cursor?: string;
}

export interface AnimationConfig {
  revealDuration?: string;
  revealStagger?: string;
  exitDuration?: string;
  exitStagger?: string;
  triggerRotateDuration?: string;
}

export interface FABConfig {
  base: FABBaseConfig;
  trigger: TriggerConfig;
  menu: MenuConfig;
  menuItem: MenuItemConfig;
  variants?: Record<string, VariantConfig>;
  overlay: OverlayConfig;
  sizes: Record<string, SizeConfig>;
  states: {
    disabled: DisabledStateConfig;
  };
  animation: AnimationConfig;
}

// ─── Builder Param Interfaces ────────────────────────────────────────────────

export interface ContainerStyleParams {
  position: FABPosition;
  positionMode?: 'fixed' | 'absolute' | 'relative';
  zIndex: number;
}

export interface TriggerStyleParams {
  config: FABConfig;
  size: string;
  isOpen: boolean;
  disableAnimation: boolean;
  variant?: string;
  triggerType?: string;
  hasOpenIcon?: boolean;
  /** When set, overrides the internal auto-rotate logic entirely */
  iconRotation?: number;
}

export interface MenuStyleParams {
  config: FABConfig;
  position: FABPosition;
}

export interface MenuItemStyleParams {
  config: FABConfig;
  size: string;
  isDisabled: boolean;
  variant?: string;
}

export interface OverlayStyleParams {
  config: FABConfig;
  zIndex: number;
}


// ─── Variant Resolution Helpers ──────────────────────────────────────────────

function getVariantTrigger(config: FABConfig, variant?: string): TriggerConfig {
  if (variant && config.variants?.[variant]?.trigger) {
    return config.variants[variant].trigger as TriggerConfig;
  }
  return config.trigger || {};
}

function getVariantMenuItem(config: FABConfig, variant?: string): VariantMenuItemConfig {
  if (variant && config.variants?.[variant]?.menuItem) {
    return config.variants[variant].menuItem as VariantMenuItemConfig;
  }
  // Fallback: map legacy flat menuItem fields to variant shape
  const mi = config.menuItem || {};
  return {
    backgroundColor: mi.iconButtonBackgroundColor,
    textColor: mi.labelTextColor,
    hoverBackgroundColor: mi.iconButtonHoverColor,
    pressedBackgroundColor: mi.iconButtonBackgroundColor,
    iconColor: mi.iconButtonIconColor,
    shadow: undefined,
  };
}

// ─── Builder Functions ───────────────────────────────────────────────────────

export function buildContainerStyles(params: ContainerStyleParams): string {
  const { position, positionMode = 'fixed', zIndex } = params;
  const offsets = POSITION_OFFSETS[position] || POSITION_OFFSETS['bottom-right'];

  return css({
    position: positionMode,
    zIndex,
    isolation: 'isolate',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // offsets only make sense for fixed/absolute
    ...(positionMode !== 'relative' ? offsets : {}),
  });
}

export function buildTriggerStyles(params: TriggerStyleParams): string {
  const { config, size, isOpen, disableAnimation, variant, triggerType = 'default', hasOpenIcon = false, iconRotation } = params;
  const trigger = getVariantTrigger(config, variant);
  const base = config.base || {};
  const sizeConfig = config.sizes?.[size] || config.sizes?.['md'] || {};

  const triggerDim = dim(sizeConfig.triggerSize, '36px');
  const iconDim = dim(sizeConfig.triggerIconSize, '20px');
  const rotateDuration = config.animation?.triggerRotateDuration || '200ms';

  const isExtended = triggerType === 'extended';

  const triggerPad = isExtended
    ? (sizeConfig.extendedTriggerPadding || dim(sizeConfig.triggerPadding, '8px'))
    : dim(sizeConfig.triggerPadding, '8px');

  // iconRotation prop takes full control; otherwise fall back to internal logic
  const resolvedRotation = iconRotation !== undefined
    ? iconRotation
    : (isOpen && !hasOpenIcon ? 45 : 0);

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isExtended ? 'auto' : triggerDim,
    height: triggerDim,
    borderRadius: isExtended ? '999px' : '50%',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    padding: triggerPad,
    gap: isExtended ? '8px' : undefined,
    position: 'relative',
    backgroundColor: trigger.backgroundColor || '#1F2937',
    color: trigger.iconColor || '#FFFFFF',
    boxShadow: trigger.shadow || '-1px 1px 6px 2px rgba(0,0,0,0.2)',
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    transition: disableAnimation
      ? 'none'
      : `transform ${rotateDuration} ease-in-out, background-color 0.15s ease-in-out`,

    '& > .fab-trigger-icon': {
      width: iconDim,
      height: iconDim,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: disableAnimation ? 'none' : `transform ${rotateDuration} ease-in-out`,
      transform: `rotate(${resolvedRotation}deg)`,
    },

    '& > .fab-trigger-label': {
      fontSize: dim(sizeConfig.labelFontSize, '14px'),
      fontWeight: 500,
      lineHeight: sizeConfig.labelLineHeight || '1.5em',
      color: (trigger as VariantTriggerConfig).labelColor || trigger.iconColor || '#FFFFFF',
      whiteSpace: 'nowrap' as const,
    },

    '&:hover': {
      backgroundColor: trigger.hoverColor || trigger.backgroundColor,
    },
    '&:active': {
      backgroundColor: trigger.pressedColor || trigger.hoverColor || trigger.backgroundColor,
      transform: 'scale(0.92)',
    },
    '&:focus': {
      boxShadow: trigger.focusRingColor
        ? `0 0 0 2px ${trigger.focusRingColor}`
        : (base.focus?.ring || '0 0 0 2px rgba(0, 0, 0, 0.4)'),
      outline: 'none',
    },
  });
}

export function buildMenuStyles(params: MenuStyleParams): string {
  const { config, position } = params;
  const menu = config.menu || {};
  const direction = MENU_DIRECTION[position] || 'up';

  return css({
    display: 'flex',
    flexDirection: direction === 'up' ? 'column-reverse' : 'column',
    alignItems:"flex-end",
    gap: dim(menu.gap, '12px'),
    position: 'absolute',
    ...(direction === 'up'
      ? { bottom: '100%', marginBottom: dim(menu.gap, '12px') }
      : { top: '100%', marginTop: dim(menu.gap, '12px') }),
    ...(position === 'bottom-right' || position === 'top-right'
      ? { right: 0 }
      : { left: 0 }),
  });
}

export function buildMenuItemStyles(params: MenuItemStyleParams): {
  container: string;
} {
  const { config, isDisabled, variant } = params;
  const mi = config.menuItem || {};
  const base = config.base || {};
  const disabledState = config.states?.disabled || {};
  const variantMi = getVariantMenuItem(config, variant);

  const bgColor = variantMi.backgroundColor || mi.iconButtonBackgroundColor || '#1F2937';
  const textColor = variantMi.textColor || mi.labelTextColor || '#FFFFFF';
  const hoverBg = variantMi.hoverBackgroundColor || bgColor;
  const pressedBg = variantMi.pressedBackgroundColor || hoverBg;
  const iconColor = variantMi.iconColor || mi.iconButtonIconColor || '#FFFFFF';
  const shadow = variantMi.shadow || '-1px 1px 6px 2px rgba(0,0,0,0.2)';

  const container = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: dim(mi.gap, '8px'),
    padding: mi.padding || '10px 16px',
    height: dim(mi.height, '44px'),
    borderRadius: dim(mi.borderRadius, '8px'),
    backgroundColor: bgColor,
    color: textColor,
    boxShadow: shadow,
    border: 'none',
    cursor: isDisabled ? (disabledState.cursor || 'not-allowed') : 'pointer',
    opacity: isDisabled ? Number(disabledState.opacity || '0.5') : 1,
    pointerEvents: isDisabled ? 'none' : 'auto',
    fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontSize: dim(mi.fontSize, '16px'),
    fontWeight: Number(mi.fontWeight || base.fontWeight || '500'),
    lineHeight: mi.lineHeight || '1.5em',
    whiteSpace: 'nowrap' as const,
    userSelect: 'none' as const,
    outline: 'none',
    transition: base.transition || 'all 0.15s ease-in-out',

    '& > .fab-menu-item-icon': {
      width: dim(mi.iconSize, '24px'),
      height: dim(mi.iconSize, '24px'),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: iconColor,
      flexShrink: 0,
    },

    '&:hover': {
      backgroundColor: isDisabled ? bgColor : hoverBg,
      cursor: isDisabled ? (disabledState.cursor || 'not-allowed') : 'pointer',
    },
    '&:active': {
      backgroundColor: isDisabled ? bgColor : pressedBg,
    },
    '&:focus': {
      boxShadow: `0 0 0 2px ${variantMi.iconColor || 'rgba(0,0,0,0.3)'}`,
      outline: 'none',
    },
  });

  return { container };
}

export function buildOverlayStyles(params: OverlayStyleParams): string {
  const { config, zIndex } = params;
  const overlay = config.overlay || {};

  return css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlay.backgroundColor || 'rgba(0, 0, 0, 0.3)',
    zIndex: zIndex - 1,
  });
}
