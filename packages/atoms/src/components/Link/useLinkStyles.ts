import { css } from '@emotion/css';

interface VariantConfig {
  textColor?: string;
  hoverTextColor?: string;
  focusTextColor?: string;
  disabledTextColor?: string;
}

interface SizeConfig {
  fontSize?: string;
  lineHeight?: string;
  iconSize?: string;
  gap?: string;
}

interface LinkConfig {
  base: {
    fontFamily?: string;
    fontWeight?: number | string;
    textDecoration?: string;
    transition?: string;
  };
  variants: Record<string, VariantConfig>;
  sizes: Record<string, SizeConfig>;
  states: {
    disabled?: {
      cursor?: string;
    };
  };
}

export interface UseLinkStylesParams {
  linkConfig: LinkConfig;
  linkStyle: string;
  size: string;
  isDisabled: boolean;
}

export function buildLinkStyles(params: UseLinkStylesParams): string {
  const { linkConfig, linkStyle, size, isDisabled } = params;
  const vc = linkConfig.variants?.[linkStyle] || {};
  const sc = linkConfig.sizes?.[size] || {};
  const base = linkConfig.base || {};

  const baseStyles = {
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    gap: sc.gap || '4px',
    fontFamily: base.fontFamily || 'sans-serif',
    fontWeight: Number(base.fontWeight || 500),
    fontSize: sc.fontSize || '16px',
    lineHeight: sc.lineHeight || '24px',
    textDecoration: base.textDecoration || 'underline',
    transition: base.transition || 'color 0.15s ease-in-out',
    padding: 0,
    border: 'none',
    background: 'none',
  };

  if (isDisabled) {
    return css({
      ...baseStyles,
      color: vc.disabledTextColor || '#cdcbcb',
      cursor: 'not-allowed',
    });
  }

  return css({
    ...baseStyles,
    color: vc.textColor || '#2396fb',
    cursor: 'pointer',
    '&:hover': {
      color: vc.hoverTextColor || vc.textColor || '#1d7dd1',
    },
    '&:focus': {
      color: vc.focusTextColor || vc.textColor || '#1764a7',
      outline: 'none',
    },
  });
}

export function buildIconContainerStyles(linkConfig: LinkConfig, size: string): string {
  const sc = linkConfig.sizes?.[size] || {};
  const iconSize = sc.iconSize || '24px';
  return css({
    width: iconSize,
    height: iconSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  });
}
