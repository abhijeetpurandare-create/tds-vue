/**
 * Chip Style Builder — Web Component Edition
 *
 * Direct port of packages/atoms/src/components/Chip/useChipStyles.ts.
 */

export type ChipType = 'black' | 'white' | 'coal' | 'blue' | 'success' | 'error' | 'warning' | 'legacy_blue' | 'dlv_red';
export type ChipVariant = 'standard' | 'outlined';
export type ChipSize = 'sm' | 'md' | 'lg';

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

export interface ChipConfig {
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

export interface BuildChipStylesParams {
  chipConfig: ChipConfig;
  chipType: string;
  chipVariant: ChipVariant;
  size: ChipSize;
  isDisabled: boolean;
  isGhost: boolean;
}

function getVC(cfg: ChipConfig, chipVariant: ChipVariant, chipType: string): VariantConfig {
  return cfg.variants?.[chipVariant]?.[chipType] || {};
}

function getDS(cfg: ChipConfig, chipVariant: ChipVariant) {
  if (chipVariant === 'outlined' && cfg.states.disabledOutlined) return cfg.states.disabledOutlined;
  return cfg.states.disabled || {};
}

export function buildChipCSS(params: BuildChipStylesParams): string {
  const { chipConfig, chipType, chipVariant, size, isDisabled, isGhost } = params;
  const sc = chipConfig.sizes[size] || {};
  const baseFontFamily = chipConfig.base.fontFamily || 'sans-serif';
  const baseFontWeight = Number(chipConfig.base.fontWeight || 500);
  const baseBorderRadius = chipConfig.base.borderRadius || '8px';
  const baseTransition = chipConfig.base.transition || 'all 0.15s ease-in-out';
  const iconSize = sc.iconSize || '12px';

  let bgColor: string, textColor: string, borderWidth: string, borderColor: string;
  let extraStyles = '';
  let hoverCSS = '';
  let activeCSS = '';
  let focusCSS = '';

  if (isGhost) {
    const gs = chipConfig.states.ghost || {};
    bgColor = gs.backgroundColor || '#e6e6e6';
    textColor = gs.textColor || 'transparent';
    borderWidth = '0.5px';
    borderColor = gs.borderColor || 'transparent';
    extraStyles = 'cursor: default; pointer-events: none;';
  } else if (isDisabled) {
    const ds = getDS(chipConfig, chipVariant);
    bgColor = ds.backgroundColor || '#e6e6e6';
    textColor = ds.textColor || '#cdcbcb';
    borderWidth = '0.5px';
    borderColor = ds.borderColor || 'transparent';
    extraStyles = 'cursor: default;';
  } else {
    const vc = getVC(chipConfig, chipVariant, chipType);
    const isOutlined = chipVariant === 'outlined';
    const hasBorder = isOutlined || Boolean(vc.borderColor);
    bgColor = vc.backgroundColor || '#e6e6e6';
    textColor = vc.textColor || '#2b2b2b';
    borderWidth = hasBorder ? '0.5px' : '0';
    borderColor = vc.borderColor || 'transparent';

    const hoverBg = vc.hoverColor || vc.backgroundColor || '#d6d6d6';
    const hoverText = vc.hoverTextColor || vc.textColor || '#2b2b2b';
    const hoverBorderVal = hasBorder && vc.hoverBorderColor ? `border-color: ${vc.hoverBorderColor};` : '';
    hoverCSS = `
      .tarmac-chip:hover {
        cursor: pointer;
        background-color: ${hoverBg};
        color: ${hoverText};
        ${hoverBorderVal}
      }
    `;

    const pressedBg = vc.pressedColor || vc.hoverColor || vc.backgroundColor || '#cccccc';
    const pressedText = vc.pressedTextColor || vc.hoverTextColor || vc.textColor || '#2b2b2b';
    activeCSS = `
      .tarmac-chip:active {
        background-color: ${pressedBg};
        color: ${pressedText};
      }
    `;

    const focusRing = vc.focusRingColor
      ? `0 0 0 2px ${vc.focusRingColor}`
      : (chipConfig.base.focus?.ring || '0 0 0 2px rgba(0, 0, 0, 0.4)');
    focusCSS = `
      .tarmac-chip:focus {
        box-shadow: ${focusRing};
        outline: none;
      }
    `;
  }

  return `
    :host { display: inline-block; }

    .tarmac-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${baseFontFamily};
      font-weight: ${baseFontWeight};
      border-radius: ${baseBorderRadius};
      transition: ${baseTransition};
      padding: ${sc.padding || '8px'};
      font-size: ${sc.fontSize || '12px'};
      line-height: ${sc.lineHeight || '16px'};
      gap: ${sc.gap || '4px'};
      user-select: none;
      cursor: pointer;
      outline: none;
      background-color: ${bgColor};
      color: ${textColor};
      border-width: ${borderWidth};
      border-style: solid;
      border-color: ${borderColor};
      ${extraStyles}
    }

    ${hoverCSS}
    ${activeCSS}
    ${focusCSS}

    .chip-icon {
      width: ${iconSize};
      height: ${iconSize};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .chip-icon ::slotted(svg), .chip-icon svg {
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

export function getChipStatusColor(params: BuildChipStylesParams): string {
  const { chipConfig, chipType, chipVariant, isDisabled, isGhost } = params;
  if (isGhost) return 'transparent';
  if (isDisabled) return chipConfig?.states?.disabled?.textColor || '#cdcbcb';
  return chipConfig?.variants?.[chipVariant]?.[chipType]?.textColor || '#2b2b2b';
}
