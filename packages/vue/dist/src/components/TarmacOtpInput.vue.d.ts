declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    numDigits: {
        type: NumberConstructor;
        default: number;
    };
    otpStyle: {
        type: StringConstructor;
        default: string;
    };
    otpSize: {
        type: StringConstructor;
        default: string;
    };
    otpVariant: {
        type: StringConstructor;
        default: string;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    inputType: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    helperText: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {
    handleChange(e: CustomEvent): void;
    handleComplete(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "change" | "complete")[], "update:modelValue" | "change" | "complete", import('vue').PublicProps, Readonly<{
    isDisabled: boolean;
    modelValue: string;
    label: string;
    inputType: string;
    placeholder: string;
    numDigits: number;
    otpStyle: string;
    otpSize: string;
    otpVariant: string;
    helperText: string;
} & {} & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onComplete?: ((...args: any[]) => any) | undefined;
}>, {
    isDisabled: boolean;
    modelValue: string;
    label: string;
    inputType: string;
    placeholder: string;
    numDigits: number;
    otpStyle: string;
    otpSize: string;
    otpVariant: string;
    helperText: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
