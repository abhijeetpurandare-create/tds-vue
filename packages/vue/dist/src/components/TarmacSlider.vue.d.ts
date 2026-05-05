export type SliderVariant = 'black' | 'coal' | 'dlv_red';
export type SliderSize = 'sm' | 'lg';
export type SliderType = 'single' | 'dual';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    variant: {
        type: () => SliderVariant;
        default: string;
    };
    size: {
        type: () => SliderSize;
        default: string;
    };
    sliderType: {
        type: () => SliderType;
        default: string;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {
    handleChange(e: CustomEvent): void;
    handleChangeEnd(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "change" | "change-end")[], "update:modelValue" | "change" | "change-end", import('vue').PublicProps, Readonly<{
    variant: SliderVariant;
    size: SliderSize;
    isDisabled: boolean;
    modelValue: number;
    sliderType: SliderType;
    min: number;
    max: number;
    step: number;
} & {} & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    "onChange-end"?: ((...args: any[]) => any) | undefined;
}>, {
    variant: SliderVariant;
    size: SliderSize;
    isDisabled: boolean;
    modelValue: number;
    sliderType: SliderType;
    min: number;
    max: number;
    step: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
