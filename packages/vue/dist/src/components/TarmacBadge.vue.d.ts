export type BadgeVariant = 'black' | 'white' | 'coal' | 'dlv_red' | 'info' | 'success' | 'warning' | 'error' | 'cardbox';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeType = 'solid' | 'subtle' | 'outlined';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    variant: {
        type: () => BadgeVariant;
        default: string;
    };
    size: {
        type: () => BadgeSize;
        default: string;
    };
    badgeType: {
        type: () => BadgeType;
        default: string;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
    showStatus: {
        type: BooleanConstructor;
        default: boolean;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    isGhost: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
    variant: BadgeVariant;
    size: BadgeSize;
    isGhost: boolean;
    text: string;
    badgeType: BadgeType;
    showStatus: boolean;
    isDisabled: boolean;
} & {} & {}>, {
    variant: BadgeVariant;
    size: BadgeSize;
    isGhost: boolean;
    text: string;
    badgeType: BadgeType;
    showStatus: boolean;
    isDisabled: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
