import { Card } from "@/components/ui/card";

interface StatusPanelProps {
  scale: number;
  currentCenter: { x: number; y: number };
  robots: { id: string; location: { x: number; y: number }; name?: string }[];
}

export default function StatusPanel({ scale, currentCenter, robots }: StatusPanelProps) {
  return (
    <div className="absolute right-4 bottom-4 z-50">
      <Card className="border-slate-700/50 bg-slate-900/90 p-2 backdrop-blur-sm">
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Zoom:</span>
            <span className="font-bold font-mono text-cyan-400">{Math.round(scale * 100)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Center:</span>
            <span className="font-bold font-mono text-cyan-400">
              ({currentCenter.x.toFixed(1)}, {currentCenter.y.toFixed(1)})
            </span>
          </div>
          {robots.length > 0 && (
            <div className="border-slate-700 border-t pt-1">
              <div className="mb-1 text-slate-400 text-xs">Robots ({robots.length}):</div>
              <div className="max-h-20 space-y-1 overflow-y-auto">
                {robots.map((robot) => (
                  <div key={robot.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                      <span className="text-slate-300 text-xs">{robot.name || robot.id}</span>
                    </div>
                    <span className="font-mono text-cyan-400 text-xs">
                      ({robot.location.x.toFixed(1)}, {robot.location.y.toFixed(1)})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
