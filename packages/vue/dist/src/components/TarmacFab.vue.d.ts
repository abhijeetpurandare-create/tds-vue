declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    position: {
        type: StringConstructor;
        default: string;
    };
    variant: {
        type: StringConstructor;
        default: string;
    };
    positionMode: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {
    handleToggle(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "toggle"[], "toggle", import('vue').PublicProps, Readonly<{
    variant: string;
    position: string;
    positionMode: string;
} & {} & {
    onToggle?: ((...args: any[]) => any) | undefined;
}>, {
    variant: string;
    position: string;
    positionMode: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
