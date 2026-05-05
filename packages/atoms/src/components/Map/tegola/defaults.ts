/**
 * Default constants for Tegola vector tile maps.
 */
import type { BBox } from './types';

/** Free glyph CDN hosting Open Sans and other common fonts */
export const DEFAULT_GLYPHS = 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf';

/** OSM Liberty sprite set — provides icons for POIs, airports, etc. */
export const DEFAULT_SPRITE = 'https://maputnik.github.io/osm-liberty/sprites/osm-liberty';

/** India bounding box (covers mainland + islands) */
export const INDIA_BOUNDS: BBox = [68.1766451354, 7.96553477623, 97.4025614766, 36.8];

/** Extended India bounds for maxBounds (includes neighbours for smooth panning) */
export const INDIA_MAX_BOUNDS: [[number, number], [number, number]] = [
  [62.0, 2.0],
  [100.0, 38.0],
];
