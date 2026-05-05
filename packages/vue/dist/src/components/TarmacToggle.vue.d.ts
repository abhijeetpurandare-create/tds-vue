declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    tarmacColor: {
        type: StringConstructor;
        default: string;
    };
    tarmacStyle: {
        type: StringConstructor;
        default: string;
    };
    tarmacSize: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    isGhost: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {
    handleChange(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import('vue').PublicProps, Readonly<{
    disabled: boolean;
    isGhost: boolean;
    tarmacSize: string;
    modelValue: boolean;
    tarmacStyle: string;
    tarmacColor: string;
} & {} & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    disabled: boolean;
    isGhost: boolean;
    tarmacSize: string;
    modelValue: boolean;
    tarmacStyle: string;
    tarmacColor: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
