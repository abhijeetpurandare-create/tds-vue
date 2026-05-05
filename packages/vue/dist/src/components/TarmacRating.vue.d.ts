export type RatingSize = 'lg' | 'md' | 'sm';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    maxStars: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: () => RatingSize;
        default: string;
    };
    readOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowHalf: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {
    handleChange(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import('vue').PublicProps, Readonly<{
    size: RatingSize;
    modelValue: number;
    maxStars: number;
    readOnly: boolean;
    allowHalf: boolean;
} & {} & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    size: RatingSize;
    modelValue: number;
    maxStars: number;
    readOnly: boolean;
    allowHalf: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
