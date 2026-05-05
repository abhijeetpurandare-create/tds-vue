import { LitElement } from 'lit';
export type StepperIconStyle = 'black' | 'coal' | 'dlv_red' | 'blue' | 'green' | 'numeric' | 'icon';
export type StepperIconVariant = 'solid' | 'outlined' | 'focused' | 'disabled' | 'ghost';
export type StepperIconSize = 'sm' | 'md' | 'lg';
export declare class TarmacStepperIcon extends LitElement {
    stepperStyle: StepperIconStyle;
    variant: StepperIconVariant;
    size: StepperIconSize;
    stepNumber: number;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-stepper-icon': TarmacStepperIcon;
    }
}
