import { LitElement, nothing } from 'lit';
export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default';
export type ToastSize = 'sm' | 'md' | 'lg';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom';
interface ToastConfig {
    base?: {
        fontFamily?: string;
        radius?: string;
        shadow?: string;
    };
    variants?: Record<string, {
        accentColor?: string;
    }>;
}
export declare class TarmacToast extends LitElement {
    message: string;
    title: string;
    variant: ToastVariant;
    size: ToastSize;
    duration: number;
    closable: boolean;
    position: ToastPosition;
    private _visible;
    private _timer?;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    updated(changed: Map<string, unknown>): void;
    private _startTimer;
    private _clearTimer;
    render(): import('lit').TemplateResult<1> | typeof nothing;
    private _handleClose;
    private _emitClose;
}
export type { ToastConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-toast': TarmacToast;
    }
}
