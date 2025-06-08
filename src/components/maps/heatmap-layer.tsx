// import { FC, useEffect } from "react";
// import { useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet.heat";

// // TypeScript declaration for leaflet.heat
// declare module "leaflet" {
//   namespace heatLayer {
//     interface HeatMapOptions {
//       minOpacity?: number;
//       maxZoom?: number;
//       max?: number;
//       radius?: number;
//       blur?: number;
//       gradient?: { [key: number]: string };
//     }
//   }
//   function heatLayer(
//     latlngs: Array<[number, number, number]>,
//     options?: heatLayer.HeatMapOptions
//   ): Layer;
// }

// interface HeatmapLayerProps {
//   points: [number, number, number][];
// }

// export const HeatmapLayer: FC<HeatmapLayerProps> = ({ points }) => {
//   const map = useMapEvents({});

//   useEffect(() => {
//     const heatLayer = L.heatLayer(points, {
//       radius: 20,
//       blur: 15,
//       maxZoom: 17,
//       gradient: {
//         0.0: "blue",
//         0.3: "cyan",
//         0.6: "yellow",
//         1.0: "red",
//       },
//     });

//     heatLayer.addTo(map);
//     return () => {
//       map.removeLayer(heatLayer);
//     };
//   }, [map, points]);

//   return null;
// };
