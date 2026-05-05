import { css } from '@emotion/css';

interface StyleConfig {
  textColor?: string; hoverTextColor?: string; pressedTextColor?: string;
  disabledTextColor?: string; iconColor?: string; hoverIconColor?: string;
  pressedIconColor?: string; disabledIconColor?: string;
}
interface SizeConfig { fontSize?: string; lineHeight?: string; padding?: string; iconSize?: string; gap?: string; }
interface GhostConfig {
  backgroundColor?: string; skeletonColor?: string; skeletonBorderRadius?: string;
  skeletonWidth?: string; skeletonHeight?: string;
  lgWidth?: string; lgHeight?: string; smWidth?: string; smHeight?: string;
}
interface BreadcrumbConfig {
  base?: { fontFamily?: string; transition?: string };
  styles?: Record<string, StyleConfig>;
  sizes?: Record<string, SizeConfig>;
  states?: { default?: { fontWeight?: string }; hover?: { fontWeight?: string }; pressed?: { fontWeight?: string }; disabled?: { fontWeight?: string }; ghost?: GhostConfig };
}

export interface BuildCellParams { config: BreadcrumbConfig; cellStyle: string; size: string; isDisabled: boolean; isCurrent: boolean; }
export interface BuildGhostParams { config: BreadcrumbConfig; size: string; }

export function buildCellStyles({ config, cellStyle, size, isDisabled, isCurrent }: BuildCellParams): string {
  const base = config.base || {};
  const vc = config.styles?.[cellStyle] || {};
  const sc = config.sizes?.[size] || {};
  const states = config.states || {};
  const shared = {
    display: 'inline-flex' as const, alignItems: 'center' as const,
    gap: sc.gap || '8px', fontFamily: base.fontFamily || 'Noto Sans, sans-serif',
    fontSize: sc.fontSize || '14px', lineHeight: sc.lineHeight || '20px',
    padding: sc.padding || '12px 8px', transition: base.transition || 'all 0.15s ease-in-out',
    textDecoration: 'none', border: 'none', background: 'none', outline: 'none',
  };
  if (isDisabled) return css({ ...shared, color: vc.disabledTextColor || '#CDCBCB', fontWeight: Number(states.disabled?.fontWeight || 400), cursor: 'default', '& svg': { color: vc.disabledIconColor || '#CDCBCB' } });
  if (isCurrent) return css({ ...shared, color: vc.pressedTextColor || '#2B2B2B', fontWeight: Number(states.pressed?.fontWeight || 500), cursor: 'pointer', '& svg': { color: vc.pressedIconColor || vc.iconColor || '#2B2B2B' } });
  return css({
    ...shared, color: vc.textColor || '#121212', fontWeight: Number(states.default?.fontWeight || 300), cursor: 'pointer',
    '& svg': { color: vc.iconColor || '#2B2B2B' },
    '&:hover': { color: vc.hoverTextColor || vc.textColor || '#121212', fontWeight: Number(states.hover?.fontWeight || 500), '& svg': { color: vc.hoverIconColor || vc.iconColor || '#2B2B2B' } },
    '&:active': { color: vc.pressedTextColor || '#2B2B2B', fontWeight: Number(states.pressed?.fontWeight || 500), '& svg': { color: vc.pressedIconColor || vc.iconColor || '#2B2B2B' } },
  });
}

export function buildGhostStyles({ config, size }: BuildGhostParams): string {
  const gs = config.states?.ghost || {};
  const sc = config.sizes?.[size] || {};
  return css({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: size === 'sm' ? (gs.smWidth || '80px') : (gs.lgWidth || '102px'),
    height: size === 'sm' ? (gs.smHeight || '40px') : (gs.lgHeight || '44px'),
    backgroundColor: gs.backgroundColor || '#EDEDED', padding: sc.padding || '12px 8px',
    '&::after': { content: '""', display: 'block', width: gs.skeletonWidth || '78px', height: gs.skeletonHeight || '12px', backgroundColor: gs.skeletonColor || '#D9D9D9', borderRadius: gs.skeletonBorderRadius || '8px' },
  });
}

export function buildIconStyles(config: BreadcrumbConfig, size: string): string {
  const iconSize = config.sizes?.[size]?.iconSize || '20px';
  return css({ width: iconSize, height: iconSize, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 });
}
