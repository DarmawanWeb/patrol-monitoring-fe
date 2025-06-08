export interface PatrolArea {
  id: string;
  name: string;
  description: string;
  numberOfRobots: number;
  assignedMissions: number;
  image: File;
  address: string;
  mapCenterLat: number;
  mapCenterLong: number;
  chargingDockLat: number;
  chargingDockLong: number;
  chargingDockYaw: number;
}
