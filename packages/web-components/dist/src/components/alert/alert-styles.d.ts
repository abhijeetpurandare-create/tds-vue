/**
 * Alert Style Builder — Web Component Edition
 *
 * Direct port of packages/atoms/src/components/Alert/useAlertStyles.ts.
 * Returns CSS strings for Shadow DOM injection instead of Emotion class names.
 */
export type TarmacAlertVariant = 'white' | 'black' | 'coal' | 'success' | 'error' | 'info' | 'warning';
export type TarmacAlertStyle = 'singleText' | 'dualText';
export type TarmacAlertSize = 'lg' | 'sm';
export type AlertVariant = 'default' | 'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'white' | 'black' | 'coal' | 'error';
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
/**
 * Build the complete CSS for the Tarmac Alert component.
 * Produces identical visual output to the React version.
 */
export declare function buildAlertCSS(params: BuildAlertStylesParams): string;
/**
 * Build CSS for the legacy (non-Tarmac) alert path.
 */
export declare function buildLegacyAlertCSS(alertConfig: any, variant: string, size: string, overrides: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    iconColor?: string;
}): string;
export {};
