import { LitElement } from 'lit';
import { Theme } from '@tarmac/tokens';
/**
 * Event name dispatched when theme is loaded/updated.
 * Child components listen for this to re-render with new theme data.
 */
export declare const THEME_LOADED_EVENT = "tarmac-theme-loaded";
export declare const THEME_UPDATED_EVENT = "tarmac-theme-updated";
export declare class TarmacThemeProvider extends LitElement {
    /** URL or path to the theme JSON file */
    source: string;
    /** Active theme variant (e.g. "light", "dark") */
    activeTheme: string;
    /** The resolved theme object — available to child components */
    theme: Theme;
    /** Loading state */
    isLoading: boolean;
    /** Ready state */
    isReady: boolean;
    static styles: import('lit').CSSResult[];
    connectedCallback(): void;
    updated(changedProperties: Map<string, unknown>): void;
    private _loadTheme;
    /**
     * Get the current theme. Called by child components.
     */
    getTheme(): Theme;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tarmac-theme-provider': TarmacThemeProvider;
    }
}
