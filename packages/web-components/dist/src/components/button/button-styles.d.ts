/**
 * Button Style Builder — Web Component Edition
 *
 * This is a direct port of packages/atoms/src/components/Button/useButtonStyles.ts.
 * Instead of returning Emotion CSS class names, it returns CSS strings
 * that are injected into the Shadow DOM.
 *
 * The logic is intentionally kept 1:1 with the React version to guarantee
 * pixel-perfect visual parity.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'black' | 'white' | 'info' | 'success' | 'error' | 'warning' | 'dlv_red' | 'coal';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonStyle = 'primary' | 'secondary' | 'tertiary';
export type ButtonType = 'button' | 'iconButton';
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
    disabledBackgroundColor?: string;
    disabledTextColor?: string;
    disabledBorderColor?: string;
}
interface DisabledState {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    cursor?: string;
}
export interface ButtonConfig {
    base: {
        fontFamily?: string;
        fontWeight?: string;
        focus?: {
            ring?: string;
        };
        radius?: {
            default?: string;
            rounded?: string;
        };
    };
    styles?: Record<string, Record<string, VariantConfig>>;
    variants: Record<string, VariantConfig>;
    sizes: Record<string, {
        padding?: string;
        fontSize?: string;
        iconSize?: string;
        gap?: string;
        iconButtonSize?: string;
        iconButtonIconSize?: string;
        iconButtonPadding?: string;
    }>;
    states: {
        disabled?: DisabledState;
        disabledSecondary?: DisabledState;
        disabledTertiary?: DisabledState;
        ghost?: {
            backgroundColor?: string;
            textColor?: string;
            borderColor?: string;
            cursor?: string;
        };
        loading?: {
            opacity?: string;
            cursor?: string;
        };
    };
}
export interface BuildButtonStylesParams {
    buttonConfig: ButtonConfig;
    variant: string;
    size: ButtonSize;
    buttonStyle: ButtonStyle;
    buttonType: ButtonType;
    isRounded: boolean;
    isLoading: boolean;
    backgroundColor?: string;
    borderColor?: string;
    hoverColor?: string;
    textColor?: string;
    radius?: string;
    border?: string;
}
/**
 * Build a CSS string for the button element.
 * This produces the exact same visual output as the Emotion-based
 * buildButtonStyles() in the React package.
 */
export declare function buildButtonCSS(params: BuildButtonStylesParams): string;
/**
 * Build CSS for icon wrapper (leading/trailing).
 * Mirrors buildIconStyles() from the React version.
 */
export declare function buildIconCSS(buttonConfig: ButtonConfig, size: ButtonSize, position: 'left' | 'right', hasContent: boolean): string;
/**
 * Spinner keyframes — shared across all button instances.
 */
export declare const SPINNER_CSS = "\n  @keyframes tarmac-spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n  }\n\n  .tarmac-spinner {\n    display: inline-block;\n    border: 2px solid currentColor;\n    border-top-color: transparent;\n    border-radius: 50%;\n    animation: tarmac-spin 1s linear infinite;\n    margin-right: 0.5rem;\n  }\n\n  .tarmac-spinner--sm {\n    width: 14px;\n    height: 14px;\n  }\n\n  .tarmac-spinner--md {\n    width: 16px;\n    height: 16px;\n  }\n\n  .tarmac-spinner--lg {\n    width: 20px;\n    height: 20px;\n  }\n";
export {};
