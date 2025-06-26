// page.tsx (updated)
import BottomMenu from "@/components/shared/bottom-menu";
import GridMap from "@/components/shared/grid-maps/index";
import Navbar from "@/components/shared/navbar";
import RobotSidebar from "@/components/shared/robot-detail-sidebar";

export default function Home() {
  const robots = [
    {
      id: "robot1",
      name: "Main Robot",
      location: { x: 150, y: 200 },
      heading: 45,
      color: "#ff5722",
      battery: 85,
      status: "active",
      speed: 1.2,
      signal: 92,
      lastUpdate: "2 mins ago",
    },
    {
      id: "robot2",
      name: "Scout Bot",
      location: { x: -100, y: -50 },
      heading: 180,
      color: "#4caf50",
      battery: 67,
      status: "moving",
      speed: 0.8,
      signal: 78,
      lastUpdate: "1 min ago",
    },
    {
      id: "robot3",
      name: "Patrol Unit",
      location: { x: 50, y: -150 },
      heading: 270,
      color: "#2196f3",
      battery: 23,
      status: "idle",
      speed: 0.0,
      signal: 45,
      lastUpdate: "5 mins ago",
    },
    {
      id: "robot4",
      name: "Security Bot",
      location: { x: -200, y: 100 },
      heading: 90,
      speed: 1.5,
      battery: 91,
      color: "#9c27b0",
      status: "active",
      signal: 88,
      lastUpdate: "30 secs ago",
    },
  ];

  return (
    <main className="relative h-screen w-full bg-slate-900">
      <Navbar />
      <RobotSidebar robots={robots} />
      <GridMap robots={robots} />
      <BottomMenu />
    </main>
  );
}
