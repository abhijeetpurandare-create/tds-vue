declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    options: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {
    handleChange(e: CustomEvent): void;
    handleApply(e: CustomEvent): void;
    handleClear(): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("change" | "apply" | "clear")[], "change" | "apply" | "clear", import('vue').PublicProps, Readonly<{
    size: string;
    placeholder: string;
    options: string;
} & {} & {
    onChange?: ((...args: any[]) => any) | undefined;
    onApply?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
}>, {
    size: string;
    placeholder: string;
    options: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
