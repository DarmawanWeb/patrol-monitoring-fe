"use client";
import { Dog } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const formatTime = (date: Date): string => date.toUTCString().slice(17, 25);
  const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  if (!currentTime) return null;

  return (
    <div className="absolute top-0 right-0 left-0 z-50 h-16 border-slate-700/50 border-b bg-slate-900/90 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-6">
        <section className="flex items-center space-x-6">
          <div className="flex flex-col">
            <div className="font-medium text-slate-400 text-xs uppercase tracking-wide">
              UTC TIME
            </div>
            <div className=" font-bold text-lg text-white">
              {formatTime(currentTime)}
            </div>
          </div>
          <div className="hidden flex-col sm:flex">
            <div className="text-slate-400 text-xs uppercase tracking-wide">
              DATE
            </div>
            <div className=" text-slate-300 text-sm">
              {formatDate(currentTime)}
            </div>
          </div>
        </section>

        <section className="flex items-center space-x-3">
          <div className="relative rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-3 shadow-lg">
            <Dog size={24} className="text-white" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent"></div>
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
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-gray-600/50">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-sm text-white">
              AD
            </div>
          </div>
          <div className="hidden flex-col items-start lg:flex">
            <span className="font-medium text-sm text-white">
              Agus Darmawan
            </span>
            <span className="text-gray-400 text-xs">Admin</span>
          </div>
        </section>
      </div>
    </div>
  );
}
