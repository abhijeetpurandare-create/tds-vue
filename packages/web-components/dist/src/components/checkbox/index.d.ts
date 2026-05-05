import { LitElement } from 'lit';
import { TarmacCheckboxVariant, TarmacCheckboxStyle, TarmacCheckboxSize, CheckboxTarmacConfig } from './checkbox-styles';
export declare class TarmacCheckbox extends LitElement {
    tarmacVariant: TarmacCheckboxVariant;
    tarmacStyle: TarmacCheckboxStyle;
    size: TarmacCheckboxSize;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    value: string;
    name: string;
    subtext: string;
    private _unsubscribeTheme?;
    private _checkboxConfig;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolveTheme;
    render(): import('lit').TemplateResult<1>;
    private _handleClick;
    private _handleChange;
}
export type { TarmacCheckboxVariant, TarmacCheckboxStyle, TarmacCheckboxSize, CheckboxTarmacConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-checkbox': TarmacCheckbox;
    }
}
