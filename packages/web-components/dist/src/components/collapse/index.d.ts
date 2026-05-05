import { LitElement } from 'lit';
interface CollapseConfig {
    base?: {
        fontFamily?: string;
        borderColor?: string;
        radius?: string;
        transition?: string;
        headerPadding?: string;
        contentPadding?: string;
        headerFontSize?: string;
        headerLineHeight?: string;
    };
}
export declare class TarmacCollapse extends LitElement {
    accordion: boolean;
    activeKey: string;
    private _openKeys;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    updated(changed: Map<string, unknown>): void;
    render(): import('lit').TemplateResult<1>;
    private _togglePanel;
}
export type { CollapseConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-collapse': TarmacCollapse;
    }
}
