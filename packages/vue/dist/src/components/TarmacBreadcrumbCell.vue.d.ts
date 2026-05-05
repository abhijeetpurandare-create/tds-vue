export type BreadcrumbCellStyle = 'black' | 'blue' | 'dlvRed';
export type BreadcrumbCellSize = 'lg' | 'sm';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    label: {
        type: StringConstructor;
        default: string;
    };
    cellStyle: {
        type: () => BreadcrumbCellStyle;
        default: string;
    };
    size: {
        type: () => BreadcrumbCellSize;
        default: string;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    isGhost: {
        type: BooleanConstructor;
        default: boolean;
    };
    isCurrent: {
        type: BooleanConstructor;
        default: boolean;
    };
    href: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "click"[], "click", import('vue').PublicProps, Readonly<{
    size: BreadcrumbCellSize;
    isGhost: boolean;
    isDisabled: boolean;
    href: string;
    label: string;
    cellStyle: BreadcrumbCellStyle;
    isCurrent: boolean;
} & {} & {
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    size: BreadcrumbCellSize;
    isGhost: boolean;
    isDisabled: boolean;
    href: string;
    label: string;
    cellStyle: BreadcrumbCellStyle;
    isCurrent: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
