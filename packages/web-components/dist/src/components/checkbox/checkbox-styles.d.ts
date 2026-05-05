/**
 * Checkbox Style Builder — Web Component Edition
 *
 * Direct port of packages/atoms/src/components/Checkbox/useCheckboxStyles.ts.
 */
export type TarmacCheckboxVariant = 'standard' | 'blue' | 'green' | 'dlv_red';
export type TarmacCheckboxStyle = 'box' | 'rounded';
export type TarmacCheckboxSize = 'sm' | 'md' | 'lg';
interface VariantConfig {
    borderColor?: string;
    backgroundColor?: string;
    hoverBorderColor?: string;
    hoverBackgroundColor?: string;
    checkedBackgroundColor?: string;
    checkedBorderColor?: string;
    checkedHoverBackgroundColor?: string;
    checkedHoverBorderColor?: string;
    checkmarkColor?: string;
    focusRingColor?: string;
}
interface SizeConfig {
    boxSize?: string;
    checkmarkWidth?: string;
    checkmarkHeight?: string;
    dashWidth?: string;
    dashHeight?: string;
    borderWidth?: string;
    checkedBorderWidth?: string;
    labelFontSize?: string;
    labelLineHeight?: string;
    subtextFontSize?: string;
    subtextLineHeight?: string;
    gap?: string;
}
interface DisabledConfig {
    borderColor?: string;
    backgroundColor?: string;
    checkmarkColor?: string;
    labelColor?: string;
    subtextColor?: string;
}
interface BaseConfig {
    transition?: string;
    borderWidth?: string;
    radius?: {
        box?: string;
        rounded?: string;
    };
    focus?: {
        outline?: string;
        ring?: string;
    };
    label?: {
        fontFamily?: string;
        color?: string;
    };
    subtext?: {
        fontFamily?: string;
        color?: string;
    };
}
export interface CheckboxTarmacConfig {
    base?: BaseConfig;
    variants?: Record<string, VariantConfig>;
    sizes?: Record<string, SizeConfig>;
    states?: {
        disabled?: DisabledConfig;
    };
}
export interface BuildCheckboxParams {
    config: CheckboxTarmacConfig;
    variant: TarmacCheckboxVariant;
    checkboxStyle: TarmacCheckboxStyle;
    size: TarmacCheckboxSize;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    hasLabel: boolean;
    hasSubtext: boolean;
}
export declare function buildCheckboxCSS(params: BuildCheckboxParams): string;
export {};
