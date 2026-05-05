import { LitElement } from 'lit';
export type StatusVariant = 'success' | 'failed' | 'warning' | 'information' | 'synced' | 'scheduled' | 'unknown' | 'pause' | 'play' | 'downloading' | 'pending';
export type StatusSize = 'lg' | 'md' | 'sm' | 'xs';
export declare class TarmacStatusIndicator extends LitElement {
    variant: StatusVariant;
    size: StatusSize;
    label: string;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-status-indicator': TarmacStatusIndicator;
    }
}
