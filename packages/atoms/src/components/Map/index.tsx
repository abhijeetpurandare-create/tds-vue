import React, { useState, useCallback, useRef } from 'react';
import {
  Map as MapGL,
  Marker,
  Popup,
  NavigationControl,
  ScaleControl,
  FullscreenControl,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { css } from '@emotion/css';
import { useTheme } from '../ThemeProvider';
import { defaultMapStyles } from '../../config/config';
import Spinner from '../Spinner';
import GeofenceCircle from './GeofenceCircle';


import MapStyleError from './MapStyleError';
import DefaultMarkerWrapper from './DefaultMarkerWrapper';
import { PopupCloseContext } from './PopupCloseContext';
import {
  DEFAULT_VIEW,
  DEFAULT_ZOOM_BASE,
  getMarkerScaleFromZoom,
  getTransformOriginFromAnchor,
  toCssDimension,
} from './mapUtils';

export type {
  MapProps,
  MapPoint,
  MapConfig,
  MapMarkerConfig,
  MapViewState,
  MapPopupProps,
  MapGeofence,
  MapTransformRequestFn,
  MapTransformRequestResult,
  MapResourceType,
} from './types';

import type { MapProps, MapPoint, MapViewState } from './types';

// Wrap react-map-gl components in loose-typed wrappers to avoid @types/react
// v18 JSX element return-type incompatibility.
/* eslint-disable @typescript-eslint/no-explicit-any */
const AnyMapGL = MapGL as any;
const AnyMarker = Marker as any;
const AnyPopup = Popup as any;
const AnyNavCtrl = NavigationControl as any;
const AnyScaleCtrl = ScaleControl as any;
const AnyFsCtrl = FullscreenControl as any;
/* eslint-enable @typescript-eslint/no-explicit-any */

const Map: React.FC<MapProps> = ({
  height = '400px',
  width = '100%',
  config = {},
  points = [],
  geofences = [],
  onPointClick,
  onPopupClose,
  onMapLoad,
  onMapMove,
  className = '',
  style,
  children,
}) => {
  const { theme } = useTheme();
  const mapCfg = theme.components?.map ?? defaultMapStyles;

  const {
    initialViewState = DEFAULT_VIEW,
    mapStyle = '',
    minZoom,
    maxZoom,
    reuseMaps = true,
    maxParallelImageRequests = 16,
    attributionControl = true,
    scrollZoom = true,
    dragPan = true,
    doubleClickZoom = true,
    touchZoomRotate = true,
    maxBounds,
    showNavigationControl = true,
    showScaleControl = true,
    showFullscreenControl = false,
    markerScaleWithZoom = true,
    markerZoomBase,
    transformRequest,
  } = config;

  const zoomBase = markerZoomBase ?? initialViewState?.zoom ?? DEFAULT_ZOOM_BASE;
  const [currentZoom, setCurrentZoom] = useState(initialViewState?.zoom ?? DEFAULT_ZOOM_BASE);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const markerClickedRef = useRef(false);

  const markerScale = markerScaleWithZoom ? getMarkerScaleFromZoom(currentZoom, zoomBase) : 1;


  const handleMapMove = useCallback(
    (viewState: MapViewState) => {
      setCurrentZoom(viewState.zoom);
      onMapMove?.(viewState);
    },
    [onMapMove]
  );

  const ctr = mapCfg.container ?? defaultMapStyles.container;

  const containerStyle = css({
    position: 'relative',
    height: toCssDimension(height),
    width: toCssDimension(width),
    borderRadius: ctr.borderRadius,
    boxShadow: ctr.boxShadow,
    border: ctr.borderColor !== 'transparent' ? `1px solid ${ctr.borderColor}` : undefined,
    overflow: 'hidden',
    '& .maplibregl-canvas': { outline: 'none' },
    '& .maplibregl-popup-content': {
      padding: 0,
      background: 'transparent',
      boxShadow: 'none',
      borderRadius: 0,
      lineHeight: 0,
    },
    '& .maplibregl-popup-tip': { display: 'none' },
    '& .maplibregl-popup-close-button': { display: 'none' },
    '& .maplibregl-popup': {
      maxWidth: 'fit-content !important',
      lineHeight: 0,
    },
  });

  const handleMapLoad = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      mapRef.current = event.target;


      onMapLoad?.(event);
      setMapLoaded(true);
    },
    [geofences, onMapLoad]
  );

  const handleMarkerActivate = useCallback(
    (point: MapPoint) => {
      markerClickedRef.current = true;
      setSelectedPoint((prev) => {
        if (prev?.id === point.id) {
          // Toggling same marker — closing the popup
          onPopupClose?.(point);
          return null;
        }
        if (prev) {
          // Switching from one popup to another — close the old one
          onPopupClose?.(prev);
        }
        return point;
      });
      onPointClick?.(point);
    },
    [onPointClick, onPopupClose]
  );

  const handleMarkerClick = useCallback(
    (point: MapPoint, e: React.MouseEvent) => {
      e.stopPropagation();
      handleMarkerActivate(point);
    },
    [handleMarkerActivate]
  );

  if (!mapStyle) {
    return <MapStyleError height={height} width={width} />;
  }

  return (
    <div className={`${containerStyle} ${className}`} style={style}>
      {!mapLoaded && (
        <div
          data-testid="map-loading"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: ctr.loadingBg,
            zIndex: 10,
            borderRadius: '8px',
          }}
        >
          <Spinner size="sm" variant="secondary" style={{ width: 35, height: 35 }} />
        </div>
      )}
      <AnyMapGL
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        minZoom={minZoom}
        maxZoom={maxZoom}
        maxBounds={maxBounds}
        reuseMaps={reuseMaps}
        maxParallelImageRequests={maxParallelImageRequests}
        attributionControl={attributionControl}
        scrollZoom={scrollZoom}
        dragPan={dragPan}
        doubleClickZoom={doubleClickZoom}
        touchZoomRotate={touchZoomRotate}
        transformRequest={transformRequest}
        onLoad={handleMapLoad}
        onMove={(e: { viewState: MapViewState }) => handleMapMove(e.viewState)}
        onClick={() => {
          if (markerClickedRef.current) {
            markerClickedRef.current = false;
            return;
          }
          if (selectedPoint) {
            onPopupClose?.(selectedPoint);
          }
          setSelectedPoint(null);
        }}
      >
        {showNavigationControl && <AnyNavCtrl position="top-right" />}
        {showScaleControl && <AnyScaleCtrl />}
        {showFullscreenControl && <AnyFsCtrl />}

        {points.map((point) => {
          const anchor = point.marker?.anchor ?? 'bottom';
          const transformOrigin = getTransformOriginFromAnchor(anchor);
          const hasCustomContent = !!(point.renderMarker || point.marker?.icon);

          if (!hasCustomContent) {
            return (
              <DefaultMarkerWrapper
                key={point.id}
                point={point}
                anchor={anchor}
                color={point.marker?.color ?? mapCfg.marker.defaultColor}
                scale={markerScale}
                onActivate={handleMarkerActivate}
              />
            );
          }

          return (
            <AnyMarker
              key={point.id}
              longitude={point.lng}
              latitude={point.lat}
              anchor={anchor}
            >
              <div
                role="button"
                aria-label={`Map marker ${point.id}`}
                tabIndex={0}
                onClick={(e: React.MouseEvent) => handleMarkerClick(point, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleMarkerActivate(point);
                  }
                }}
                data-testid={`map-marker-${point.id}`}
                style={{
                  display: 'inline-block',
                  transform: markerScale !== 1 ? `scale(${markerScale})` : undefined,
                  transformOrigin,
                }}
              >
                {point.renderMarker ? (
                  point.renderMarker(point)
                ) : (
                  <span
                    style={{
                      color: point.marker?.color ?? mapCfg.marker.defaultColor,
                      cursor: 'pointer',
                      display: 'inline-flex',
                    }}
                  >
                    {point.marker?.icon}
                  </span>
                )}
              </div>
            </AnyMarker>
          );
        })}

        {selectedPoint && selectedPoint.tooltip && (
          <AnyPopup
            longitude={selectedPoint.lng}
            latitude={selectedPoint.lat}
            anchor="top"
            closeOnClick={false}
            onClose={() => {
              onPopupClose?.(selectedPoint);
              setSelectedPoint(null);
            }}
            maxWidth="none"
            offset={0}
          >
            <PopupCloseContext.Provider
              value={() => {
                onPopupClose?.(selectedPoint);
                setSelectedPoint(null);
              }}
            >
              {selectedPoint.tooltip}
            </PopupCloseContext.Provider>
          </AnyPopup>
        )}

        {geofences.map((gf) => (
          <GeofenceCircle
            key={gf.id}
            id={gf.id}
            type={gf.shapeType ?? 'circle'}
            center={gf.geometry.coordinates}
            radiusKm={gf.radius / 1000}
            sizeKm={gf.radius / 1000}
            {...(gf.fillColor ? { fillColor: gf.fillColor } : {})}
            {...(gf.strokeColor ? { borderColor: gf.strokeColor } : {})}
            {...(gf.fillOpacity != null ? { fillOpacity: gf.fillOpacity } : {})}
            {...(gf.strokeDasharray ? { strokeDasharray: gf.strokeDasharray } : {})}
            {...(gf.strokeWidth != null ? { strokeWidth: gf.strokeWidth } : {})}
          />
        ))}

        {children}
      </AnyMapGL>
    </div>
  );
};

Map.displayName = 'Map';

export default Map;