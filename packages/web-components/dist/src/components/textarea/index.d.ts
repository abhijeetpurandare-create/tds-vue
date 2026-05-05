import { LitElement } from 'lit';
export type TextAreaStyle = 'tarmac-01';
export type TextAreaType = 'regular' | 'success' | 'error' | 'infoBlue';
export type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';
interface TextAreaConfig {
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
        minHeight?: string;
        fontSize?: string;
        padding?: string;
    }>;
    states?: {
        disabled?: Record<string, string>;
        ghost?: Record<string, string>;
    };
}
export declare class TarmacTextArea extends LitElement {
    textAreaStyle: TextAreaStyle;
    textAreaType: TextAreaType;
    textAreaSize: TextAreaSize;
    isDisabled: boolean;
    isGhost: boolean;
    label: string;
    placeholder: string;
    value: string;
    rows: number;
    resize: TextAreaResize;
    helperTextTop: string;
    helperTextBottom: string;
    statusText: string;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
    private _onInput;
    private _onChange;
}
export type { TextAreaConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-textarea': TarmacTextArea;
    }
}
