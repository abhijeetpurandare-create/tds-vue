declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    message: {
        type: StringConstructor;
        default: string;
    };
    title: {
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
    duration: {
        type: NumberConstructor;
        default: number;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    position: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {
    handleClose(): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "close"[], "close", import('vue').PublicProps, Readonly<{
    variant: string;
    size: string;
    title: string;
    closable: boolean;
    message: string;
    duration: number;
    position: string;
} & {} & {
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    variant: string;
    size: string;
    title: string;
    closable: boolean;
    message: string;
    duration: number;
    position: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
