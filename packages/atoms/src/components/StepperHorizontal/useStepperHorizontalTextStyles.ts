import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'active' | 'disabled';

interface SizeConfig {
  titleFontFamily?: string;
  titleFontSize?: string | number;
  titleLineHeight?: string | number;
  titleFontWeight?: string | number;
  subtextFontFamily?: string;
  subtextFontSize?: string | number;
  subtextLineHeight?: string | number;
  subtextFontWeight?: string | number;
}

interface StateConfig {
  titleColor?: string;
  subtextColor?: string;
}

interface StepperTextConfig {
  sizes?: Record<string, SizeConfig>;
  states?: Record<string, StateConfig>;
}

interface Params {
  config: Record<string, unknown>;
  size: Size;
  state: State;
}

export function buildTextBlockStyles({ size }: { size: Size }): string {
  const marginTop = size === 'lg' ? '6px' : size === 'md' ? '4px' : '2px';
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: '100%',
    left: '0',          // left-aligned to icon left edge (matches Figma items-start)
    marginTop,
  });
}

export function buildTitleStyles({ config, size, state }: Params): string {
  const cfg = config as StepperTextConfig;
  const sc = cfg.sizes?.[size] || {};
  const st = cfg.states?.[state] || {};

  return css({
    fontFamily: sc.titleFontFamily || 'sans-serif',
    fontSize: dim(sc.titleFontSize, '14px'),
    lineHeight: dim(sc.titleLineHeight, '20px'),
    fontWeight: Number(sc.titleFontWeight || 500),
    color: st.titleColor || '#2b2b2b',
  });
}

export function buildSubtextStyles({ config, size, state }: Params): string {
  const cfg = config as StepperTextConfig;
  const sc = cfg.sizes?.[size] || {};
  const st = cfg.states?.[state] || {};

  return css({
    fontFamily: sc.subtextFontFamily || 'sans-serif',
    fontSize: dim(sc.subtextFontSize, '12px'),
    lineHeight: dim(sc.subtextLineHeight, '16px'),
    fontWeight: Number(sc.subtextFontWeight || 400),
    color: st.subtextColor || '#808080',
  });
}
