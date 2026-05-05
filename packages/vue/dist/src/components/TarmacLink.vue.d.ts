export type LinkStyle = 'blue' | 'black' | 'white';
export type LinkSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    linkStyle: {
        type: () => LinkStyle;
        default: string;
    };
    size: {
        type: () => LinkSize;
        default: string;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    text: {
        type: StringConstructor;
        default: string;
    };
    href: {
        type: StringConstructor;
        default: string;
    };
    target: {
        type: StringConstructor;
        default: string;
    };
    rel: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "click"[], "click", import('vue').PublicProps, Readonly<{
    size: LinkSize;
    text: string;
    target: string;
    isDisabled: boolean;
    linkStyle: LinkStyle;
    href: string;
    rel: string;
} & {} & {
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    size: LinkSize;
    text: string;
    target: string;
    isDisabled: boolean;
    linkStyle: LinkStyle;
    href: string;
    rel: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
