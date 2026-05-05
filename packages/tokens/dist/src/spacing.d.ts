/**
 * Tarmac Design System — Spacing / Scale Tokens
 *
 * Mirrors the --Scale-* CSS variables from the Figma-generated
 * tarmac-variables.css. Values are in pixels.
 */
export declare const scale: Record<string, number>;
export declare const borderWidth: {
    readonly none: 0;
    readonly small: 0.5;
    readonly default: 1;
    readonly medium: 1.5;
    readonly large: 2;
    readonly xlarge: 4;
};
export declare const borderRadius: {
    readonly none: 0;
    readonly small: 2;
    readonly default: 4;
    readonly medium: 8;
    readonly large: 12;
    readonly xlarge: 16;
    readonly max: 999;
};
export type Scale = typeof scale;
export type BorderWidth = typeof borderWidth;
export type BorderRadius = typeof borderRadius;
