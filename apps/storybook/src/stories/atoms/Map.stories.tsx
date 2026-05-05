import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Map, MapPopup, MapMarker } from '@delhivery/tarmac';
import type { MapPoint, MapViewState } from '@delhivery/tarmac';
import 'maplibre-gl/dist/maplibre-gl.css';

// ─── Meta ────────────────────────────────────────────────────────────────────

/**
 * # Map
 *
 * A fully-featured, theme-driven map component built on **MapLibre GL** via
 * `react-map-gl`. Renders interactive tile maps with markers, popups,
 * geofences, and configurable controls.
 *
 * ## Key features
 * - **Theme tokens** — all colours, shadows, typography come from the Orca
 *   ThemeProvider (`theme.components.map`). Override any token via a custom theme.
 * - **Markers** — default pin markers, custom `marker.icon` nodes, or fully
 *   custom `renderMarker()` functions per point.
 * - **Popups** — built-in `<MapPopup>` card with title, address, status badge,
 *   detail rows, and action buttons. Or pass any ReactNode as `tooltip`.
 * - **Geofences** — circle and square geofences with auto-zoom to fit.
 * - **Controls** — navigation, scale, fullscreen, attribution — all toggleable.
 * - **Marker scaling** — markers scale with zoom by default (`markerScaleWithZoom`).
 *   Popups always render at fixed size for readability.
 * - **Error state** — graceful fallback when `mapStyle` is missing.
 *
 * ## Quick start
 * ```tsx
 * import { Map, MapPopup } from '@delhivery/tarmac';
 *
 * <Map
 *   height="500px"
 *   config={{
 *     mapStyle: 'https://demotiles.maplibre.org/style.json',
 *     initialViewState: { longitude: 77.59, latitude: 12.97, zoom: 10 },
 *   }}
 *   points={[{
 *     id: 'hub-1',
 *     lat: 12.97,
 *     lng: 77.59,
 *     marker: { color: '#22C55E' },
 *     tooltip: <MapPopup title="Bangalore Hub" status="Active" />,
 *   }]}
 * />
 * ```
 *
 * ## Sub-components
 * - **MapPopup** — themed popup card (title, address, status, details, actions)
 * - **MapMarker** — standalone SVG pin icon driven by theme tokens
 *
 * ## Important notes
 * - Marker colour must be set via `marker: { color: "..." }` on each point,
 *   NOT as a top-level `color` property.
 * - Geofences auto-zoom the map to fit all geofence bounds on mount.
 * - Popups render at a fixed 340px max-width regardless of zoom level.
 */
const meta: Meta<typeof Map> = {
  title: 'Atoms/Map',
  component: Map,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A theme-driven interactive map component built on MapLibre GL. ' +
          'Supports markers, popups, geofences, zoom controls, and full ' +
          'customisation via Orca ThemeProvider tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: 'text',
      description: 'Container height — CSS string or number (px).',
      table: { defaultValue: { summary: '"400px"' }, category: 'Layout' },
    },
    width: {
      control: 'text',
      description: 'Container width — CSS string or number (px).',
      table: { defaultValue: { summary: '"100%"' }, category: 'Layout' },
    },
    config: {
      control: 'object',
      description:
        'Map configuration: mapStyle URL, initialViewState, zoom limits, ' +
        'control toggles, marker scaling, and interaction flags.',
      table: { category: 'Map' },
    },
    points: {
      control: 'object',
      description:
        'Array of MapPoint objects to plot. Each point has id, lat, lng, ' +
        'optional tooltip (ReactNode), marker config, renderMarker, and data.',
      table: { category: 'Data' },
    },
    geofences: {
      control: 'object',
      description:
        'Array of MapGeofence objects (circle or square). The map auto-zooms ' +
        'to fit all geofences on mount.',
      table: { category: 'Data' },
    },
    onPointClick: {
      action: 'pointClicked',
      description: 'Fires when a marker is clicked. Receives the MapPoint.',
      table: { category: 'Events' },
    },
    onPopupClose: {
      action: 'popupClosed',
      description:
        'Fires when a popup is dismissed — via close button, clicking outside, ' +
        'or toggling the same marker. Receives the MapPoint whose popup was closed.',
      table: { category: 'Events' },
    },
    onMapLoad: {
      action: 'mapLoaded',
      description: 'Fires when the map finishes loading tiles.',
      table: { category: 'Events' },
    },
    onMapMove: {
      action: 'mapMoved',
      description:
        'Fires on every viewport change. Receives MapViewState ' +
        '(longitude, latitude, zoom, pitch, bearing).',
      table: { category: 'Events' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class for the outer container.',
      table: { category: 'Styling' },
    },
    style: {
      control: 'object',
      description: 'Inline CSSProperties for the outer container.',
      table: { category: 'Styling' },
    },
    children: {
      description:
        'Additional react-map-gl layers, sources, or overlays rendered ' +
        'inside the MapLibre context.',
      table: { category: 'Advanced' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Map>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const noop = () => {};

const Label = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', marginBottom: 8, marginTop: 0 }}>
    {children}
  </p>
);

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><Label>{label}</Label>{children}</div>
);

const Row = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', gap, flexWrap: 'wrap', alignItems: 'flex-start' }}>{children}</div>
);

const WarehouseIcon = ({ color = '#E53E3E' }: { color?: string }) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style={{ cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.25))' }}>
    <path d="M1 11l11-7 11 7v11H1z" fill={color} stroke="white" strokeWidth=".8" />
    <path d="M9 21V12h6v9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TruckIcon = ({ color = '#3B82F6' }: { color?: string }) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style={{ cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.25))' }}>
    <rect x="1" y="6" width="15" height="10" rx="1" fill={color} />
    <path d="M16 9l4 2v5h-4V9z" fill={color} />
    <circle cx="5.5" cy="18.5" r="2.5" fill="white" stroke={color} strokeWidth="1" />
    <circle cx="18.5" cy="18.5" r="2.5" fill="white" stroke={color} strokeWidth="1" />
  </svg>
);

const BadgeMarker = ({ code, bg }: { code: string; bg: string }) => (
  <div style={{
    background: bg, color: '#fff', borderRadius: 6, padding: '4px 8px',
    fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif',
    boxShadow: '0 2px 8px rgba(0,0,0,.2)', cursor: 'pointer',
  }}>
    {code}
  </div>
);

const DEMO_STYLE = 'https://tiles.openfreemap.org/styles/bright';

const BASE_CONFIG = {
  mapStyle: DEMO_STYLE,
  initialViewState: { longitude: 78.96, latitude: 20.59, zoom: 4.5 },
};

const INDIA_HUB_POINTS: MapPoint[] = [
  {
    id: 'blr', lat: 12.9716, lng: 77.5946,
    data: { code: 'BLR', status: 'Active' },
    tooltip: (
      <MapPopup
        title="Bangalore Hub" address="Whitefield Industrial Area"
        city="Bangalore, 560066" status="Active" statusColor="#22C55E"
        details={[
          { label: 'AWB Pending', value: 342 },
          { label: 'Out for Delivery', value: 87 },
          { label: 'Undelivered', value: 12 },
        ]}
        actions={[
          { label: 'View Hub', onClick: noop, variant: 'primary' },
          { label: 'Directions', onClick: noop, variant: 'secondary' },
        ]}
      />
    ),
  },
  {
    id: 'mum', lat: 19.076, lng: 72.8777,
    data: { code: 'MUM', status: 'Active' },
    tooltip: (
      <MapPopup
        title="Mumbai Hub" address="Andheri East, MIDC"
        city="Mumbai, 400093" status="Active" statusColor="#22C55E"
        details={[
          { label: 'AWB Pending', value: 519 },
          { label: 'Out for Delivery', value: 120 },
        ]}
        actions={[
          { label: 'View Hub', onClick: noop, variant: 'primary' },
          { label: 'Directions', onClick: noop, variant: 'secondary' },
        ]}
      />
    ),
  },
  {
    id: 'del', lat: 28.6139, lng: 77.209,
    marker: { color: '#F59E0B' },
    data: { code: 'DEL', status: 'Maintenance' },
    tooltip: (
      <MapPopup
        title="Delhi Hub" address="Okhla Phase II"
        city="New Delhi, 110020" status="Under Maintenance" statusColor="#F59E0B"
        details={[{ label: 'Resume ETA', value: '6 hrs' }]}
        actions={[{ label: 'View Hub', onClick: noop, variant: 'primary' }]}
      />
    ),
  },
  {
    id: 'hyd', lat: 17.385, lng: 78.4867,
    marker: { color: '#EF4444' },
    data: { code: 'HYD', status: 'Inactive' },
    tooltip: (
      <MapPopup
        title="Hyderabad Hub" address="Balanagar Industrial"
        city="Hyderabad, 500037" status="Inactive" statusColor="#EF4444"
        details={[{ label: 'Last Active', value: '3 days ago' }]}
        actions={[
          { label: 'Reactivate', onClick: noop, variant: 'primary' },
          { label: 'Archive', onClick: noop, variant: 'ghost' },
        ]}
        onClose={noop}
      />
    ),
  },
  {
    id: 'che', lat: 13.0827, lng: 80.2707,
    data: { code: 'CHE', status: 'Active' },
    tooltip: (
      <MapPopup
        title="Chennai Hub" address="Ambattur Industrial Estate"
        city="Chennai, 600058" status="Active" statusColor="#22C55E"
        details={[{ label: 'AWB Pending', value: 178 }, { label: 'Out for Delivery', value: 62 }]}
        actions={[{ label: 'View Hub', onClick: noop, variant: 'primary' }]}
      />
    ),
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ── Playground ───────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Playground: Story = {
  name: '🗺 Playground',
  args: { height: '500px', width: '100%', config: BASE_CONFIG, points: INDIA_HUB_POINTS },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground with all controls. Use the Storybook controls ' +
          'panel to tweak height, width, config, and points in real time.',
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── MapPopup Stories ─────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const MapPopup_TitleOnly: Story = {
  name: 'MapPopup / Title only',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          '`<MapPopup>` is a themed popup card used as marker tooltip content. ' +
          'At minimum it requires a `title`. All styling comes from theme tokens.',
      },
    },
  },
  render: () => <MapPopup title="Bangalore Hub" />,
};

export const MapPopup_WithAddress: Story = {
  name: 'MapPopup / With & without address',
  parameters: { layout: 'centered' },
  render: () => (
    <Row>
      <div><Label>With address</Label><MapPopup title="Hub A" address="Whitefield Industrial Area" /></div>
      <div><Label>Without address</Label><MapPopup title="Hub B" /></div>
    </Row>
  ),
};

export const MapPopup_WithCity: Story = {
  name: 'MapPopup / With & without city',
  parameters: { layout: 'centered' },
  render: () => (
    <Row>
      <div><Label>With city</Label><MapPopup title="Hub A" address="Whitefield" city="Bangalore, 560066" /></div>
      <div><Label>Without city</Label><MapPopup title="Hub B" address="Whitefield" /></div>
    </Row>
  ),
};

export const MapPopup_StatusVariants: Story = {
  name: 'MapPopup / Status variants',
  parameters: { layout: 'centered' },
  render: () => (
    <Row>
      <div><Label>Active</Label><MapPopup title="Hub" status="Active" /></div>
      <div><Label>Maintenance</Label><MapPopup title="Hub" status="Under Maintenance" statusColor="#F59E0B" /></div>
      <div><Label>Inactive</Label><MapPopup title="Hub" status="Inactive" statusColor="#EF4444" /></div>
      <div><Label>No status</Label><MapPopup title="Hub" /></div>
    </Row>
  ),
};

export const MapPopup_Details: Story = {
  name: 'MapPopup / Details rows',
  parameters: { layout: 'centered' },
  render: () => (
    <MapPopup
      title="Bangalore Hub"
      details={[
        { label: 'AWB Pending', value: 342 },
        { label: 'Out for Delivery', value: 87 },
        { label: 'Undelivered', value: 12 },
        { label: 'Returns', value: 5 },
      ]}
    />
  ),
};

export const MapPopup_NoDetails: Story = {
  name: 'MapPopup / No details section',
  parameters: { layout: 'centered' },
  render: () => (
    <Row>
      <div><Label>details=[]</Label><MapPopup title="Hub" status="Active" details={[]} /></div>
      <div><Label>details omitted</Label><MapPopup title="Hub" status="Active" /></div>
    </Row>
  ),
};

export const MapPopup_Actions: Story = {
  name: 'MapPopup / Actions',
  parameters: { layout: 'centered' },
  render: () => (
    <Row>
      <div>
        <Label>Primary + Secondary</Label>
        <MapPopup title="Hub" actions={[
          { label: 'View Hub', onClick: () => alert('Primary'), variant: 'primary' },
          { label: 'Directions', onClick: () => alert('Secondary'), variant: 'secondary' },
        ]} />
      </div>
      <div>
        <Label>Ghost action</Label>
        <MapPopup title="Hub" status="Inactive" statusColor="#EF4444" actions={[
          { label: 'Reactivate', onClick: () => alert('Reactivate'), variant: 'primary' },
          { label: 'Delete', onClick: () => alert('Delete'), variant: 'ghost' },
        ]} />
      </div>
    </Row>
  ),
};

export const MapPopup_NoActions: Story = {
  name: 'MapPopup / No actions footer',
  parameters: { layout: 'centered' },
  render: () => (
    <Row>
      <div><Label>With actions</Label><MapPopup title="Hub" actions={[{ label: 'View', onClick: noop, variant: 'primary' }]} /></div>
      <div><Label>No actions</Label><MapPopup title="Hub" /></div>
    </Row>
  ),
};

export const MapPopup_CloseButton: Story = {
  name: 'MapPopup / Close button',
  parameters: { layout: 'centered' },
  render: () => (
    <Row>
      <div><Label>With onClose</Label><MapPopup title="Hub" onClose={() => alert('Closed')} /></div>
      <div><Label>No onClose</Label><MapPopup title="Hub" /></div>
    </Row>
  ),
};

export const MapPopup_DetailWithIcon: Story = {
  name: 'MapPopup / Detail row with icon',
  parameters: { layout: 'centered' },
  render: () => (
    <MapPopup
      title="Hub with icons"
      details={[
        { label: 'Orders', value: 88, icon: <span>📦</span> },
        { label: 'Vehicles', value: 12, icon: <span>🚚</span> },
        { label: 'Returns', value: 3, icon: <span>↩️</span> },
      ]}
    />
  ),
};

export const MapPopup_ThreeActions: Story = {
  name: 'MapPopup / Three actions',
  parameters: { layout: 'centered' },
  render: () => (
    <MapPopup title="Hub" actions={[
      { label: 'View', onClick: noop, variant: 'primary' },
      { label: 'Edit', onClick: noop, variant: 'secondary' },
      { label: 'Delete', onClick: noop, variant: 'ghost' },
    ]} />
  ),
};

export const MapPopup_FullProps: Story = {
  name: 'MapPopup / All props combined',
  parameters: { layout: 'centered' },
  render: () => (
    <MapPopup
      title="Bangalore Hub"
      address="Whitefield Industrial Area, Phase II"
      city="Bangalore, Karnataka 560066"
      status="Active" statusColor="#22C55E"
      details={[
        { label: 'AWB Pending', value: 342, icon: <span>📦</span> },
        { label: 'Out for Delivery', value: 87, icon: <span>🚚</span> },
        { label: 'Undelivered', value: 12, icon: <span>⚠️</span> },
        { label: 'Returns', value: 5, icon: <span>↩️</span> },
      ]}
      actions={[
        { label: 'View Hub', onClick: noop, variant: 'primary' },
        { label: 'Directions', onClick: noop, variant: 'secondary' },
      ]}
      onClose={noop}
    />
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── MapMarker Stories ────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const MapMarker_Default: Story = {
  name: 'MapMarker / Default',
  parameters: { layout: 'centered' },
  render: () => <MapMarker />,
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── Map Component Stories ────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_NoStyle: Story = {
  name: 'Map / No mapStyle — error state',
  parameters: {
    docs: {
      description: {
        story:
          'When `config.mapStyle` is missing or empty, the Map renders a ' +
          'themed error placeholder with "Something went wrong". All error ' +
          'state colours come from `theme.components.map.error` tokens.',
      },
    },
  },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div><Label>No config — error state</Label><Map height="300px" /></div>
      <div><Label>Empty string mapStyle</Label><Map height="180px" config={{ mapStyle: '' }} /></div>
    </div>
  ),
};

export const Map_Default: Story = {
  name: 'Map / Default render',
  render: () => <Map height="440px" config={BASE_CONFIG} />,
};

export const Map_CustomSize: Story = {
  name: 'Map / Custom height & width',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Section label='height="200px" width="100%"'>
        <Map height="200px" width="100%" config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 78.96, latitude: 20.59, zoom: 3 } }} />
      </Section>
      <Section label='height={320} width="60%"'>
        <Map height={320} width="60%" config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 78.96, latitude: 20.59, zoom: 4 } }} />
      </Section>
    </div>
  ),
};

export const Map_WithMarkers: Story = {
  name: 'Map / With markers',
  render: () => <Map height="480px" config={BASE_CONFIG} points={INDIA_HUB_POINTS} />,
};

export const Map_NoMarkers: Story = {
  name: 'Map / No markers',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Label>points=[] — no markers</Label>
      <Map height="440px" config={BASE_CONFIG} points={[]} />
    </div>
  ),
};

export const Map_NavigationControl: Story = {
  name: 'Map / Navigation control toggle',
  render: () => (
    <div style={{ display: 'flex', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ flex: 1 }}><Label>showNavigationControl=true</Label><Map height="360px" config={{ ...BASE_CONFIG, showNavigationControl: true }} /></div>
      <div style={{ flex: 1 }}><Label>showNavigationControl=false</Label><Map height="360px" config={{ ...BASE_CONFIG, showNavigationControl: false }} /></div>
    </div>
  ),
};

export const Map_ScaleControl: Story = {
  name: 'Map / Scale control toggle',
  render: () => (
    <div style={{ display: 'flex', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ flex: 1 }}><Label>showScaleControl=true</Label><Map height="360px" config={{ ...BASE_CONFIG, showScaleControl: true }} /></div>
      <div style={{ flex: 1 }}><Label>showScaleControl=false</Label><Map height="360px" config={{ ...BASE_CONFIG, showScaleControl: false }} /></div>
    </div>
  ),
};

export const Map_FullscreenControl: Story = {
  name: 'Map / Fullscreen control toggle',
  render: () => (
    <div style={{ display: 'flex', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ flex: 1 }}><Label>showFullscreenControl=false (default)</Label><Map height="360px" config={{ ...BASE_CONFIG, showFullscreenControl: false }} /></div>
      <div style={{ flex: 1 }}><Label>showFullscreenControl=true</Label><Map height="360px" config={{ ...BASE_CONFIG, showFullscreenControl: true }} /></div>
    </div>
  ),
};

export const Map_OnLoad: Story = {
  name: 'Map / onMapLoad callback',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Label>Check Actions panel for "mapLoaded"</Label>
      <Map height="440px" config={BASE_CONFIG} onMapLoad={(e) => console.log('Map loaded', e)} />
    </div>
  ),
};

export const Map_OnPointClick: Story = {
  name: 'Map / onPointClick callback',
  render: () => {
    const [last, setLast] = useState<string>('—');
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>Last clicked: <b style={{ color: '#1A1A2E' }}>{last}</b></Label>
        <Map height="460px" config={BASE_CONFIG} points={INDIA_HUB_POINTS} onPointClick={(p) => setLast(p.id.toUpperCase())} />
      </div>
    );
  },
};

export const Map_PopupOpenClose: Story = {
  name: 'Map / Popup open / toggle / close',
  render: () => <Map height="480px" config={BASE_CONFIG} points={INDIA_HUB_POINTS} />,
};

export const Map_PointWithoutTooltip: Story = {
  name: 'Map / Point without tooltip',
  render: () => {
    const [clicked, setClicked] = useState<string>('—');
    const points: MapPoint[] = [
      { id: 'silent', lat: 12.9716, lng: 77.5946 },
      { id: 'loud', lat: 19.076, lng: 72.8777, tooltip: <MapPopup title="Mumbai Hub" status="Active" /> },
    ];
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>Left pin has no tooltip. Last click: <b>{clicked}</b></Label>
        <Map height="460px" config={BASE_CONFIG} points={points} onPointClick={(p) => setClicked(p.id)} />
      </div>
    );
  },
};

export const Map_RenderMarkerFn: Story = {
  name: 'Map / renderMarker() function',
  parameters: {
    docs: {
      description: {
        story:
          'Use `renderMarker` on a point for fully custom marker rendering. ' +
          'When provided, it overrides `marker.icon`, `marker.color`, and `marker.size`. ' +
          'The function receives the full MapPoint object.',
      },
    },
  },
  render: () => {
    const statusColor = (s: string) => s === 'Active' ? '#22C55E' : s === 'Maintenance' ? '#F59E0B' : '#EF4444';
    const points = INDIA_HUB_POINTS.map((h) => ({
      ...h,
      renderMarker: (pt: MapPoint) => (
        <BadgeMarker code={(pt.data?.code as string) ?? pt.id} bg={statusColor((pt.data?.status as string) ?? 'Active')} />
      ),
    }));
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>Badge chips via renderMarker()</Label>
        <Map height="480px" config={BASE_CONFIG} points={points} />
      </div>
    );
  },
};

export const Map_MarkerIcon: Story = {
  name: 'Map / marker.icon property',
  render: () => {
    const points: MapPoint[] = [
      {
        id: 'wh', lat: 12.9716, lng: 77.5946,
        marker: { icon: <WarehouseIcon color="#E53E3E" />, anchor: 'bottom' },
        tooltip: <MapPopup title="Warehouse" status="Active" statusColor="#22C55E" details={[{ label: 'Stock', value: '92%' }]} />,
      },
      {
        id: 'truck', lat: 19.076, lng: 72.8777,
        marker: { icon: <TruckIcon color="#3B82F6" />, anchor: 'center' },
        tooltip: <MapPopup title="Vehicle MH02AB5678" status="In Transit" statusColor="#3B82F6" details={[{ label: 'AWB', value: 18 }, { label: 'ETA', value: '14:30' }]} />,
      },
    ];
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>Warehouse and Truck icons via marker.icon</Label>
        <Map height="480px" config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 78.96, latitude: 15, zoom: 5.5 } }} points={points} />
      </div>
    );
  },
};


export const Map_WithGeofences: Story = {
  name: 'Map / With geofences',
  parameters: {
    docs: {
      description: {
        story:
          'Geofences are rendered as filled polygons on the map. The map ' +
          'auto-zooms to fit all geofence bounds on mount. Supports circle ' +
          'and square shapes with custom fill/stroke colours.',
      },
    },
  },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Label>Source marker (green) with 500m geofence + destination marker (red)</Label>
      <Map
        height="500px"
        config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 77.59, latitude: 12.97, zoom: 12 } }}
        points={[
          { id: 'source', lat: 12.97, lng: 77.59, marker: { color: '#22C55E' }, tooltip: <div>Pickup Point</div> },
          { id: 'destination', lat: 12.93, lng: 77.63, marker: { color: '#EF4444' }, tooltip: <div>Drop Point</div> },
        ]}
        geofences={[{
          id: 'source-geofence',
          geometry: { type: 'Point', coordinates: [77.59, 12.97] },
          radius: 500,
          fillColor: 'rgba(34,197,94,0.15)',
          strokeColor: '#22C55E',
        }]}
      />
    </div>
  ),
};


export const Map_MarkerWithPopup: Story = {
  name: 'Map / Marker click opens popup',
  render: () => {
    const [lastClicked, setLastClicked] = useState('—');
    const points: MapPoint[] = [
      {
        id: 'hub-blr', lat: 12.97, lng: 77.5946,
        marker: { color: 'deeppink' },
        tooltip: (
          <MapPopup
            title="Bangalore Hub"
            address="Whitefield Industrial Area"
            status="Active" statusColor="#22C55E"
            details={[{ label: 'AWB Pending', value: 342 }]}
            actions={[{ label: 'View Hub', onClick: () => alert('View Hub'), variant: 'primary' }]}
            onClose={() => {}}
          />
        ),
      },
      {
        id: 'hub-mum', lat: 19.076, lng: 72.877,
        marker: { color: 'dodgerblue' },
        tooltip: (
          <MapPopup
            title="Mumbai Hub"
            address="Andheri East"
            status="Active" statusColor="#22C55E"
            details={[{ label: 'AWB Pending', value: 519 }]}
            actions={[{ label: 'View Hub', onClick: () => alert('View Hub'), variant: 'primary' }]}
            onClose={() => {}}
          />
        ),
      },
    ];
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>Click a marker to open its popup. Last clicked: <b>{lastClicked}</b></Label>
        <Map
          height="480px"
          config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 77, latitude: 16, zoom: 5.5 } }}
          points={points}
          onPointClick={(p) => setLastClicked(p.id)}
        />
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── Style Prop ───────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_StyleProp: Story = {
  name: 'Map / style prop (inline styles)',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Section label='style={{ border: "3px dashed #8B5CF6", borderRadius: 16, opacity: 0.9 }}'>
        <Map
          height="300px"
          config={BASE_CONFIG}
          style={{ border: '3px dashed #8B5CF6', borderRadius: 16, opacity: 0.9 }}
        />
      </Section>
      <Section label='style={{ boxShadow: "0 4px 20px rgba(59,130,246,0.4)" }}'>
        <Map
          height="300px"
          config={BASE_CONFIG}
          style={{ boxShadow: '0 4px 20px rgba(59,130,246,0.4)' }}
        />
      </Section>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── Attribution Control ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_AttributionControl: Story = {
  name: 'Map / Attribution control toggle',
  render: () => (
    <div style={{ display: 'flex', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ flex: 1 }}>
        <Label>attributionControl=true (default)</Label>
        <Map height="360px" config={{ ...BASE_CONFIG, attributionControl: true }} />
      </div>
      <div style={{ flex: 1 }}>
        <Label>attributionControl=false</Label>
        <Map height="360px" config={{ ...BASE_CONFIG, attributionControl: false }} />
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── Interaction Toggles ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_ScrollZoomToggle: Story = {
  name: 'Map / scrollZoom toggle',
  render: () => (
    <div style={{ display: 'flex', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ flex: 1 }}>
        <Label>scrollZoom=true (default)</Label>
        <Map height="320px" config={{ ...BASE_CONFIG, scrollZoom: true }} />
      </div>
      <div style={{ flex: 1 }}>
        <Label>scrollZoom=false — try scrolling</Label>
        <Map height="320px" config={{ ...BASE_CONFIG, scrollZoom: false }} />
      </div>
    </div>
  ),
};

export const Map_DragPanToggle: Story = {
  name: 'Map / dragPan toggle',
  render: () => (
    <div style={{ display: 'flex', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ flex: 1 }}>
        <Label>dragPan=true (default)</Label>
        <Map height="320px" config={{ ...BASE_CONFIG, dragPan: true }} />
      </div>
      <div style={{ flex: 1 }}>
        <Label>dragPan=false — try dragging</Label>
        <Map height="320px" config={{ ...BASE_CONFIG, dragPan: false }} />
      </div>
    </div>
  ),
};

export const Map_DoubleClickZoomToggle: Story = {
  name: 'Map / doubleClickZoom toggle',
  render: () => (
    <div style={{ display: 'flex', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ flex: 1 }}>
        <Label>doubleClickZoom=true (default)</Label>
        <Map height="320px" config={{ ...BASE_CONFIG, doubleClickZoom: true }} />
      </div>
      <div style={{ flex: 1 }}>
        <Label>doubleClickZoom=false — try double-clicking</Label>
        <Map height="320px" config={{ ...BASE_CONFIG, doubleClickZoom: false }} />
      </div>
    </div>
  ),
};

export const Map_TouchZoomRotateToggle: Story = {
  name: 'Map / touchZoomRotate toggle',
  render: () => (
    <div style={{ display: 'flex', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ flex: 1 }}>
        <Label>touchZoomRotate=true (default)</Label>
        <Map height="320px" config={{ ...BASE_CONFIG, touchZoomRotate: true }} />
      </div>
      <div style={{ flex: 1 }}>
        <Label>touchZoomRotate=false — try pinch-zoom on touch device</Label>
        <Map height="320px" config={{ ...BASE_CONFIG, touchZoomRotate: false }} />
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── Marker Scale With Zoom ───────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_MarkerScaleWithZoom: Story = {
  name: 'Map / markerScaleWithZoom on vs off',
  parameters: {
    docs: {
      description: {
        story:
          'When `markerScaleWithZoom=true` (default), marker icons grow/shrink ' +
          'as you zoom in/out. The scale is relative to `markerZoomBase` ' +
          '(defaults to `initialViewState.zoom`). Set to `false` for fixed-size markers.',
      },
    },
  },
  render: () => {
    const pts: MapPoint[] = [
      { id: 'a', lat: 12.97, lng: 77.59, marker: { icon: <WarehouseIcon />, color: '#E53E3E' }, tooltip: <MapPopup title="Warehouse A" /> },
      { id: 'b', lat: 13.02, lng: 77.65, marker: { icon: <TruckIcon />, color: '#3B82F6' }, tooltip: <MapPopup title="Vehicle B" /> },
    ];
    return (
      <div style={{ display: 'flex', gap: 16, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ flex: 1 }}>
          <Label>markerScaleWithZoom=true (default) — zoom in/out to see markers scale</Label>
          <Map height="400px" config={{ ...BASE_CONFIG, markerScaleWithZoom: true, initialViewState: { longitude: 77.62, latitude: 13.0, zoom: 11 } }} points={pts} />
        </div>
        <div style={{ flex: 1 }}>
          <Label>markerScaleWithZoom=false — markers stay fixed size</Label>
          <Map height="400px" config={{ ...BASE_CONFIG, markerScaleWithZoom: false, initialViewState: { longitude: 77.62, latitude: 13.0, zoom: 11 } }} points={pts} />
        </div>
      </div>
    );
  },
};

export const Map_MarkerZoomBase: Story = {
  name: 'Map / markerZoomBase customization',
  render: () => {
    const pts: MapPoint[] = [
      { id: 'a', lat: 12.97, lng: 77.59, marker: { icon: <WarehouseIcon />, color: '#E53E3E' }, tooltip: <MapPopup title="Warehouse" /> },
    ];
    return (
      <div style={{ display: 'flex', gap: 16, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ flex: 1 }}>
          <Label>markerZoomBase=6 — markers appear large at zoom 10</Label>
          <Map height="400px" config={{ ...BASE_CONFIG, markerScaleWithZoom: true, markerZoomBase: 6, initialViewState: { longitude: 77.59, latitude: 12.97, zoom: 10 } }} points={pts} />
        </div>
        <div style={{ flex: 1 }}>
          <Label>markerZoomBase=14 — markers appear small at zoom 10</Label>
          <Map height="400px" config={{ ...BASE_CONFIG, markerScaleWithZoom: true, markerZoomBase: 14, initialViewState: { longitude: 77.59, latitude: 12.97, zoom: 10 } }} points={pts} />
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── Marker Size & Anchor ─────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_MarkerSizes: Story = {
  name: 'Map / marker.size variations',
  render: () => {
    const pts: MapPoint[] = [
      { id: 'sm', lat: 12.97, lng: 77.50, marker: { icon: <span style={{ fontSize: 20 }}>📍</span>, size: 20 }, tooltip: <MapPopup title="Small (20px)" /> },
      { id: 'md', lat: 12.97, lng: 77.59, marker: { icon: <span style={{ fontSize: 32 }}>📍</span>, size: 32 }, tooltip: <MapPopup title="Medium (32px)" /> },
      { id: 'lg', lat: 12.97, lng: 77.68, marker: { icon: <span style={{ fontSize: 48 }}>📍</span>, size: 48 }, tooltip: <MapPopup title="Large (48px)" /> },
    ];
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>Three markers with different sizes: 20px, 32px, 48px</Label>
        <Map height="400px" config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 77.59, latitude: 12.97, zoom: 11 }, markerScaleWithZoom: false }} points={pts} />
      </div>
    );
  },
};

export const Map_MarkerAnchors: Story = {
  name: 'Map / marker.anchor positions',
  render: () => {
    const anchors = ['center', 'top', 'bottom', 'left', 'right'] as const;
    const pts: MapPoint[] = anchors.map((anchor, i) => ({
      id: anchor,
      lat: 12.97,
      lng: 77.50 + i * 0.05,
      marker: { icon: <span style={{ fontSize: 24 }}>📌</span>, anchor },
      tooltip: <MapPopup title={`anchor="${anchor}"`} />,
    }));
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>Each marker uses a different anchor: center, top, bottom, left, right</Label>
        <Map height="400px" config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 77.60, latitude: 12.97, zoom: 12 }, markerScaleWithZoom: false }} points={pts} />
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── Geofence Shapes ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_GeofenceMultipleShapes: Story = {
  name: 'Map / Geofences — circle + square',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Label>Circle geofence (green) around source + square geofence (blue) around destination</Label>
      <Map
        height="500px"
        config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 77.59, latitude: 12.95, zoom: 12 } }}
        points={[
          { id: 'src', lat: 12.97, lng: 77.5946, marker: { color: '#22C55E'}, tooltip: <MapPopup title="Source" status="Pickup" statusColor="#22C55E" /> },
          { id: 'dst', lat: 12.973, lng: 77.591, marker: { color: '#3B82F6' }, tooltip: <MapPopup title="Destination" status="Drop" statusColor="#3B82F6" /> },
        ]}
        geofences={[
          {
            id: 'gf-circle',
            geometry: { type: 'Point', coordinates: [77.5946, 12.9716] },
            radius: 500,
            shapeType: 'circle',
            fillColor: 'rgba(34,197,94,0.15)',
            strokeColor: '#22C55E',
          }
        ]}
      />
    </div>
  ),
};

export const Map_GeofenceCustomColors: Story = {
  name: 'Map / Geofences — custom fill & stroke colors',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Label>Three geofences with different colors: green, red, purple</Label>
      <Map
        height="500px"
        config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 77.59, latitude: 12.97, zoom: 11 } }}
        geofences={[
          { id: 'g1', geometry: { type: 'Point', coordinates: [77.55, 12.97] }, radius: 800, fillColor: 'rgba(34,197,94,0.2)', strokeColor: '#22C55E' },
          { id: 'g2', geometry: { type: 'Point', coordinates: [77.59, 12.97] }, radius: 600, fillColor: 'rgba(239,68,68,0.2)', strokeColor: '#EF4444' },
          { id: 'g3', geometry: { type: 'Point', coordinates: [77.63, 12.97] }, radius: 700, fillColor: 'rgba(139,92,246,0.2)', strokeColor: '#8B5CF6' },
        ]}
      />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── Geofence + Popup (auto-zoom safe) ────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_GeofenceWithPopup: Story = {
  name: 'Map / Geofence auto-zoom + popup (no scaling issue)',
  parameters: {
    docs: {
      description: {
        story:
          'When geofences auto-zoom the map to a high zoom level, popups ' +
          'still render at their natural fixed size (340px max-width, 20px offset). ' +
          'Marker icons scale with zoom, but popups do not — ensuring readability.',
      },
    },
  },
  render: () => {
    const [clicked, setClicked] = useState('—');
    const pts: MapPoint[] = [
      {
        id: 'src', lat: 12.97, lng: 77.59,
        marker: { color: '#22C55E', icon: <span style={{ fontSize: 24 }}>🟢</span> },
        tooltip: (
          <MapPopup
            title="Pickup Point"
            address="Whitefield, Bangalore"
            status="Active" statusColor="#22C55E"
            details={[{ label: 'AWB', value: 'DL12345678' }, { label: 'ETA', value: '10:30 AM' }]}
            actions={[{ label: 'Navigate', onClick: () => {}, variant: 'primary' }]}
          />
        ),
      },
      {
        id: 'dst', lat: 12.93, lng: 77.63,
        marker: { color: '#EF4444', icon: <span style={{ fontSize: 24 }}>🔴</span> },
        tooltip: (
          <MapPopup
            title="Drop Point"
            address="Koramangala, Bangalore"
            status="Pending" statusColor="#F59E0B"
            details={[{ label: 'AWB', value: 'DL12345678' }]}
            actions={[{ label: 'View Details', onClick: () => {}, variant: 'primary' }]}
          />
        ),
      },
    ];
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>
          Geofence auto-zooms the map. Click a marker — the popup renders at normal size (no scaling).
          Last clicked: {clicked}
        </Label>
        <Map
          height="500px"
          config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 77.59, latitude: 12.95, zoom: 10 } }}
          points={pts}
          geofences={[{
            id: 'pickup-zone',
            geometry: { type: 'Point', coordinates: [77.59, 12.97] },
            radius: 500,
            fillColor: 'rgba(34,197,94,0.15)',
            strokeColor: '#22C55E',
          }]}
          onPointClick={(p) => setClicked(p.id)}
        />
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── Point Data Usage ─────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_PointDataUsage: Story = {
  name: 'Map / point.data — arbitrary data in onPointClick',
  render: () => {
    const [info, setInfo] = useState('Click a marker to see its data');
    const pts: MapPoint[] = [
      { id: 'wh-1', lat: 12.97, lng: 77.59, marker: { icon: <span>🏭</span> }, data: { code: 'BLR-01', capacity: 5000, type: 'warehouse' }, tooltip: <MapPopup title="BLR Warehouse" /> },
      { id: 'wh-2', lat: 19.076, lng: 72.877, marker: { icon: <span>🏭</span> }, data: { code: 'MUM-01', capacity: 8000, type: 'hub' }, tooltip: <MapPopup title="MUM Hub" /> },
    ];
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>{info}</Label>
        <Map
          height="460px"
          config={BASE_CONFIG}
          points={pts}
          onPointClick={(p) => setInfo(`id=${p.id} | data=${JSON.stringify(p.data)}`)}
        />
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── onMapMove Dedicated ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_OnMapMove: Story = {
  name: 'Map / onMapMove callback',
  render: () => {
    const [moveCount, setMoveCount] = useState(0);
    const [lastVs, setLastVs] = useState<MapViewState | null>(null);
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>
          Move events: {moveCount} | Last: {lastVs ? `zoom=${lastVs.zoom.toFixed(2)}, lng=${lastVs.longitude.toFixed(3)}, lat=${lastVs.latitude.toFixed(3)}` : '—'}
        </Label>
        <Map
          height="460px"
          config={BASE_CONFIG}
          onMapMove={(vs) => { setMoveCount((c) => c + 1); setLastVs(vs); }}
        />
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── transformRequest (auth headers for tile sources) ─────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_TransformRequest: Story = {
  name: 'Map / transformRequest — auth headers for tiles',
  parameters: {
    docs: {
      description: {
        story:
          'Use `config.transformRequest` to inject auth headers into tile/resource ' +
          'requests. This is required when your tile server needs a Bearer token or ' +
          'API key. Use the `createTransformRequest` helper for common cases, or ' +
          'pass a custom function for full control.\n\n' +
          '```tsx\n' +
          'import { Map, createTransformRequest } from "@delhivery/tarmac";\n\n' +
          '// Helper — matches URL pattern, injects Bearer token\n' +
          '<Map config={{\n' +
          '  mapStyle: "https://tiles.example.com/style.json",\n' +
          '  transformRequest: createTransformRequest(\n' +
          '    "tiles.example.com",\n' +
          '    "my-secret-token",\n' +
          '  ),\n' +
          '}} />\n\n' +
          '// Custom function — full control\n' +
          '<Map config={{\n' +
          '  mapStyle: "https://tiles.example.com/style.json",\n' +
          '  transformRequest: (url, resourceType) => {\n' +
          '    if (resourceType === "Tile" && url.includes("example.com")) {\n' +
          '      return { url, headers: { Authorization: "Bearer " + token } };\n' +
          '    }\n' +
          '  },\n' +
          '}} />\n' +
          '```',
      },
    },
  },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Label>
        This demo uses the public MapLibre demo tiles (no auth needed).
        In production, pass your own <code>transformRequest</code> to inject auth headers
        for private tile servers.
      </Label>
      <Map
        height="440px"
        config={{
          ...BASE_CONFIG,
          transformRequest: (url: string, resourceType: string) => {
            // Example: log every tile request (no actual auth needed for demo tiles)
            if (resourceType === 'Tile') {
              console.log('[transformRequest] Tile:', url);
              return {
                url: url,
                headers: { 'Authorization': 'Bearer ' + 'test' }
              }
            }
            return undefined; // pass through unchanged
          },
        }}
        points={INDIA_HUB_POINTS.slice(0, 3)}
      />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── Responsive & Visual Variants ─────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Responsive_FluidSizes: Story = {
  name: 'Responsive / Fluid sizes',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ padding: 16, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Section label='height="180px" width="100%"'>
        <Map height="180px" width="100%" config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 78.96, latitude: 20.59, zoom: 3 } }} />
      </Section>
      <Section label='height="320px" width="50%"'>
        <Map height="320px" width="50%" config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 78.96, latitude: 20.59, zoom: 4 } }} />
      </Section>
      <Section label='height="60vh" width="100%"'>
        <Map height="60vh" width="100%" config={BASE_CONFIG} points={INDIA_HUB_POINTS} />
      </Section>
    </div>
  ),
};

export const Visual_ZoomPitch: Story = {
  name: 'Visual / Zoom & pitch',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontFamily: 'Inter, sans-serif' }}>
      {([
        { label: 'Street — zoom=15', zoom: 15, pitch: 0 },
        { label: 'Tilted — pitch=45°', zoom: 11, pitch: 45 },
        { label: 'Country — zoom=4', zoom: 4, pitch: 0 },
      ] as const).map(({ label, zoom, pitch }) => (
        <div key={label} style={{ flex: '1 1 28%', minWidth: 240 }}>
          <Label>{label}</Label>
          <Map height="260px" config={{ mapStyle: DEMO_STYLE, initialViewState: { longitude: 77.59, latitude: 12.97, zoom, pitch } }} />
        </div>
      ))}
    </div>
  ),
};

export const Visual_StaticMap: Story = {
  name: 'Visual / Static map (no interactions)',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Label>All interactions disabled</Label>
      <Map
        height="440px"
        config={{
          ...BASE_CONFIG,
          scrollZoom: false, dragPan: false,
          doubleClickZoom: false, touchZoomRotate: false,
          showNavigationControl: false, showScaleControl: false,
          attributionControl: false,
        }}
        points={INDIA_HUB_POINTS}
      />
    </div>
  ),
};

export const Visual_ZoomConstraints: Story = {
  name: 'Visual / Zoom constraints (min=5, max=10)',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Label>minZoom=5, maxZoom=10</Label>
      <Map height="440px" config={{ ...BASE_CONFIG, minZoom: 5, maxZoom: 10 }} points={INDIA_HUB_POINTS} />
    </div>
  ),
};

export const Visual_FullScreen: Story = {
  name: 'Visual / Full screen',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Map height="100vh" width="100vw" config={{ ...BASE_CONFIG, showFullscreenControl: true }} points={INDIA_HUB_POINTS} />
  ),
};

export const Map_ReuseMaps: Story = {
  name: 'Map / reuseMaps toggle',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Label>
        reuseMaps=true (default) reuses the WebGL context across mounts for better performance.
        Set to false if you need a fresh map instance each time.
      </Label>
      <Row>
        <Section label="reuseMaps=true (default)">
          <Map height="300px" width="400px" config={{ ...BASE_CONFIG, reuseMaps: true }} />
        </Section>
        <Section label="reuseMaps=false">
          <Map height="300px" width="400px" config={{ ...BASE_CONFIG, reuseMaps: false }} />
        </Section>
      </Row>
    </div>
  ),
};

export const Map_AllControlsCombined: Story = {
  name: 'Map / All controls enabled',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Label>Navigation + Scale + Fullscreen + Attribution all enabled</Label>
      <Map
        height="500px"
        config={{
          ...BASE_CONFIG,
          showNavigationControl: true,
          showScaleControl: true,
          showFullscreenControl: true,
          attributionControl: true,
        }}
        points={INDIA_HUB_POINTS.slice(0, 3)}
      />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// ── onPopupClose callback ────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export const Map_OnPopupClose: Story = {
  name: 'Map / onPopupClose callback',
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the `onPopupClose` callback. It fires whenever a popup ' +
          'is dismissed — whether by clicking the MapPopup close (×) button, ' +
          'clicking outside the popup, or toggling the same marker again. ' +
          'The callback receives the `MapPoint` whose popup was closed. ' +
          'The MapPopup close button also automatically dismisses the popup ' +
          'from the map via `PopupCloseContext`.',
      },
    },
  },
  render: () => {
    const [log, setLog] = useState<string[]>([]);
    const points: MapPoint[] = [
      {
        id: 'hub-blr',
        lat: 12.9716,
        lng: 77.5946,
        marker: { color: '#22C55E' },
        tooltip: (
          <MapPopup
            title="Bangalore Hub"
            address="Whitefield Industrial Area"
            status="Active"
            statusColor="#22C55E"
            details={[{ label: 'AWB Pending', value: 342 }]}
            onClose={() => setLog((prev) => [...prev, 'MapPopup onClose fired'])}
          />
        ),
      },
      {
        id: 'hub-del',
        lat: 28.6139,
        lng: 77.209,
        marker: { color: '#3B82F6' },
        tooltip: (
          <MapPopup
            title="Delhi Hub"
            address="Okhla Phase II"
            status="Active"
            statusColor="#3B82F6"
            onClose={() => setLog((prev) => [...prev, 'MapPopup onClose fired'])}
          />
        ),
      },
    ];
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Label>Click a marker, then close the popup via × button, click outside, or toggle the marker</Label>
        <Map
          height="460px"
          config={BASE_CONFIG}
          points={points}
          onPopupClose={(point) =>
            setLog((prev) => [...prev, `onPopupClose → ${point.id}`])
          }
        />
        <div style={{ marginTop: 12, padding: 12, background: '#F9FAFB', borderRadius: 8, fontSize: 13, maxHeight: 120, overflow: 'auto' }}>
          <strong>Event log:</strong>
          {log.length === 0 && <span style={{ color: '#9CA3AF' }}> (no events yet)</span>}
          {log.map((entry, i) => (
            <div key={i} style={{ color: '#374151' }}>• {entry}</div>
          ))}
        </div>
      </div>
    );
  },
};

export const Visual_ViewStateTracking: Story = {
  name: 'Visual / Live viewState tracking',
  render: () => {
    const [vs, setVs] = useState<MapViewState>({
      longitude: 77.59, latitude: 12.97, zoom: 10, pitch: 0, bearing: 0,
    });
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <div style={{ display: 'flex', gap: 24, marginBottom: 12, fontSize: 12, color: '#6B7280', flexWrap: 'wrap' }}>
          <span>lon <b style={{ color: '#1A1A2E' }}>{vs.longitude.toFixed(4)}</b></span>
          <span>lat <b style={{ color: '#1A1A2E' }}>{vs.latitude.toFixed(4)}</b></span>
          <span>zoom <b style={{ color: '#1A1A2E' }}>{vs.zoom.toFixed(2)}</b></span>
          <span>pitch <b style={{ color: '#1A1A2E' }}>{vs.pitch.toFixed(0)}°</b></span>
          <span>bearing <b style={{ color: '#1A1A2E' }}>{vs.bearing.toFixed(0)}°</b></span>
        </div>
        <Map height="460px" config={BASE_CONFIG} onMapMove={setVs} points={INDIA_HUB_POINTS.slice(0, 2)} />
      </div>
    );
  },
};
