/**
 * Tarmac Design System — Theme Loader
 *
 * Framework-agnostic utility to load theme JSON from a URL or local path.
 * This mirrors the loading logic from the React ThemeProvider but without
 * any React dependency.
 */
export interface Theme {
    [key: string]: string | number | Theme | any;
}
export interface ThemeLoaderOptions {
    /** URL or path to the theme JSON file */
    source: string;
    /** Theme variant to select (e.g. "light", "dark") */
    activeTheme?: string;
    /** Override values merged on top of the loaded theme */
    overrides?: Theme;
}
/**
 * Load a theme JSON from a URL or local path.
 * Returns the resolved theme object.
 */
export declare function loadTheme(options: ThemeLoaderOptions): Promise<Theme>;
