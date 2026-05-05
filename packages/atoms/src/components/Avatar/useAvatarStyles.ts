import { css } from '@emotion/css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'round' | 'square';
export type AvatarType = 'initials' | 'image' | 'numeric' | 'icon';
export type AvatarStatusDotType = 'active' | 'inactive' | 'idle' | 'brand';

interface SizeConfig {
  dimension?: string;
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  fontWeight?: string;
  iconSize?: string;
  statusDotSize?: string;
  statusDotPadding?: string;
}

interface DefaultConfig {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  hoverBorderWidth?: string;
  focusBackgroundColor?: string;
  focusTextColor?: string;
  focusBorderColor?: string;
  focusBorderWidth?: string;
  focusRingColor?: string;
}

interface StatesConfig {
  disabled?: { backgroundColor?: string; textColor?: string; imageOverlay?: string };
  ghost?: { backgroundColor?: string };
}

interface RadiusConfig {
  round?: string;
  square?: Record<string, string>;
}

export interface AvatarConfig {
  base?: { transition?: string; focus?: { outline?: string; ring?: string } };
  default?: DefaultConfig;
  sizes?: Record<string, SizeConfig>;
  radius?: RadiusConfig;
  states?: StatesConfig;
  statusDot?: Record<string, string>;
}

export interface UseAvatarStylesParams {
  config: AvatarConfig;
  size: AvatarSize;
  shape: AvatarShape;
  isDisabled: boolean;
  isGhost: boolean;
}

function getRadius(config: AvatarConfig, shape: AvatarShape, size: AvatarSize): string {
  if (shape === 'round') return config.radius?.round || '999px';
  return config.radius?.square?.[size] || '8px';
}

export function buildAvatarStyles(params: UseAvatarStylesParams): string {
  const { config, size, shape, isDisabled, isGhost } = params;
  const sc = config.sizes?.[size] || {};
  const dc = config.default || {};
  const borderRadius = getRadius(config, shape, size);
  const dimension = sc.dimension || '36px';
  const isSmall = size === 'sm';

  const base = {
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    width: dimension,
    height: dimension,
    minWidth: dimension,
    minHeight: dimension,
    borderRadius,
    fontFamily: sc.fontFamily || 'sans-serif',
    fontSize: sc.fontSize || '14px',
    lineHeight: sc.lineHeight || '20px',
    fontWeight: Number(sc.fontWeight || 600),
    transition: config.base?.transition || 'all 0.15s ease-in-out',
    userSelect: 'none' as const,
    position: 'relative' as const,
    overflow: 'visible' as const,
    boxSizing: 'border-box' as const,
  };

  if (isGhost) {
    const gs = config.states?.ghost || {};
    return css({
      ...base,
      backgroundColor: gs.backgroundColor || '#dedede',
      color: 'transparent',
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      pointerEvents: 'none',
      '& img, & svg, & > span': { visibility: 'hidden' as const },
    });
  }

  if (isDisabled) {
    const ds = config.states?.disabled || {};
    return css({
      ...base,
      backgroundColor: ds.backgroundColor || '#e6e6e6',
      color: ds.textColor || '#cdcbcb',
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      cursor: 'default',
    });
  }

  return css({
    ...base,
    backgroundColor: dc.backgroundColor || '#000000',
    color: dc.textColor || '#e6e6e6',
    borderWidth: dc.borderWidth || '0.5px',
    borderStyle: 'solid',
    borderColor: dc.borderColor || '#e6e6e6',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: dc.hoverBackgroundColor || '#0d0d0d',
      color: dc.hoverTextColor || '#e6e6e6',
      borderColor: dc.hoverBorderColor || '#cccccc',
      borderWidth: isSmall ? (dc.borderWidth || '0.5px') : (dc.hoverBorderWidth || '1px'),
      borderStyle: 'solid',
      cursor: 'pointer',
    },
    '&:focus': {
      backgroundColor: dc.focusBackgroundColor || '#000000',
      color: dc.focusTextColor || '#e6e6e6',
      borderColor: dc.focusBorderColor || '#e6e6e6',
      borderWidth: isSmall ? (dc.borderWidth || '0.5px') : (dc.focusBorderWidth || '1px'),
      borderStyle: 'solid',
      boxShadow: dc.focusRingColor ? `0 0 0 2px ${dc.focusRingColor}` : (config.base?.focus?.ring || '0 0 0 2px rgba(0,0,0,0.4)'),
      outline: 'none',
    },
  });
}

export function buildAvatarIconStyles(config: AvatarConfig, size: AvatarSize): string {
  const iconSize = config.sizes?.[size]?.iconSize || '24px';
  return css({
    width: iconSize,
    height: iconSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '& svg': { width: '100%', height: '100%' },
  });
}

export function buildImageStyles(_isDisabled: boolean, borderRadius: string): string {
  return css({
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    borderRadius,
    display: 'block',
  });
}

export function buildImageOverlayStyles(overlayColor: string): string {
  return css({
    position: 'absolute' as const,
    inset: 0,
    borderRadius: 'inherit',
    backgroundColor: overlayColor,
    pointerEvents: 'none',
  });
}

export function buildStatusDotStyles(
  config: AvatarConfig,
  size: AvatarSize,
  statusType: AvatarStatusDotType,
): string {
  const sc = config.sizes?.[size] || {};
  const dotSize = sc.statusDotSize || '6px';
  const padding = sc.statusDotPadding || '2px';
  const dotColor = config.statusDot?.[statusType] || '#10B981';
  return css({
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    width: dotSize,
    height: dotSize,
    borderRadius: '50%',
    backgroundColor: dotColor,
    border: `${padding} solid #ffffff`,
    boxSizing: 'content-box',
    pointerEvents: 'none',
  });
}
