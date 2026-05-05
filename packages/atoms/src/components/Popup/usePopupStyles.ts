import { css } from '@emotion/css';
import { toCssDimension } from '../../utils/toCssDimension';

export interface PopupConfig {
  base?: Record<string, string>;
  sizes?: Record<string, Record<string, string>>;
}

export interface PopupStyleParams {
  config: PopupConfig;
  size: string;
}

function dim(value: string | number | undefined, fallback = '0'): string {
  if (value === undefined || value === null || value === '') return fallback;
  return String(toCssDimension(value) ?? fallback);
}

export function buildOverlayStyles({ config }: PopupStyleParams): string {
  const b = config.base || {};
  return css({
    position: 'fixed',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: b.overlayColor || 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  });
}

export function buildInlineOverlayStyles(): string {
  return css({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });
}

export function buildContainerStyles({ config, size }: PopupStyleParams): string {
  const b = config.base || {};
  const sc = config.sizes?.[size] || {};
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: sc.width || '632px',
    minWidth: sc.minWidth,
    maxWidth: sc.maxWidth,
    maxHeight: '90vh',
    backgroundColor: b.backgroundColor || '#ffffff',
    borderRadius: dim(b.borderRadius, '8px'),
    boxShadow: b.boxShadow || '0px 0px 6px 0px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  });
}

export function buildContentStyles({ config }: PopupStyleParams): string {
  return css({
    flex: '1 1 auto',
    overflow: 'auto',
    position: 'relative',
    minHeight: 0,
  });
}
