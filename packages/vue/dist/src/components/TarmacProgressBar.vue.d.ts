export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    value: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: () => ProgressBarSize;
        default: string;
    };
    variant: {
        type: () => ProgressBarVariant;
        default: string;
    };
    showPercentage: {
        type: BooleanConstructor;
        default: boolean;
    };
    trackColor: {
        type: StringConstructor;
        default: undefined;
    };
    textColor: {
        type: StringConstructor;
        default: undefined;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
    variant: ProgressBarVariant;
    size: ProgressBarSize;
    value: number;
    showPercentage: boolean;
} & {
    textColor?: string | undefined;
    trackColor?: string | undefined;
} & {}>, {
    variant: ProgressBarVariant;
    size: ProgressBarSize;
    textColor: string;
    trackColor: string;
    value: number;
    showPercentage: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
