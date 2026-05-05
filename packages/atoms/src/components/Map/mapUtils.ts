/** Zoom level at which marker scale is 1 (no scaling). */
export const DEFAULT_ZOOM_BASE = 10;

export const DEFAULT_VIEW = {
  longitude: 77.5946,
  latitude: 12.9716,
  zoom: 10,
} as const;

/** Compute marker scale from current zoom so markers appear smaller when zoomed out, larger when zoomed in. */
export function getMarkerScaleFromZoom(currentZoom: number, zoomBase: number): number {
  return 2 ** ((currentZoom - zoomBase) * 0.4);
}

/** Map anchor to CSS transform-origin for correct scaling from the pin point. */
export function getTransformOriginFromAnchor(
  anchor:
    | 'center'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
): string {
  const map: Record<string, string> = {
    bottom: 'bottom center',
    top: 'top center',
    left: 'center left',
    right: 'center right',
    center: 'center center',
    'top-left': 'top left',
    'top-right': 'top right',
    'bottom-left': 'bottom left',
    'bottom-right': 'bottom right',
  };
  return map[anchor] ?? 'bottom center';
}

/** Convert a CSS dimension (number → px string, string passthrough). */
export function toCssDimension(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

import type { MapTransformRequestFn, MapTransformRequestResult } from './types';

/**
 * Create a `transformRequest` function that injects headers for
 * tile/resource requests matching a given domain or URL pattern.
 *
 * @param urlPattern - String or RegExp to match against the request URL.
 * @param headers    - Pass a string for a simple `Authorization: Bearer <token>`,
 *                     or a `Record<string, string>` for multiple headers.
 *
 * @example Simple Bearer token
 * ```tsx
 * import { createTransformRequest } from '@delhivery/tarmac';
 *
 * <Map config={{
 *   mapStyle: 'https://tiles.example.com/style.json',
 *   transformRequest: createTransformRequest(
 *     'tiles.example.com',
 *     'my-secret-token',
 *   ),
 * }} />
 * ```
 *
 * @example Multiple headers
 * ```tsx
 * createTransformRequest('tiles.example.com', {
 *   Authorization: 'Bearer my-token',
 *   'X-Api-Key': 'key-123',
 *   'X-Tenant-Id': 'tenant-abc',
 * })
 * ```
 *
 * @example RegExp pattern
 * ```tsx
 * createTransformRequest(
 *   /tiles\.(example|other)\.com/,
 *   { Authorization: 'Bearer tok', 'X-Custom': 'val' },
 * )
 * ```
 */
export function createTransformRequest(
  urlPattern: string | RegExp,
  headers: string | Record<string, string>,
): MapTransformRequestFn {
  const regex =
    typeof urlPattern === 'string'
      ? new RegExp(urlPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      : urlPattern;

  const resolvedHeaders: Record<string, string> =
    typeof headers === 'string'
      ? { Authorization: `Bearer ${headers}` }
      : headers;

  return (url: string, _resourceType: string): MapTransformRequestResult | undefined => {
    if (regex.test(url)) {
      return { url, headers: resolvedHeaders };
    }
    return undefined;
  };
}
