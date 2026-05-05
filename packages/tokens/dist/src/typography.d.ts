/**
 * Tarmac Design System — Typography Tokens
 *
 * Font families and weights used across the design system.
 * Matches the Tailwind config and Figma variable definitions.
 */
export declare const fontFamily: {
    readonly sans: readonly ["\"IBM Plex Sans\"", "sans-serif"];
    readonly display: readonly ["\"Noto Sans\"", "sans-serif"];
    readonly heading: readonly ["\"Noto Sans\"", "sans-serif"];
    readonly body: readonly ["\"Noto Sans\"", "sans-serif"];
    readonly caption: readonly ["\"Noto Sans\"", "sans-serif"];
};
export declare const fontWeight: {
    readonly display: 900;
    readonly bold: 700;
    readonly semibold: 600;
    readonly medium: 500;
    readonly regular: 400;
    readonly light: 300;
};
export type FontFamily = typeof fontFamily;
export type FontWeight = typeof fontWeight;
