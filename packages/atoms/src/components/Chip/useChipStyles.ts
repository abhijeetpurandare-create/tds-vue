import { css } from '@emotion/css';

type ChipSize = 'sm' | 'md' | 'lg';
type ChipVariant = 'standard' | 'outlined';

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

interface ChipConfig {
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

export interface UseChipStylesParams {
  chipConfig: ChipConfig;
  chipType: string;
  chipVariant: ChipVariant;
  size: ChipSize;
  isDisabled: boolean;
  isGhost: boolean;
}

function getVariantConfig(cfg: ChipConfig, chipVariant: ChipVariant, chipType: string): VariantConfig {
  return cfg.variants?.[chipVariant]?.[chipType] || {};
}

function getDisabledState(cfg: ChipConfig, chipVariant: ChipVariant) {
  if (chipVariant === 'outlined' && cfg.states.disabledOutlined) return cfg.states.disabledOutlined;
  return cfg.states.disabled || {};
}

function baseStyles(cfg: ChipConfig, size: ChipSize) {
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
  };
}

export function buildChipStyles(params: UseChipStylesParams): string {
  const { chipConfig, chipType, chipVariant, size, isDisabled, isGhost } = params;
  const base = baseStyles(chipConfig, size);

  if (isGhost) {
    const gs = chipConfig.states.ghost || {};
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
    const ds = getDisabledState(chipConfig, chipVariant);
    return css({
      ...base,
      backgroundColor: ds.backgroundColor || '#e6e6e6',
      color: ds.textColor || '#cdcbcb',
      borderWidth: '0.5px',
      borderStyle: 'solid',
      borderColor: ds.borderColor || 'transparent',
      cursor: 'default',
    });
  }

  const vc = getVariantConfig(chipConfig, chipVariant, chipType);
  const isOutlined = chipVariant === 'outlined';
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
      backgroundColor: vc.hoverColor || vc.backgroundColor || '#d6d6d6',
      color: vc.hoverTextColor || vc.textColor || '#2b2b2b',
      borderStyle: 'solid',
      ...(hasBorder && vc.hoverBorderColor && { borderColor: vc.hoverBorderColor }),
    },
    '&:active': {
      backgroundColor: vc.pressedColor || vc.hoverColor || vc.backgroundColor || '#cccccc',
      color: vc.pressedTextColor || vc.hoverTextColor || vc.textColor || '#2b2b2b',
      borderStyle: 'solid',
      ...(hasBorder && vc.hoverBorderColor && { borderColor: vc.hoverBorderColor }),
    },
    '&:focus': {
      boxShadow: vc.focusRingColor
        ? `0 0 0 2px ${vc.focusRingColor}`
        : (chipConfig.base.focus?.ring || '0 0 0 2px rgba(0, 0, 0, 0.4)'),
      outline: 'none',
    },
  });
}

export function buildChipIconStyles(cfg: ChipConfig, size: ChipSize): string {
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
