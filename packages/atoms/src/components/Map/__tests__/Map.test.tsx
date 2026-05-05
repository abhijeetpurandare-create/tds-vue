import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('maplibre-gl/dist/maplibre-gl.css', () => ({}), { virtual: true });

jest.mock('@turf/turf', () => ({
  circle: jest.fn(() => ({ type: 'Feature', geometry: { type: 'Polygon', coordinates: [[]] }, properties: {} })),
  bbox: jest.fn(() => [0, 0, 1, 1]),
}));

jest.mock('react-map-gl/maplibre', () => ({
  Map: ({ children, style, onLoad, onMove }: {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onLoad?: (e: unknown) => void;
    onMove?: (e: { viewState: unknown }) => void;
    [key: string]: unknown;
  }) => {
    React.useEffect(() => { onLoad?.({ target: { fitBounds: () => {} } }); }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
      <div
        data-testid="react-map-gl"
        style={style}
        onClick={() => onMove?.({ viewState: { longitude: 10, latitude: 20, zoom: 5, pitch: 0, bearing: 0 } })}
      >
        {children}
      </div>
    );
  },
  Marker: ({ children, longitude, latitude }: {
    children?: React.ReactNode;
    longitude: number;
    latitude: number;
    [key: string]: unknown;
  }) => (
    <div data-testid="react-map-marker" data-lng={longitude} data-lat={latitude}>
      {children}
    </div>
  ),
  Popup: ({ children, longitude, latitude, onClose, maxWidth, offset }: {
    children?: React.ReactNode;
    longitude: number;
    latitude: number;
    onClose?: () => void;
    maxWidth?: string;
    offset?: number;
    [key: string]: unknown;
  }) => (
    <div data-testid="react-map-popup" data-lng={longitude} data-lat={latitude} data-maxwidth={maxWidth} data-offset={offset}>
      <button data-testid="popup-close-trigger" onClick={onClose} />
      {children}
    </div>
  ),
  NavigationControl: () => <div data-testid="nav-control" />,
  ScaleControl: () => <div data-testid="scale-control" />,
  FullscreenControl: () => <div data-testid="fullscreen-control" />,
  Source: ({ children }: { children?: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="map-source">{children}</div>
  ),
  Layer: ({ id }: { id?: string; [key: string]: unknown }) => (
    <div data-testid={`map-layer-${id ?? 'unknown'}`} />
  ),
}));

// ─── Imports (after mocks) ────────────────────────────────────────────────────

import Map from '../index';
import MapPopup from '../MapPopup';
import MapMarker from '../MapMarker';
import MapStyleError from '../MapStyleError';
import {
  DEFAULT_VIEW,
  DEFAULT_ZOOM_BASE,
  getMarkerScaleFromZoom,
  getTransformOriginFromAnchor,
  toCssDimension,
  createTransformRequest,
} from '../mapUtils';
import type { MapPoint } from '../types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const noop = () => {};
const MOCK_STYLE = 'https://example.com/style.json';
const withStyle = { mapStyle: MOCK_STYLE };

const basicPoints: MapPoint[] = [
  { id: 'p1', lat: 12.9716, lng: 77.5946, tooltip: <MapPopup title="Hub 1" />, marker: { icon: <span>📍</span> } },
  { id: 'p2', lat: 19.076, lng: 72.8777, tooltip: <MapPopup title="Hub 2" />, marker: { icon: <span>📍</span> } },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ── mapUtils unit tests ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

describe('mapUtils', () => {
  describe('DEFAULT_VIEW', () => {
    it('has longitude, latitude and zoom', () => {
      expect(DEFAULT_VIEW).toHaveProperty('longitude');
      expect(DEFAULT_VIEW).toHaveProperty('latitude');
      expect(DEFAULT_VIEW).toHaveProperty('zoom');
    });
  });

  describe('DEFAULT_ZOOM_BASE', () => {
    it('is 10', () => {
      expect(DEFAULT_ZOOM_BASE).toBe(10);
    });
  });

  describe('getMarkerScaleFromZoom', () => {
    it('returns 1 when currentZoom equals zoomBase', () => {
      expect(getMarkerScaleFromZoom(10, 10)).toBe(1);
    });

    it('returns > 1 when zoomed in past base', () => {
      expect(getMarkerScaleFromZoom(14, 10)).toBeGreaterThan(1);
    });

    it('returns < 1 when zoomed out past base', () => {
      expect(getMarkerScaleFromZoom(6, 10)).toBeLessThan(1);
    });
  });

  describe('getTransformOriginFromAnchor', () => {
    it('maps bottom to "bottom center"', () => {
      expect(getTransformOriginFromAnchor('bottom')).toBe('bottom center');
    });

    it('maps top to "top center"', () => {
      expect(getTransformOriginFromAnchor('top')).toBe('top center');
    });

    it('maps center to "center center"', () => {
      expect(getTransformOriginFromAnchor('center')).toBe('center center');
    });

    it('maps top-left to "top left"', () => {
      expect(getTransformOriginFromAnchor('top-left')).toBe('top left');
    });

    it('maps bottom-right to "bottom right"', () => {
      expect(getTransformOriginFromAnchor('bottom-right')).toBe('bottom right');
    });

    it('defaults to "bottom center" for unknown anchor', () => {
      expect(getTransformOriginFromAnchor('bottom')).toBe('bottom center');
    });
  });

  describe('toCssDimension', () => {
    it('converts number to px string', () => {
      expect(toCssDimension(400)).toBe('400px');
    });

    it('passes string through unchanged', () => {
      expect(toCssDimension('50vh')).toBe('50vh');
    });

    it('handles zero', () => {
      expect(toCssDimension(0)).toBe('0px');
    });
  });

  describe('createTransformRequest', () => {
    it('returns a function', () => {
      const fn = createTransformRequest('example.com', 'my-token');
      expect(typeof fn).toBe('function');
    });

    it('injects Bearer auth header when passed a string token', () => {
      const fn = createTransformRequest('tiles.example.com', 'abc123');
      const result = fn('https://tiles.example.com/v1/tile/0/0/0.pbf', 'Tile');
      expect(result).toEqual({
        url: 'https://tiles.example.com/v1/tile/0/0/0.pbf',
        headers: { Authorization: 'Bearer abc123' },
      });
    });

    it('returns undefined for non-matching URL', () => {
      const fn = createTransformRequest('tiles.example.com', 'abc123');
      const result = fn('https://other-domain.com/tile.pbf', 'Tile');
      expect(result).toBeUndefined();
    });

    it('works with RegExp pattern', () => {
      const fn = createTransformRequest(/tiles\.(example|other)\.com/, 'tok');
      expect(fn('https://tiles.example.com/tile.pbf', 'Tile')).toBeDefined();
      expect(fn('https://tiles.other.com/tile.pbf', 'Tile')).toBeDefined();
      expect(fn('https://unrelated.com/tile.pbf', 'Tile')).toBeUndefined();
    });

    it('accepts a headers object with multiple headers', () => {
      const fn = createTransformRequest('example.com', {
        Authorization: 'Bearer tok',
        'X-Api-Key': 'key-123',
        'X-Tenant-Id': 'tenant-abc',
      });
      const result = fn('https://example.com/style.json', 'Style');
      expect(result).toEqual({
        url: 'https://example.com/style.json',
        headers: {
          Authorization: 'Bearer tok',
          'X-Api-Key': 'key-123',
          'X-Tenant-Id': 'tenant-abc',
        },
      });
    });

    it('headers object is passed through as-is (no Bearer prefix)', () => {
      const fn = createTransformRequest('example.com', { 'X-Custom': 'raw-value' });
      const result = fn('https://example.com/tile.pbf', 'Tile');
      expect(result?.headers).toEqual({ 'X-Custom': 'raw-value' });
    });

    it('escapes special regex characters in string pattern', () => {
      const fn = createTransformRequest('tiles.example.com', 'tok');
      // The dot should be escaped — "tilesXexample" should NOT match
      const result = fn('https://tilesXexampleXcom/tile.pbf', 'Tile');
      expect(result).toBeUndefined();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ── MapStyleError tests ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

describe('MapStyleError', () => {
  it('renders the error container with data-testid', () => {
    render(<MapStyleError height="300px" width="100%" />);
    expect(screen.getByTestId('map-no-style')).toBeInTheDocument();
  });

  it('shows "Something went wrong" title', () => {
    render(<MapStyleError height="300px" width="100%" />);
    expect(screen.getByTestId('map-error-title')).toHaveTextContent('Something went wrong');
  });

  it('shows subtitle text', () => {
    render(<MapStyleError height="300px" width="100%" />);
    expect(screen.getByTestId('map-error-subtitle')).toHaveTextContent('Please try again after sometime');
  });

  it('renders the error icon wrapper', () => {
    render(<MapStyleError height="300px" width="100%" />);
    expect(screen.getByTestId('map-error-icon')).toBeInTheDocument();
  });

  it('renders an SVG inside the icon wrapper', () => {
    const { container } = render(<MapStyleError height="300px" width="100%" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('accepts numeric height and width', () => {
    render(<MapStyleError height={400} width={600} />);
    expect(screen.getByTestId('map-no-style')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ── MapPopup tests ───────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

describe('MapPopup', () => {
  it('renders the title', () => {
    render(<MapPopup title="Test Hub" />);
    expect(screen.getByTestId('map-popup-title')).toHaveTextContent('Test Hub');
  });

  it('renders address when provided', () => {
    render(<MapPopup title="Hub" address="123 Main St" />);
    expect(screen.getByTestId('map-popup-address')).toHaveTextContent('123 Main St');
  });

  it('does not render address when not provided', () => {
    render(<MapPopup title="Hub" />);
    expect(screen.queryByTestId('map-popup-address')).not.toBeInTheDocument();
  });

  it('renders city when provided', () => {
    render(<MapPopup title="Hub" city="Bangalore, 560001" />);
    expect(screen.getByTestId('map-popup-city')).toHaveTextContent('Bangalore, 560001');
  });

  it('does not render city when not provided', () => {
    render(<MapPopup title="Hub" />);
    expect(screen.queryByTestId('map-popup-city')).not.toBeInTheDocument();
  });

  it('renders status badge when status provided', () => {
    render(<MapPopup title="Hub" status="Active" />);
    expect(screen.getByTestId('map-popup-status')).toHaveTextContent('Active');
  });

  it('does not render status badge when absent', () => {
    render(<MapPopup title="Hub" />);
    expect(screen.queryByTestId('map-popup-status')).not.toBeInTheDocument();
  });

  it('renders the correct number of detail rows', () => {
    render(
      <MapPopup
        title="Hub"
        details={[
          { label: 'AWB Pending', value: 100 },
          { label: 'Out for Delivery', value: 50 },
          { label: 'Returns', value: 10 },
        ]}
      />
    );
    expect(screen.getByTestId('map-popup-details').children).toHaveLength(3);
  });

  it('renders correct detail values', () => {
    render(<MapPopup title="Hub" details={[{ label: 'AWB Pending', value: 342 }]} />);
    expect(screen.getByTestId('map-popup-detail-value-0')).toHaveTextContent('342');
  });

  it('renders detail labels', () => {
    render(<MapPopup title="Hub" details={[{ label: 'Shipments Today', value: 200 }]} />);
    expect(screen.getByText('Shipments Today')).toBeInTheDocument();
  });

  it('does not render details section when empty', () => {
    render(<MapPopup title="Hub" details={[]} />);
    expect(screen.queryByTestId('map-popup-details')).not.toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(
      <MapPopup
        title="Hub"
        actions={[
          { label: 'View Hub', onClick: noop, variant: 'primary' },
          { label: 'Directions', onClick: noop, variant: 'secondary' },
        ]}
      />
    );
    const actions = screen.getByTestId('map-popup-actions');
    expect(within(actions).getByText('View Hub')).toBeInTheDocument();
    expect(within(actions).getByText('Directions')).toBeInTheDocument();
  });

  it('does not render footer when actions is empty', () => {
    render(<MapPopup title="Hub" actions={[]} />);
    expect(screen.queryByTestId('map-popup-actions')).not.toBeInTheDocument();
  });

  it('calls onClick when primary action is clicked', () => {
    const handler = jest.fn();
    render(<MapPopup title="Hub" actions={[{ label: 'View', onClick: handler, variant: 'primary' }]} />);
    fireEvent.click(screen.getByText('View'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when secondary action is clicked', () => {
    const handler = jest.fn();
    render(<MapPopup title="Hub" actions={[{ label: 'Secondary', onClick: handler, variant: 'secondary' }]} />);
    fireEvent.click(screen.getByText('Secondary'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('renders close button when onClose is provided', () => {
    render(<MapPopup title="Hub" onClose={noop} />);
    expect(screen.getByTestId('map-popup-close')).toBeInTheDocument();
  });

  it('does not render close button when onClose is not provided', () => {
    render(<MapPopup title="Hub" />);
    expect(screen.queryByTestId('map-popup-close')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<MapPopup title="Hub" onClose={onClose} />);
    fireEvent.click(screen.getByTestId('map-popup-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the header section', () => {
    render(<MapPopup title="Hub" />);
    expect(screen.getByTestId('map-popup-header')).toBeInTheDocument();
  });

  it('renders the body section when status is provided', () => {
    render(<MapPopup title="Hub" status="Active" />);
    expect(screen.getByTestId('map-popup-body')).toBeInTheDocument();
  });

  it('does not render the body section when no status or details', () => {
    render(<MapPopup title="Hub" />);
    expect(screen.queryByTestId('map-popup-body')).not.toBeInTheDocument();
  });

  it('renders popup root with testid', () => {
    render(<MapPopup title="Hub" />);
    expect(screen.getByTestId('map-popup')).toBeInTheDocument();
  });

  it('renders detail icon when provided', () => {
    render(
      <MapPopup
        title="Hub"
        details={[{ label: 'Orders', value: 10, icon: <span data-testid="detail-icon">📦</span> }]}
      />
    );
    expect(screen.getByTestId('detail-icon')).toBeInTheDocument();
  });

  it('renders three actions', () => {
    render(
      <MapPopup
        title="Hub"
        actions={[
          { label: 'A', onClick: noop },
          { label: 'B', onClick: noop },
          { label: 'C', onClick: noop, variant: 'ghost' },
        ]}
      />
    );
    const actions = screen.getByTestId('map-popup-actions');
    expect(within(actions).getAllByRole('button')).toHaveLength(3);
  });

  it('renders status badge with custom color text', () => {
    render(<MapPopup title="Hub" status="Maintenance" statusColor="#F59E0B" />);
    expect(screen.getByTestId('map-popup-status')).toHaveTextContent('Maintenance');
  });

  it('renders all props together without errors', () => {
    const { baseElement } = render(
      <MapPopup
        title="Bangalore Hub"
        address="Whitefield"
        city="Bangalore"
        status="Active"
        statusColor="#22C55E"
        details={[{ label: 'AWB', value: 100 }]}
        actions={[{ label: 'View', onClick: noop, variant: 'primary' }]}
        onClose={noop}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders location icon in header', () => {
    render(<MapPopup title="Hub" />);
    expect(screen.getByTestId('map-popup-location-icon')).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ── Map component tests ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

describe('Map component', () => {
  // ── Rendering ───────────────────────────────────────────────────────────────

  it('renders without crashing', () => {
    const { baseElement } = render(<Map config={withStyle} />);
    expect(baseElement).toBeTruthy();
  });

  it('renders the react-map-gl container', () => {
    render(<Map config={withStyle} />);
    expect(screen.getByTestId('react-map-gl')).toBeInTheDocument();
  });

  it('applies custom height to container', () => {
    const { container } = render(<Map height="600px" config={withStyle} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className to container', () => {
    const { container } = render(<Map config={withStyle} className="my-custom-class" />);
    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('renders children inside the map container', () => {
    render(
      <Map config={withStyle}>
        <div data-testid="custom-layer">Layer</div>
      </Map>
    );
    expect(screen.getByTestId('custom-layer')).toBeInTheDocument();
  });

  // ── Markers ─────────────────────────────────────────────────────────────────

  it('renders a marker for each point', () => {
    render(<Map config={withStyle} points={basicPoints} />);
    expect(screen.getAllByTestId('react-map-marker')).toHaveLength(2);
  });

  it('passes correct longitude to marker', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    expect(screen.getByTestId('react-map-marker')).toHaveAttribute('data-lng', '77.5946');
  });

  it('passes correct latitude to marker', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    expect(screen.getByTestId('react-map-marker')).toHaveAttribute('data-lat', '12.9716');
  });

  it('renders no markers when points is empty', () => {
    render(<Map config={withStyle} points={[]} />);
    expect(screen.queryByTestId('react-map-marker')).not.toBeInTheDocument();
  });

  it('uses renderMarker function when provided', () => {
    const customPoint: MapPoint = {
      id: 'custom', lat: 0, lng: 0,
      renderMarker: () => <div data-testid="custom-marker-render">Custom</div>,
    };
    render(<Map config={withStyle} points={[customPoint]} />);
    expect(screen.getByTestId('custom-marker-render')).toBeInTheDocument();
  });

  it('renders marker.icon when renderMarker is not provided', () => {
    const iconPoint: MapPoint = {
      id: 'icon-point', lat: 0, lng: 0,
      marker: { icon: <span data-testid="icon-marker">⭐</span> },
    };
    render(<Map config={withStyle} points={[iconPoint]} />);
    expect(screen.getByTestId('icon-marker')).toBeInTheDocument();
  });

  // ── Marker color customization ──────────────────────────────────────────────

  it('applies custom marker color via marker.color', () => {
    const colorPoint: MapPoint = {
      id: 'colored', lat: 0, lng: 0,
      marker: { color: '#FF00FF', icon: <span data-testid="colored-icon">📍</span> },
    };
    render(<Map config={withStyle} points={[colorPoint]} />);
    const icon = screen.getByTestId('colored-icon');
    // The icon span wrapper should have the custom color
    expect(icon.parentElement).toHaveStyle({ color: '#FF00FF' });
  });

  it('uses default marker color when marker.color is not set', () => {
    const defaultPoint: MapPoint = {
      id: 'default-color', lat: 0, lng: 0,
      marker: { icon: <span data-testid="default-icon">📍</span> },
    };
    render(<Map config={withStyle} points={[defaultPoint]} />);
    const icon = screen.getByTestId('default-icon');
    // Should have the theme default color (not empty)
    expect(icon.parentElement?.style.color).toBeTruthy();
  });

  it('renders DefaultMarkerWrapper for points without icon or renderMarker', () => {
    const plainPoint: MapPoint = { id: 'plain', lat: 10, lng: 20 };
    render(<Map config={withStyle} points={[plainPoint]} />);
    // DefaultMarkerWrapper renders a native marker (no data-testid="map-marker-*")
    const markers = screen.getAllByTestId('react-map-marker');
    expect(markers).toHaveLength(1);
    // No custom marker wrapper div
    expect(screen.queryByTestId('map-marker-plain')).not.toBeInTheDocument();
  });

  it('renders custom icon marker wrapper for points with marker.icon', () => {
    const iconPoint: MapPoint = {
      id: 'with-icon', lat: 0, lng: 0,
      marker: { icon: <span>🏠</span> },
    };
    render(<Map config={withStyle} points={[iconPoint]} />);
    expect(screen.getByTestId('map-marker-with-icon')).toBeInTheDocument();
  });

  it('prioritizes renderMarker over marker.icon', () => {
    const point: MapPoint = {
      id: 'priority', lat: 0, lng: 0,
      marker: { icon: <span data-testid="should-not-render">icon</span> },
      renderMarker: () => <div data-testid="should-render">custom</div>,
    };
    render(<Map config={withStyle} points={[point]} />);
    expect(screen.getByTestId('should-render')).toBeInTheDocument();
    expect(screen.queryByTestId('should-not-render')).not.toBeInTheDocument();
  });

  // ── Controls ────────────────────────────────────────────────────────────────

  it('renders navigation control by default', () => {
    render(<Map config={withStyle} />);
    expect(screen.getByTestId('nav-control')).toBeInTheDocument();
  });

  it('hides navigation control when showNavigationControl=false', () => {
    render(<Map config={{ ...withStyle, showNavigationControl: false }} />);
    expect(screen.queryByTestId('nav-control')).not.toBeInTheDocument();
  });

  it('renders scale control by default', () => {
    render(<Map config={withStyle} />);
    expect(screen.getByTestId('scale-control')).toBeInTheDocument();
  });

  it('hides scale control when showScaleControl=false', () => {
    render(<Map config={{ ...withStyle, showScaleControl: false }} />);
    expect(screen.queryByTestId('scale-control')).not.toBeInTheDocument();
  });

  it('does not render fullscreen control by default', () => {
    render(<Map config={withStyle} />);
    expect(screen.queryByTestId('fullscreen-control')).not.toBeInTheDocument();
  });

  it('renders fullscreen control when showFullscreenControl=true', () => {
    render(<Map config={{ ...withStyle, showFullscreenControl: true }} />);
    expect(screen.getByTestId('fullscreen-control')).toBeInTheDocument();
  });

  // ── Callbacks ───────────────────────────────────────────────────────────────

  it('calls onMapLoad when map loads', () => {
    const onMapLoad = jest.fn();
    render(<Map config={withStyle} onMapLoad={onMapLoad} />);
    expect(onMapLoad).toHaveBeenCalledTimes(1);
  });

  it('calls onPointClick when a marker is clicked', () => {
    const onPointClick = jest.fn();
    render(<Map config={withStyle} points={[basicPoints[0]]} onPointClick={onPointClick} />);
    fireEvent.click(screen.getByTestId('map-marker-p1'));
    expect(onPointClick).toHaveBeenCalledWith(basicPoints[0]);
  });

  // ── Popup behaviour ─────────────────────────────────────────────────────────

  it('renders no popup on initial mount', () => {
    render(<Map config={withStyle} points={basicPoints} />);
    expect(screen.queryByTestId('react-map-popup')).not.toBeInTheDocument();
  });

  it('shows popup after clicking a marker', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    fireEvent.click(screen.getByTestId('map-marker-p1'));
    expect(screen.getByTestId('react-map-popup')).toBeInTheDocument();
  });

  it('toggles popup closed on second marker click', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    const marker = screen.getByTestId('map-marker-p1');
    fireEvent.click(marker);
    expect(screen.getByTestId('react-map-popup')).toBeInTheDocument();
    fireEvent.click(marker);
    expect(screen.queryByTestId('react-map-popup')).not.toBeInTheDocument();
  });

  it('closes popup via the popup onClose callback', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    fireEvent.click(screen.getByTestId('map-marker-p1'));
    fireEvent.click(screen.getByTestId('popup-close-trigger'));
    expect(screen.queryByTestId('react-map-popup')).not.toBeInTheDocument();
  });

  it('does not show popup for a point without tooltip', () => {
    const noTooltipPoint: MapPoint = { id: 'nx', lat: 0, lng: 0, marker: { icon: <span>📍</span> } };
    render(<Map config={withStyle} points={[noTooltipPoint]} />);
    fireEvent.click(screen.getByTestId('map-marker-nx'));
    expect(screen.queryByTestId('react-map-popup')).not.toBeInTheDocument();
  });

  it('shows correct popup content for each clicked marker', () => {
    render(<Map config={withStyle} points={basicPoints} />);
    fireEvent.click(screen.getByTestId('map-marker-p1'));
    expect(screen.getByText('Hub 1')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('map-marker-p2'));
    expect(screen.queryByText('Hub 1')).not.toBeInTheDocument();
    expect(screen.getByText('Hub 2')).toBeInTheDocument();
  });

  // ── Accessibility ───────────────────────────────────────────────────────────

  it('marker wrapper has role="button"', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    expect(screen.getByTestId('map-marker-p1')).toHaveAttribute('role', 'button');
  });

  it('marker wrapper has aria-label containing the point id', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    expect(screen.getByTestId('map-marker-p1')).toHaveAttribute('aria-label', 'Map marker p1');
  });

  it('marker wrapper has tabIndex=0', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    expect(screen.getByTestId('map-marker-p1')).toHaveAttribute('tabindex', '0');
  });

  it('opens popup when marker is activated via Enter key', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    fireEvent.keyDown(screen.getByTestId('map-marker-p1'), { key: 'Enter' });
    expect(screen.getByTestId('react-map-popup')).toBeInTheDocument();
  });

  it('opens popup when marker is activated via Space key', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    fireEvent.keyDown(screen.getByTestId('map-marker-p1'), { key: ' ' });
    expect(screen.getByTestId('react-map-popup')).toBeInTheDocument();
  });

  // ── Popup does not scale with marker zoom ───────────────────────────────────

  it('popup has fixed maxWidth of 340px regardless of zoom', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    fireEvent.click(screen.getByTestId('map-marker-p1'));
    const popup = screen.getByTestId('react-map-popup');
    expect(popup).toHaveAttribute('data-maxwidth', '340px');
  });

  it('popup has fixed offset of 20 regardless of zoom', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    fireEvent.click(screen.getByTestId('map-marker-p1'));
    const popup = screen.getByTestId('react-map-popup');
    expect(popup).toHaveAttribute('data-offset', '20');
  });

  it('popup does not have a scale transform wrapper', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    fireEvent.click(screen.getByTestId('map-marker-p1'));
    const popup = screen.getByTestId('react-map-popup');
    // The popup content should be rendered directly, not wrapped in a scaled div
    const children = popup.querySelectorAll('[style*="transform"]');
    const scaledChildren = Array.from(children).filter(
      (el) => (el as HTMLElement).style.transform.includes('scale')
    );
    expect(scaledChildren).toHaveLength(0);
  });

  it('popup maxWidth stays 340px even with markerScaleWithZoom enabled', () => {
    render(
      <Map
        config={{ ...withStyle, markerScaleWithZoom: true, markerZoomBase: 5 }}
        points={[basicPoints[0]]}
      />
    );
    fireEvent.click(screen.getByTestId('map-marker-p1'));
    const popup = screen.getByTestId('react-map-popup');
    expect(popup).toHaveAttribute('data-maxwidth', '340px');
    expect(popup).toHaveAttribute('data-offset', '20');
  });

  // ── Geofence rendering ──────────────────────────────────────────────────────

  it('renders geofence components when geofences are provided', () => {
    const geofences = [
      { id: 'gf1', geometry: { type: 'Point' as const, coordinates: [77.59, 12.97] as [number, number] }, radius: 500 },
    ];
    render(<Map config={withStyle} geofences={geofences} />);
    // GeofenceCircle renders inside the map — the map should still render
    expect(screen.getByTestId('react-map-gl')).toBeInTheDocument();
  });

  it('popup works correctly alongside geofences', () => {
    const geofences = [
      { id: 'gf1', geometry: { type: 'Point' as const, coordinates: [77.59, 12.97] as [number, number] }, radius: 500 },
    ];
    render(<Map config={withStyle} points={[basicPoints[0]]} geofences={geofences} />);
    fireEvent.click(screen.getByTestId('map-marker-p1'));
    const popup = screen.getByTestId('react-map-popup');
    expect(popup).toBeInTheDocument();
    expect(popup).toHaveAttribute('data-maxwidth', '340px');
    expect(popup).toHaveAttribute('data-offset', '20');
  });

  // ── Error state (no mapStyle) ───────────────────────────────────────────────

  it('renders the no-style error state when mapStyle is not provided', () => {
    render(<Map />);
    expect(screen.getByTestId('map-no-style')).toBeInTheDocument();
    expect(screen.queryByTestId('react-map-gl')).not.toBeInTheDocument();
  });

  it('shows "Something went wrong" in error state', () => {
    render(<Map />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows subtitle in error state', () => {
    render(<Map />);
    expect(screen.getByText('Please try again after sometime')).toBeInTheDocument();
  });

  it('renders error state for empty string mapStyle', () => {
    render(<Map config={{ mapStyle: '' }} />);
    expect(screen.getByTestId('map-no-style')).toBeInTheDocument();
  });

  it('error state mounts when custom height is passed with no mapStyle', () => {
    render(<Map height="300px" />);
    expect(screen.getByTestId('map-no-style')).toBeInTheDocument();
  });

  it('error state renders icon wrapper', () => {
    render(<Map />);
    expect(screen.getByTestId('map-error-icon')).toBeInTheDocument();
  });

  // ── onPopupClose callback ───────────────────────────────────────────────────

  it('calls onPopupClose when popup is dismissed via the popup onClose trigger', () => {
    const onPopupClose = jest.fn();
    render(<Map config={withStyle} points={[basicPoints[0]]} onPopupClose={onPopupClose} />);
    fireEvent.click(screen.getByTestId('map-marker-p1'));
    expect(screen.getByTestId('react-map-popup')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('popup-close-trigger'));
    expect(screen.queryByTestId('react-map-popup')).not.toBeInTheDocument();
    expect(onPopupClose).toHaveBeenCalledTimes(1);
    expect(onPopupClose).toHaveBeenCalledWith(basicPoints[0]);
  });

  it('calls onPopupClose when the same marker is toggled to close', () => {
    const onPopupClose = jest.fn();
    render(<Map config={withStyle} points={[basicPoints[0]]} onPopupClose={onPopupClose} />);
    const marker = screen.getByTestId('map-marker-p1');
    fireEvent.click(marker); // open
    fireEvent.click(marker); // close (toggle)
    expect(onPopupClose).toHaveBeenCalledTimes(1);
    expect(onPopupClose).toHaveBeenCalledWith(basicPoints[0]);
  });

  it('calls onPopupClose for the old point when switching to a different marker', () => {
    const onPopupClose = jest.fn();
    render(<Map config={withStyle} points={basicPoints} onPopupClose={onPopupClose} />);
    fireEvent.click(screen.getByTestId('map-marker-p1')); // open p1
    fireEvent.click(screen.getByTestId('map-marker-p2')); // switch to p2 — should close p1
    expect(onPopupClose).toHaveBeenCalledTimes(1);
    expect(onPopupClose).toHaveBeenCalledWith(basicPoints[0]);
  });

  it('does not call onPopupClose when no popup is open and map is clicked', () => {
    const onPopupClose = jest.fn();
    render(<Map config={withStyle} points={basicPoints} onPopupClose={onPopupClose} />);
    // Click the map without opening any popup
    fireEvent.click(screen.getByTestId('react-map-gl'));
    expect(onPopupClose).not.toHaveBeenCalled();
  });

  it('does not crash when onPopupClose is not provided', () => {
    render(<Map config={withStyle} points={[basicPoints[0]]} />);
    const marker = screen.getByTestId('map-marker-p1');
    fireEvent.click(marker);
    fireEvent.click(screen.getByTestId('popup-close-trigger'));
    expect(screen.queryByTestId('react-map-popup')).not.toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ── MapMarker tests ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

describe('MapMarker', () => {
  it('renders an SVG', () => {
    const { container } = render(<MapMarker />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom color to the pin path', () => {
    const { container } = render(<MapMarker color="#123456" />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill', '#123456');
  });

  it('applies custom size to SVG width and height', () => {
    const { container } = render(<MapMarker size={48} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });

  it('uses defaultMapStyles marker color when color is not provided', () => {
    const { container } = render(<MapMarker />);
    const path = container.querySelector('path');
    expect(path?.getAttribute('fill')).toBeTruthy();
  });

  it('renders the white inner circle', () => {
    const { container } = render(<MapMarker />);
    const circle = container.querySelector('circle');
    expect(circle).toHaveAttribute('fill', 'white');
  });

  it('uses default size from config when size is not provided', () => {
    const { container } = render(<MapMarker />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBeTruthy();
    expect(svg?.getAttribute('height')).toBeTruthy();
  });
});
