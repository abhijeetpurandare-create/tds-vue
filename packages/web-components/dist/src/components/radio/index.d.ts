import { LitElement } from 'lit';
export type RadioVariant = 'standard' | 'blue' | 'green' | 'dlv_red';
export type RadioStyle = 'box' | 'rounded';
export type RadioSize = 'sm' | 'md' | 'lg';
interface RadioConfig {
    base?: {
        fontFamily?: string;
        transition?: string;
    };
    variants?: Record<string, {
        checkedColor?: string;
        borderColor?: string;
        dotColor?: string;
    }>;
    sizes?: Record<string, {
        radioSize?: string;
        dotSize?: string;
        labelFontSize?: string;
        labelLineHeight?: string;
    }>;
    states?: {
        disabled?: Record<string, string>;
    };
}
export declare class TarmacRadio extends LitElement {
    tarmacVariant: RadioVariant;
    tarmacStyle: RadioStyle;
    size: RadioSize;
    checked: boolean;
    disabled: boolean;
    value: string;
    name: string;
    subtext: string;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
    private _handleClick;
    private _handleChange;
}
export type { RadioConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-radio': TarmacRadio;
    }
}
