import { LitElement } from 'lit';
export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';
export declare class TarmacProgressBar extends LitElement {
    value: number;
    size: ProgressBarSize;
    variant: ProgressBarVariant;
    showPercentage: boolean;
    trackColor?: string;
    textColor?: string;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-progress-bar': TarmacProgressBar;
    }
}
