export type TabType = 'regular' | 'button';
export type TabOrientation = 'horizontal' | 'vertical';
export type TabStyle = 'black' | 'blue' | 'dlvRed';
export type TabSize = 'lg' | 'sm';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    tabType: {
        type: () => TabType;
        default: string;
    };
    orientation: {
        type: () => TabOrientation;
        default: string;
    };
    tabStyle: {
        type: () => TabStyle;
        default: string;
    };
    size: {
        type: () => TabSize;
        default: string;
    };
    isPressed: {
        type: BooleanConstructor;
        default: boolean;
    };
    isSelected: {
        type: BooleanConstructor;
        default: boolean;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    isGhost: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    subtext: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "click"[], "click", import('vue').PublicProps, Readonly<{
    size: TabSize;
    isGhost: boolean;
    title: string;
    isDisabled: boolean;
    subtext: string;
    orientation: TabOrientation;
    tabType: TabType;
    tabStyle: TabStyle;
    isPressed: boolean;
    isSelected: boolean;
} & {} & {
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    size: TabSize;
    isGhost: boolean;
    title: string;
    isDisabled: boolean;
    subtext: string;
    orientation: TabOrientation;
    tabType: TabType;
    tabStyle: TabStyle;
    isPressed: boolean;
    isSelected: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
