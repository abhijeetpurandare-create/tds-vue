import React from 'react';
import { useTheme } from '../ThemeProvider';
import { defaultMapStyles } from '../../config/config';

interface MapMarkerProps {
  /** Pin fill colour — falls back to theme marker.defaultColor */
  color?: string;
  /** SVG width & height in px */
  size?: number;
}

/**
 * Standalone SVG map-pin marker driven by theme tokens.
 */
const MapMarker: React.FC<MapMarkerProps> = ({ color, size }) => {
  const { theme } = useTheme();
  const mapCfg = theme.components?.map ?? defaultMapStyles;
  const resolvedColor = color ?? mapCfg.marker.defaultColor;
  const resolvedSize = size ?? mapCfg.marker.size;

  return (
    <svg
      width={resolvedSize}
      height={resolvedSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill={resolvedColor}
      />
      <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
  );
};

MapMarker.displayName = 'MapMarker';

export default MapMarker;
