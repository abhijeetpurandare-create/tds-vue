import { LitElement } from 'lit';
export type SliderVariant = 'black' | 'coal' | 'dlv_red';
export type SliderSize = 'sm' | 'lg';
export type SliderType = 'single' | 'dual';
export declare class TarmacSlider extends LitElement {
    variant: SliderVariant;
    size: SliderSize;
    sliderType: SliderType;
    value: number;
    min: number;
    max: number;
    step: number;
    isDisabled: boolean;
    private _unsub?;
    private _cfg;
    private _dragging;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
    private _getValueFromEvent;
    private _handleMouseDown;
    private _handleTouchStart;
    private _updateValue;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-slider': TarmacSlider;
    }
}
