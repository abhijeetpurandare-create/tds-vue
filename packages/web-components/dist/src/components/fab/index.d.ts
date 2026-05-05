import { LitElement } from 'lit';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
export type FABVariant = 'light' | 'dark' | 'info-blue';
export type FABPositionMode = 'fixed' | 'absolute' | 'relative';
interface FABConfig {
    base?: {
        size?: string;
        shadow?: string;
        transition?: string;
    };
    variants?: Record<string, {
        backgroundColor?: string;
        iconColor?: string;
    }>;
}
export declare class TarmacFab extends LitElement {
    position: FABPosition;
    variant: FABVariant;
    positionMode: FABPositionMode;
    private _isOpen;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
    private _toggle;
}
export type { FABConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-fab': TarmacFab;
    }
}
