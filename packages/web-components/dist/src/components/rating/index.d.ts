import { LitElement } from 'lit';
export type RatingSize = 'lg' | 'md' | 'sm';
export declare class TarmacRating extends LitElement {
    value: number;
    maxStars: number;
    size: RatingSize;
    readOnly: boolean;
    allowHalf: boolean;
    private _unsub?;
    private _cfg;
    private _hoverValue;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    render(): import('lit').TemplateResult<1>;
    private _handleClick;
    private _handleHover;
    private _handleLeave;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-rating': TarmacRating;
    }
}
