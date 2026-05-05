import { css } from '@emotion/css';

interface VariantConfig {
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: string;
  hoverBorderColor?: string;
  hoverBackgroundColor?: string;
  hoverBorderWidth?: string;
  checkedBorderColor?: string;
  checkedBackgroundColor?: string;
  checkedBorderWidth?: string;
  checkedHoverBorderColor?: string;
  checkedHoverBackgroundColor?: string;
  dotColor?: string;
  focusRingColor?: string;
}

interface SizeConfig {
  radioSize?: string;
  dotSize?: string;
  hoverBorderWidth?: string;
  labelFontSize?: string;
  labelLineHeight?: string;
  subtextFontSize?: string;
  subtextLineHeight?: string;
  gap?: string;
}

interface DisabledConfig {
  borderColor?: string;
  backgroundColor?: string;
  dotColor?: string;
  labelColor?: string;
  subtextColor?: string;
}

interface BaseConfig {
  transition?: string;
  borderWidth?: string;
  radius?: string;
  label?: { fontFamily?: string; color?: string };
  subtext?: { fontFamily?: string; color?: string };
}

export interface RadioTarmacConfig {
  base?: BaseConfig;
  variants?: Record<string, VariantConfig>;
  sizes?: Record<string, SizeConfig>;
  states?: { disabled?: DisabledConfig };
  styles?: {
    filled?: Record<string, VariantConfig>;
    outlined?: Record<string, VariantConfig>;
  };
}

export type TarmacRadioVariant = 'standard' | 'blue' | 'green' | 'dlv_red';
export type TarmacRadioStyle = 'filled' | 'outlined';
export type TarmacRadioSize = 'sm' | 'md' | 'lg';

export interface BuildRadioStylesParams {
  config: RadioTarmacConfig;
  variant: TarmacRadioVariant;
  radioStyle: TarmacRadioStyle;
  size: TarmacRadioSize;
  checked: boolean;
  disabled: boolean;
}

function getVariantConfig(
  config: RadioTarmacConfig,
  radioStyle: TarmacRadioStyle,
  variant: TarmacRadioVariant
): VariantConfig {
  return config.styles?.[radioStyle]?.[variant] || config.variants?.[variant] || {};
}

function getSizeConfig(config: RadioTarmacConfig, size: TarmacRadioSize): SizeConfig {
  return config.sizes?.[size] || {};
}

export function buildRadioCircleStyles(params: BuildRadioStylesParams): string {
  const { config, variant, radioStyle, size, checked, disabled } = params;
  const vc = getVariantConfig(config, radioStyle, variant);
  const sc = getSizeConfig(config, size);
  const base = config.base || {};
  const dis = config.states?.disabled || {};
  const radioSize = sc.radioSize || '20px';
  const dotSize = sc.dotSize || '8px';
  const radius = base.radius || '999px';

  const defaultBorderWidth = vc.borderWidth || base.borderWidth || '1px';
  const currentBorderWidth = disabled
    ? defaultBorderWidth
    : checked
      ? (vc.checkedBorderWidth || defaultBorderWidth)
      : defaultBorderWidth;

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    width: radioSize,
    height: radioSize,
    minWidth: radioSize,
    minHeight: radioSize,
    borderWidth: currentBorderWidth,
    borderStyle: 'solid',
    borderColor: disabled
      ? (dis.borderColor || '#ededed')
      : checked
        ? (vc.checkedBorderColor || vc.borderColor || '#cccccc')
        : (vc.borderColor || '#cccccc'),
    borderRadius: radius,
    overflow: 'hidden',
    backgroundColor: disabled
      ? (dis.backgroundColor || '#ffffff')
      : checked
        ? (vc.checkedBackgroundColor || vc.backgroundColor || 'transparent')
        : (vc.backgroundColor || 'transparent'),
    transition: base.transition || 'all 0.15s ease-in-out',
    cursor: disabled ? 'default' : 'pointer',
    position: 'relative',
    flexShrink: 0,

    '&::after': {
      content: '""',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: checked ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
      width: dotSize,
      height: dotSize,
      borderRadius: radius,
      backgroundColor: checked
        ? (disabled ? (dis.dotColor || '#cdcbcb') : (vc.dotColor || '#fff'))
        : 'transparent',
      transition: 'transform 0.15s ease-in-out',
    },

    '&:hover': !disabled ? {
      borderColor: checked
        ? (vc.checkedHoverBorderColor || vc.checkedBorderColor || vc.borderColor || '#cccccc')
        : (vc.hoverBorderColor || vc.borderColor || '#cccccc'),
      borderWidth: checked
        ? currentBorderWidth
        : (sc.hoverBorderWidth || vc.hoverBorderWidth || currentBorderWidth),
      backgroundColor: checked
        ? (vc.checkedHoverBackgroundColor || vc.checkedBackgroundColor || vc.backgroundColor || 'transparent')
        : (vc.hoverBackgroundColor || vc.backgroundColor || 'transparent'),
    } : {},

    '&:focus': {
      outline: 'none',
      boxShadow: disabled ? 'none' : `0 0 0 2px ${vc.focusRingColor || 'rgba(0,0,0,0.4)'}`,
    },
  });
}

export function buildRadioWrapperStyles(params: BuildRadioStylesParams & { hasLabel: boolean }): string {
  const { config, size, disabled, hasLabel } = params;
  const sc = getSizeConfig(config, size);

  return css({
    display: 'inline-flex',
    alignItems: hasLabel ? 'flex-start' : 'center',
    verticalAlign: 'top',
    gap: sc.gap || '6px',
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none',
  });
}

export function buildRadioLabelStyles(
  config: RadioTarmacConfig,
  size: TarmacRadioSize,
  disabled: boolean
): string {
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

export function buildRadioSubtextStyles(
  config: RadioTarmacConfig,
  size: TarmacRadioSize,
  disabled: boolean
): string {
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
