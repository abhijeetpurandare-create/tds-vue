import { LitElement } from 'lit';
import { TarmacAlertVariant, TarmacAlertStyle, TarmacAlertSize, AlertVariant, AlertSize, AlertThemeConfig } from './alert-styles';
export declare class TarmacAlert extends LitElement {
    variant: AlertVariant;
    size: AlertSize;
    title: string;
    description: string;
    closable: boolean;
    alertStyle: TarmacAlertStyle;
    showCtas: boolean;
    cancelText: string;
    proceedText: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    iconColor?: string;
    private _unsubscribeTheme?;
    private _alertConfig;
    private _legacyConfig;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolveTheme;
    render(): import('lit').TemplateResult<1>;
    private _renderTarmac;
    private _renderLegacy;
    private _handleClose;
    private _handleCancel;
    private _handleProceed;
}
export type { TarmacAlertVariant, TarmacAlertStyle, TarmacAlertSize, AlertVariant, AlertSize, AlertThemeConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-alert': TarmacAlert;
    }
}
