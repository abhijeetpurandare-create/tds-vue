/**
 * Default Alert Configuration
 *
 * Mirrors the defaultAlertStyles from packages/atoms/src/config/config.ts.
 * Used as fallback when no theme provider is present.
 */
export declare const defaultAlertConfig: {
    base: {
        fontFamily: string;
        fontWeight: string;
        transition: string;
        radius: string;
        padding: string;
    };
    variants: {
        default: {
            backgroundColor: string;
            textColor: string;
            borderColor: string;
            iconColor: string;
        };
        primary: {
            backgroundColor: string;
            textColor: string;
            borderColor: string;
            iconColor: string;
        };
        destructive: {
            backgroundColor: string;
            textColor: string;
            borderColor: string;
            iconColor: string;
        };
        success: {
            backgroundColor: string;
            textColor: string;
            borderColor: string;
            iconColor: string;
        };
        warning: {
            backgroundColor: string;
            textColor: string;
            borderColor: string;
            iconColor: string;
        };
        info: {
            backgroundColor: string;
            textColor: string;
            borderColor: string;
            iconColor: string;
        };
    };
    sizes: {
        sm: {
            padding: string;
            fontSize: string;
            iconSize: string;
        };
        md: {
            padding: string;
            fontSize: string;
            iconSize: string;
        };
        lg: {
            padding: string;
            fontSize: string;
            iconSize: string;
        };
    };
};
