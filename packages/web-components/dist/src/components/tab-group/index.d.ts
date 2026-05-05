import { LitElement } from 'lit';
export type TabGroupOrientation = 'horizontal' | 'vertical';
export type TabGroupSize = 'lg' | 'sm';
interface TabGroupConfig {
    base?: {
        fontFamily?: string;
        borderColor?: string;
    };
}
export declare class TarmacTabGroup extends LitElement {
    orientation: TabGroupOrientation;
    size: TabGroupSize;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
    private _onTabClick;
}
export type { TabGroupConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-tab-group': TarmacTabGroup;
    }
}
