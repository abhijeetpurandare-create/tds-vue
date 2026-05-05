/**
 * Tegola Vector Tile utilities for the Map component.
 *
 * Provides a reusable, pre-configured MapLibre style for Delhivery's
 * Tegola vector tile server with all India layers (water, landuse,
 * roads, buildings, POIs, boundaries, highway shields, labels).
 *
 * @example Quick usage
 * ```tsx
 * import { Map, buildTegolaStyleUrl, INDIA_MAX_BOUNDS } from '@delhivery/tarmac';
 *
 * const styleUrl = buildTegolaStyleUrl({
 *   tileUrl: `${apiBase}/maps/tiles/{z}/{x}/{y}.pbf`,
 * });
 *
 * <Map config={{ mapStyle: styleUrl, maxBounds: INDIA_MAX_BOUNDS }} />
 * ```
 */
export { buildTegolaStyle, buildTegolaStyleUrl } from './buildStyle';
export { tegolaLayers, interactiveLayerIds } from './layers';
export { DEFAULT_GLYPHS, DEFAULT_SPRITE, INDIA_BOUNDS, INDIA_MAX_BOUNDS } from './defaults';
export type { TegolaStyleOptions, TegolaSourceConfig, BBox, InteractiveLayerId } from './types';
