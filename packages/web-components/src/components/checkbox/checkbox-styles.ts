/**
 * Checkbox Style Builder — Web Component Edition
 *
 * Direct port of packages/atoms/src/components/Checkbox/useCheckboxStyles.ts.
 */

export type TarmacCheckboxVariant = 'standard' | 'blue' | 'green' | 'dlv_red';
export type TarmacCheckboxStyle = 'box' | 'rounded';
export type TarmacCheckboxSize = 'sm' | 'md' | 'lg';

interface VariantConfig {
  borderColor?: string;
  backgroundColor?: string;
  hoverBorderColor?: string;
  hoverBackgroundColor?: string;
  checkedBackgroundColor?: string;
  checkedBorderColor?: string;
  checkedHoverBackgroundColor?: string;
  checkedHoverBorderColor?: string;
  checkmarkColor?: string;
  focusRingColor?: string;
}

interface SizeConfig {
  boxSize?: string;
  checkmarkWidth?: string;
  checkmarkHeight?: string;
  dashWidth?: string;
  dashHeight?: string;
  borderWidth?: string;
  checkedBorderWidth?: string;
  labelFontSize?: string;
  labelLineHeight?: string;
  subtextFontSize?: string;
  subtextLineHeight?: string;
  gap?: string;
}

interface DisabledConfig {
  borderColor?: string;
  backgroundColor?: string;
  checkmarkColor?: string;
  labelColor?: string;
  subtextColor?: string;
}

interface BaseConfig {
  transition?: string;
  borderWidth?: string;
  radius?: { box?: string; rounded?: string };
  focus?: { outline?: string; ring?: string };
  label?: { fontFamily?: string; color?: string };
  subtext?: { fontFamily?: string; color?: string };
}

export interface CheckboxTarmacConfig {
  base?: BaseConfig;
  variants?: Record<string, VariantConfig>;
  sizes?: Record<string, SizeConfig>;
  states?: { disabled?: DisabledConfig };
}

export interface BuildCheckboxParams {
  config: CheckboxTarmacConfig;
  variant: TarmacCheckboxVariant;
  checkboxStyle: TarmacCheckboxStyle;
  size: TarmacCheckboxSize;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  hasLabel: boolean;
  hasSubtext: boolean;
}

function getVC(config: CheckboxTarmacConfig, variant: string): VariantConfig {
  return config.variants?.[variant] || {};
}

function getSC(config: CheckboxTarmacConfig, size: string): SizeConfig {
  return config.sizes?.[size] || {};
}

export function buildCheckboxCSS(params: BuildCheckboxParams): string {
  const { config, variant, checkboxStyle, size, checked, indeterminate, disabled, hasLabel, hasSubtext } = params;
  const vc = getVC(config, variant);
  const sc = getSC(config, size);
  const base = config.base || {};
  const dis = config.states?.disabled || {};
  const isActive = checked || indeterminate;

  const borderRadius = checkboxStyle === 'rounded'
    ? (base.radius?.rounded || '999px')
    : (base.radius?.box || '2px');
  const boxSize = sc.boxSize || '20px';
  const defaultBorderWidth = sc.borderWidth || base.borderWidth || '1px';
  const activeBorderWidth = sc.checkedBorderWidth || defaultBorderWidth;
  const borderWidth = isActive ? activeBorderWidth : defaultBorderWidth;

  // Box colors
  const boxBorderColor = disabled
    ? (dis.borderColor || '#ededed')
    : isActive
      ? (vc.checkedBorderColor || vc.checkedBackgroundColor || '#000')
      : (vc.borderColor || '#e6e6e6');
  const boxBgColor = disabled && isActive
    ? (dis.borderColor || '#ededed')
    : isActive
      ? (vc.checkedBackgroundColor || '#000')
      : (vc.backgroundColor || '#fff');

  // Hover
  const hoverBorderColor = isActive
    ? (vc.checkedHoverBorderColor || vc.checkedBorderColor || '#000')
    : (vc.hoverBorderColor || '#ccc');
  const hoverBgColor = isActive
    ? (vc.checkedHoverBackgroundColor || vc.checkedBackgroundColor || '#000')
    : (vc.hoverBackgroundColor || vc.backgroundColor || '#fff');

  // Checkmark
  const checkmarkColor = disabled
    ? (dis.checkmarkColor || '#cdcbcb')
    : (vc.checkmarkColor || '#e6e6e6');
  const checkmarkW = sc.checkmarkWidth || '10px';
  const checkmarkH = sc.checkmarkHeight || '8px';
  const dashW = sc.dashWidth || '8px';
  const dashH = sc.dashHeight || '2px';

  // Label
  const labelFontFamily = base.label?.fontFamily || 'Noto Sans, sans-serif';
  const labelColor = disabled ? (dis.labelColor || '#cdcbcb') : (base.label?.color || '#2b2b2b');
  const subtextFontFamily = base.subtext?.fontFamily || 'Noto Sans, sans-serif';
  const subtextColor = disabled ? (dis.subtextColor || '#cdcbcb') : (base.subtext?.color || '#454545');

  const focusRing = vc.focusRingColor || 'rgba(0,0,0,0.4)';

  return `
    :host { display: inline-block; }

    .cb-wrapper {
      display: inline-flex;
      align-items: ${hasLabel ? 'flex-start' : 'center'};
      gap: ${sc.gap || '6px'};
      cursor: ${disabled ? 'default' : 'pointer'};
      user-select: none;
      ${disabled ? 'pointer-events: none;' : ''}
    }

    .cb-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .cb-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: ${boxSize};
      height: ${boxSize};
      min-width: ${boxSize};
      min-height: ${boxSize};
      border-width: ${borderWidth};
      border-style: solid;
      border-color: ${boxBorderColor};
      border-radius: ${borderRadius};
      background-color: ${boxBgColor};
      transition: ${base.transition || 'all 0.15s ease-in-out'};
      cursor: ${disabled ? 'default' : 'pointer'};
      position: relative;
      flex-shrink: 0;
    }

    ${!disabled ? `
    .cb-wrapper:hover .cb-box {
      border-color: ${hoverBorderColor};
      background-color: ${hoverBgColor};
    }
    ` : ''}

    .cb-box:focus-within {
      outline: none;
      box-shadow: ${disabled ? 'none' : `0 0 0 2px ${focusRing}`};
    }

    /* Checkmark (checked state) */
    .cb-checkmark {
      display: ${checked ? 'flex' : 'none'};
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: ${checkmarkColor};
    }
    .cb-checkmark svg {
      width: ${checkmarkW};
      height: ${checkmarkH};
    }

    /* Dash (indeterminate state) */
    .cb-dash {
      display: ${indeterminate && !checked ? 'block' : 'none'};
      width: ${dashW};
      height: ${dashH};
      background-color: ${checkmarkColor};
      border-radius: 1px;
    }

    /* Label */
    .cb-label-col {
      display: flex;
      flex-direction: column;
    }

    .cb-label {
      font-family: ${labelFontFamily};
      font-size: ${sc.labelFontSize || '14px'};
      line-height: ${sc.labelLineHeight || '20px'};
      font-weight: 500;
      color: ${labelColor};
    }

    .cb-subtext {
      font-family: ${subtextFontFamily};
      font-size: ${sc.subtextFontSize || '12px'};
      line-height: ${sc.subtextLineHeight || '16px'};
      font-weight: 400;
      color: ${subtextColor};
    }
  `;
}
