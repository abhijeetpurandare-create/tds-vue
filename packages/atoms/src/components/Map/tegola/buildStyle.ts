/**
 * Build a MapLibre StyleSpecification JSON for Tegola vector tiles
 * and optionally serialize it as a blob URL for use with `mapStyle`.
 */
import { tegolaLayers } from './layers';
import { DEFAULT_GLYPHS, DEFAULT_SPRITE, INDIA_BOUNDS } from './defaults';
import type { TegolaStyleOptions, TegolaSourceConfig } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StyleJSON = Record<string, any>;

/**
 * Build a MapLibre style JSON object for Tegola vector tiles.
 *
 * @example
 * ```ts
 * import { buildTegolaStyle } from '@delhivery/tarmac';
 *
 * const style = buildTegolaStyle({
 *   tileUrl: `${apiBase}/maps/tiles/{z}/{x}/{y}.pbf`,
 * });
 * ```
 */
export function buildTegolaStyle(options: TegolaStyleOptions): StyleJSON {
  const {
    tileUrl,
    glyphs = DEFAULT_GLYPHS,
    sprite = DEFAULT_SPRITE,
    bounds = INDIA_BOUNDS,
    extraLayers = [],
  } = options;

  const source: TegolaSourceConfig = {
    type: 'vector',
    tiles: [tileUrl],
    minzoom: 0,
    maxzoom: 22,
    scheme: 'xyz',
    tolerance: 0,
    bounds,
  };

  return {
    version: 8,
    glyphs,
    sprite,
    sources: { tegola: source },
    layers: [...tegolaLayers, ...extraLayers],
  };
}

/**
 * Build a Tegola style and return it as a blob URL string.
 * Useful for passing directly to `config.mapStyle`.
 *
 * @example
 * ```tsx
 * import { buildTegolaStyleUrl } from '@delhivery/tarmac';
 *
 * const [styleUrl] = useState(() =>
 *   buildTegolaStyleUrl({ tileUrl: `${apiBase}/tiles/{z}/{x}/{y}.pbf` })
 * );
 *
 * <Map config={{ mapStyle: styleUrl }} />
 * ```
 */
export function buildTegolaStyleUrl(options: TegolaStyleOptions): string {
  const styleJson = buildTegolaStyle(options);
  const blob = new Blob([JSON.stringify(styleJson)], { type: 'application/json' });
  return URL.createObjectURL(blob);
}
