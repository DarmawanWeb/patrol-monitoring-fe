import BottomMenu from "@/components/shared/bottom-menu";
import GridMap from "@/components/shared/grid-maps/index";
import Navbar from "@/components/shared/navbar";
export default function Home() {
  return (
    <main className="relative h-screen w-full bg-amber-50">
      <Navbar />
      <GridMap
        robots={[
          {
            id: "robot1",
            name: "Main Robot",
            location: { x: 150, y: 200 },
            heading: 45,
            color: "#ff5722",
          },
          {
            id: "robot2",
            name: "Scout Bot",
            location: { x: -100, y: -50 },
            heading: 180,
            color: "#4caf50",
          },
        ]}
      />
      <BottomMenu />
    </main>
  );
}
