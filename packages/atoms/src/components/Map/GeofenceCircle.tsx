import React, { useMemo } from "react";
import { Source, Layer } from "react-map-gl/maplibre";
import { circle as turfCircle } from "@turf/turf";
import type { Feature, Polygon } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
type GeofenceType = "circle" | "square";

interface Props {
  id: string;
  type: GeofenceType;
  center: [number, number];
  radiusKm?: number;
  sizeKm?: number;
  fillColor?: string;
  borderColor?: string;
  fillOpacity?: number;
  strokeDasharray?: [number, number];
  strokeWidth?: number;
}

function createSquare(lat: number, lng: number, sizeKm: number): Feature<Polygon> {
  const latOffset = sizeKm / 110.574;
  const lngOffset = sizeKm / (111.32 * Math.cos(lat * Math.PI / 180));

  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [[
        [lng - lngOffset, lat - latOffset],
        [lng + lngOffset, lat - latOffset],
        [lng + lngOffset, lat + latOffset],
        [lng - lngOffset, lat + latOffset],
        [lng - lngOffset, lat - latOffset]
      ]]
    }
  };
}

const Geofence: React.FC<Props> = ({
  id,
  type,
  center,
  radiusKm = 1,
  sizeKm = 1,
  fillColor = "#3b82f6",
  borderColor = "#1d4ed8",
  fillOpacity = 0.25,
  strokeDasharray,
  strokeWidth = 2,
}) => {

  const geojson = useMemo(() => {

    if (type === "circle") {
      return turfCircle(center, radiusKm, {
        steps: 64,
        units: "kilometers"
      });
    }

    if (type === "square") {
      const [lng, lat] = center;
      return createSquare(lat, lng, sizeKm);
    }

    return null;

  }, [type, center, radiusKm, sizeKm]);

  if (!geojson) return null;

  return (
    <div className="absolute">
      <Source
        id={`geofence-${id}`}
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: [geojson]
        }}
      >
        <Layer
          id={`geofence-fill-${id}`}
          type="fill"
          paint={{
            "fill-color": fillColor,
            "fill-opacity": fillOpacity
          }}
        />

        <Layer
          id={`geofence-border-${id}`}
          type="line"
          paint={{
            "line-color": borderColor,
            "line-width": strokeWidth,
            ...(strokeDasharray ? { "line-dasharray": strokeDasharray } : {}),
          }}
        />
      </Source>
    </div>
  );
};

export default Geofence;