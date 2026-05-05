declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    isOpen: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    subtext: {
        type: StringConstructor;
        default: string;
    };
    heading: {
        type: StringConstructor;
        default: string;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    showFooter: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCheckbox: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkboxLabel: {
        type: StringConstructor;
        default: string;
    };
    checkboxChecked: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {
    handleClose(): void;
    handleCheckboxChange(e: CustomEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("close" | "checkbox-change")[], "close" | "checkbox-change", import('vue').PublicProps, Readonly<{
    size: string;
    type: string;
    title: string;
    description: string;
    subtext: string;
    isOpen: boolean;
    showFooter: boolean;
    heading: string;
    showHeader: boolean;
    showCheckbox: boolean;
    checkboxLabel: string;
    checkboxChecked: boolean;
} & {} & {
    onClose?: ((...args: any[]) => any) | undefined;
    "onCheckbox-change"?: ((...args: any[]) => any) | undefined;
}>, {
    size: string;
    type: string;
    title: string;
    description: string;
    subtext: string;
    isOpen: boolean;
    showFooter: boolean;
    heading: string;
    showHeader: boolean;
    showCheckbox: boolean;
    checkboxLabel: string;
    checkboxChecked: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
