import { LitElement } from 'lit';
export type TarmacToggleColor = 'black' | 'blue' | 'dlv_red' | 'green';
export type TarmacToggleStyle = 'filled' | 'outlined';
export type TarmacToggleSize = 'lg' | 'sm';
export declare class TarmacToggle extends LitElement {
    tarmacColor: TarmacToggleColor;
    tarmacStyle: TarmacToggleStyle;
    tarmacSize: TarmacToggleSize;
    checked: boolean;
    disabled: boolean;
    isGhost: boolean;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    static styles: import('lit').CSSResult;
    render(): import('lit').TemplateResult<1>;
    private _toggle;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-toggle': TarmacToggle;
    }
}
