import { createContext, useContext } from 'react';

/**
 * Context provided by the Map component inside popup content.
 * Allows child components (e.g. MapPopup) to programmatically
 * dismiss the popup from the map.
 */
export const PopupCloseContext = createContext<(() => void) | null>(null);

/**
 * Hook for popup content components to dismiss the map popup.
 * Returns a close function, or `null` when rendered outside a Map popup.
 */
export const usePopupClose = (): (() => void) | null => useContext(PopupCloseContext);
