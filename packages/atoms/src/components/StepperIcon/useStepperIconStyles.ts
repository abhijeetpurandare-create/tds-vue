import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

export type StepperIconStyle = 'black' | 'coal' | 'dlv_red' | 'blue' | 'green' | 'numeric' | 'icon' | (string & {});
export type StepperIconVariant = 'solid' | 'outlined' | 'focused' | 'disabled' | 'ghost' | (string & {});
export type StepperIconSize = 'sm' | 'md' | 'lg';

interface SizeConfig {
  outerSize?: string | number;
  innerDotSolid?: string | number;
  innerDotOutlined?: string | number;
  iconContainerSize?: string | number;
  fontSize?: string | number;
  lineHeight?: string | number;
  fontFamily?: string;
  borderWidthDefault?: string | number;
  borderWidthFocused?: string | number;
}

interface StyleConfig {
  innerColor?: string;
  innerColorDisabled?: string;
  borderColor?: string;
  borderColorDisabled?: string;
  textColor?: string;
  textColorDisabled?: string;
  iconColor?: string;
  iconColorDisabled?: string;
  outerBgDisabled?: string;
}

interface OuterBgConfig {
  default?: string;
  ghost?: string;
  ghostNumericIcon?: string;
  disabled_numeric_icon?: string;
}

interface BaseConfig {
  borderRadius?: string | number;
  shadowSolid?: string;
  shadowDisabled?: string;
  shadowGhost?: string;
}

export interface StepperIconConfig {
  base?: BaseConfig;
  outerBg?: OuterBgConfig;
  sizes?: Record<string, SizeConfig>;
  styles?: Record<string, StyleConfig>;
}

export interface BuildStepperIconStylesParams {
  config: StepperIconConfig;
  stepperStyle: StepperIconStyle;
  variant: StepperIconVariant;
  size: StepperIconSize;
}

export function buildOuterStyles(params: BuildStepperIconStylesParams): string {
  const { config, stepperStyle, variant, size } = params;
  const sc = config.sizes?.[size] || {};
  const base = config.base || {};
  const outerBg = config.outerBg || {};
  const styleCfg = config.styles?.[stepperStyle] || {};

  const outerSize = dim(sc.outerSize, '28px');
  const borderRadius = dim(base.borderRadius, '999px');
  const isNumericOrIcon = stepperStyle === 'numeric' || stepperStyle === 'icon';

  if (variant === 'ghost') {
    const ghostBg = isNumericOrIcon
      ? (outerBg.ghostNumericIcon || '#f2f2f2')
      : (outerBg.ghost || '#ededed');
    const shadow = isNumericOrIcon ? (base.shadowGhost || 'none') : 'none';
    return css({
      width: outerSize,
      height: outerSize,
      borderRadius,
      backgroundColor: ghostBg,
      overflow: 'hidden',
      boxShadow: shadow,
      flexShrink: 0,
    });
  }

  if (variant === 'disabled') {
    const disabledBg = isNumericOrIcon
      ? (styleCfg.outerBgDisabled || outerBg.disabled_numeric_icon || '#ffffff')
      : (outerBg.default || '#f7f7f7');
    const borderColor = isNumericOrIcon
      ? (styleCfg.borderColorDisabled || '#ededed')
      : undefined;
    const borderWidth = isNumericOrIcon ? dim(sc.borderWidthDefault, '1px') : undefined;
    return css({
      width: outerSize,
      height: outerSize,
      borderRadius,
      backgroundColor: disabledBg,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      flexShrink: 0,
      boxShadow: base.shadowDisabled || 'none',
      ...(borderColor ? {
        borderWidth,
        borderStyle: 'solid',
        borderColor,
      } : {}),
    });
  }

  // solid, outlined, focused
  const bg = outerBg.default || '#f7f7f7';
  const shadow = base.shadowSolid || 'none';
  const hasBorder = variant === 'outlined' || variant === 'focused';
  const borderWidth = variant === 'focused'
    ? dim(sc.borderWidthFocused, '1px')
    : dim(sc.borderWidthDefault, '1px');
  const borderColor = styleCfg.borderColor || '#2b2b2b';

  return css({
    width: outerSize,
    height: outerSize,
    borderRadius,
    backgroundColor: bg,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0,
    boxShadow: shadow,
    ...(hasBorder ? {
      borderWidth,
      borderStyle: 'solid',
      borderColor,
    } : {}),
  });
}

export function buildInnerDotStyles(params: BuildStepperIconStylesParams): string {
  const { config, stepperStyle, variant, size } = params;
  const sc = config.sizes?.[size] || {};
  const styleCfg = config.styles?.[stepperStyle] || {};
  const borderRadius = dim(config.base?.borderRadius, '999px');

  const isOutlined = variant === 'outlined';
  const dotSize = dim(isOutlined ? sc.innerDotOutlined : sc.innerDotSolid, '16px');
  const color = variant === 'disabled'
    ? (styleCfg.innerColorDisabled || '#bfbfbf')
    : (styleCfg.innerColor || '#000000');

  return css({
    width: dotSize,
    height: dotSize,
    borderRadius,
    backgroundColor: color,
    flexShrink: 0,
  });
}

export function buildNumericTextStyles(params: BuildStepperIconStylesParams): string {
  const { config, stepperStyle, variant, size } = params;
  const sc = config.sizes?.[size] || {};
  const styleCfg = config.styles?.[stepperStyle] || {};

  const color = variant === 'disabled'
    ? (styleCfg.textColorDisabled || '#cdcbcb')
    : (styleCfg.textColor || '#2b2b2b');

  return css({
    fontFamily: sc.fontFamily || 'sans-serif',
    fontSize: dim(sc.fontSize, '14px'),
    lineHeight: dim(sc.lineHeight, '20px'),
    fontWeight: 700,
    color,
    flexShrink: 0,
    position: 'relative',
  });
}

export function buildIconContainerStyles(params: BuildStepperIconStylesParams): string {
  const { config, size } = params;
  const sc = config.sizes?.[size] || {};
  const iconSize = dim(sc.iconContainerSize, '16px');
  return css({
    width: iconSize,
    height: iconSize,
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });
}
