import { Card } from "@/components/ui/card"

interface StatusPanelProps {
  scale: number
  currentCenter: { x: number; y: number }
  robots: { id: string; location: { x: number; y: number }; name?: string }[]
}

function _getChessPosition(x: number, y: number): string {
  const letters = "ABCDEFGHIJKLMNO"
  const col = Math.floor(x / 100 + 7.5)
  const row = Math.floor(-y / 100 + 7.5)

  if (col >= 0 && col < 15 && row >= 0 && row < 15) {
    const rowNumber = 15 - row
    return `${letters[col]}${rowNumber}`
  }
  return "??"
}

export default function StatusPanel({
  scale,
  currentCenter,
  robots,
}: StatusPanelProps) {
  return (
    <div className="absolute right-4 bottom-20 z-40">
      <Card className="border-slate-700/50 bg-slate-900/90 p-3 backdrop-blur-sm">
        <div className="space-y-2 text-xs">
          <div className="flex min-w-48 items-center justify-between">
            <span className="text-slate-400">Zoom:</span>
            <span className="font-bold font-mono text-cyan-400">
              {Math.round(scale * 100)}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Center:</span>
            <span className="font-bold font-mono text-cyan-400">
              ({currentCenter.x.toFixed(1)}, {currentCenter.y.toFixed(1)})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold font-mono text-yellow-400"></span>
          </div>
          {robots.length > 0 && (
            <div className="border-slate-700 border-t pt-2">
              <div className="mb-2 font-semibold text-slate-400 text-xs">
                Robots ({robots.length}):
              </div>
              <div className="max-h-32 space-y-1 overflow-y-auto">
                {robots.map((robot) => (
                  <div
                    key={robot.id}
                    className="flex items-center justify-between rounded bg-slate-800/50 p-1 text-xs"
                  >
                    <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                      <span className="text-slate-300 text-xs">
                        {robot.name || robot.id}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-cyan-400 text-xs">
                        ({robot.location.x.toFixed(1)},{" "}
                        {robot.location.y.toFixed(1)})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
