import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}

export interface SliderVariantConfig {
  fillColor?: string;
  knobInnerColor?: string;
}

export interface SliderSizeConfig {
  trackHeight?: string;
  knobOuterSize?: string;
  knobInnerSize?: string;
  knobPadding?: string;
  containerPaddingX?: string;
  containerPaddingY?: string;
}

export interface SliderKnobStateConfig {
  backgroundColor?: string;
  shadow?: string;
}

export interface SliderStateConfig {
  knobDefault?: SliderKnobStateConfig;
  knobHover?: SliderKnobStateConfig;
  knobFocused?: SliderKnobStateConfig;
  knobDisabled?: SliderKnobStateConfig;
}

export interface SliderThemeConfig {
  base?: {
    trackRadius?: string;
    knobRadius?: string;
    trackBackgroundColor?: string;
    transition?: string;
    focusRingColor?: string;
    focusRingSpread?: string;
  };
  variants?: Record<string, SliderVariantConfig>;
  sizes?: Record<string, SliderSizeConfig>;
  states?: SliderStateConfig;
}

export interface BuildSliderStylesParams {
  config: SliderThemeConfig;
  variant: string;
  size: string;
  isDisabled: boolean;
}

export function buildContainerStyles(params: BuildSliderStylesParams): string {
  const { config, size } = params;
  const sc = config.sizes?.[size];
  const px = dim(sc?.containerPaddingX, '8px');
  const py = dim(sc?.containerPaddingY, '12px');

  return css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${py} ${px}`,
    width: '100%',
    userSelect: 'none',
    touchAction: 'none',
  });
}

export function buildTrackStyles(params: BuildSliderStylesParams): string {
  const { config, size } = params;
  const sc = config.sizes?.[size];
  const trackHeight = dim(sc?.trackHeight, size === 'lg' ? '8px' : '6px');
  const trackBg = config.base?.trackBackgroundColor || '#ededed';
  const radius = dim(config.base?.trackRadius, '8px');

  return css({
    position: 'relative',
    width: '100%',
    height: trackHeight,
    backgroundColor: trackBg,
    borderRadius: radius,
    overflow: 'visible',
    cursor: 'pointer',
  });
}

export function buildFillStyles(params: BuildSliderStylesParams): string {
  const { config, variant, size, isDisabled } = params;
  const sc = config.sizes?.[size];
  const vc = config.variants?.[variant];
  const trackHeight = dim(sc?.trackHeight, size === 'lg' ? '8px' : '6px');
  const fillColor = isDisabled
    ? (config.base?.trackBackgroundColor || '#ededed')
    : (vc?.fillColor || '#000000');
  const radius = dim(config.base?.trackRadius, '8px');

  return css({
    position: 'absolute',
    top: 0,
    height: trackHeight,
    backgroundColor: fillColor,
    borderRadius: radius,
    transition: config.base?.transition || 'none',
    pointerEvents: 'none',
  });
}


export function buildKnobStyles(
  params: BuildSliderStylesParams,
  isFocused: boolean,
  isHovered: boolean,
): string {
  const { config, variant, size, isDisabled } = params;
  const sc = config.sizes?.[size];
  const vc = config.variants?.[variant];
  const states = config.states;

  const outerSize = dim(sc?.knobOuterSize, size === 'lg' ? '24px' : '20px');
  const innerSize = dim(sc?.knobInnerSize, size === 'lg' ? '16px' : '12px');
  const padding = dim(sc?.knobPadding, '4px');
  const knobRadius = dim(config.base?.knobRadius, '999px');

  let bgColor: string;
  let shadow: string;

  if (isDisabled) {
    bgColor = states?.knobDisabled?.backgroundColor || '#ffffff';
    shadow = states?.knobDisabled?.shadow || 'none';
  } else if (isFocused) {
    bgColor = states?.knobFocused?.backgroundColor || '#f2f2f2';
    shadow = states?.knobFocused?.shadow || `0 0 0 2px ${config.base?.focusRingColor || 'rgba(0,0,0,0.4)'}`;
  } else if (isHovered) {
    bgColor = states?.knobHover?.backgroundColor || '#ededed';
    shadow = states?.knobHover?.shadow || `0 0 6px 0 rgba(0,0,0,0.2)`;
  } else {
    bgColor = states?.knobDefault?.backgroundColor || '#f2f2f2';
    shadow = states?.knobDefault?.shadow || `0 0 6px 0 rgba(0,0,0,0.2)`;
  }

  const innerColor = isDisabled
    ? (config.base?.trackBackgroundColor || '#d4d4d4')
    : (vc?.knobInnerColor || '#000000');

  return css({
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: outerSize,
    height: outerSize,
    padding,
    borderRadius: knobRadius,
    backgroundColor: bgColor,
    boxShadow: shadow,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: isDisabled ? 'default' : 'pointer',
    zIndex: 2,
    outline: 'none',
    transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
    '&:hover': isDisabled
      ? {}
      : {
          backgroundColor: states?.knobHover?.backgroundColor || '#ededed',
          boxShadow: states?.knobHover?.shadow || '0 0 6px 0 rgba(0,0,0,0.2)',
          cursor: 'pointer',
        },
    '&:active': {
      cursor: isDisabled ? 'default' : 'grabbing',
    },
    '& > span': {
      display: 'block',
      width: innerSize,
      height: innerSize,
      borderRadius: '50%',
      backgroundColor: innerColor,
      pointerEvents: 'none',
    },
  });
}
