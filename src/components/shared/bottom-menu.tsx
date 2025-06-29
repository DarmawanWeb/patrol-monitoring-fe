"use client"

import { Bot, FileText, Play, Route, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuthContext } from "../provider/auth-provider"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

export default function BottomMenu() {
  const [activeTab, setActiveTab] = useState("route")
  const { user } = useAuthContext()
  const router = useRouter()

  const navItems = [
    { id: "route", icon: Route, adminOnly: false },
    { id: "report", icon: FileText, adminOnly: true },
    { id: "playback", icon: Play, adminOnly: false },
    { id: "settings", icon: Settings, adminOnly: true },
    { id: "robot", icon: Bot, adminOnly: true },
    { id: "person", icon: User, adminOnly: true },
  ] as const

  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || user?.role === "admin",
  )

  const handleNavigation = (id: string) => {
    setActiveTab(id)

    // Routing berdasarkan ID
    switch (id) {
      case "robot":
        router.push("/robots")
        break
      case "person":
        router.push("/users")
        break
      default:
        router.push("/dashboard")
        break
    }
  }

  return (
    <div className="-translate-x-1/2 fixed bottom-6 left-1/2 z-50 w-fit max-w-xl transform">
      <Card className="w-fit rounded-4xl border-slate-700/50 bg-slate-800/70 p-0 backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-6 px-4 py-3">
          {visibleItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <Button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                variant="outline"
                size="sm"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-600 bg-slate-700/90 transition-all duration-300"
              >
                <div
                  className={`relative rounded-full p-2 transition-all duration-100 ${
                    isActive
                      ? "scale-125 bg-blue-500 text-white"
                      : "scale-125 bg-slate-700/90 text-white hover:bg-slate-600/80"
                  }`}
                >
                  <Icon size={24} className="drop-shadow-lg" />
                </div>
              </Button>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
