import { LitElement } from 'lit';
import { ButtonVariant, ButtonSize, ButtonStyle, ButtonType, ButtonConfig } from './button-styles';
export declare class TarmacButton extends LitElement {
    variant: ButtonVariant;
    size: ButtonSize;
    buttonStyle: ButtonStyle;
    buttonType: ButtonType;
    isLoading: boolean;
    disabled: boolean;
    isRounded: boolean;
    isGhost: boolean;
    text: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    hoverColor?: string;
    radius?: string;
    border?: string;
    private _unsubscribeTheme?;
    private _buttonConfig;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolveTheme;
    protected createRenderRoot(): HTMLElement | DocumentFragment;
    render(): import('lit').TemplateResult<1>;
    private _handleClick;
    private _hasSlottedContent;
}
export type { ButtonVariant, ButtonSize, ButtonStyle, ButtonType, ButtonConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-button': TarmacButton;
    }
}
