export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'black' | 'white' | 'info' | 'success' | 'error' | 'warning' | 'dlv_red' | 'coal';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonStyle = 'primary' | 'secondary' | 'tertiary';
export type ButtonType = 'button' | 'iconButton';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    variant: {
        type: () => ButtonVariant;
        default: string;
    };
    size: {
        type: () => ButtonSize;
        default: string;
    };
    buttonStyle: {
        type: () => ButtonStyle;
        default: string;
    };
    buttonType: {
        type: () => ButtonType;
        default: string;
    };
    isLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    isRounded: {
        type: BooleanConstructor;
        default: boolean;
    };
    isGhost: {
        type: BooleanConstructor;
        default: boolean;
    };
    text: {
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
    hoverColor: {
        type: StringConstructor;
        default: undefined;
    };
    radius: {
        type: StringConstructor;
        default: undefined;
    };
    border: {
        type: StringConstructor;
        default: undefined;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "click"[], "click", import('vue').PublicProps, Readonly<{
    variant: ButtonVariant;
    size: ButtonSize;
    buttonStyle: ButtonStyle;
    buttonType: ButtonType;
    isLoading: boolean;
    disabled: boolean;
    isRounded: boolean;
    isGhost: boolean;
    text: string;
} & {
    backgroundColor?: string | undefined;
    borderColor?: string | undefined;
    textColor?: string | undefined;
    hoverColor?: string | undefined;
    radius?: string | undefined;
    border?: string | undefined;
} & {
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    variant: ButtonVariant;
    size: ButtonSize;
    buttonStyle: ButtonStyle;
    buttonType: ButtonType;
    isLoading: boolean;
    disabled: boolean;
    isRounded: boolean;
    isGhost: boolean;
    text: string;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    hoverColor: string;
    radius: string;
    border: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
