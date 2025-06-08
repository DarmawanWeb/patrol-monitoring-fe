import { FC, useEffect } from "react";
import { useMapEvents } from "react-leaflet";

interface HeatmapLayerProps {
  points: [number, number, number][];
}

export const HeatmapLayer: FC<HeatmapLayerProps> = ({ points }) => {
  const map = useMapEvents({});

  useEffect(() => {
    // @ts-ignore
    const heatLayer = (L as any).heatLayer(points, {
      radius: 20,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.0: "blue",
        0.3: "cyan",
        0.6: "yellow",
        1.0: "red",
      },
    });

    heatLayer.addTo(map);
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};
