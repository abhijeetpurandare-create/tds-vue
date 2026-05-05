declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    inputStyle: {
        type: StringConstructor;
        default: string;
    };
    inputType: {
        type: StringConstructor;
        default: string;
    };
    inputSize: {
        type: StringConstructor;
        default: string;
    };
    styleVariant: {
        type: StringConstructor;
        default: string;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    isGhost: {
        type: BooleanConstructor;
        default: boolean;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    isMandatory: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    helperTextTop: {
        type: StringConstructor;
        default: string;
    };
    helperTextBottom: {
        type: StringConstructor;
        default: string;
    };
    subtext: {
        type: StringConstructor;
        default: string;
    };
    statusText: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {
    handleInput(e: CustomEvent): void;
    handleChange(e: CustomEvent): void;
    handleFocus(): void;
    handleBlur(): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "change" | "input" | "focus" | "blur")[], "update:modelValue" | "change" | "input" | "focus" | "blur", import('vue').PublicProps, Readonly<{
    isGhost: boolean;
    isDisabled: boolean;
    modelValue: string;
    subtext: string;
    label: string;
    inputStyle: string;
    inputType: string;
    inputSize: string;
    styleVariant: string;
    isMandatory: boolean;
    placeholder: string;
    helperTextTop: string;
    helperTextBottom: string;
    statusText: string;
} & {} & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
}>, {
    isGhost: boolean;
    isDisabled: boolean;
    modelValue: string;
    subtext: string;
    label: string;
    inputStyle: string;
    inputType: string;
    inputSize: string;
    styleVariant: string;
    isMandatory: boolean;
    placeholder: string;
    helperTextTop: string;
    helperTextBottom: string;
    statusText: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
