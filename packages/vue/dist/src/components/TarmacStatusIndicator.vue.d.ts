export type StatusVariant = 'success' | 'failed' | 'warning' | 'information' | 'synced' | 'scheduled' | 'unknown' | 'pause' | 'play' | 'downloading' | 'pending';
export type StatusSize = 'lg' | 'md' | 'sm' | 'xs';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    variant: {
        type: () => StatusVariant;
        default: string;
    };
    size: {
        type: () => StatusSize;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
    variant: StatusVariant;
    size: StatusSize;
    label: string;
} & {} & {}>, {
    variant: StatusVariant;
    size: StatusSize;
    label: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}>;
export default _default;
