import { LitElement } from 'lit';
export type OtpStyle = 'tarmac-01';
export type OtpSize = 'sm' | 'md' | 'lg';
export type OtpVariant = 'default' | 'success' | 'error' | 'info';
export type OtpInputType = 'text' | 'password' | 'number';
interface OtpConfig {
    base?: {
        fontFamily?: string;
        radius?: string;
        transition?: string;
    };
    variants?: Record<string, {
        borderColor?: string;
        focusBorderColor?: string;
    }>;
    sizes?: Record<string, {
        boxSize?: string;
        fontSize?: string;
    }>;
    states?: {
        disabled?: Record<string, string>;
    };
}
export declare class TarmacOtpInput extends LitElement {
    numDigits: number;
    otpStyle: OtpStyle;
    otpSize: OtpSize;
    otpVariant: OtpVariant;
    isDisabled: boolean;
    placeholder: string;
    inputType: OtpInputType;
    label: string;
    helperText: string;
    value: string;
    private _digits;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    updated(changed: Map<string, unknown>): void;
    render(): import('lit').TemplateResult<1>;
    private _getInputs;
    private _onDigitInput;
    private _onKeyDown;
    private _onPaste;
}
export type { OtpConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-otp-input': TarmacOtpInput;
    }
}
