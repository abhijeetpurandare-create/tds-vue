/**
 * Tegola Vector Tile Layer Definitions
 *
 * Complete MapLibre style layers for Delhivery's Tegola vector tile server.
 * Source-layer names match the remote Tegola configuration for India.
 *
 * Layer order (bottom → top):
 *   1. Background + polygon fills (water, landuse, buildings, aeroways)
 *   2. Polygon labels
 *   3. Lines (waterways, railways, aeroways)
 *   4. Road casings (outlines, small → large)
 *   5. Road center fills (small → large)
 *   6. Symbols / labels (places, POIs, highway shields, road names)
 *   7. Boundaries
 */

const TEGOLA_SOURCE = 'tegola';
const FONT = ['Open Sans Regular'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Layer = Record<string, any>;

// ─── POLYGONS / FILLS ────────────────────────────────────────────────────────

const backgroundLayer: Layer = {
  id: 'bg', type: 'background',
  paint: { 'background-color': '#F8F4F0' },
};

const fillLayers: Layer[] = [
  {
    id: 'water_lakes', type: 'fill', source: TEGOLA_SOURCE, 'source-layer': 'water_lakes',
    minzoom: 0, maxzoom: 22,
    paint: { 'fill-color': '#8EC5E8', 'fill-opacity': 0.8 },
  },
  {
    id: 'water_riverbank', type: 'fill', source: TEGOLA_SOURCE, 'source-layer': 'water_riverbank',
    minzoom: 6, maxzoom: 22,
    paint: { 'fill-color': '#8EC5E8', 'fill-opacity': 0.8 },
  },
  {
    id: 'landuse_vegetation', type: 'fill', source: TEGOLA_SOURCE, 'source-layer': 'landuse_vegetation',
    minzoom: 4, maxzoom: 22,
    paint: {
      'fill-color': ['match', ['get', 'class'],
        ['forest', 'wood'], '#A5D6A7',
        ['plantation', 'orchard', 'garden', 'scrub', 'meadow', 'farmland'], '#C8E6C9',
        '#Dceddc',
      ],
      'fill-opacity': 0.7,
    },
  },
  {
    id: 'landuse_agriculture_grass', type: 'fill', source: TEGOLA_SOURCE, 'source-layer': 'landuse_agriculture_grass',
    minzoom: 5, maxzoom: 22,
    paint: {
      'fill-color': ['match', ['get', 'class'],
        ['farmland', 'farm', 'orchard', 'plantation', 'meadow', 'vineyard', 'plant_nursery'], '#FFE0B2',
        ['grass', 'grassland'], '#C8E6C9',
        '#F1F8E9',
      ],
      'fill-opacity': 0.7,
    },
  },
  {
    id: 'landuse_barren_wetland', type: 'fill', source: TEGOLA_SOURCE, 'source-layer': 'landuse_barren_wetland',
    minzoom: 5, maxzoom: 22,
    paint: { 'fill-color': '#F8F4F0', 'fill-opacity': 1 },
  },
  {
    id: 'buildings', type: 'fill', source: TEGOLA_SOURCE, 'source-layer': 'buildings',
    minzoom: 13, maxzoom: 22,
    paint: {
      'fill-color': '#E0E0E0',
      'fill-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0, 14, 1],
    },
  },
  {
    id: 'buildings_outline', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'buildings',
    minzoom: 15, maxzoom: 22,
    paint: {
      'line-color': '#BDBDBD', 'line-width': 0.5,
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 15, 0, 16, 0.4],
    },
  },
  {
    id: 'aeroways_apron_terminal', type: 'fill', source: TEGOLA_SOURCE, 'source-layer': 'aeroways_apron_terminal',
    minzoom: 12, maxzoom: 22,
    paint: { 'fill-color': '#e9e4eb', 'fill-opacity': 0.8 },
  },
];

// ─── POLYGON LABELS ──────────────────────────────────────────────────────────

const polygonLabelLayers: Layer[] = [
  {
    id: 'water_lakes_labels', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'water_lakes',
    minzoom: 8, maxzoom: 22,
    filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 8, 10, 12, 13, 16, 16],
      'text-padding': 8, 'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 2, 'text-halo-blur': 1,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0, 8.5, 1],
    },
  },
  {
    id: 'water_riverbank_labels', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'water_riverbank',
    minzoom: 9, maxzoom: 22,
    filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 9, 10, 12, 12, 16, 15],
      'text-padding': 8, 'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 2, 'text-halo-blur': 1,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 9, 0, 9.5, 1],
    },
  },
  {
    id: 'landuse_vegetation_labels', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'landuse_vegetation',
    minzoom: 10, maxzoom: 22,
    filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 10, 9, 13, 11, 16, 13],
      'text-padding': 10, 'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 2, 'text-halo-blur': 1,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 10, 0, 10.5, 1],
    },
  },
  {
    id: 'landuse_agriculture_grass_labels', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'landuse_agriculture_grass',
    minzoom: 11, maxzoom: 22,
    filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 11, 9, 14, 11, 17, 13],
      'text-padding': 10, 'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 2, 'text-halo-blur': 1,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 11, 0, 11.5, 1],
    },
  },
  {
    id: 'buildings_labels', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'buildings',
    minzoom: 15, maxzoom: 22,
    filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      visibility: 'none',
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 15, 9, 17, 11, 20, 13],
      'text-padding': 8, 'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#94a3b8', 'text-halo-color': '#FFFFFF', 'text-halo-width': 1.5, 'text-halo-blur': 0.5,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.5, 1],
    },
  },
  {
    id: 'aeroways_apron_terminal_labels', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'aeroways_apron_terminal',
    minzoom: 13, maxzoom: 22,
    filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 13, 10, 16, 12, 19, 14],
      'text-padding': 10, 'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 2.5, 'text-halo-blur': 1,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0, 13.5, 1],
    },
  },
];

// ─── LINES (waterways, railways, aeroways) ───────────────────────────────────

const lineLayers: Layer[] = [
  {
    id: 'water_rivers', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'water_rivers',
    minzoom: 6, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: { 'line-color': '#dae1e7', 'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1, 12, 2, 16, 4] },
  },
  {
    id: 'water_streams_canals', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'water_streams_canals',
    minzoom: 9, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: { 'line-color': '#dae1e7', 'line-width': ['interpolate', ['linear'], ['zoom'], 9, 0.5, 14, 1.5, 18, 3] },
  },
  {
    id: 'railways_main', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'railways_main',
    minzoom: 7, maxzoom: 22,
    layout: { 'line-cap': 'butt', 'line-join': 'round' },
    paint: { 'line-color': '#d0d0d0', 'line-width': ['interpolate', ['linear'], ['zoom'], 7, 0.5, 14, 2], 'line-dasharray': [8, 3] },
  },
  {
    id: 'railways_minor', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'railways_minor',
    minzoom: 11, maxzoom: 22,
    layout: { 'line-cap': 'butt', 'line-join': 'round' },
    paint: { 'line-color': '#e0e0e0', 'line-width': ['interpolate', ['linear'], ['zoom'], 11, 0.5, 16, 1.5], 'line-dasharray': [6, 2] },
  },
  {
    id: 'aeroways_runways_taxiways', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'aeroways_runways_taxiways',
    minzoom: 11, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: { 'line-color': '#c0b8d0', 'line-width': ['interpolate', ['linear'], ['zoom'], 11, 1, 16, 8] },
  },
];

// ─── ROAD CASINGS ────────────────────────────────────────────────────────────

const roadCasingLayers: Layer[] = [
  {
    id: 'roads_service_high_casing', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_service_high',
    minzoom: 14, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#f1f5f9',
      'line-width': ['interpolate', ['linear'], ['zoom'], 14, 2, 17, 5, 20, 10],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 13.5, 0, 14, 1],
    },
  },
  {
    id: 'roads_residential_high_casing', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_residential_high',
    minzoom: 13, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#f1f5f9',
      'line-width': ['interpolate', ['linear'], ['zoom'], 13, 2.5, 16, 6, 20, 14],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 12.5, 0, 13, 1],
    },
  },
  {
    id: 'roads_tertiary_mid_casing', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_tertiary_mid',
    minzoom: 11, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#f1f5f9',
      'line-width': ['interpolate', ['linear'], ['zoom'], 11, 3, 14, 7, 18, 12],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 10.5, 0, 11, 1],
    },
  },
  {
    id: 'roads_primary_secondary_low_casing', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_primary_secondary_low',
    minzoom: 6, maxzoom: 10,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#e2e8f0',
      'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1.2, 10, 5],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 6, 0, 7, 1, 9.5, 1, 10, 0],
    },
  },
  {
    id: 'roads_primary_secondary_mid_casing', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_primary_secondary_mid',
    minzoom: 10, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#e2e8f0',
      'line-width': ['interpolate', ['linear'], ['zoom'], 10, 5, 14, 10, 18, 16],
      'line-blur': ['interpolate', ['linear'], ['zoom'], 10, 0.7, 14, 0.45, 18, 0.15, 20, 0],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 9.5, 0, 10, 1],
    },
  },
  {
    id: 'roads_mw_trunk_low_casing', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_mw_trunk_low',
    minzoom: 5, maxzoom: 10,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#cbd5e1',
      'line-width': ['interpolate', ['linear'], ['zoom'], 5, 1.5, 10, 6],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 5, 0, 6, 1, 9.5, 1, 10, 0],
    },
  },
  {
    id: 'roads_mw_trunk_mid_casing', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_mw_trunk_mid',
    minzoom: 10, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#cbd5e1',
      'line-width': ['interpolate', ['linear'], ['zoom'], 10, 6, 14, 12, 18, 20],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 9.5, 0, 10, 1],
    },
  },
];

// ─── ROAD CENTER FILLS ───────────────────────────────────────────────────────

const roadCenterLayers: Layer[] = [
  {
    id: 'roads_service_high', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_service_high',
    minzoom: 14, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#FFFFFF',
      'line-width': ['interpolate', ['linear'], ['zoom'], 14, 1, 17, 3, 20, 8],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 13.5, 0, 14, 1],
    },
  },
  {
    id: 'roads_residential_high', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_residential_high',
    minzoom: 13, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#FFFFFF',
      'line-width': ['interpolate', ['linear'], ['zoom'], 13, 1.5, 16, 4, 20, 12],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 12.5, 0, 13, 1],
    },
  },
  {
    id: 'roads_tertiary_mid', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_tertiary_mid',
    minzoom: 11, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#FFFFFF',
      'line-width': ['interpolate', ['linear'], ['zoom'], 11, 2, 14, 5, 18, 10],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 10.5, 0, 11, 1],
    },
  },
  {
    id: 'roads_paths', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_paths',
    minzoom: 14, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#ccc',
      'line-width': ['interpolate', ['linear'], ['zoom'], 14, 0.5, 18, 2],
      'line-dasharray': [2, 2],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 13.5, 0, 14, 0.7],
    },
  },
  {
    id: 'roads_primary_secondary_low', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_primary_secondary_low',
    minzoom: 6, maxzoom: 10,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#FFFFFF',
      'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.7, 10, 3.5],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 6, 0, 7, 1, 9.5, 1, 10, 0],
    },
  },
  {
    id: 'roads_primary_secondary_mid', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_primary_secondary_mid',
    minzoom: 10, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#FFFFFF',
      'line-width': ['interpolate', ['linear'], ['zoom'], 10, 3, 14, 8, 18, 14],
      'line-blur': ['interpolate', ['linear'], ['zoom'], 10, 0.45, 14, 0.25, 18, 0.05, 20, 0],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 9.5, 0, 10, 1],
    },
  },
  {
    id: 'roads_mw_trunk_low', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_mw_trunk_low',
    minzoom: 5, maxzoom: 10,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#FFFFFF',
      'line-width': ['interpolate', ['linear'], ['zoom'], 5, 0.8, 10, 4],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 5, 0, 6, 1, 9.5, 1, 10, 0],
    },
  },
  {
    id: 'roads_mw_trunk_mid', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'roads_mw_trunk_mid',
    minzoom: 10, maxzoom: 22,
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#FFFFFF',
      'line-width': ['interpolate', ['linear'], ['zoom'], 10, 4, 14, 10, 18, 18],
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 9.5, 0, 10, 1],
    },
  },
];

// ─── SYMBOLS / LABELS ────────────────────────────────────────────────────────

const symbolLayers: Layer[] = [
  // Places — states
  {
    id: 'places_country_state', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'places_country_state',
    minzoom: 2, maxzoom: 7,
    filter: ['all', ['!', ['==', ['get', 'name'], '']], ['==', ['get', 'place'], 'state']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 2, 9, 6, 15],
      'text-transform': 'uppercase', 'text-padding': 6, 'text-letter-spacing': 0.3,
    },
    paint: { 'text-color': '#475569', 'text-halo-color': '#FFFFFF', 'text-halo-width': 2 },
  },
  // Places — districts
  {
    id: 'places_district', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'places_district',
    minzoom: 7, maxzoom: 9,
    filter: ['all', ['!', ['==', ['get', 'name'], '']], ['==', ['get', 'place'], 'district']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 7, 9, 9, 11], 'text-padding': 6,
    },
    paint: { 'text-color': '#64748b', 'text-halo-color': '#FFFFFF', 'text-halo-width': 2 },
  },
  // Places — cities
  {
    id: 'places_city', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'places_city_town',
    minzoom: 5, maxzoom: 22,
    filter: ['all', ['!', ['==', ['get', 'name'], '']], ['==', ['get', 'place'], 'city']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 5, 9, 10, 12, 14, 15, 18, 19],
      'text-padding': 10, 'text-letter-spacing': 0.05, 'text-max-width': 10,
    },
    paint: { 'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 2.5 },
  },
  // Places — towns
  {
    id: 'places_town', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'places_city_town',
    minzoom: 11, maxzoom: 22,
    filter: ['all', ['!', ['==', ['get', 'name'], '']], ['==', ['get', 'place'], 'town']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 11, 9, 14, 12, 18, 15],
      'text-padding': 8, 'text-letter-spacing': 0.03, 'text-max-width': 10,
    },
    paint: { 'text-color': '#475569', 'text-halo-color': '#FFFFFF', 'text-halo-width': 2 },
  },
  // Places — village/suburb
  {
    id: 'places_village_suburb', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'places_village_suburb',
    minzoom: 13, maxzoom: 22,
    filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 13, 8, 15, 11, 18, 13], 'text-padding': 8,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 2,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 10, 0, 10.5, 1],
    },
  },
  // POIs — amenity
  {
    id: 'pois_amenity', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'pois_amenity',
    minzoom: 12, maxzoom: 22,
    filter: ['all', ['!', ['==', ['get', 'name'], '']], ['!=', ['get', 'amenity'], 'pothole'], ['!=', ['get', 'class'], 'pothole']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 12, 8, 16, 11],
      'text-padding': 10, 'text-offset': [0, 1],
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 1.5,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 12, 0, 13, 1],
    },
  },
  // POIs — shops/tourism/leisure
  {
    id: 'pois_shop_tourism_leisure', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'pois_shop_tourism_leisure',
    minzoom: 13, maxzoom: 22,
    filter: ['all', ['!', ['==', ['get', 'name'], '']], ['!=', ['get', 'amenity'], 'pothole'], ['!=', ['get', 'class'], 'pothole']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 13, 8, 17, 11],
      'text-padding': 10, 'text-offset': [0, 1],
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 1.5,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0, 14, 1],
    },
  },
  // POIs — natural/manmade
  {
    id: 'pois_natural_manmade', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'pois_natural_manmade',
    minzoom: 13, maxzoom: 22,
    filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 13, 8, 17, 10],
      'text-padding': 10,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 1.5,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0, 14, 1],
    },
  },
];

// ─── HIGHWAY SHIELDS ─────────────────────────────────────────────────────────

const highwayShieldLayers: Layer[] = [
  {
    id: 'highway_shields_nh', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'roads_mw_trunk_mid',
    minzoom: 8, maxzoom: 22,
    filter: ['all', ['has', 'ref'], ['!', ['==', ['get', 'ref'], '']], ['in', 'NH', ['get', 'ref']]],
    layout: {
      'text-field': ['get', 'ref'], 'text-font': FONT, 'text-size': 11,
      'text-letter-spacing': 0.05, 'symbol-placement': 'line', 'symbol-spacing': 500,
      'text-padding': 25, 'text-rotation-alignment': 'viewport', 'text-pitch-alignment': 'viewport',
      'text-allow-overlap': false,
    },
    paint: { 'text-color': '#ffffff', 'text-halo-color': '#37474F', 'text-halo-width': 10, 'text-halo-blur': 0.5 },
  },
  {
    id: 'highway_shields_sh', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'roads_primary_secondary_mid',
    minzoom: 10, maxzoom: 22,
    filter: ['all', ['has', 'ref'], ['!', ['==', ['get', 'ref'], '']], ['in', 'SH', ['get', 'ref']]],
    layout: {
      'text-field': ['get', 'ref'], 'text-font': FONT, 'text-size': 10,
      'text-letter-spacing': 0.05, 'symbol-placement': 'line', 'symbol-spacing': 450,
      'text-padding': 25, 'text-rotation-alignment': 'viewport', 'text-pitch-alignment': 'viewport',
      'text-allow-overlap': false,
    },
    paint: { 'text-color': '#ffffff', 'text-halo-color': '#37474F', 'text-halo-width': 9, 'text-halo-blur': 0.5 },
  },
  {
    id: 'highway_shields_expressway', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'roads_mw_trunk_mid',
    minzoom: 7, maxzoom: 22,
    filter: ['all', ['has', 'ref'], ['!', ['==', ['get', 'ref'], '']], ['==', ['get', 'highway'], 'motorway']],
    layout: {
      'text-field': ['get', 'ref'], 'text-font': FONT, 'text-size': 11,
      'text-letter-spacing': 0.05, 'symbol-placement': 'line', 'symbol-spacing': 500,
      'text-padding': 25, 'text-rotation-alignment': 'viewport', 'text-pitch-alignment': 'viewport',
      'text-allow-overlap': false,
    },
    paint: { 'text-color': '#FFFFFF', 'text-halo-color': '#1976D2', 'text-halo-width': 10, 'text-halo-blur': 0.5 },
  },
];

// ─── ROAD LABELS ─────────────────────────────────────────────────────────────

const roadLabelLayers: Layer[] = [
  {
    id: 'roads_mw_trunk_mid_labels', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'roads_mw_trunk_mid',
    minzoom: 10, maxzoom: 22, filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 10, 10, 14, 13, 18, 16],
      'symbol-placement': 'line', 'text-rotation-alignment': 'map', 'text-max-angle': 30,
      'symbol-spacing': 250, 'text-padding': 15,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 4, 'text-halo-blur': 0.5,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 10, 0, 10.5, 1],
    },
  },
  {
    id: 'roads_primary_secondary_mid_labels', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'roads_primary_secondary_mid',
    minzoom: 11, maxzoom: 22, filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 11, 10, 14, 12, 18, 15],
      'symbol-placement': 'line', 'text-rotation-alignment': 'map', 'text-max-angle': 30,
      'symbol-spacing': 250, 'text-padding': 15,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 4, 'text-halo-blur': 0.5,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 11, 0, 11.5, 1],
    },
  },
  {
    id: 'roads_tertiary_mid_labels', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'roads_tertiary_mid',
    minzoom: 12, maxzoom: 22, filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 12, 9, 15, 11, 18, 14],
      'symbol-placement': 'line', 'text-rotation-alignment': 'map', 'text-max-angle': 30,
      'symbol-spacing': 250, 'text-padding': 15,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 3.5, 'text-halo-blur': 0.5,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 12, 0, 12.5, 1],
    },
  },
  {
    id: 'roads_residential_high_labels', type: 'symbol', source: TEGOLA_SOURCE, 'source-layer': 'roads_residential_high',
    minzoom: 14, maxzoom: 22, filter: ['!', ['==', ['get', 'name'], '']],
    layout: {
      'text-field': ['get', 'name'], 'text-font': FONT,
      'text-size': ['interpolate', ['linear'], ['zoom'], 14, 9, 18, 11],
      'symbol-placement': 'line', 'text-rotation-alignment': 'map', 'text-max-angle': 30,
      'symbol-spacing': 250, 'text-padding': 15,
    },
    paint: {
      'text-color': '#37474F', 'text-halo-color': '#FFFFFF', 'text-halo-width': 3, 'text-halo-blur': 1,
      'text-opacity': ['interpolate', ['linear'], ['zoom'], 14, 0, 14.5, 1],
    },
  },
];

// ─── BOUNDARIES ──────────────────────────────────────────────────────────────

const boundaryLayers: Layer[] = [
  {
    id: 'country_state_boundary_outline', type: 'line', source: TEGOLA_SOURCE, 'source-layer': 'country_state_boundary',
    minzoom: 0, maxzoom: 20,
    paint: {
      'line-color': '#868795',
      'line-width': ['interpolate', ['linear'], ['zoom'], 4, 0.6, 8, 1.2, 14, 2],
      'line-opacity': 0.7,
    },
  },
];

// ─── COMBINED EXPORT ─────────────────────────────────────────────────────────

/**
 * All Tegola vector tile layers in correct render order.
 * Can be used directly as the `layers` array in a MapLibre style JSON.
 */
export const tegolaLayers: Layer[] = [
  backgroundLayer,
  ...fillLayers,
  ...polygonLabelLayers,
  ...lineLayers,
  ...roadCasingLayers,
  ...roadCenterLayers,
  ...symbolLayers,
  ...highwayShieldLayers,
  ...roadLabelLayers,
  ...boundaryLayers,
];

/** Layer IDs that support click/hover interactions */
export const interactiveLayerIds: string[] = [
  'buildings',
  'pois_amenity',
  'pois_shop_tourism_leisure',
  'pois_natural_manmade',
  'roads_mw_trunk_mid',
  'roads_primary_secondary_mid',
  'roads_tertiary_mid',
  'roads_residential_high',
  'places_city_town',
  'places_village_suburb',
];
