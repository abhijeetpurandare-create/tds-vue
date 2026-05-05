import { css } from '@emotion/css';

type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeType = 'solid' | 'subtle' | 'outlined';

interface VariantConfig {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

interface BadgeConfig {
  base: {
    fontFamily?: string;
    fontWeight?: string;
    borderRadius?: string;
  };
  types?: Record<string, Record<string, VariantConfig>>;
  variants: Record<string, VariantConfig>;
  sizes: Record<string, {
    padding?: string;
    fontSize?: string;
    lineHeight?: string;
    iconSize?: string;
    gap?: string;
  }>;
  states: {
    disabled?: VariantConfig;
    disabledOutlined?: VariantConfig;
    ghost?: VariantConfig & { cursor?: string };
  };
}

export interface UseBadgeStylesParams {
  badgeConfig: BadgeConfig;
  variant: string;
  size: BadgeSize;
  badgeType: BadgeType;
  isDisabled: boolean;
  isGhost: boolean;
}

function getVariantConfig(cfg: BadgeConfig, badgeType: BadgeType, variant: string): VariantConfig {
  if (cfg.types?.[badgeType]?.[variant]) return cfg.types[badgeType][variant];
  return cfg.variants[variant] || {};
}

function getDisabledState(cfg: BadgeConfig, badgeType: BadgeType): VariantConfig {
  if (badgeType === 'outlined' && cfg.states.disabledOutlined) return cfg.states.disabledOutlined;
  return cfg.states.disabled || {};
}

function baseStyles(cfg: BadgeConfig, size: BadgeSize) {
  const sc = cfg.sizes[size] || {};
  return {
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontFamily: cfg.base.fontFamily || 'sans-serif',
    fontWeight: Number(cfg.base.fontWeight || 500),
    borderRadius: cfg.base.borderRadius || '4px',
    padding: sc.padding || '6px',
    fontSize: sc.fontSize || '12px',
    lineHeight: sc.lineHeight || '16px',
    gap: sc.gap || '2px',
    userSelect: 'none' as const,
  };
}

export function buildBadgeStyles(params: UseBadgeStylesParams): string {
  const { badgeConfig, variant, size, badgeType, isDisabled, isGhost } = params;
  const base = baseStyles(badgeConfig, size);

  if (isGhost) {
    const gs = badgeConfig.states.ghost || {};
    return css({
      ...base,
      backgroundColor: gs.backgroundColor || '#e6e6e6',
      color: gs.textColor || 'transparent',
      borderWidth: '0.5px',
      borderStyle: 'solid',
      borderColor: gs.borderColor || 'transparent',
      pointerEvents: 'none',
    });
  }

  if (isDisabled) {
    const ds = getDisabledState(badgeConfig, badgeType);
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

  const vc = getVariantConfig(badgeConfig, badgeType, variant);
  const hasBorder = Boolean(vc.borderColor);
  return css({
    ...base,
    backgroundColor: vc.backgroundColor || '#e6e6e6',
    color: vc.textColor || '#2b2b2b',
    borderWidth: hasBorder ? '0.5px' : '0',
    borderStyle: 'solid',
    borderColor: vc.borderColor || 'transparent',
  });
}

export function buildBadgeIconStyles(cfg: BadgeConfig, size: BadgeSize): string {
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
