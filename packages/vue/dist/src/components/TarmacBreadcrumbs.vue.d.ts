export type DividerStyle = 'slash' | 'chevron';
export type BreadcrumbsSize = 'lg' | 'sm';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    dividerStyle: {
        type: () => DividerStyle;
        default: string;
    };
    size: {
        type: () => BreadcrumbsSize;
        default: string;
    };
    showDivider: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
    size: BreadcrumbsSize;
    dividerStyle: DividerStyle;
    showDivider: boolean;
} & {} & {}>, {
    size: BreadcrumbsSize;
    dividerStyle: DividerStyle;
    showDivider: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
