import { LitElement, nothing } from 'lit';
export type DialogBoxType = 'standard' | 'slots' | 'slotsx2';
export type DialogBoxSize = 'mobile' | 'web';
interface DialogBoxConfig {
    base?: {
        fontFamily?: string;
        radius?: string;
        overlayBg?: string;
        shadow?: string;
    };
}
export declare class TarmacDialogBox extends LitElement {
    isOpen: boolean;
    type: DialogBoxType;
    size: DialogBoxSize;
    title: string;
    subtext: string;
    heading: string;
    description: string;
    showHeader: boolean;
    showFooter: boolean;
    showCheckbox: boolean;
    checkboxLabel: string;
    checkboxChecked: boolean;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    private _onEsc;
    render(): import('lit').TemplateResult<1> | typeof nothing;
    private _onOverlayClick;
    private _close;
    private _onCheckbox;
}
export type { DialogBoxConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-dialog-box': TarmacDialogBox;
    }
}
