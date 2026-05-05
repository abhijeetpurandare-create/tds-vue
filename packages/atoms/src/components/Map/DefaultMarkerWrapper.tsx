import React, { useRef, useEffect } from 'react';
import { Marker } from 'react-map-gl/maplibre';
import type { MapPoint } from './types';

// Loose-typed wrapper to avoid @types/react v18 JSX element return-type incompatibility.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyMarker = Marker as any;

/** Renders a native MapLibre default marker with click handling via ref. */
const DefaultMarkerWrapper: React.FC<{
  point: MapPoint;
  anchor: string;
  color: string;
  scale: number;
  onActivate: (point: MapPoint) => void;
}> = ({ point, anchor, color, scale, onActivate }) => {
  const markerRef = useRef<{ getElement: () => HTMLElement } | null>(null);

  useEffect(() => {
    const el = markerRef.current?.getElement();
    if (!el) return;
    el.style.cursor = 'pointer';

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      onActivate(point);
    };

    el.addEventListener('click', handleClick);
    return () => el.removeEventListener('click', handleClick);
  }, [point, onActivate]);


  return (
    <AnyMarker
      ref={markerRef}
      longitude={point.lng}
      latitude={point.lat}
      anchor={anchor}
      color={color}
      scale={scale}
    />
  );
};

export default DefaultMarkerWrapper;
