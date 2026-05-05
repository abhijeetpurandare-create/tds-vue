import { LitElement } from 'lit';
export type DividerType = 'line' | 'dash';
export type DividerSize = '0.5' | '1' | '1.5';
export declare class TarmacDivider extends LitElement {
    dividerType: DividerType;
    size: DividerSize;
    color?: string;
    orientation: 'horizontal' | 'vertical';
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-divider': TarmacDivider;
    }
}
