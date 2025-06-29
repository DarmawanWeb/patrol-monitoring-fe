"use client"
import BottomMenu from "@/components/shared/bottom-menu"
import GridMap from "@/components/shared/grid-maps"
import Navbar from "@/components/shared/navbar"

export default function Dashboard() {
  return (
    <main>
      <Navbar />
      <GridMap robots={[]} />
      <BottomMenu />
    </main>
  )
}
