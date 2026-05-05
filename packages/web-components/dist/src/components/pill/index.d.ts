import { LitElement } from 'lit';
export type PillVariant = 'black' | 'white' | 'coal' | 'blue' | 'success' | 'error' | 'warning' | 'legacy_blue';
export type PillSize = 'sm' | 'md' | 'lg';
export type PillType = 'solid' | 'subtle' | 'outlined';
export declare class TarmacPill extends LitElement {
    pillVariant: PillVariant;
    pillType: PillType;
    size: PillSize;
    text: string;
    showStatus: boolean;
    isDisabled: boolean;
    isGhost: boolean;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-pill': TarmacPill;
    }
}
