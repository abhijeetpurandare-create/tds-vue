import { LitElement } from 'lit';
export type TooltipPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
export type TooltipTrigger = 'hover' | 'click' | 'focus';
export type TooltipVariant = 'white' | 'black' | 'coal';
export type TooltipSize = 'sm' | 'md' | 'lg';
interface TooltipConfig {
    base?: {
        fontFamily?: string;
        radius?: string;
        shadow?: string;
        arrowSize?: string;
    };
    variants?: Record<string, {
        backgroundColor?: string;
        textColor?: string;
    }>;
    sizes?: Record<string, {
        padding?: string;
        fontSize?: string;
    }>;
}
export declare class TarmacTooltip extends LitElement {
    content: string;
    placement: TooltipPlacement;
    trigger: TooltipTrigger;
    variant: TooltipVariant;
    size: TooltipSize;
    visible: boolean;
    private _show;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    updated(changed: Map<string, unknown>): void;
    render(): import('lit').TemplateResult<1>;
    private _onShow;
    private _onHide;
    private _onToggle;
    private _emitChange;
}
export type { TooltipConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-tooltip': TarmacTooltip;
    }
}
