/**
 * Theme Context
 *
 * Provides a way for child Web Components to access the nearest
 * <tarmac-theme-provider>'s theme data, mirroring React's useTheme() hook.
 */

import type { Theme } from '@tarmac/tokens';
import { THEME_LOADED_EVENT } from '../components/theme-provider/index';

/**
 * Walk up the DOM tree to find the nearest <tarmac-theme-provider>.
 * Returns its theme object, or an empty object if none found.
 */
export function getThemeFromContext(element: HTMLElement): Theme {
  let current: Node | null = element;

  while (current) {
    // Check composed parent (crosses shadow DOM boundaries)
    if (current instanceof HTMLElement && current.tagName === 'TARMAC-THEME-PROVIDER') {
      return (current as any).getTheme?.() ?? {};
    }

    // Walk up: assignedSlot → host → parentNode
    if (current instanceof HTMLElement && current.assignedSlot) {
      current = current.assignedSlot;
    } else if ((current as any).host) {
      current = (current as any).host;
    } else {
      current = current.parentNode;
    }
  }

  return {};
}

/**
 * Subscribe to theme changes from the nearest provider.
 * Returns an unsubscribe function.
 */
export function subscribeToTheme(
  element: HTMLElement,
  callback: (theme: Theme) => void,
): () => void {
  const handler = (event: Event) => {
    const detail = (event as CustomEvent).detail;
    if (detail?.theme) {
      callback(detail.theme);
    }
  };

  // Listen on window for bubbled theme events
  window.addEventListener(THEME_LOADED_EVENT, handler);

  return () => {
    window.removeEventListener(THEME_LOADED_EVENT, handler);
  };
}
