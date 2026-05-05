import { LitElement } from 'lit';
export type FilterDropdownSize = 'sm' | 'lg';
interface FilterOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface FilterDropdownConfig {
    base?: {
        fontFamily?: string;
        radius?: string;
        borderColor?: string;
        shadow?: string;
    };
}
export declare class TarmacFilterDropdown extends LitElement {
    placeholder: string;
    size: FilterDropdownSize;
    options: string;
    private _isOpen;
    private _selected;
    private _unsub?;
    private _cfg;
    private _parsedOptions;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _resolve;
    updated(changed: Map<string, unknown>): void;
    private _parseOptions;
    private _onDocClick;
    render(): import('lit').TemplateResult<1>;
    private _toggleDropdown;
    private _toggleOption;
    private _clearAll;
    private _apply;
}
export type { FilterDropdownConfig, FilterOption };
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-filter-dropdown': TarmacFilterDropdown;
    }
}
