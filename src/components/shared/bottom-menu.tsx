"use client";

import { Bot, FileText, Play, Route, Settings, User } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function BottomMenu() {
  const [activeTab, setActiveTab] = useState("route");

  const navItems = [
    {
      id: "route",
      icon: Route,
      color: "text-blue-400",
      activeColor: "bg-blue-500", // Active color for route
    },
    {
      id: "report",
      icon: FileText,
      color: "text-green-400",
      activeColor: "bg-green-500", // Active color for report
    },
    {
      id: "settings",
      icon: Settings,
      color: "text-yellow-400",
      activeColor: "bg-yellow-500", // Active color for settings
    },
    {
      id: "playback",
      icon: Play,
      color: "text-orange-400",
      activeColor: "bg-orange-500", // Active color for playback
    },
    {
      id: "robot",
      icon: Bot,
      color: "text-purple-400",
      activeColor: "bg-purple-500", // Active color for robot
    },
    {
      id: "person",
      icon: User,
      color: "text-cyan-400",
      activeColor: "bg-cyan-500", // Active color for person
    },
  ];

  return (
    <div className="-translate-x-1/2 fixed bottom-6 left-1/2 z-50 w-fit max-w-xl transform">
      <Card className="w-fit rounded-4xl border-slate-700/50 bg-slate-800/90 p-0 backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-6 px-4 py-3">
          {" "}
          {/* Updated space-x-4 to space-x-6 */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                variant="outline"
                size="sm"
                className={`flex h-12 w-12 items-center justify-center border border-slate-600 transition-all duration-300 ${
                  isActive
                    ? `${item.activeColor} scale-110 text-white`
                    : "bg-slate-700/90 text-white hover:bg-slate-600/80"
                } rounded-full`}
              >
                <div
                  className={`relative rounded-full p-2 transition-all duration-200 ${
                    isActive ? "scale-125 animate-pulse" : "group-hover:scale-110"
                  }`}
                >
                  <Icon size={24} className="drop-shadow-lg" />
                </div>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
