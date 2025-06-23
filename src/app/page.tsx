import Navbar from "@/components/shared/navbar";
import GridMap from "@/components/shared/grid-maps";
export default function Home() {
  return (
    <main className="h-screen w-full relative bg-amber-50">
      <Navbar />
      <GridMap location={{ x: 0, y: 0 }} popupMessage="Default location" />
    </main>
  );
}
