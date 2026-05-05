import { LitElement } from 'lit';
export type DividerStyle = 'slash' | 'chevron';
export type BreadcrumbsSize = 'lg' | 'sm';
export declare class TarmacBreadcrumbs extends LitElement {
    dividerStyle: DividerStyle;
    size: BreadcrumbsSize;
    showDivider: boolean;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
    private _handleSlotChange;
    private _getDividerSVG;
    updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-breadcrumbs': TarmacBreadcrumbs;
    }
}
