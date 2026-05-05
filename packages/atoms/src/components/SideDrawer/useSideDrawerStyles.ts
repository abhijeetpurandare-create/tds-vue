import { css, keyframes } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

function dim(v: string | number | undefined, fallback = '0'): string {
  if (v === undefined || v === null || v === '') return fallback;
  return String(toCssDimension(v) ?? fallback);
}

export interface SideDrawerConfig {
  base?: Record<string, string>;
  variants?: Record<string, Record<string, string>>;
}

export interface SideDrawerStyleParams {
  config: SideDrawerConfig;
  variant: string;
  isOpen: boolean;
}

const slideIn = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});

const slideOut = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(100%)' },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

export function buildOverlayStyles(sp: SideDrawerStyleParams): string {
  const b = sp.config.base || {};
  return css({
    position: 'fixed',
    inset: 0,
    backgroundColor: b.overlayColor || 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end',
    animation: `${sp.isOpen ? fadeIn : fadeOut} 0.3s ease forwards`,
  });
}

export function buildDrawerStyles(sp: SideDrawerStyleParams): string {
  const b = sp.config.base || {};
  const vc = sp.config.variants?.[sp.variant] || {};
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: vc.width || (sp.variant === 'extended' ? '464px' : '328px'),
    maxWidth: '100vw',
    height: '100%',
    backgroundColor: b.backgroundColor || '#ffffff',
    borderRadius: b.borderRadius || '8px 0 0 8px',
    boxShadow: b.boxShadow || '-1px 1px 4px 0px rgba(0, 0, 0, 0.1)',
    fontFamily: b.fontFamily || 'Noto Sans, sans-serif',
    color: b.textColor || '#2B2B2B',
    overflow: 'hidden',
    animation: `${sp.isOpen ? slideIn : slideOut} 0.3s ease forwards`,
  });
}

export function buildContentStyles(sp: SideDrawerStyleParams): string {
  const b = sp.config.base || {};
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    flex: '1 1 0',
    padding: dim(b.contentPadding, '0 16px'),
    overflow: 'auto',
    position: 'relative',
  });
}

export function buildInlineStyles(sp: SideDrawerStyleParams): string {
  const b = sp.config.base || {};
  const vc = sp.config.variants?.[sp.variant] || {};
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: vc.width || (sp.variant === 'extended' ? '464px' : '328px'),
    height: vc.height || '764px',
    backgroundColor: b.backgroundColor || '#ffffff',
    borderRadius: b.borderRadius || '8px 0 0 8px',
    boxShadow: b.boxShadow || '-1px 1px 4px 0px rgba(0, 0, 0, 0.1)',
    fontFamily: b.fontFamily || 'Noto Sans, sans-serif',
    color: b.textColor || '#2B2B2B',
    overflow: 'hidden',
  });
}
