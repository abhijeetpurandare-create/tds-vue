export type AlertVariant = 'default' | 'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'white' | 'black' | 'coal' | 'error';
export type AlertSize = 'sm' | 'md' | 'lg';
export type AlertStyle = 'singleText' | 'dualText';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    variant: {
        type: () => AlertVariant;
        default: string;
    };
    size: {
        type: () => AlertSize;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    alertStyle: {
        type: () => AlertStyle;
        default: string;
    };
    showCtas: {
        type: BooleanConstructor;
        default: boolean;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    proceedText: {
        type: StringConstructor;
        default: string;
    };
    backgroundColor: {
        type: StringConstructor;
        default: undefined;
    };
    borderColor: {
        type: StringConstructor;
        default: undefined;
    };
    textColor: {
        type: StringConstructor;
        default: undefined;
    };
    iconColor: {
        type: StringConstructor;
        default: undefined;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("close" | "cancel" | "proceed")[], "close" | "cancel" | "proceed", import('vue').PublicProps, Readonly<{
    variant: AlertVariant;
    size: AlertSize;
    title: string;
    description: string;
    closable: boolean;
    alertStyle: AlertStyle;
    showCtas: boolean;
    cancelText: string;
    proceedText: string;
} & {
    backgroundColor?: string | undefined;
    borderColor?: string | undefined;
    textColor?: string | undefined;
    iconColor?: string | undefined;
} & {
    onCancel?: ((...args: any[]) => any) | undefined;
    onProceed?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    variant: AlertVariant;
    size: AlertSize;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    title: string;
    description: string;
    closable: boolean;
    alertStyle: AlertStyle;
    showCtas: boolean;
    cancelText: string;
    proceedText: string;
    iconColor: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
