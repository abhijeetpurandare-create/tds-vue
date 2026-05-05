/**
 * Badge Style Builder — Web Component Edition
 *
 * Direct port of packages/atoms/src/components/Badge/useBadgeStyles.ts.
 */

export type BadgeVariant = 'black' | 'white' | 'coal' | 'dlv_red' | 'info' | 'success' | 'warning' | 'error' | 'cardbox';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeType = 'solid' | 'subtle' | 'outlined';

interface VariantConfig {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export interface BadgeConfig {
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

export interface BuildBadgeStylesParams {
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

/**
 * Build the complete CSS for the Badge component.
 * Produces identical visual output to the React version.
 */
export function buildBadgeCSS(params: BuildBadgeStylesParams): string {
  const { badgeConfig, variant, size, badgeType, isDisabled, isGhost } = params;
  const sc = badgeConfig.sizes[size] || {};
  const baseFontFamily = badgeConfig.base.fontFamily || 'sans-serif';
  const baseFontWeight = Number(badgeConfig.base.fontWeight || 500);
  const baseBorderRadius = badgeConfig.base.borderRadius || '4px';
  const iconSize = sc.iconSize || '12px';

  // Determine colors based on state
  let bgColor: string;
  let textColor: string;
  let borderWidth: string;
  let borderColor: string;
  let extraStyles = '';

  if (isGhost) {
    const gs = badgeConfig.states.ghost || {};
    bgColor = gs.backgroundColor || '#e6e6e6';
    textColor = gs.textColor || 'transparent';
    borderWidth = '0.5px';
    borderColor = gs.borderColor || 'transparent';
    extraStyles = 'pointer-events: none;';
  } else if (isDisabled) {
    const ds = getDisabledState(badgeConfig, badgeType);
    bgColor = ds.backgroundColor || '#e6e6e6';
    textColor = ds.textColor || '#cdcbcb';
    borderWidth = '0.5px';
    borderColor = ds.borderColor || 'transparent';
    extraStyles = 'cursor: default;';
  } else {
    const vc = getVariantConfig(badgeConfig, badgeType, variant);
    bgColor = vc.backgroundColor || '#e6e6e6';
    textColor = vc.textColor || '#2b2b2b';
    borderWidth = vc.borderColor ? '0.5px' : '0';
    borderColor = vc.borderColor || 'transparent';
  }

  return `
    :host {
      display: inline-block;
    }

    .tarmac-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${baseFontFamily};
      font-weight: ${baseFontWeight};
      border-radius: ${baseBorderRadius};
      padding: ${sc.padding || '6px'};
      font-size: ${sc.fontSize || '12px'};
      line-height: ${sc.lineHeight || '16px'};
      gap: ${sc.gap || '2px'};
      user-select: none;
      background-color: ${bgColor};
      color: ${textColor};
      border-width: ${borderWidth};
      border-style: solid;
      border-color: ${borderColor};
      ${extraStyles}
    }

    .badge-icon {
      width: ${iconSize};
      height: ${iconSize};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .badge-icon ::slotted(svg),
    .badge-icon svg {
      width: ${iconSize};
      height: ${iconSize};
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `;
}

/**
 * Get the status dot color for the current state.
 */
export function getStatusDotColor(params: BuildBadgeStylesParams): string {
  const { badgeConfig, variant, badgeType, isDisabled, isGhost } = params;
  if (isGhost) return 'transparent';
  if (isDisabled) return badgeConfig.states?.disabled?.textColor || '#cdcbcb';
  const vc = badgeConfig.types?.[badgeType]?.[variant]
    || badgeConfig.variants?.[variant]
    || {};
  return vc.textColor || '#2b2b2b';
}
