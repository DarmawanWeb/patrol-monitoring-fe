"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MAPTILER_API_KEY = "fmGw3tICqMR3PHHrFVnt";

const MapComponent = () => {
  useEffect(() => {
    const defaultIcon = new L.Icon({
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  return (
    <MapContainer
      center={[-7.241731, 112.753537]}
      zoom={18}
      maxZoom={18}
      style={{
        height: "100%",
        width: "100%",
        zIndex: 0,
      }}
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
      />
      <Marker position={[-7.241731, 112.753537]}>
        <Popup>A simple popup for this marker.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
