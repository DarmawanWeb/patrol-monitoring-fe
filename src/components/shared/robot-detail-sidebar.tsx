// robot-sidebar.tsx
"use client"
import { Battery, Navigation, Signal, X, Zap } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Robot {
  id: string
  location: { x: number; y: number }
  heading: number
  color?: string
  name?: string
  battery?: number
  status?: string
  speed?: number
  signal?: number
  lastUpdate?: string
}

interface RobotSidebarProps {
  robots: Robot[]
}

function getChessPosition(x: number, y: number): string {
  const letters = "ABCDEFGHIJKLMNO"
  const col = Math.floor(x / 100 + 7.5)
  const row = Math.floor(-y / 100 + 7.5)

  if (col >= 0 && col < 15 && row >= 0 && row < 15) {
    const rowNumber = 15 - row
    return `${letters[col]}${rowNumber}`
  }
  return "??"
}

function getStatusColor(status?: string) {
  switch (status?.toLowerCase()) {
    case "active":
    case "moving":
      return "bg-green-500"
    case "idle":
    case "waiting":
      return "bg-yellow-500"
    case "error":
    case "offline":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export default function RobotSidebar({ robots }: RobotSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedRobotId = searchParams.get("robotId")
  const selectedRobot = robots.find((robot) => robot.id === selectedRobotId)

  const closeSidebar = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("robotId")
    router.push(`${window.location.pathname}?${params.toString()}`)
  }

  const selectRobot = (robotId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("robotId", robotId)
    router.push(`${window.location.pathname}?${params.toString()}`)
  }

  return (
    <div
      className={`fixed top-16 bottom-0 left-0 z-40 w-80 transform border-slate-700/50 border-r bg-slate-900/95 backdrop-blur-sm transition-transform duration-300 ${
        selectedRobotId ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-slate-700/50 border-b p-4">
          <h2 className="font-bold text-lg text-white">Robot Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeSidebar}
            className="text-slate-400 hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedRobot ? (
            <div className="space-y-4 p-4">
              {/* Robot Identity */}
              <Card className="border-slate-700/50 bg-slate-800/50 p-4">
                <div className="mb-3 flex items-center space-x-3">
                  <div
                    className="h-4 w-4 flex-shrink-0 rounded-full"
                    style={{
                      backgroundColor: selectedRobot.color || "#4caf50",
                    }}
                  />
                  <h3 className="font-bold text-lg text-white">
                    {selectedRobot.name || selectedRobot.id}
                  </h3>
                  <div
                    className={`rounded-full px-2 py-1 font-medium text-xs ${getStatusColor(
                      selectedRobot.status,
                    )} text-white`}
                  >
                    {selectedRobot.status || "Unknown"}
                  </div>
                </div>
                <p className="text-slate-400 text-sm">ID: {selectedRobot.id}</p>
              </Card>

              {/* Position Info */}
              <Card className="border-slate-700/50 bg-slate-800/50 p-4">
                <h4 className="mb-3 font-semibold text-slate-300 text-sm">
                  Position
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Coordinates:</span>
                    <span className="font-mono text-cyan-400 text-sm">
                      ({selectedRobot.location.x.toFixed(1)},{" "}
                      {selectedRobot.location.y.toFixed(1)})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">
                      Chess Position:
                    </span>
                    <span className="font-bold font-mono text-sm text-yellow-400">
                      {getChessPosition(
                        selectedRobot.location.x,
                        selectedRobot.location.y,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Heading:</span>
                    <div className="flex items-center space-x-1">
                      <Navigation
                        size={12}
                        className="text-blue-400"
                        style={{
                          transform: `rotate(${selectedRobot.heading}deg)`,
                        }}
                      />
                      <span className="font-mono text-blue-400 text-sm">
                        {selectedRobot.heading}°
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Status Info */}
              <Card className="border-slate-700/50 bg-slate-800/50 p-4">
                <h4 className="mb-3 font-semibold text-slate-300 text-sm">
                  Status
                </h4>
                <div className="space-y-3">
                  {selectedRobot.battery !== undefined && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Battery size={16} className="text-green-400" />
                        <span className="text-slate-400 text-sm">Battery:</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-700">
                          <div
                            className={`h-full rounded-full ${
                              selectedRobot.battery > 50
                                ? "bg-green-500"
                                : selectedRobot.battery > 20
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${selectedRobot.battery}%` }}
                          />
                        </div>
                        <span className="font-mono text-sm text-white">
                          {selectedRobot.battery}%
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedRobot.speed !== undefined && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap size={16} className="text-blue-400" />
                        <span className="text-slate-400 text-sm">Speed:</span>
                      </div>
                      <span className="font-mono text-blue-400 text-sm">
                        {selectedRobot.speed.toFixed(1)} m/s
                      </span>
                    </div>
                  )}

                  {selectedRobot.signal !== undefined && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Signal size={16} className="text-purple-400" />
                        <span className="text-slate-400 text-sm">Signal:</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-700">
                          <div
                            className={`h-full rounded-full ${
                              selectedRobot.signal > 70
                                ? "bg-green-500"
                                : selectedRobot.signal > 40
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${selectedRobot.signal}%` }}
                          />
                        </div>
                        <span className="font-mono text-sm text-white">
                          {selectedRobot.signal}%
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedRobot.lastUpdate && (
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">
                        Last Update:
                      </span>
                      <span className="text-slate-300 text-sm">
                        {selectedRobot.lastUpdate}
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Actions */}
              <Card className="border-slate-700/50 bg-slate-800/50 p-4">
                <h4 className="mb-3 font-semibold text-slate-300 text-sm">
                  Actions
                </h4>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    size="sm"
                  >
                    Send Command
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                    size="sm"
                  >
                    View History
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                    size="sm"
                  >
                    Download Logs
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <div className="p-4">
              <Card className="border-slate-700/50 bg-slate-800/50 p-4">
                <h4 className="mb-3 font-semibold text-slate-300 text-sm">
                  All Robots
                </h4>
                <div className="space-y-2">
                  {robots.map((robot) => (
                    <div
                      key={robot.id}
                      onClick={() => selectRobot(robot.id)}
                      className="flex cursor-pointer items-center space-x-3 rounded-lg bg-slate-700/30 p-2 transition-colors hover:bg-slate-700/50"
                    >
                      <div
                        className="h-3 w-3 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: robot.color || "#4caf50" }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-sm text-white">
                          {robot.name || robot.id}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {getChessPosition(robot.location.x, robot.location.y)}
                        </p>
                      </div>
                      <div
                        className={`h-2 w-2 rounded-full ${getStatusColor(
                          robot.status,
                        )}`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
