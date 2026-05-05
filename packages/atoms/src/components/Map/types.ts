import React from 'react';

export interface MapInitialViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export interface MapConfig {
  /** Initial camera position */
  initialViewState?: MapInitialViewState;
  /** Map tile style URL (MapLibre style JSON or raster tile URL) */
  mapStyle?: string;
  /** Minimum zoom level */
  minZoom?: number;
  /** Maximum zoom level */
  maxZoom?: number;
  /** Reuse map instance across mounts for performance */
  reuseMaps?: boolean;
  /** Max parallel image/tile requests */
  maxParallelImageRequests?: number;
  /** Show attribution control */
  attributionControl?: boolean;
  /** Enable scroll wheel zoom */
  scrollZoom?: boolean;
  /** Enable drag pan */
  dragPan?: boolean;
  /** Enable double-click zoom */
  doubleClickZoom?: boolean;
  /** Enable touch zoom and rotate */
  touchZoomRotate?: boolean;
  /**
   * Restrict the map viewport to a bounding box.
   * Format: `[[swLng, swLat], [neLng, neLat]]`
   *
   * @example Restrict to India
   * ```tsx
   * config={{ maxBounds: [[62, 2], [100, 38]] }}
   * ```
   */
  maxBounds?: [[number, number], [number, number]];
  /** Show navigation control (zoom +/-) */
  showNavigationControl?: boolean;
  /** Show scale control */
  showScaleControl?: boolean;
  /** Show fullscreen control */
  showFullscreenControl?: boolean;
  /**
   * When true (default), marker icons scale with map zoom (smaller when zoomed out, larger when zoomed in).
   * Set to false for fixed-size markers.
   */
  markerScaleWithZoom?: boolean;
  /** Zoom level at which marker scale is 1. Defaults to initialViewState.zoom or 10. */
  markerZoomBase?: number;
  /**
   * Padding (in px) used when auto-fitting the map to geofence bounds.
   * Accepts a single number (applied to all sides) or per-side object.
   * Defaults to 50.
   */
  fitBoundsPadding?: number | { top?: number; bottom?: number; left?: number; right?: number };
  /**
   * Intercept tile/resource requests to inject auth headers or rewrite URLs.
   * Called by MapLibre for every resource fetch (tiles, glyphs, sprites, style JSON).
   *
   * @see https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
   *
   * @example
   * ```tsx
   * config={{
   *   mapStyle: 'https://tiles.example.com/style.json',
   *   transformRequest: (url, resourceType) => {
   *     if (resourceType === 'Tile' && url.includes('tiles.example.com')) {
   *       return { url, headers: { Authorization: 'Bearer <token>' } };
   *     }
   *   },
   * }}
   * ```
   */
  transformRequest?: MapTransformRequestFn;
}

/**
 * Resource types that MapLibre passes to `transformRequest`.
 * @see https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/RequestTransformFunction/
 */
export type MapResourceType =
  | 'Unknown'
  | 'Style'
  | 'Source'
  | 'Tile'
  | 'Glyphs'
  | 'SpriteImage'
  | 'SpriteJSON'
  | 'Image';

/** Return value from a transformRequest function. */
export interface MapTransformRequestResult {
  /** The (optionally rewritten) URL to fetch */
  url: string;
  /** Custom headers to attach to the request */
  headers?: Record<string, string>;
  /** Credentials mode — 'same-origin' | 'include' | 'omit' */
  credentials?: 'same-origin' | 'include' | 'omit';
}

/**
 * Signature for the `transformRequest` callback.
 * Return `undefined` to let the request pass through unchanged.
 */
export type MapTransformRequestFn = (
  url: string,
  resourceType: MapResourceType,
) => MapTransformRequestResult | undefined;

export interface MapMarkerConfig {
  /** Marker pin color */
  color?: string;
  /** Marker size in pixels */
  size?: number;
  /** Custom React icon to render as marker */
  icon?: React.ReactNode;
  /** Anchor position of the marker */
  anchor?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface MapPoint {
  /** Unique identifier */
  id: string;
  /** Latitude */
  lat: number;
  /** Longitude */
  lng: number;
  /** ReactNode shown in popup when marker is clicked */
  tooltip?: React.ReactNode;
  /** Marker appearance configuration (colour, size, anchor, icon shortcut) */
  marker?: MapMarkerConfig;
  /**
   * Fully custom marker render function.
   * When provided, overrides `marker.icon` / `marker.color` / `marker.size`.
   * The returned node is placed directly on the map at the point's coordinates.
   *
   * @example
   * ```tsx
   * renderMarker={(point) => (
   *   <MyCustomPin label={point.data?.code as string} />
   * )}
   * ```
   */
  renderMarker?: (point: MapPoint) => React.ReactNode;
  /** Any arbitrary data to pass along with the point */
  data?: Record<string, unknown>;
}

export interface MapProps {
  /** Container height (CSS value or number in px) */
  height?: string | number;
  /** Container width (CSS value or number in px) */
  width?: string | number;
  /** Map configuration object */
  config?: MapConfig;
  /** Array of points to plot on the map */
  points?: MapPoint[];
  /** Fires when a marker is clicked */
  onPointClick?: (point: MapPoint) => void;
  /**
   * Fires when the popup is closed — whether by clicking the MapPopup close
   * button, clicking outside the popup, or toggling the same marker again.
   * Receives the point whose popup was dismissed.
   */
  onPopupClose?: (point: MapPoint) => void;
  /** Fires when map finishes loading */
  onMapLoad?: (event: unknown) => void;
  /** Fires when map viewport moves */
  onMapMove?: (viewState: MapViewState) => void;
  /** Additional CSS class for the container */
  className?: string;
  /** Inline style for the container */
  style?: React.CSSProperties;
  /** Array of geofences to render on the map */
  geofences?: MapGeofence[];
  /** Render additional react-map-gl layers/sources as children */
  children?: React.ReactNode;
}

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

/** A single geofence definition to render on the map */
export interface MapGeofence {
  /** Unique identifier for this geofence */
  id: string;
  /** GeoJSON-style geometry with center point */
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  /** Radius in meters */
  radius: number;
  /** Shape type — defaults to "circle" when omitted */
  shapeType?: 'circle' | 'square';
  /** Fill color for the geofence area */
  fillColor?: string;
  /** Stroke/border color for the geofence outline */
  strokeColor?: string;
  /** Fill opacity (0–1). Defaults to 0.25 */
  fillOpacity?: number;
  /** Dash pattern for the stroke, e.g. [4, 4] for dashed. Solid when omitted. */
  strokeDasharray?: [number, number];
  /** Stroke width in pixels. Defaults to 2. */
  strokeWidth?: number;
}

/** Props for the built-in MapPopup card component */
export interface MapPopupProps {
  /** Location / hub name */
  title: string;
  /** Sub-title or address line 1 */
  address?: string;
  /** City / region line */
  city?: string;
  /** Badge text (e.g. "Active", "Inactive") */
  status?: string;
  /** Badge color (hex or CSS colour) */
  statusColor?: string;
  /** Key-value rows displayed in the body */
  details?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
  }>;
  /** Footer action buttons */
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost' | string;
  }>;
  /** Called when the close (×) button is clicked */
  onClose?: () => void;
}
