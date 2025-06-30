"use client"
import {
  Battery,
  Bot,
  CheckCircle,
  Clock,
  Edit,
  MapPin,
  Trash2,
  XCircle,
  Zap,
} from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { imgUrl } from "@/lib/env"
import { getTimeAgo } from "@/lib/utils"
import { type Robot, RobotStatus } from "@/types/robot"

interface RobotCardProps {
  robot: Robot
  onEdit: (robot: Robot) => void
  onDelete: (robot: Robot) => void
}

export default function RobotCard({ robot, onEdit, onDelete }: RobotCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case RobotStatus.Idle:
        return {
          dotColor: "bg-blue-400",
          textColor: "text-blue-300",
          bgColor: "bg-blue-500/20",
          borderColor: "border-blue-500/30",
          icon: CheckCircle,
          label: "Idle",
        }
      case RobotStatus.Patrol:
        return {
          dotColor: "bg-green-400",
          textColor: "text-green-300",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500/30",
          icon: MapPin,
          label: "Patrol",
        }
      case RobotStatus.Charging:
        return {
          dotColor: "bg-yellow-400",
          textColor: "text-yellow-300",
          bgColor: "bg-yellow-500/20",
          borderColor: "border-yellow-500/30",
          icon: Zap,
          label: "Charging",
        }
      case RobotStatus.Inactive:
        return {
          dotColor: "bg-red-400",
          textColor: "text-red-300",
          bgColor: "bg-red-500/20",
          borderColor: "border-red-500/30",
          icon: XCircle,
          label: "Inactive",
        }
      default:
        return {
          dotColor: "bg-gray-400",
          textColor: "text-gray-300",
          bgColor: "bg-gray-500/20",
          borderColor: "border-gray-500/30",
          icon: CheckCircle,
          label: "Unknown",
        }
    }
  }

  const getBatteryConfig = (level: number) => {
    if (level > 70)
      return { color: "text-green-400", bgColor: "bg-green-400/20" }
    if (level > 40)
      return { color: "text-yellow-400", bgColor: "bg-yellow-400/20" }
    if (level > 20)
      return { color: "text-orange-400", bgColor: "bg-orange-400/20" }
    return { color: "text-red-400", bgColor: "bg-red-400/20" }
  }

  const latestData = robot.websockets[0] || null
  const currentStatus = latestData?.status || robot.status
  const statusConfig = getStatusConfig(currentStatus)
  const batteryConfig = getBatteryConfig(latestData?.batteryLevel || 0)

  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-700/40 bg-slate-800/50 pt-0 transition-all duration-200 hover:bg-slate-800/70">
      <div className="relative h-48 w-full">
        {robot.imagePath ? (
          <>
            <Image
              src={`${imgUrl}/${robot.imagePath}`}
              alt={robot.name}
              height={192}
              width={400}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
            <Bot size={40} className="text-cyan-400" />
          </div>
        )}

        <div className="absolute right-2 bottom-2 flex space-x-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(robot)}
            className="h-7 w-7 border border-blue-400/30 bg-black/40 p-0 text-blue-300 backdrop-blur-md hover:text-white"
          >
            <Edit size={14} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(robot)}
            className="h-7 w-7 border border-red-400/30 bg-black/40 p-0 text-red-300 backdrop-blur-md hover:text-white"
          >
            <Trash2 size={14} />
          </Button>
        </div>

        <div className="absolute top-2 left-2">
          <Badge
            className={`${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor} border text-xs`}
          >
            {robot.type.name}
          </Badge>
        </div>

        {latestData && (
          <div className="absolute bottom-2 left-2">
            <div
              className={`flex items-center rounded-md px-2 py-1 font-medium text-xs ${batteryConfig.bgColor} ${batteryConfig.color} border border-slate-600/40 backdrop-blur-md`}
            >
              <Battery size={12} className="mr-1" />
              {latestData.batteryLevel}%
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-1">
        <CardTitle className="truncate text-base text-white">
          {robot.name}
        </CardTitle>
        <p className="truncate font-mono text-slate-400 text-xs">
          ID: {robot.id}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-justify text-slate-300 text-xs">
          {robot.description || "No description provided."}
        </p>

        {latestData && (
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-md bg-slate-700/30 p-2 text-sm">
              <div className="flex items-center space-x-1 text-cyan-300">
                <MapPin size={14} />
                <span className="text-xs">Location</span>
              </div>
              <span className="font-mono text-slate-300 text-xs">
                ({latestData.locationX.toFixed(1)},{" "}
                {latestData.locationY.toFixed(1)})
              </span>
            </div>
          </div>
        )}

        <div className="mt-2 flex items-center justify-between border-slate-700/40 border-t pt-2">
          <div className="flex justify-between px-2 text-slate-400 text-xs">
            <div className="flex items-center space-x-1">
              <Clock size={10} />
              <span>Last update</span>
            </div>
            <span className="pl-2 font-medium">
              {latestData ? getTimeAgo(latestData.timeStamp) : "No data"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <statusConfig.icon
              size={14}
              className={`${statusConfig.textColor}`}
            />
            <span
              className={`font-medium text-xs capitalize ${statusConfig.textColor}`}
            >
              {statusConfig.label}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
