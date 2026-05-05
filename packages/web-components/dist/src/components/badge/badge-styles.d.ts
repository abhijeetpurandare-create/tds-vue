/**
 * Badge Style Builder — Web Component Edition
 *
 * Direct port of packages/atoms/src/components/Badge/useBadgeStyles.ts.
 */
export type BadgeVariant = 'black' | 'white' | 'coal' | 'dlv_red' | 'info' | 'success' | 'warning' | 'error' | 'cardbox';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeType = 'solid' | 'subtle' | 'outlined';
interface VariantConfig {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
}
export interface BadgeConfig {
    base: {
        fontFamily?: string;
        fontWeight?: string;
        borderRadius?: string;
    };
    types?: Record<string, Record<string, VariantConfig>>;
    variants: Record<string, VariantConfig>;
    sizes: Record<string, {
        padding?: string;
        fontSize?: string;
        lineHeight?: string;
        iconSize?: string;
        gap?: string;
    }>;
    states: {
        disabled?: VariantConfig;
        disabledOutlined?: VariantConfig;
        ghost?: VariantConfig & {
            cursor?: string;
        };
    };
}
export interface BuildBadgeStylesParams {
    badgeConfig: BadgeConfig;
    variant: string;
    size: BadgeSize;
    badgeType: BadgeType;
    isDisabled: boolean;
    isGhost: boolean;
}
/**
 * Build the complete CSS for the Badge component.
 * Produces identical visual output to the React version.
 */
export declare function buildBadgeCSS(params: BuildBadgeStylesParams): string;
/**
 * Get the status dot color for the current state.
 */
export declare function getStatusDotColor(params: BuildBadgeStylesParams): string;
export {};
