/**
 * Alert Style Builder — Web Component Edition
 *
 * Direct port of packages/atoms/src/components/Alert/useAlertStyles.ts.
 * Returns CSS strings for Shadow DOM injection instead of Emotion class names.
 */

// ── Types (mirrored from React Alert) ──────────────────────

export type TarmacAlertVariant = 'white' | 'black' | 'coal' | 'success' | 'error' | 'info' | 'warning';
export type TarmacAlertStyle = 'singleText' | 'dualText';
export type TarmacAlertSize = 'lg' | 'sm';
export type AlertVariant =
  | 'default' | 'primary' | 'destructive' | 'success' | 'warning' | 'info'
  | 'white' | 'black' | 'coal' | 'error';
export type AlertSize = 'sm' | 'md' | 'lg';

interface VariantConfig {
  backgroundColor?: string;
  borderColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  iconColor?: string;
  singleTextColor?: string;
  textColor?: string;
}

interface SizeConfig {
  padding?: string;
  titleFontSize?: string;
  titleLineHeight?: string;
  titleFontWeight?: string;
  descriptionFontSize?: string;
  descriptionLineHeight?: string;
  singleTextFontSize?: string;
  singleTextLineHeight?: string;
  iconSize?: string;
  contentGap?: string;
  iconGap?: string;
  textGap?: string;
  fontSize?: string;
}

interface BaseConfig {
  fontFamily?: string;
  captionFontFamily?: string;
  borderRadius?: string;
  shadow?: string;
  transition?: string;
  fontWeight?: string;
  radius?: string;
  padding?: string;
}

export interface AlertThemeConfig {
  base?: BaseConfig;
  variants?: Record<string, VariantConfig>;
  sizes?: Record<string, SizeConfig>;
}

export interface BuildAlertStylesParams {
  alertConfig: AlertThemeConfig;
  variant: TarmacAlertVariant;
  size: TarmacAlertSize;
}

function getVC(config: AlertThemeConfig, variant: string): VariantConfig {
  return config.variants?.[variant] || {};
}

function getSC(config: AlertThemeConfig, size: string): SizeConfig {
  return config.sizes?.[size] || {};
}

/**
 * Build the complete CSS for the Tarmac Alert component.
 * Produces identical visual output to the React version.
 */
export function buildAlertCSS(params: BuildAlertStylesParams): string {
  const { alertConfig, variant, size } = params;
  const base = alertConfig.base || {};
  const vc = getVC(alertConfig, variant);
  const sc = getSC(alertConfig, size);

  const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
  const captionFontFamily = base.captionFontFamily || fontFamily;

  return `
    :host {
      display: block;
      width: 100%;
    }

    /* ── Container ─────────────────────────────────────── */
    .alert-container {
      display: flex;
      align-items: flex-start;
      gap: 0;
      width: 100%;
      padding: ${sc.padding || '12px'};
      border-radius: ${base.borderRadius || '4px'};
      box-shadow: ${base.shadow || '0px 0px 4px 0px rgba(0,0,0,0.1)'};
      background-color: ${vc.backgroundColor || '#ffffff'};
      font-family: ${fontFamily};
      transition: ${base.transition || 'all 0.15s ease-in-out'};
      box-sizing: border-box;
      position: relative;
    }

    /* ── Inner column ──────────────────────────────────── */
    .alert-inner {
      display: flex;
      flex-direction: column;
      gap: ${sc.contentGap || '8px'};
      flex: 1 1 0%;
      align-items: flex-start;
      min-width: 0;
      min-height: 1px;
    }

    /* ── Row (icon + text + trailing) ──────────────────── */
    .alert-row {
      display: flex;
      align-items: flex-start;
      gap: ${sc.iconGap || '10px'};
      width: 100%;
    }

    /* ── Text column ───────────────────────────────────── */
    .alert-text-col {
      display: flex;
      flex-direction: column;
      gap: ${sc.contentGap || '8px'};
      flex: 1 1 0%;
      align-items: flex-start;
      min-width: 0;
      min-height: 1px;
    }

    /* ── Text block (title + description) ──────────────── */
    .alert-text-block {
      display: flex;
      flex-direction: column;
      gap: ${sc.textGap || '4px'};
      align-items: flex-start;
      width: 100%;
    }

    /* ── Title ─────────────────────────────────────────── */
    .alert-title {
      font-family: ${fontFamily};
      font-weight: ${sc.titleFontWeight ? Number(sc.titleFontWeight) : (size === 'sm' ? 500 : 400)};
      font-size: ${sc.titleFontSize || '16px'};
      line-height: ${sc.titleLineHeight || '24px'};
      color: ${vc.titleColor || '#121212'};
      margin: 0;
      width: 100%;
    }

    /* ── Description ───────────────────────────────────── */
    .alert-description {
      font-family: ${size === 'sm' ? captionFontFamily : fontFamily};
      font-weight: 400;
      font-size: ${sc.descriptionFontSize || '14px'};
      line-height: ${sc.descriptionLineHeight || '20px'};
      color: ${vc.descriptionColor || '#3b3b3b'};
      margin: 0;
      width: 100%;
    }

    /* ── Single text ───────────────────────────────────── */
    .alert-single-text {
      font-family: ${fontFamily};
      font-weight: 400;
      font-size: ${sc.singleTextFontSize || sc.titleFontSize || '16px'};
      line-height: ${sc.singleTextLineHeight || sc.titleLineHeight || '24px'};
      color: ${vc.singleTextColor || vc.descriptionColor || '#2b2b2b'};
      margin: 0;
      width: 100%;
    }

    /* ── Icon wrapper ──────────────────────────────────── */
    .alert-icon-wrap {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      color: ${vc.iconColor || '#2b2b2b'};
    }
    .alert-icon-wrap ::slotted(*),
    .alert-icon-wrap svg {
      width: ${sc.iconSize || '24px'};
      height: ${sc.iconSize || '24px'};
    }

    /* ── CTAs row ──────────────────────────────────────── */
    .alert-ctas {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      width: 100%;
    }

    /* ── Close button ──────────────────────────────────── */
    .alert-close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 4px;
      border: none;
      background: none;
      cursor: pointer;
      color: ${vc.iconColor || '#2b2b2b'};
      opacity: 0.6;
      transition: opacity 0.15s;
    }
    .alert-close-btn:hover {
      opacity: 1;
    }
  `;
}

/**
 * Build CSS for the legacy (non-Tarmac) alert path.
 */
export function buildLegacyAlertCSS(
  alertConfig: any,
  variant: string,
  size: string,
  overrides: { backgroundColor?: string; borderColor?: string; textColor?: string; iconColor?: string },
): string {
  const base = alertConfig.base || {};
  const vc = alertConfig.variants?.[variant] || {};
  const sc = alertConfig.sizes?.[size] || {};

  return `
    :host { display: block; width: 100%; }

    .alert-container {
      position: relative;
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-family: ${base.fontFamily || 'sans-serif'};
      font-weight: ${base.fontWeight || 500};
      transition: ${base.transition || 'all 0.15s ease-in-out'};
      border-radius: ${base.radius || '0.5rem'};
      border: 1px solid;
      padding: ${sc.padding || '1rem'};
      font-size: ${sc.fontSize || '1rem'};
      background-color: ${overrides.backgroundColor || vc.backgroundColor || '#FFFFFF'};
      color: ${overrides.textColor || vc.textColor || '#111827'};
      border-color: ${overrides.borderColor || vc.borderColor || '#E5E7EB'};
      box-sizing: border-box;
    }

    .alert-icon-wrap {
      flex-shrink: 0;
      width: ${sc.iconSize || '1.25rem'};
      height: ${sc.iconSize || '1.25rem'};
      color: ${overrides.iconColor || vc.iconColor || '#6B7280'};
    }

    .alert-content { flex: 1 1 0%; }

    .alert-title {
      margin: 0;
      font-weight: 600;
      line-height: 1.2;
    }

    .alert-description {
      margin: 0;
      line-height: 1.5;
      color: ${vc.textColor || '#111827'};
      opacity: 0.9;
    }

    .alert-close-btn {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      padding: 0.25rem;
      color: ${vc.textColor || '#111827'};
      opacity: 0.5;
      cursor: pointer;
      transition: opacity 0.15s;
      border: none;
      background: none;
      outline: none;
    }
    .alert-close-btn:hover { opacity: 0.75; }
  `;
}
