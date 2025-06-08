export interface PatrolArea {
  id: string;
  name: string;
  description: string;
  numberOfRobots: number;
  assignedMissions: number;
  imageUri?: string;
}
