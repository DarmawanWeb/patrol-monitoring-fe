interface GridLinesProps {
  screenToRos: (screenX: number, screenY: number) => { x: number; y: number };
}

export default function GridLines({ screenToRos }: GridLinesProps) {
  const gridLines = [];

  for (let x = 0; x <= 1500; x += 50) {
    const isMajor = x % (50 * 5) === 0;
    const rosX = screenToRos(x, 0).x;

    gridLines.push(
      <div
        key={`v-${x}`}
        className={`absolute h-full w-px ${
          x === 1500 / 2
            ? "z-10 bg-red-400 shadow-red-400/50 shadow-sm"
            : isMajor
              ? "bg-cyan-400 shadow-cyan-400/50 shadow-sm"
              : "bg-cyan-700/40"
        }`}
        style={{ left: `${x}px` }}
      />,
    );

    if (isMajor) {
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

  for (let y = 0; y <= 1500; y += 50) {
    const isMajor = y % (50 * 5) === 0;
    const _rosY = screenToRos(0, y).y;

    gridLines.push(
      <div
        key={`h-${y}`}
        className={`absolute h-px w-full ${
          y === 1500 / 2
            ? "z-10 bg-red-400 shadow-red-400/50 shadow-sm"
            : isMajor
              ? "bg-cyan-400 shadow-cyan-400/50 shadow-sm"
              : "bg-cyan-700/40"
        }`}
        style={{ top: `${y}px` }}
      />,
    );
  }

  return <>{gridLines}</>;
}
