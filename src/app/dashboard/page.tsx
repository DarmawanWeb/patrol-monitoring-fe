"use client"

import { Bell, LogOut, Settings, User } from "lucide-react"
import { useAuthContext } from "@/components/provider/auth-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const { user, logout } = useAuthContext()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // If user not loaded yet, render loading/fallback
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-slate-700/50 border-b bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600" />
              <h1 className="font-bold text-white text-xl">HotDogTracker</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <Bell size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <Settings size={16} />
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-sm text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="font-medium text-sm text-white">{user.name}</p>
                  <p className="text-slate-400 text-xs capitalize">
                    {user.role}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-slate-400 hover:text-red-400"
              >
                <LogOut size={16} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="mb-2 font-bold text-3xl text-white">
            Welcome back, {user.name}!
          </h2>
          <p className="text-slate-400">
            Here's your HotDogTracker dashboard overview
          </p>
        </div>

        {/* User Info Card */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-slate-300 text-sm">
                Account Status
              </CardTitle>
              <User className="ml-auto h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl text-white">
                {user.active ? "Active" : "Inactive"}
              </div>
              <p className="text-slate-400 text-xs">Account ID: {user.id}</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-slate-300 text-sm">
                User Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl text-white capitalize">
                {user.role}
              </div>
              <p className="text-slate-400 text-xs">Permission level</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-slate-300 text-sm">
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="break-all font-medium text-lg text-white">
                {user.email}
              </div>
              <p className="text-slate-400 text-xs">Contact information</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Start Monitoring
              </Button>
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                View Reports
              </Button>
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Manage Inventory
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Last login</span>
                  <span className="text-slate-400 text-sm">Just now</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Account created</span>
                  <span className="text-slate-400 text-sm">Today</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Profile updated</span>
                  <span className="text-slate-400 text-sm">Never</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
