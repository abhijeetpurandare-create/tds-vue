declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    isOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    subtext: {
        type: StringConstructor;
        default: string;
    };
    showFooter: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnOverlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnEsc: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {
    handleClose(): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "close"[], "close", import('vue').PublicProps, Readonly<{
    size: string;
    title: string;
    subtext: string;
    isOpen: boolean;
    showFooter: boolean;
    closeOnOverlay: boolean;
    closeOnEsc: boolean;
} & {} & {
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    size: string;
    title: string;
    subtext: string;
    isOpen: boolean;
    showFooter: boolean;
    closeOnOverlay: boolean;
    closeOnEsc: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
