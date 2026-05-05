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
    snackbarStyle: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    trailingIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    ctAs: {
        type: BooleanConstructor;
        default: boolean;
    };
    denyText: {
        type: StringConstructor;
        default: string;
    };
    approveText: {
        type: StringConstructor;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {
    handleClose(): void;
    handleDeny(): void;
    handleApprove(): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("close" | "deny" | "approve")[], "close" | "deny" | "approve", import('vue').PublicProps, Readonly<{
    variant: string;
    size: string;
    title: string;
    message: string;
    duration: number;
    position: string;
    snackbarStyle: string;
    trailingIcon: boolean;
    ctAs: boolean;
    denyText: string;
    approveText: string;
} & {} & {
    onClose?: ((...args: any[]) => any) | undefined;
    onDeny?: ((...args: any[]) => any) | undefined;
    onApprove?: ((...args: any[]) => any) | undefined;
}>, {
    variant: string;
    size: string;
    title: string;
    message: string;
    duration: number;
    position: string;
    snackbarStyle: string;
    trailingIcon: boolean;
    ctAs: boolean;
    denyText: string;
    approveText: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
