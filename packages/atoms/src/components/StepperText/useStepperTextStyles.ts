import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

export type StepperTextSize = 'sm' | 'md' | 'lg';
export type StepperTextPosition = 'horizontal' | 'vertical';
export type StepperTextState = 'default' | 'active' | 'disabled';

interface SizeConfig {
  // Title
  titleFontFamily?: string;
  titleFontSize?: string | number;
  titleLineHeight?: string | number;
  titleFontWeight?: string | number;
  // Subtext
  subtextFontFamily?: string;
  subtextFontSize?: string | number;
  subtextLineHeight?: string | number;
  subtextFontWeight?: string | number;
  // Layout
  gapHorizontal?: string | number;
  gapVertical?: string | number;
  textGap?: string | number;
  maxWidthHorizontal?: string;
  minWidthHorizontal?: string;
  maxWidthVertical?: string;
}

interface StateConfig {
  titleColor?: string;
  subtextColor?: string;
}

export interface StepperTextConfig {
  sizes?: Record<string, SizeConfig>;
  states?: {
    default?: StateConfig;
    active?: StateConfig;
    disabled?: StateConfig;
  };
}

export interface BuildStepperTextStylesParams {
  config: StepperTextConfig;
  size: StepperTextSize;
  position: StepperTextPosition;
  state: StepperTextState;
}

export function buildContainerStyles(params: BuildStepperTextStylesParams): string {
  const { config, size, position, state: _state } = params;
  const sc = config.sizes?.[size] || {};
  const isVertical = position === 'vertical';
  const gap = isVertical
    ? dim(sc.gapVertical, size === 'lg' ? '6px' : size === 'md' ? '4px' : '2px')
    : dim(sc.gapHorizontal, size === 'lg' ? '12px' : size === 'md' ? '8px' : '6px');

  return css({
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    alignItems: isVertical ? 'center' : 'flex-start',
    gap,
    padding: '0',
    position: 'relative',
    ...(isVertical
      ? { maxWidth: sc.maxWidthVertical || (size === 'lg' ? '184px' : size === 'md' ? '164px' : '144px') }
      : {
          maxWidth: sc.maxWidthHorizontal || (size === 'lg' ? '324px' : size === 'md' ? '300px' : '284px'),
          minWidth: sc.minWidthHorizontal || (size === 'lg' ? '100px' : size === 'md' ? '80px' : '64px'),
        }),
  });
}

export function buildTextBlockStyles(params: BuildStepperTextStylesParams): string {
  const { position } = params;
  const isVertical = position === 'vertical';
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '0',
    position: 'relative',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    alignItems: isVertical ? 'center' : 'flex-start',
  });
}

export function buildTitleStyles(params: BuildStepperTextStylesParams): string {
  const { config, size, state } = params;
  const sc = config.sizes?.[size] || {};
  const st = config.states?.[state] || {};

  return css({
    fontFamily: sc.titleFontFamily || 'sans-serif',
    fontSize: dim(sc.titleFontSize, '14px'),
    lineHeight: dim(sc.titleLineHeight, '20px'),
    fontWeight: Number(sc.titleFontWeight || 500),
    color: st.titleColor || '#2b2b2b',
    position: 'relative',
    flexShrink: 0,
  });
}

export function buildSubtextStyles(params: BuildStepperTextStylesParams): string {
  const { config, size, state } = params;
  const sc = config.sizes?.[size] || {};
  const st = config.states?.[state] || {};

  return css({
    fontFamily: sc.subtextFontFamily || 'sans-serif',
    fontSize: dim(sc.subtextFontSize, '12px'),
    lineHeight: dim(sc.subtextLineHeight, '16px'),
    fontWeight: Number(sc.subtextFontWeight || 400),
    color: st.subtextColor || '#808080',
    position: 'relative',
    flexShrink: 0,
  });
}
