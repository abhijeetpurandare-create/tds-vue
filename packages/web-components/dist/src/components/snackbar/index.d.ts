import { LitElement, nothing } from 'lit';
export type SnackbarVariant = 'white' | 'black' | 'coal' | 'success' | 'error' | 'info' | 'warning';
export type SnackbarStyle = 'singleText' | 'dualText';
export type SnackbarSize = 'lg' | 'sm';
export type SnackbarPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom';
interface SnackbarConfig {
    base?: {
        fontFamily?: string;
        radius?: string;
        shadow?: string;
    };
    variants?: Record<string, {
        backgroundColor?: string;
        textColor?: string;
    }>;
}
export declare class TarmacSnackbar extends LitElement {
    message: string;
    title: string;
    variant: SnackbarVariant;
    snackbarStyle: SnackbarStyle;
    size: SnackbarSize;
    trailingIcon: boolean;
    ctAs: boolean;
    denyText: string;
    approveText: string;
    duration: number;
    position: SnackbarPosition;
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
    private _handleDeny;
    private _handleApprove;
    private _emitClose;
}
export type { SnackbarConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-snackbar': TarmacSnackbar;
    }
}
