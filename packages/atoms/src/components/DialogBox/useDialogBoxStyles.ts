import { css } from '@emotion/css';

export interface DialogBoxConfig {
  base?: Record<string, string>;
  sizes?: Record<string, Record<string, string>>;
}

export interface DialogBoxStyleParams {
  config: DialogBoxConfig;
  size: string;
  footerStyle: string;
}

export function buildOverlayStyles({ config }: DialogBoxStyleParams): string {
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

export function buildContainerStyles({ config, size }: DialogBoxStyleParams): string {
  const b = config.base || {};
  const sc = config.sizes?.[size] || {};
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: sc.width || '440px',
    backgroundColor: b.backgroundColor || '#ffffff',
    borderRadius: b.borderRadius || '4px',
    boxShadow: b.boxShadow || '0px 0px 4px 0px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    fontFamily: b.fontFamily || 'Noto Sans, sans-serif',
    color: b.titleColor || '#2B2B2B',
  });
}

export function buildHeaderStyles({ config, size }: DialogBoxStyleParams): string {
  const b = config.base || {};
  const sc = config.sizes?.[size] || {};
  return css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: '8px',
    padding: '12px',
    '& .dialogbox-header-left': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '4px',
      flex: '1 1 0',
    },
    '& .dialogbox-header-icon': {
      width: sc.headerIconSize || '24px',
      height: sc.headerIconSize || '24px',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .dialogbox-header-text': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: '1 1 0',
    },
    '& .dialogbox-title': {
      fontSize: sc.titleFontSize || '16px',
      lineHeight: sc.titleLineHeight || '24px',
      fontWeight: sc.titleFontWeight || 500,
      color: b.titleColor || '#2B2B2B',
    },
    '& .dialogbox-subtext': {
      fontSize: sc.subtextFontSize || '14px',
      lineHeight: sc.subtextLineHeight || '20px',
      fontWeight: sc.subtextFontWeight || 400,
      color: b.descriptionColor || '#454545',
    },
    '& .dialogbox-close-icon': {
      width: sc.headerIconSize || '24px',
      height: sc.headerIconSize || '24px',
      flexShrink: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}

export function buildContentStyles({ config, size }: DialogBoxStyleParams): string {
  const b = config.base || {};
  const sc = config.sizes?.[size] || {};
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: '4px',
    padding: '12px',
    '& .dialogbox-illustration': {
      width: sc.illustrationSize || '48px',
      height: sc.illustrationSize || '48px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      backgroundColor: b.illustrationBackgroundColor || '#F2F2F2',
    },
    '& .dialogbox-body': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      gap: '8px',
      padding: '4px',
    },
    '& .dialogbox-heading': {
      fontSize: sc.headingFontSize || '16px',
      lineHeight: sc.headingLineHeight || '24px',
      fontWeight: sc.headingFontWeight || 500,
      color: b.titleColor || '#2B2B2B',
      textAlign: 'center',
    },
    '& .dialogbox-description': {
      fontSize: sc.descriptionFontSize || '14px',
      lineHeight: sc.descriptionLineHeight || '20px',
      fontWeight: sc.descriptionFontWeight || 400,
      color: b.descriptionColor || '#454545',
      textAlign: 'center',
    },
    '& .dialogbox-checkbox-row': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '4px',
      padding: '4px',
    },
  });
}

export function buildSlotStyles(): string {
  return css({
    width: '100%',
    flex: '1 1 0',
    backgroundColor: 'rgba(35, 150, 251, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });
}

export function buildFooterStyles({ footerStyle }: DialogBoxStyleParams): string {
  const isStacked = footerStyle === 'type2';
  return css({
    display: 'flex',
    flexDirection: isStacked ? 'column' : 'row',
    justifyContent: isStacked ? 'center' : 'flex-end',
    alignItems: isStacked ? 'stretch' : 'center',
    alignSelf: 'stretch',
    gap: '8px',
    padding: '12px',
  });
}
