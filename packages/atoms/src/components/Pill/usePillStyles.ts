import { css } from '@emotion/css';

type PillSize = 'sm' | 'md' | 'lg';
type PillType = 'solid' | 'subtle' | 'outlined';

interface VariantConfig {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  iconColor?: string;
}

interface PillConfig {
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
    disabled?: Record<string, VariantConfig> | VariantConfig;
    disabledOutlined?: VariantConfig;
    ghost?: VariantConfig & { cursor?: string };
  };
}

export interface UsePillStylesParams {
  pillConfig: PillConfig;
  variant: string;
  size: PillSize;
  pillType: PillType;
  isDisabled: boolean;
  isGhost: boolean;
}

function getVariantConfig(cfg: PillConfig, pillType: PillType, variant: string): VariantConfig {
  if (cfg.types?.[pillType]?.[variant]) return cfg.types[pillType][variant];
  return cfg.variants[variant] || {};
}

function getDisabledState(cfg: PillConfig, variant: string): VariantConfig {
  const ds = cfg.states.disabled;
  if (!ds) return {};
  // Per-variant disabled: states.disabled.{variant}
  if (ds && typeof ds === 'object' && (ds as Record<string, VariantConfig>)[variant]) {
    return (ds as Record<string, VariantConfig>)[variant];
  }
  // Legacy flat disabled: states.disabled has textColor directly
  if ((ds as VariantConfig).textColor) return ds as VariantConfig;
  return {};
}

function baseStyles(cfg: PillConfig, size: PillSize) {
  const sc = cfg.sizes[size] || {};
  return {
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontFamily: cfg.base.fontFamily || 'sans-serif',
    fontWeight: Number(cfg.base.fontWeight || 500),
    borderRadius: cfg.base.borderRadius || '999px',
    padding: sc.padding || '4px 8px',
    fontSize: sc.fontSize || '12px',
    lineHeight: sc.lineHeight || '16px',
    gap: sc.gap || '2px',
    userSelect: 'none' as const,
  };
}

export interface PillStyleResult {
  className: string;
  iconColor?: string;
}

export function buildPillStyles(params: UsePillStylesParams): PillStyleResult {
  const { pillConfig, variant, size, pillType, isDisabled, isGhost } = params;
  const base = baseStyles(pillConfig, size);

  if (isGhost) {
    const gs = pillConfig.states.ghost || {};
    return {
      className: css({
        ...base,
        backgroundColor: gs.backgroundColor || '#dedede',
        color: gs.textColor || 'transparent',
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: 'transparent',
        pointerEvents: 'none',
      }),
      iconColor: undefined,
    };
  }

  if (isDisabled) {
    const ds = getDisabledState(pillConfig, variant);
    return {
      className: css({
        ...base,
        backgroundColor: 'transparent',
        color: ds.textColor || '#cdcbcb',
        borderWidth: '0.5px',
        borderStyle: 'solid',
        borderColor: ds.borderColor || '#ededed',
        cursor: 'default',
      }),
      iconColor: ds.iconColor,
    };
  }

  const vc = getVariantConfig(pillConfig, pillType, variant);
  const hasBorder = Boolean(vc.borderColor);
  return {
    className: css({
      ...base,
      backgroundColor: vc.backgroundColor || '#e6e6e6',
      color: vc.textColor || '#2b2b2b',
      borderWidth: hasBorder ? '0.5px' : '0',
      borderStyle: 'solid',
      borderColor: vc.borderColor || 'transparent',
    }),
    iconColor: vc.iconColor,
  };
}

export function buildPillIconStyles(cfg: PillConfig, size: PillSize, iconColor?: string): string {
  const iconSize = cfg.sizes[size]?.iconSize || '16px';
  return css({
    width: iconSize,
    height: iconSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    ...(iconColor ? { color: iconColor } : {}),
    '& > svg': {
      width: '100%',
      height: '100%',
    },
  });
}
