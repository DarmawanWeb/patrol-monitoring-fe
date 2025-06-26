import { MAP_CONFIG } from "./maps-config";

interface GridLinesProps {
  screenToRos: (screenX: number, screenY: number) => { x: number; y: number };
}

export default function GridLines({ screenToRos }: GridLinesProps) {
  const gridLines = [];
  const { SIZE, GRID_SIZE, MAJOR_GRID_INTERVAL } = MAP_CONFIG;

  // Regular grid lines
  for (let x = 0; x <= SIZE; x += GRID_SIZE) {
    const isMajor = x % (GRID_SIZE * MAJOR_GRID_INTERVAL) === 0;
    const rosX = screenToRos(x, 0).x;

    gridLines.push(
      <div
        key={`v-${x}`}
        className={`absolute h-full w-px ${
          x === SIZE / 2
            ? "z-10 bg-red-400 shadow-red-400/50 shadow-sm"
            : isMajor
              ? "bg-cyan-400/60 shadow-cyan-400/30 shadow-sm"
              : "bg-cyan-700/30"
        }`}
        style={{ left: `${x}px` }}
      />,
    );

    if (isMajor && x !== SIZE / 2) {
      gridLines.push(
        <div
          key={`label-x-${x}`}
          className="absolute rounded bg-slate-900/80 px-1 font-bold font-mono text-cyan-300 text-xs"
          style={{ left: `${x + 8}px`, top: "8px" }}
        >
          {Math.round(rosX / 100)}
        </div>,
      );
    }
  }

  for (let y = 0; y <= SIZE; y += GRID_SIZE) {
    const isMajor = y % (GRID_SIZE * MAJOR_GRID_INTERVAL) === 0;

    gridLines.push(
      <div
        key={`h-${y}`}
        className={`absolute h-px w-full ${
          y === SIZE / 2
            ? "z-10 bg-red-400 shadow-red-400/50 shadow-sm"
            : isMajor
              ? "bg-cyan-400/60 shadow-cyan-400/30 shadow-sm"
              : "bg-cyan-700/30"
        }`}
        style={{ top: `${y}px` }}
      />,
    );
  }
  return <>{gridLines}</>;
}
