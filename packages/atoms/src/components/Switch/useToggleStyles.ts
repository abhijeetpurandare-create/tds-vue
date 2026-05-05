import { css } from '@emotion/css';

// Theme config interfaces
interface FilledVariantConfig {
  uncheckedBackgroundColor?: string;
  checkedBackgroundColor?: string;
  hoverUncheckedBackgroundColor?: string;
  hoverCheckedBackgroundColor?: string;
  pressedUncheckedBackgroundColor?: string;
  pressedCheckedBackgroundColor?: string;
  focusRingColor?: string;
}

interface OutlinedVariantConfig {
  uncheckedBorderColor?: string;
  checkedBorderColor?: string;
  uncheckedBackgroundColor?: string;
  checkedBackgroundColor?: string;
  handleUncheckedColor?: string;
  handleCheckedColor?: string;
  hoverUncheckedBorderColor?: string;
  hoverCheckedBorderColor?: string;
  pressedUncheckedBorderColor?: string;
  pressedCheckedBorderColor?: string;
  focusRingColor?: string;
}

interface SizeConfig {
  trackWidth?: string;
  trackHeight?: string;
  handleSize?: string;
  handleOffset?: string;
  borderWidth?: string;
}

interface DisabledConfig {
  uncheckedBackgroundColor?: string;
  checkedBackgroundColor?: string;
  handleColor?: string;
  borderColor?: string;
}

interface GhostConfig {
  backgroundColor?: string;
  handleColor?: string;
  borderColor?: string;
}

interface BaseConfig {
  transition?: string;
  radius?: string;
  handleColor?: string;
}

export interface ToggleTarmacConfig {
  base?: BaseConfig;
  styles?: {
    filled?: Record<string, FilledVariantConfig>;
    outlined?: Record<string, OutlinedVariantConfig>;
  };
  sizes?: Record<string, SizeConfig>;
  states?: { disabled?: DisabledConfig; ghost?: GhostConfig };
}

export type TarmacToggleColor = 'black' | 'blue' | 'dlv_red' | 'green' | (string & {});
export type TarmacToggleStyle = 'filled' | 'outlined' | (string & {});
export type TarmacToggleSize = 'lg' | 'sm' | (string & {});

export interface BuildToggleStylesParams {
  config: ToggleTarmacConfig;
  color: string;
  toggleStyle: string;
  size: string;
  checked: boolean;
  disabled: boolean;
  isGhost: boolean;
}

function getSizeConfig(config: ToggleTarmacConfig, size: string): SizeConfig {
  return config.sizes?.[size] || {};
}

export function buildToggleTrackStyles(params: BuildToggleStylesParams): string {
  const { config, color, toggleStyle, size, checked, disabled, isGhost } = params;
  const sc = getSizeConfig(config, size);
  const base = config.base || {};
  const dis = config.states?.disabled || {};
  const ghost = config.states?.ghost || {};
  const isFilled = toggleStyle === 'filled';

  const trackW = sc.trackWidth || '40px';
  const trackH = sc.trackHeight || '24px';
  const borderWidth = sc.borderWidth || '1px';
  const radius = base.radius || '999px';
  const offset = sc.handleOffset || '4px';
  const transition = base.transition || 'all 0.15s ease-in-out';

  if (isGhost) {
    return css({
      position: 'relative',
      display: 'inline-flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: trackW,
      height: trackH,
      borderRadius: radius,
      backgroundColor: ghost.backgroundColor || '#dedede',
      border: `1px solid ${ghost.borderColor || '#e6e6e6'}`,
      cursor: 'default',
      transition,
      padding: offset,
      boxSizing: 'border-box',
      pointerEvents: 'none',
    });
  }

  if (disabled) {
    const bg = dis.checkedBackgroundColor || '#e6e6e6';
    return css({
      position: 'relative',
      display: 'inline-flex',
      justifyContent: checked ? 'flex-end' : 'flex-start',
      alignItems: 'center',
      width: trackW,
      height: trackH,
      borderRadius: radius,
      backgroundColor: bg,
      border: isFilled ? 'none' : `${borderWidth} solid ${dis.borderColor || '#ededed'}`,
      cursor: 'default',
      transition,
      padding: offset,
      boxSizing: 'border-box',
    });
  }

  if (isFilled) {
    const vc = (config.styles?.filled?.[color] || {}) as FilledVariantConfig;
    const bg = checked
      ? (vc.checkedBackgroundColor || '#000')
      : (vc.uncheckedBackgroundColor || '#666');
    const hoverBg = checked
      ? (vc.hoverCheckedBackgroundColor || bg)
      : (vc.hoverUncheckedBackgroundColor || bg);
    const pressedBg = checked
      ? (vc.pressedCheckedBackgroundColor || bg)
      : (vc.pressedUncheckedBackgroundColor || bg);

    return css({
      position: 'relative',
      display: 'inline-flex',
      justifyContent: checked ? 'flex-end' : 'flex-start',
      alignItems: 'center',
      width: trackW,
      height: trackH,
      borderRadius: radius,
      backgroundColor: bg,
      border: 'none',
      cursor: 'pointer',
      transition,
      padding: offset,
      boxSizing: 'border-box',
      '&:hover': { backgroundColor: hoverBg },
      '&:active': { backgroundColor: pressedBg },
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${vc.focusRingColor || 'rgba(0,0,0,0.4)'}`,
      },
    });
  }

  // Outlined
  const vc = (config.styles?.outlined?.[color] || {}) as OutlinedVariantConfig;
  const bg = checked
    ? (vc.checkedBackgroundColor || 'transparent')
    : (vc.uncheckedBackgroundColor || 'transparent');
  const border = checked
    ? (vc.checkedBorderColor || '#454545')
    : (vc.uncheckedBorderColor || '#e6e6e6');
  const hoverBorder = checked
    ? (vc.hoverCheckedBorderColor || border)
    : (vc.hoverUncheckedBorderColor || border);
  const pressedBorder = checked
    ? (vc.pressedCheckedBorderColor || border)
    : (vc.pressedUncheckedBorderColor || border);

  return css({
    position: 'relative',
    display: 'inline-flex',
    justifyContent: checked ? 'flex-end' : 'flex-start',
    alignItems: 'center',
    width: trackW,
    height: trackH,
    borderRadius: radius,
    backgroundColor: bg,
    border: `${borderWidth} solid ${border}`,
    cursor: 'pointer',
    transition,
    padding: offset,
    boxSizing: 'border-box',
    '&:hover': { borderColor: hoverBorder },
    '&:active': { borderColor: pressedBorder },
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${vc.focusRingColor || 'rgba(0,0,0,0.4)'}`,
    },
  });
}

export function buildToggleHandleStyles(params: BuildToggleStylesParams): string {
  const { config, color, toggleStyle, checked, disabled, isGhost } = params;
  const base = config.base || {};
  const dis = config.states?.disabled || {};
  const ghost = config.states?.ghost || {};
  const isFilled = toggleStyle === 'filled';
  const sc = getSizeConfig(config, params.size);
  const handleSize = sc.handleSize || '16px';

  let handleColor: string;
  if (isGhost) {
    handleColor = ghost.handleColor || '#d4d4d4';
  } else if (disabled) {
    handleColor = dis.handleColor || '#f7f7f7';
  } else if (isFilled) {
    handleColor = base.handleColor || '#fff';
  } else {
    const vc = (config.styles?.outlined?.[color] || {}) as OutlinedVariantConfig;
    handleColor = checked
      ? (vc.handleCheckedColor || '#000')
      : (vc.handleUncheckedColor || '#666');
  }

  return css({
    width: handleSize,
    height: handleSize,
    borderRadius: '50%',
    backgroundColor: handleColor,
    transition: base.transition || 'all 0.15s ease-in-out',
    pointerEvents: 'none',
    flexShrink: 0,
  });
}
