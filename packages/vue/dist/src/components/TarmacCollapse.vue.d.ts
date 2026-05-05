declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    accordion: {
        type: BooleanConstructor;
        default: boolean;
    };
    activeKey: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {
    handleChange(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "change"[], "change", import('vue').PublicProps, Readonly<{
    accordion: boolean;
    activeKey: string;
} & {} & {
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    accordion: boolean;
    activeKey: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
