"use client";

import React, { useState, useEffect } from "react";
import { Dog } from "lucide-react";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const formatUTCTime = (date: Date): string =>
    date.toUTCString().slice(17, 25);

  const formatUTCDate = (date: Date): string => date.toISOString().slice(0, 10);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="h-18 flex items-center justify-between absolute top-0 z-50 bg-accent/35 backdrop-blur-sm w-full px-10 ">
      <section className="flex items-center space-x-6 min-w-0 flex-1">
        <div className="flex flex-col items-start">
          <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
            UTC
          </div>
          <div className="font-mono text-lg font-bold text-white">
            {formatUTCTime(currentTime)}
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-start">
          <div className="text-xs uppercase tracking-wide text-gray-400">
            Date
          </div>
          <div className="font-mono text-sm text-gray-300">
            {formatUTCDate(currentTime)}
          </div>
        </div>
      </section>

      <section className="flex items-center space-x-3">
        <div className="relative p-3 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
          <Dog size={24} className="text-white transform rotate-45" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent"></div>
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="font-bold text-xl tracking-tight text-white">
            HDMonitoring24
          </span>
          <span className="text-xs -mt-1 text-gray-400">Live Tracking</span>
        </div>
      </section>

      <section className="flex items-center space-x-3 min-w-0 flex-1 justify-end">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600/50">
            <div className="w-full h-full flex items-center justify-center text-sm font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              AD
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-sm font-medium text-white">
              Agus Darmawan
            </span>
            <span className="text-xs text-gray-400">Admin</span>
          </div>
        </div>
      </section>
    </nav>
  );
}
