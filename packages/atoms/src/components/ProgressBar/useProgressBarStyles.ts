import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

export type ProgressBarBarType = 'filled' | 'line';

interface VariantConfig {
  indicatorColor?: string;
}

interface SizeConfig {
  trackHeight?: string;
  titleFontFamily?: string;
  titleFontSize?: string;
  titleLineHeight?: string;
  titleFontWeight?: string;
  subtextFontFamily?: string;
  subtextFontSize?: string;
  subtextLineHeight?: string;
  subtextFontWeight?: string;
}

export interface ProgressBarThemeConfig {
  base?: { borderRadius?: string; transition?: string };
  variants?: Record<string, VariantConfig>;
  sizes?: Record<string, SizeConfig>;
  track?: { backgroundColor?: string };
  text?: { titleColor?: string; subtextColor?: string };
  spacing?: { gap?: string; padding?: string };
}

export interface BuildProgressBarStylesParams {
  config: ProgressBarThemeConfig;
  variant: string;
  size: string;
  barType: ProgressBarBarType;
  value: number;
}

export function buildTrackStyles(params: BuildProgressBarStylesParams): string {
  const { config, size, barType } = params;
  const sc = config.sizes?.[size];
  const trackHeight = sc?.trackHeight || (size === 'lg' ? '8px' : '4px');
  const trackBg = config.track?.backgroundColor || '#ededed';
  const rawRadius = config.base?.borderRadius || '8';
  const radius = String(toCssDimension(rawRadius) ?? '8px');

  return css({
    width: '100%',
    height: trackHeight,
    backgroundColor: barType === 'filled' ? trackBg : 'transparent',
    borderRadius: barType === 'filled' ? radius : '0',
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
  });
}

export function buildIndicatorStyles(params: BuildProgressBarStylesParams): string {
  const { config, variant, size, value } = params;
  const vc = config.variants?.[variant];
  const sc = config.sizes?.[size];
  const trackHeight = sc?.trackHeight || (size === 'lg' ? '8px' : '4px');
  const indicatorColor = vc?.indicatorColor || '#000000';
  const rawRadius = config.base?.borderRadius || '8';
  const radius = String(toCssDimension(rawRadius) ?? '8px');
  const transition = config.base?.transition || 'width 0.3s ease';

  return css({
    height: trackHeight,
    width: `${value}%`,
    backgroundColor: indicatorColor,
    borderRadius: radius,
    transition,
  });
}

export function buildWrapperStyles(config: ProgressBarThemeConfig): string {
  const gap = String(toCssDimension(config.spacing?.gap || '4') ?? '4px');
  const padding = String(toCssDimension(config.spacing?.padding || '4') ?? '4px');

  return css({
    display: 'flex',
    flexDirection: 'column',
    gap,
    padding,
    width: '100%',
  });
}

export function buildTitleRowStyles(config: ProgressBarThemeConfig, size: string): string {
  const sc = config.sizes?.[size];
  const titleColor = config.text?.titleColor || '#2b2b2b';
  const fontSize = String(toCssDimension(sc?.titleFontSize || (size === 'lg' ? '14' : '12')) ?? '14px');
  const lineHeight = String(toCssDimension(sc?.titleLineHeight || (size === 'lg' ? '20' : '16')) ?? '20px');

  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    fontFamily: sc?.titleFontFamily || 'Noto Sans, sans-serif',
    fontSize,
    lineHeight,
    fontWeight: Number(sc?.titleFontWeight || 500),
    color: titleColor,
  });
}

export function buildSubtextRowStyles(config: ProgressBarThemeConfig, size: string): string {
  const sc = config.sizes?.[size];
  const subtextColor = config.text?.subtextColor || '#454545';
  const fontSize = String(toCssDimension(sc?.subtextFontSize || (size === 'lg' ? '12' : '10')) ?? '12px');
  const lineHeight = String(toCssDimension(sc?.subtextLineHeight || (size === 'lg' ? '16' : '12')) ?? '16px');

  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    fontFamily: sc?.subtextFontFamily || 'Noto Sans, sans-serif',
    fontSize,
    lineHeight,
    fontWeight: Number(sc?.subtextFontWeight || 400),
    color: subtextColor,
  });
}
