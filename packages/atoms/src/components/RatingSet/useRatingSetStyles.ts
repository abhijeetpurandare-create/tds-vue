import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

// ─── Theme Config Interfaces ─────────────────────────────────────────────────

export interface RatingSetConfig {
  base?: {
    fontFamily?: string;
    borderRadius?: string;
    backgroundColor?: string;
    borderColor?: string;
    boxShadow?: string;
  };
  content?: {
    padding?: string;
    gap?: string;
  };
  sliderContent?: {
    padding?: string;
    gap?: string;
  };
  emoji?: {
    defaultBg?: string;
    selectedBg?: string;
    selectedBorderColor?: string;
    padding?: string;
    gap?: string;
    borderRadius?: string;
    fontSize?: string;
  };
  star?: {
    defaultBg?: string;
    selectedBg?: string;
    filledColor?: string;
    emptyColor?: string;
    padding?: string;
    gap?: string;
    borderRadius?: string;
    iconSize?: string;
  };
  slider?: {
    trackHeight?: string;
    trackBorderRadius?: string;
    trackBorderColor?: string;
    blackGradient?: string;
    whiteGradient?: string;
    knobSize?: string;
    knobColor?: string;
    knobBorderRadius?: string;
    knobShadow?: string;
  };
}

// ─── Content ─────────────────────────────────────────────────────────────────

export function buildContentStyles(config: RatingSetConfig, ratingStyle: string): string {
  const isSlider = ratingStyle === 'slider';
  const c = isSlider ? (config.sliderContent || config.content || {}) : (config.content || {});
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: dim(c.gap, '12px'),
    padding: isSlider ? (c.padding || '80px 16px 16px') : dim(c.padding, '16px'),
  });
}

// ─── Emoji Set ───────────────────────────────────────────────────────────────

export function buildEmojiSetStyles(config: RatingSetConfig): string {
  const e = config.emoji || {};
  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: dim(e.gap, '9px'),
    padding: '0 8px',
  });
}

export function buildEmojiIconStyles(config: RatingSetConfig, isSelected: boolean): string {
  const e = config.emoji || {};
  return css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: '10px',
    padding: dim(e.padding, '12px'),
    backgroundColor: isSelected ? (e.selectedBg || '#fff') : (e.defaultBg || '#f7f7f7'),
    border: isSelected ? `1px solid ${e.selectedBorderColor || '#91cafd'}` : '1px solid transparent',
    borderRadius: dim(e.borderRadius, '999px'),
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    '&:hover': {
      backgroundColor: isSelected ? (e.selectedBg || '#fff') : '#efefef',
    },
  });
}

// ─── Star Set ────────────────────────────────────────────────────────────────

export function buildStarSetStyles(config: RatingSetConfig): string {
  const s = config.star || {};
  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: dim(s.gap, '9px'),
  });
}

export function buildStarIconStyles(config: RatingSetConfig, isFilled: boolean): string {
  const s = config.star || {};
  return css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: dim(s.padding, '12px'),
    backgroundColor: isFilled ? (s.selectedBg || '#f7f7f7') : (s.defaultBg || '#f7f7f7'),
    borderRadius: dim(s.borderRadius, '999px'),
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    '&:hover': { backgroundColor: '#efefef' },
  });
}


// ─── Slider ──────────────────────────────────────────────────────────────────

export function buildSliderStyles(config: RatingSetConfig, style: string) {
  const s = config.slider || {};
  const gradient = style === 'black'
    ? (s.blackGradient || 'linear-gradient(90deg, #000 0%, #ED1B36 100%)')
    : (s.whiteGradient || 'linear-gradient(90deg, #fff 0%, #ED1B36 100%)');

  return {
    wrapper: css({
      position: 'relative' as const,
      width: '100%',
      padding: '0 24px',
    }),
    track: css({
      position: 'relative' as const,
      width: '100%',
      height: dim(s.trackHeight, '8px'),
      borderRadius: dim(s.trackBorderRadius, '16px'),
      border: `1px solid ${s.trackBorderColor || '#e6e6e6'}`,
      backgroundColor: '#fff',
      overflow: 'visible',
    }),
    fill: css({
      position: 'absolute' as const,
      top: 0,
      left: 0,
      height: '100%',
      borderRadius: dim(s.trackBorderRadius, '12px'),
      background: gradient,
    }),
    input: css({
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer',
      margin: 0,
      zIndex: 2,
    }),
  };
}

export function buildSliderKnobStyles(config: RatingSetConfig): string {
  const s = config.slider || {};
  const size = dim(s.knobSize, '16px');
  return css({
    position: 'absolute' as const,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: size,
    height: size,
    borderRadius: dim(s.knobBorderRadius, '999px'),
    backgroundColor: s.knobColor || '#f2f2f2',
    boxShadow: s.knobShadow || '0px 0px 6px 0px rgba(0,0,0,0.2)',
    pointerEvents: 'none' as const,
    zIndex: 1,
  });
}

export function buildSliderTooltipStyles(): string {
  return css({
    position: 'absolute' as const,
    bottom: '100%',
    transform: 'translateX(-50%)',
    marginBottom: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pointerEvents: 'none' as const,
    zIndex: 3,
  });
}

// ─── Ghost Skeleton ──────────────────────────────────────────────────────────

export function buildGhostStyles(config: RatingSetConfig, variant: string): string {
  const base = config.base || {};
  const isPopup = variant === 'websitePopup';
  return css({
    width: isPopup ? 400 : 360,
    height: 300,
    borderRadius: isPopup ? dim(base.borderRadius, '8px') : `${dim(base.borderRadius, '8px')} ${dim(base.borderRadius, '8px')} 0 0`,
    backgroundColor: '#f0f0f0',
    animation: 'pulse 1.5s ease-in-out infinite',
    '@keyframes pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },
  });
}
