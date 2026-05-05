import { LitElement } from 'lit';
export type BreadcrumbCellStyle = 'black' | 'blue' | 'dlvRed';
export type BreadcrumbCellSize = 'lg' | 'sm';
export declare class TarmacBreadcrumbCell extends LitElement {
    label: string;
    cellStyle: BreadcrumbCellStyle;
    size: BreadcrumbCellSize;
    isDisabled: boolean;
    isGhost: boolean;
    isCurrent: boolean;
    href: string;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
    private _handleClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-breadcrumb-cell': TarmacBreadcrumbCell;
    }
}
