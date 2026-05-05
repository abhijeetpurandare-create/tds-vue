/**
 * Tarmac Design System — Tailwind Color Tokens
 *
 * These mirror the Tailwind config from packages/atoms/tailwind.config.js
 * so that any framework can consume the same palette without Tailwind.
 */
export declare const colors: {
    readonly text: {
        readonly primary: "#5B80F7";
        readonly heading: "#3D445C";
        readonly body: "#525B7A";
        readonly muted: "#A3AAC2";
        readonly badge: "#474747";
    };
    readonly bg: {
        readonly surface: "#F9F9FB";
        readonly dark: "#1F222E";
    };
    readonly border: {
        readonly default: "#E0E3EB";
        readonly badge: "#9d9d9d";
    };
};
export declare const brandColors: {
    readonly delhiveryRed: "#ED4136";
    readonly delhiveryBlue: "#5b80f7";
};
export type Colors = typeof colors;
export type BrandColors = typeof brandColors;
