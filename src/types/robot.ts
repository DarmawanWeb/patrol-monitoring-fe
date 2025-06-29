import type { BaseFilters, UrlState } from "./filtering"

export enum RobotStatus {
  Idle = "idle",
  Patrol = "patrol",
  Charging = "charging",
  Inactive = "inactive",
}

export interface RobotType {
  id: number
  name: string
}

export interface Robot {
  id: string
  name: string
  type: RobotType
  status: RobotStatus | string
  description: string
  imagePath: string
  createdAt: string
  updatedAt: string
  websockets: {
    batteryLevel: number
    locationX: number
    locationY: number
    status: RobotStatus | string
    timeStamp: string
  }[]
}

export interface RobotTypeResponse extends RobotType {
  robotCount: number
}

export interface RobotFilters extends BaseFilters {
  status: string
  typeId: string
}

export interface RobotUrlState extends UrlState {
  status: string
  typeId: string
}

export interface RobotCreateInput {
  name: string
  typeId: number
  description: string
  imageFile?: File
}

export interface RobotUpdateInput {
  id: string
  name: string
  typeId: number
  description: string
  imageFile?: File
}

export interface TypeCreateInput {
  name: string
}

export interface TypeUpdateInput {
  id: number
  name: string
}
