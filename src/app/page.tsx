"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import BottomMenu from "@/components/shared/bottom-menu";
import GridMap from "@/components/shared/grid-maps";
import Navbar from "@/components/shared/navbar";
import RobotSidebar from "@/components/shared/robot-detail-sidebar";

export default function HomePage() {
  const [robots, setRobots] = useState<any[]>([]);

  useEffect(() => {
    const socket = io("https://patrol-ws.agus-darmawan.com");

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket");
    });

    socket.on("robot:data", (data) => {
      console.log("📡 Received robot data:", data);

      setRobots((prev) => {
        const incoming = data[0];

        const updated = prev.filter((r) => r.id !== incoming.id);
        return [...updated, incoming];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className="relative h-screen w-full bg-slate-900">
      <Navbar />
      <RobotSidebar robots={robots} />
      <GridMap robots={robots} />
      <BottomMenu />
    </main>
  );
}
