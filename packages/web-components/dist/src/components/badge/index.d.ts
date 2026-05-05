import { LitElement } from 'lit';
import { BadgeVariant, BadgeSize, BadgeType, BadgeConfig } from './badge-styles';
export declare class TarmacBadge extends LitElement {
    variant: BadgeVariant;
    size: BadgeSize;
    badgeType: BadgeType;
    text: string;
    showStatus: boolean;
    isDisabled: boolean;
    isGhost: boolean;
    private _unsubscribeTheme?;
    private _badgeConfig;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolveTheme;
    render(): import('lit').TemplateResult<1>;
}
export type { BadgeVariant, BadgeSize, BadgeType, BadgeConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-badge': TarmacBadge;
    }
}
