import { LitElement, nothing } from 'lit';
export type ModalSize = 'sm' | 'md' | 'lg';
interface ModalConfig {
    base?: {
        fontFamily?: string;
        radius?: string;
        overlayBg?: string;
        shadow?: string;
        transition?: string;
    };
    sizes?: Record<string, {
        maxWidth?: string;
    }>;
}
export declare class TarmacModal extends LitElement {
    isOpen: boolean;
    size: ModalSize;
    title: string;
    closable: boolean;
    maskClosable: boolean;
    width: string;
    centered: boolean;
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
export type { ModalConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-modal': TarmacModal;
    }
}
