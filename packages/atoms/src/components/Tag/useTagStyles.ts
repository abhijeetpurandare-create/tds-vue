import { css } from '@emotion/css';

type TagSize = 'sm' | 'md' | 'lg';
type TagVariant = 'standard' | 'outlined';

interface VariantConfig {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  pressedColor?: string;
  pressedTextColor?: string;
  focusRingColor?: string;
}

interface TagConfig {
  base: {
    fontFamily?: string;
    fontWeight?: string;
    borderRadius?: string;
    transition?: string;
    focus?: { ring?: string };
  };
  variants: Record<string, Record<string, VariantConfig>>;
  sizes: Record<string, {
    padding?: string;
    fontSize?: string;
    lineHeight?: string;
    iconSize?: string;
    gap?: string;
  }>;
  states: {
    disabled?: { backgroundColor?: string; textColor?: string; borderColor?: string };
    disabledOutlined?: { backgroundColor?: string; textColor?: string; borderColor?: string };
    ghost?: { backgroundColor?: string; textColor?: string; borderColor?: string };
  };
}

export interface UseTagStylesParams {
  tagConfig: TagConfig;
  tagType: string;
  tagVariant: TagVariant;
  size: TagSize;
  isDisabled: boolean;
  isGhost: boolean;
}

function getVariantConfig(cfg: TagConfig, tagVariant: TagVariant, tagType: string): VariantConfig {
  return cfg.variants?.[tagVariant]?.[tagType] || {};
}

function getDisabledState(cfg: TagConfig, tagVariant: TagVariant) {
  if (tagVariant === 'outlined' && cfg.states.disabledOutlined) return cfg.states.disabledOutlined;
  return cfg.states.disabled || {};
}

function baseStyles(cfg: TagConfig, size: TagSize) {
  const sc = cfg.sizes[size] || {};
  return {
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontFamily: cfg.base.fontFamily || 'sans-serif',
    fontWeight: Number(cfg.base.fontWeight || 500),
    borderRadius: cfg.base.borderRadius || '8px',
    transition: cfg.base.transition || 'all 0.15s ease-in-out',
    padding: sc.padding || '8px',
    fontSize: sc.fontSize || '12px',
    lineHeight: sc.lineHeight || '16px',
    gap: sc.gap || '4px',
    userSelect: 'none' as const,
    cursor: 'pointer' as const,
    outline: 'none',
    tabIndex: 0,
  };
}

export function buildTagStyles(params: UseTagStylesParams): string {
  const { tagConfig, tagType, tagVariant, size, isDisabled, isGhost } = params;
  const base = baseStyles(tagConfig, size);

  if (isGhost) {
    const gs = tagConfig.states.ghost || {};
    return css({
      ...base,
      backgroundColor: gs.backgroundColor || '#e6e6e6',
      color: gs.textColor || 'transparent',
      borderWidth: '0.5px',
      borderStyle: 'solid',
      borderColor: gs.borderColor || 'transparent',
      cursor: 'default',
      pointerEvents: 'none',
    });
  }

  if (isDisabled) {
    const ds = getDisabledState(tagConfig, tagVariant);
    return css({
      ...base,
      backgroundColor: ds.backgroundColor || '#e6e6e6',
      color: ds.textColor || '#cdcbcb',
      borderWidth: '0.5px',
      borderStyle: 'solid',
      borderColor: ds.borderColor || 'transparent',
      cursor: 'not-allowed',
    });
  }

  const vc = getVariantConfig(tagConfig, tagVariant, tagType);
  const isOutlined = tagVariant === 'outlined';
  const hasBorder = isOutlined || Boolean(vc.borderColor);

  return css({
    ...base,
    backgroundColor: vc.backgroundColor || '#e6e6e6',
    color: vc.textColor || '#2b2b2b',
    borderWidth: hasBorder ? '0.5px' : '0',
    borderStyle: 'solid',
    borderColor: vc.borderColor || 'transparent',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: vc.hoverColor || vc.backgroundColor || '#e6e6e6',
      color: vc.hoverTextColor || vc.textColor || '#2b2b2b',
      borderStyle: 'solid',
      ...(hasBorder && vc.hoverBorderColor && { borderColor: vc.hoverBorderColor }),
    },
    '&:active': {
      backgroundColor: vc.pressedColor || vc.hoverColor || vc.backgroundColor || '#e6e6e6',
      color: vc.pressedTextColor || vc.hoverTextColor || vc.textColor || '#2b2b2b',
      borderStyle: 'solid',
      ...(hasBorder && vc.hoverBorderColor && { borderColor: vc.hoverBorderColor }),
    },
    '&:focus': {
      boxShadow: vc.focusRingColor
        ? `0 0 0 2px ${vc.focusRingColor}`
        : (tagConfig.base.focus?.ring || '0 0 0 2px rgba(0, 0, 0, 0.4)'),
      outline: 'none',
    },
  });
}

export function buildTagIconStyles(cfg: TagConfig, size: TagSize): string {
  const iconSize = cfg.sizes[size]?.iconSize || '12px';
  return css({
    width: iconSize,
    height: iconSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  });
}
