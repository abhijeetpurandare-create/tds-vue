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
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    maskClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    centered: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {
    handleClose(): void;
    handleOk(): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("close" | "ok")[], "close" | "ok", import('vue').PublicProps, Readonly<{
    size: string;
    title: string;
    closable: boolean;
    isOpen: boolean;
    maskClosable: boolean;
    width: string;
    centered: boolean;
} & {} & {
    onClose?: ((...args: any[]) => any) | undefined;
    onOk?: ((...args: any[]) => any) | undefined;
}>, {
    size: string;
    title: string;
    closable: boolean;
    isOpen: boolean;
    maskClosable: boolean;
    width: string;
    centered: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
