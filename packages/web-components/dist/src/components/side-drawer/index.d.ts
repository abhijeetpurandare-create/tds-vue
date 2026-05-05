import { LitElement, nothing } from 'lit';
export type SideDrawerVariant = 'narrow' | 'extended';
interface SideDrawerConfig {
    base?: {
        fontFamily?: string;
        overlayBg?: string;
        shadow?: string;
        transition?: string;
    };
    variants?: Record<string, {
        width?: string;
    }>;
}
export declare class TarmacSideDrawer extends LitElement {
    isOpen: boolean;
    variant: SideDrawerVariant;
    closeOnOverlay: boolean;
    closeOnEsc: boolean;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    private _onEsc;
    render(): import('lit').TemplateResult<1> | typeof nothing;
    private _onOverlayClick;
    private _close;
}
export type { SideDrawerConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-side-drawer': TarmacSideDrawer;
    }
}
