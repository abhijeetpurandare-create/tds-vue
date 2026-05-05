import { LitElement, nothing } from 'lit';
export type PopupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
interface PopupConfig {
    base?: {
        fontFamily?: string;
        radius?: string;
        overlayBg?: string;
        shadow?: string;
    };
    sizes?: Record<string, {
        maxWidth?: string;
    }>;
}
export declare class TarmacPopup extends LitElement {
    isOpen: boolean;
    size: PopupSize;
    title: string;
    subtext: string;
    showFooter: boolean;
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
export type { PopupConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-popup': TarmacPopup;
    }
}
