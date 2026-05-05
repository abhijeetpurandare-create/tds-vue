declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    textAreaStyle: {
        type: StringConstructor;
        default: string;
    };
    textAreaType: {
        type: StringConstructor;
        default: string;
    };
    textAreaSize: {
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
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    resize: {
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
    statusText: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {
    handleInput(e: CustomEvent): void;
    handleChange(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "change" | "input")[], "update:modelValue" | "change" | "input", import('vue').PublicProps, Readonly<{
    isGhost: boolean;
    isDisabled: boolean;
    modelValue: string;
    label: string;
    placeholder: string;
    helperTextTop: string;
    helperTextBottom: string;
    statusText: string;
    textAreaStyle: string;
    textAreaType: string;
    textAreaSize: string;
    rows: number;
    resize: string;
} & {} & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
}>, {
    isGhost: boolean;
    isDisabled: boolean;
    modelValue: string;
    label: string;
    placeholder: string;
    helperTextTop: string;
    helperTextBottom: string;
    statusText: string;
    textAreaStyle: string;
    textAreaType: string;
    textAreaSize: string;
    rows: number;
    resize: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
