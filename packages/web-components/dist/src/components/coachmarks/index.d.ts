import { LitElement } from 'lit';
export type CoachmarksVariant = 'white' | 'black';
export type CoachmarksSize = 'sm' | 'lg';
export type CoachmarksArrowPosition = 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end' | 'left-start' | 'left-center' | 'left-end' | 'right-start' | 'right-center' | 'right-end';
interface CoachmarksConfig {
    base?: {
        fontFamily?: string;
        radius?: string;
        shadow?: string;
        arrowSize?: string;
    };
    variants?: Record<string, {
        backgroundColor?: string;
        textColor?: string;
        descriptionColor?: string;
    }>;
    sizes?: Record<string, {
        width?: string;
    }>;
}
export declare class TarmacCoachmarks extends LitElement {
    variant: CoachmarksVariant;
    size: CoachmarksSize;
    arrowPosition: CoachmarksArrowPosition;
    title: string;
    description: string;
    private _unsub?;
    private _cfg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
}
export type { CoachmarksConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-coachmarks': TarmacCoachmarks;
    }
}
