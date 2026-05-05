declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    content: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    trigger: {
        type: StringConstructor;
        default: string;
    };
    variant: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {
    handleVisibleChange(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "visible-change"[], "visible-change", import('vue').PublicProps, Readonly<{
    variant: string;
    size: string;
    content: string;
    placement: string;
    trigger: string;
    visible: boolean;
} & {} & {
    "onVisible-change"?: ((...args: any[]) => any) | undefined;
}>, {
    variant: string;
    size: string;
    content: string;
    placement: string;
    trigger: string;
    visible: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
