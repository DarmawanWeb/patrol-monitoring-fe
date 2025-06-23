import { Navigation } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Robot {
  id: string;
  location: { x: number; y: number };
  heading: number;
  color?: string;
  name?: string;
}

interface RobotMarkersProps {
  robots: Robot[];
  rosToScreen: (x: number, y: number) => { x: number; y: number };
}

export default function RobotMarkers({
  robots,
  rosToScreen,
}: RobotMarkersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClick = (robotId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("robotId", robotId);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLElement>,
    robotId: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(robotId);
    }
  };

  return (
    <>
      {robots.map((robot, index) => {
        const screenPos = rosToScreen(robot.location.x, robot.location.y);
        const robotColor =
          robot.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`;

        return (
          <section
            key={robot.id}
            className="absolute z-50"
            style={{
              left: `${screenPos.x}px`,
              top: `${screenPos.y}px`,
              transform: `translate(-50%, -50%)`,
            }}
            onClick={() => handleClick(robot.id)}
            onKeyUp={(event) => handleKeyPress(event, robot.id)}
            aria-label={`Select robot ${robot.name || robot.id}`}
          >
            <div
              className="absolute inset-0 h-8 w-8 animate-pulse rounded-full blur-lg"
              style={{ backgroundColor: `${robotColor}30` }}
            ></div>

            <div
              className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: robotColor }}
            >
              <Navigation
                size={16}
                className="transform text-white transition-transform duration-300"
                style={{ transform: `rotate(${robot.heading}deg)` }}
              />
            </div>

            {robot.name && (
              <div className="-translate-x-1/2 absolute top-full left-1/2 mt-1 transform">
                <div className="whitespace-nowrap rounded bg-slate-900/80 px-2 py-1 font-bold text-white text-xs">
                  {robot.name}
                </div>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
