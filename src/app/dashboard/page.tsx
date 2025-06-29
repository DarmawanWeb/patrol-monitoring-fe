"use client";
import { useAuthContext } from "@/components/provider/auth-provider";
import BottomMenu from "@/components/shared/bottom-menu";
import GridMap from "@/components/shared/grid-maps";
import Navbar from "@/components/shared/navbar";

export default function Dashboard() {
  const { user, logout } = useAuthContext();

  return (
    <main>
      <Navbar />
      <GridMap robots={[]} />
      <BottomMenu />
    </main>
  );
}
