export enum RobotType {
  X30 = "x30",
  Lite3 = "lite3",
}

export enum RobotStatus {
  Idle = "idle",
  Patrol = "patrol",
  Charging = "charging",
  Inactive = "inactive",
}

export interface Robot {
  id: string
  name: string
  robotType: RobotType
  location: {
    x: number
    y: number
  }
  speed: number
  status: RobotStatus | string
  ptz?: {
    pan: number
    tilt: number
    zoomRgb: number
    zoomThermal: number
  }
  sensorStatus: {
    battery: number
    signal: number
    temperature: number
    rgbCamera: boolean
    thermalCamera?: boolean
    acusticCamera?: boolean
    lidar: boolean
    imu: boolean
  }
  timeStamp: string
}
