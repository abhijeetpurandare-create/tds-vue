declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    tarmacVariant: {
        type: StringConstructor;
        default: string;
    };
    tarmacStyle: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    subtext: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {
    handleChange(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import('vue').PublicProps, Readonly<{
    name: string;
    size: string;
    disabled: boolean;
    tarmacVariant: string;
    modelValue: boolean;
    tarmacStyle: string;
    value: string;
    subtext: string;
} & {} & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    name: string;
    size: string;
    disabled: boolean;
    tarmacVariant: string;
    modelValue: boolean;
    tarmacStyle: string;
    value: string;
    subtext: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
