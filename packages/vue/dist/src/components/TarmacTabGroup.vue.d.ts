declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    orientation: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {
    handleTabChange(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "tab-change"[], "tab-change", import('vue').PublicProps, Readonly<{
    size: string;
    orientation: string;
} & {} & {
    "onTab-change"?: ((...args: any[]) => any) | undefined;
}>, {
    size: string;
    orientation: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
