import { LitElement } from 'lit';
export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type TarmacSpinnerVariant = 'tarmac-01' | 'tarmac-02' | 'tarmac-03' | 'tarmac-04';
export type TarmacSpinnerSize = '16px' | '20px' | '24px' | '28px' | '32px' | '36px' | '40px' | '44px';
export declare class TarmacSpinner extends LitElement {
    size: SpinnerSize;
    variant: SpinnerVariant;
    tarmacVariant?: TarmacSpinnerVariant;
    tarmacSize: TarmacSpinnerSize;
    color?: string;
    trackColor?: string;
    private _unsubscribeTheme?;
    private _spinnerConfig;
    static styles: import('lit').CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolveTheme;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-spinner': TarmacSpinner;
    }
}
