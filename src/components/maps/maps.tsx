// components/MapComponent.tsx
"use client";
import React, { FC, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  Popup,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import L from "leaflet";
import useTileStore from "@/stores/use-tile-store";
import { HeatmapLayer } from "./heatmap-layer";
import { stadiaMapsApiKey } from "@/lib/env";

export interface IPosition {
  lat: number;
  lon: number;
  heading: number;
}

export interface MarkerData {
  name: string;
  status?: string;
  type: "robot" | "station" | "overheat-component";
  battery?: number;
  imageUrl?: string;
  temperature?: number; // Temperature for overheating components
  positions: IPosition[];
}

export interface MapComponentProps {
  markers: MarkerData[] | null;
}

const MapComponent: FC<MapComponentProps> = ({ markers }) => {
  const { setSelectedTile, selectedTile } = useTileStore();
  const [heatData, setHeatData] = useState<[number, number, number][]>([]); // Include temperature as the intensity of heatmap

  useEffect(() => {
    if (markers) {
      // Update heatmap data based on temperature
      setHeatData(
        markers
          .filter((marker) => marker.temperature)
          .map((marker) => [
            marker.positions[0].lat,
            marker.positions[0].lon,
            marker.temperature!, // Use temperature as intensity for heatmap
          ])
      );
    }
  }, [markers]);

  const LayerChangeHandler: FC = () => {
    useMapEvents({
      baselayerchange: (event: L.LayersControlEvent) => {
        setSelectedTile(event.name);
      },
    });
    return null;
  };

  const getIcon = (
    heading: number,
    type: "robot" | "station" | "overheat-component"
  ) => {
    const iconUrl = `/icons/${type}.png`;
    return L.divIcon({
      className: "custom-icon",
      html: `<img src="${iconUrl}" style="width: 15px; height: 15px; transform: rotate(${
        type !== "overheat-component" ? heading : 0
      }deg);" />`,
      iconAnchor: [6, 16],
      popupAnchor: [0, -32],
    });
  };

  return (
    <MapContainer
      center={[-8.452174, 115.843191]}
      zoom={12}
      maxZoom={18}
      style={{ height: "100%", width: "100%" }}
      className="w-full h-full z-0"
      zoomControl={false}
    >
      <LayerChangeHandler />
      <LayersControl position="bottomleft">
        <LayersControl.BaseLayer
          checked={selectedTile === "Leaflet"}
          name="Leaflet"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={selectedTile === "Default"}
          name="Default"
        >
          <TileLayer
            url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${stadiaMapsApiKey}`}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={selectedTile === "Satellite"}
          name="Satellite"
        >
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={selectedTile === "Topographic"}
          name="Topographic"
        >
          <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
      </LayersControl>

      {heatData.length > 0 && (
        <LayersControl.Overlay name="Heatmap">
          <TileLayer
            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
            opacity={0.5}
          />
          <HeatmapLayer
            points={(markers ?? [])
              .filter((marker) => marker.type === "overheat-component")
              .map((marker) => [
                marker.positions[0].lat,
                marker.positions[0].lon,
                marker.temperature ? marker.temperature / 50 : 0,
              ])}
          />
        </LayersControl.Overlay>
      )}

      {markers?.map((marker, index) => {
        const { lat, lon } = marker.positions[0];
        return (
          <Marker
            key={index}
            position={[lat, lon]}
            icon={getIcon(marker.positions[0].heading, marker.type)}
          >
            <Popup>
              <div>
                <strong>{marker.name}</strong>
                {/* <br />
                {marker.type === "overheat-component" && (
                  <>
                    <span>Temperature: {marker.temperature}°C</span>
                    <br />
                    {marker.temperature! > 60 ? (
                      <span style={{ color: "red" }}>Overheating!</span>
                    ) : (
                      <span style={{ color: "green" }}>Normal</span>
                    )}
                  </>
                )}
                {marker.type === "robot" && (
                  <span>Status: {marker.status}</span>
                )} */}
              </div>
            </Popup>
          </Marker>
        );
      })}

      <ZoomControl position="bottomleft" />
    </MapContainer>
  );
};

export default MapComponent;
