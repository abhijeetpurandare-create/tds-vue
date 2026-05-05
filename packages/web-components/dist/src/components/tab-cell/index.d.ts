import { LitElement } from 'lit';
export type TabType = 'regular' | 'button';
export type TabOrientation = 'horizontal' | 'vertical';
export type TabStyle = 'black' | 'blue' | 'dlvRed';
export type TabSize = 'lg' | 'sm';
export declare class TarmacTabCell extends LitElement {
    tabType: TabType;
    orientation: TabOrientation;
    tabStyle: TabStyle;
    size: TabSize;
    isPressed: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    isGhost: boolean;
    tabTitle: string;
    subtext: string;
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
        'tarmac-tab-cell': TarmacTabCell;
    }
}
