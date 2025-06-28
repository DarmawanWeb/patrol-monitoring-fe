"use client"

import { Dog, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { User } from "@/types/auth"

interface NavbarProps {
  user: User
  logout: () => void
}
export default function Navbar({ user, logout }: NavbarProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const formatTime = (date: Date): string => date.toUTCString().slice(17, 25)
  const formatDate = (date: Date): string => date.toISOString().slice(0, 10)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 h-16 border-slate-700/50 border-b bg-slate-900/90 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-6">
        <section className="flex items-center space-x-6">
          <div className="flex flex-col">
            <span className="font-medium text-slate-400 text-xs uppercase tracking-wide">
              UTC TIME
            </span>
            <span className="font-bold text-lg text-white">
              {formatTime(currentTime)}
            </span>
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-slate-400 text-xs uppercase tracking-wide">
              DATE
            </span>
            <span className="text-slate-300 text-sm">
              {formatDate(currentTime)}
            </span>
          </div>
        </section>

        <section className="flex items-center space-x-3">
          <div className="relative rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-3 shadow-lg">
            <Dog size={24} className="text-white" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent" />
          </div>
          <div className="hidden flex-col md:flex">
            <span className="font-bold text-white text-xl tracking-tight">
              HotDogTracker
            </span>
            <span className="-mt-1 text-slate-400 text-xs">
              Real-time Monitoring Platform
            </span>
          </div>
        </section>

        <section className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border-2 border-gray-600/50">
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>

          <div className="hidden flex-col items-start lg:flex">
            <span className="font-medium text-sm text-white">{user?.name}</span>
            <span className="text-gray-400 text-xs">{user.role}</span>
          </div>

          <Button
            size="icon"
            variant="ghost"
            aria-label="Log out"
            onClick={logout}
            className="ml-1 text-slate-400 hover:text-white"
          >
            <LogOut size={20} />
          </Button>
        </section>
      </div>
    </header>
  )
}
