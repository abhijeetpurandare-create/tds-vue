/**
 * Chip Style Builder — Web Component Edition
 *
 * Direct port of packages/atoms/src/components/Chip/useChipStyles.ts.
 */
export type ChipType = 'black' | 'white' | 'coal' | 'blue' | 'success' | 'error' | 'warning' | 'legacy_blue' | 'dlv_red';
export type ChipVariant = 'standard' | 'outlined';
export type ChipSize = 'sm' | 'md' | 'lg';
interface VariantConfig {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    hoverColor?: string;
    hoverTextColor?: string;
    hoverBorderColor?: string;
    pressedColor?: string;
    pressedTextColor?: string;
    focusRingColor?: string;
}
export interface ChipConfig {
    base: {
        fontFamily?: string;
        fontWeight?: string;
        borderRadius?: string;
        transition?: string;
        focus?: {
            ring?: string;
        };
    };
    variants: Record<string, Record<string, VariantConfig>>;
    sizes: Record<string, {
        padding?: string;
        fontSize?: string;
        lineHeight?: string;
        iconSize?: string;
        gap?: string;
    }>;
    states: {
        disabled?: {
            backgroundColor?: string;
            textColor?: string;
            borderColor?: string;
        };
        disabledOutlined?: {
            backgroundColor?: string;
            textColor?: string;
            borderColor?: string;
        };
        ghost?: {
            backgroundColor?: string;
            textColor?: string;
            borderColor?: string;
        };
    };
}
export interface BuildChipStylesParams {
    chipConfig: ChipConfig;
    chipType: string;
    chipVariant: ChipVariant;
    size: ChipSize;
    isDisabled: boolean;
    isGhost: boolean;
}
export declare function buildChipCSS(params: BuildChipStylesParams): string;
export declare function getChipStatusColor(params: BuildChipStylesParams): string;
export {};
