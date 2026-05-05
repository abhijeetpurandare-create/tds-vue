declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    isOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    variant: {
        type: StringConstructor;
        default: string;
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
    variant: string;
    isOpen: boolean;
    closeOnOverlay: boolean;
    closeOnEsc: boolean;
} & {} & {
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    variant: string;
    isOpen: boolean;
    closeOnOverlay: boolean;
    closeOnEsc: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
