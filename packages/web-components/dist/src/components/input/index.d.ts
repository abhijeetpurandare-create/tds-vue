import { LitElement } from 'lit';
export type InputStyle = 'tarmac-01';
export type InputType = 'regular' | 'success' | 'infoBlue' | 'error';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputStyleVariant = 'standard' | 'addonLeft' | 'addonRight';
interface InputConfig {
    base?: {
        fontFamily?: string;
        radius?: string;
        transition?: string;
    };
    types?: Record<string, {
        borderColor?: string;
        focusBorderColor?: string;
    }>;
    sizes?: Record<string, {
        height?: string;
        fontSize?: string;
        padding?: string;
    }>;
    states?: {
        disabled?: Record<string, string>;
        ghost?: Record<string, string>;
    };
}
export declare class TarmacInput extends LitElement {
    inputStyle: InputStyle;
    inputType: InputType;
    inputSize: InputSize;
    styleVariant: InputStyleVariant;
    isDisabled: boolean;
    isGhost: boolean;
    label: string;
    isMandatory: boolean;
    placeholder: string;
    value: string;
    helperTextTop: string;
    helperTextBottom: string;
    subtext: string;
    statusText: string;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
    private _onInput;
    private _onChange;
    private _onFocus;
    private _onBlur;
}
export type { InputConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-input': TarmacInput;
    }
}
