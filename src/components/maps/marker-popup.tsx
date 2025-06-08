import { formatDistanceToNow } from "date-fns";
import { Popup } from "react-leaflet";

import type { MarkerData } from "./maps";

interface MarkerPopupProps {
  marker: MarkerData;
}
const updatedAgo = formatDistanceToNow(new Date(), {
  addSuffix: true,
  includeSeconds: true,
});

export default function MarkerPopup({ marker }: MarkerPopupProps) {
  return (
    <Popup>
      <div className="text-xs space-y-0.5 font-medium text-muted-foreground">
        <div>
          <b>Name:</b> {marker.name}
        </div>
        <div>
          <b>Lat/Lon:</b> {marker.positions.lat.toFixed(5)}/
          {marker.positions.lon.toFixed(5)}
        </div>
        <div>
          <b>HDG:</b> {marker.positions.heading}° <b>COG:</b>{" "}
          {marker.positions.cog}° <b>SOG:</b> {marker.positions.sog} kn
        </div>
        <div className="text-[10px] italic mt-1">Updated {updatedAgo}</div>
      </div>
    </Popup>
  );
}
