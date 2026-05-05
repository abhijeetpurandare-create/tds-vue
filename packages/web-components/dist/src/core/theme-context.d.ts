import { Theme } from '@tarmac/tokens';
/**
 * Walk up the DOM tree to find the nearest <tarmac-theme-provider>.
 * Returns its theme object, or an empty object if none found.
 */
export declare function getThemeFromContext(element: HTMLElement): Theme;
/**
 * Subscribe to theme changes from the nearest provider.
 * Returns an unsubscribe function.
 */
export declare function subscribeToTheme(element: HTMLElement, callback: (theme: Theme) => void): () => void;
