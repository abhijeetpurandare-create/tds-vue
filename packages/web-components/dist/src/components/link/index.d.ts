import { LitElement } from 'lit';
export type LinkStyle = 'blue' | 'black' | 'white';
export type LinkSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export declare class TarmacLink extends LitElement {
    linkStyle: LinkStyle;
    size: LinkSize;
    isDisabled: boolean;
    text: string;
    href: string;
    target: string;
    rel: string;
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
        'tarmac-link': TarmacLink;
    }
}
