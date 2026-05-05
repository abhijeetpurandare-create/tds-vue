import { LitElement } from 'lit';
import { ChipType, ChipVariant, ChipSize, ChipConfig } from './chip-styles';
export declare class TarmacChip extends LitElement {
    chipType: ChipType;
    chipVariant: ChipVariant;
    size: ChipSize;
    text: string;
    statusLeft: boolean;
    statusRight: boolean;
    isDisabled: boolean;
    isGhost: boolean;
    private _unsubscribeTheme?;
    private _chipConfig;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolveTheme;
    render(): import('lit').TemplateResult<1>;
    private _handleClick;
    private _handleKeydown;
}
export type { ChipType, ChipVariant, ChipSize, ChipConfig };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-chip': TarmacChip;
    }
}
