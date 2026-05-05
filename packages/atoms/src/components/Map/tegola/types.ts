/**
 * Types for Tegola vector tile configuration.
 */

/** Bounding box as [west, south, east, north] */
export type BBox = [number, number, number, number];

/** Tegola tile source configuration */
export interface TegolaSourceConfig {
  type: 'vector';
  tiles: string[];
  minzoom: number;
  maxzoom: number;
  scheme: 'xyz';
  tolerance: number;
  bounds?: BBox;
}

/** Options for building a Tegola MapLibre style */
export interface TegolaStyleOptions {
  /** Full tile URL with `{z}`, `{x}`, `{y}` placeholders */
  tileUrl: string;
  /** Glyph font URL (defaults to openmaptiles CDN) */
  glyphs?: string;
  /** Sprite URL for map icons (defaults to osm-liberty) */
  sprite?: string;
  /** Bounding box to restrict tile fetching */
  bounds?: BBox;
  /** Additional layers to append after the default Tegola layers */
  extraLayers?: Record<string, unknown>[];
}

/** Layers that support click/hover interactions */
export type InteractiveLayerId = string;
