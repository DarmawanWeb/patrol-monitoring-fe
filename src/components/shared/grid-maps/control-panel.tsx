import { Home, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ControlPanelProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

export default function ControlPanel({ onZoomIn, onZoomOut, onResetView }: ControlPanelProps) {
  return (
    <section className="-translate-y-1/2 absolute top-1/2 right-4 z-50 transform">
      <Card className="border-slate-700/50 bg-slate-900/90 p-2 backdrop-blur-sm">
        <div className="flex flex-col gap-1 space-y-2">
          <Button
            onClick={onZoomIn}
            size="sm"
            className="h-10 w-10 border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/20 hover:shadow-lg"
          >
            <Plus size={16} />
          </Button>
          <Button
            onClick={onZoomOut}
            size="sm"
            className="h-10 w-10 border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/20 hover:shadow-lg"
          >
            <Minus size={16} />
          </Button>
          <Button
            onClick={onResetView}
            size="sm"
            className="h-10 w-10 border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/20 hover:shadow-lg"
          >
            <Home size={16} />
          </Button>
        </div>
      </Card>
    </section>
  );
}
