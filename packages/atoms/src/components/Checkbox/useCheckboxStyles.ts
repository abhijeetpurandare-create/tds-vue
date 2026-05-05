import { css } from '@emotion/css';

// Theme config interfaces
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

export type TarmacCheckboxVariant = 'standard' | 'blue' | 'green' | 'dlv_red';
export type TarmacCheckboxStyle = 'box' | 'rounded';
export type TarmacCheckboxSize = 'sm' | 'md' | 'lg';

export interface BuildCheckboxStylesParams {
  config: CheckboxTarmacConfig;
  variant: TarmacCheckboxVariant;
  checkboxStyle: TarmacCheckboxStyle;
  size: TarmacCheckboxSize;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
}

function getVariantConfig(config: CheckboxTarmacConfig, variant: TarmacCheckboxVariant): VariantConfig {
  return config.variants?.[variant] || {};
}

function getSizeConfig(config: CheckboxTarmacConfig, size: TarmacCheckboxSize): SizeConfig {
  return config.sizes?.[size] || {};
}

export function buildCheckboxBoxStyles(params: BuildCheckboxStylesParams): string {
  const { config, variant, checkboxStyle, size, checked, indeterminate, disabled } = params;
  const vc = getVariantConfig(config, variant);
  const sc = getSizeConfig(config, size);
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

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    width: boxSize,
    height: boxSize,
    minWidth: boxSize,
    minHeight: boxSize,
    borderWidth,
    borderStyle: 'solid',
    borderColor: disabled
      ? (dis.borderColor || '#ededed')
      : isActive
        ? (vc.checkedBorderColor || vc.checkedBackgroundColor || '#000')
        : (vc.borderColor || '#e6e6e6'),
    borderRadius,
    backgroundColor: disabled && isActive
      ? (dis.borderColor || '#ededed')
      : isActive
        ? (vc.checkedBackgroundColor || '#000')
        : (vc.backgroundColor || '#fff'),
    transition: base.transition || 'all 0.15s ease-in-out',
    cursor: disabled ? 'default' : 'pointer',
    position: 'relative',
    flexShrink: 0,

    '&:hover': !disabled ? {
      borderColor: isActive
        ? (vc.checkedHoverBorderColor || vc.checkedBorderColor || '#000')
        : (vc.hoverBorderColor || '#ccc'),
      backgroundColor: isActive
        ? (vc.checkedHoverBackgroundColor || vc.checkedBackgroundColor || '#000')
        : (vc.hoverBackgroundColor || vc.backgroundColor || '#fff'),
    } : {},

    '&:focus': {
      outline: 'none',
      boxShadow: disabled ? 'none' : `0 0 0 2px ${vc.focusRingColor || 'rgba(0,0,0,0.4)'}`,
    },
  });
}

export function buildCheckmarkStyles(params: BuildCheckboxStylesParams): string {
  const { config, variant, size, checked, indeterminate, disabled } = params;
  const vc = getVariantConfig(config, variant);
  const sc = getSizeConfig(config, size);
  const dis = config.states?.disabled || {};
  const color = disabled
    ? (dis.checkmarkColor || '#cdcbcb')
    : (vc.checkmarkColor || '#e6e6e6');

  if (checked) {
    return css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color: color,
      '& svg': {
        width: sc.checkmarkWidth || '10px',
        height: sc.checkmarkHeight || '8px',
      },
    });
  }

  if (indeterminate) {
    return css({
      width: sc.dashWidth || '8px',
      height: sc.dashHeight || '2px',
      backgroundColor: color,
      borderRadius: '1px',
    });
  }

  return css({ display: 'none' });
}

export function buildWrapperStyles(params: BuildCheckboxStylesParams & { hasLabel: boolean }): string {
  const { config, size, disabled, hasLabel } = params;
  const sc = getSizeConfig(config, size);

  return css({
    display: 'inline-flex',
    alignItems: hasLabel ? 'flex-start' : 'center',
    gap: sc.gap || '6px',
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none',
    ...(disabled && { pointerEvents: 'none' as const }),
  });
}

export function buildLabelStyles(config: CheckboxTarmacConfig, size: TarmacCheckboxSize, disabled: boolean): string {
  const sc = getSizeConfig(config, size);
  const base = config.base || {};
  const dis = config.states?.disabled || {};

  return css({
    fontFamily: base.label?.fontFamily || 'Noto Sans, sans-serif',
    fontSize: sc.labelFontSize || '14px',
    lineHeight: sc.labelLineHeight || '20px',
    fontWeight: 500,
    color: disabled ? (dis.labelColor || '#cdcbcb') : (base.label?.color || '#2b2b2b'),
  });
}

export function buildSubtextStyles(config: CheckboxTarmacConfig, size: TarmacCheckboxSize, disabled: boolean): string {
  const sc = getSizeConfig(config, size);
  const base = config.base || {};
  const dis = config.states?.disabled || {};

  return css({
    fontFamily: base.subtext?.fontFamily || 'Noto Sans, sans-serif',
    fontSize: sc.subtextFontSize || '12px',
    lineHeight: sc.subtextLineHeight || '16px',
    fontWeight: 400,
    color: disabled ? (dis.subtextColor || '#cdcbcb') : (base.subtext?.color || '#454545'),
  });
}
