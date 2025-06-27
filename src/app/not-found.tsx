"use client";

import { Dog, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <section className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="-top-40 -right-40 absolute h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 blur-3xl" />
        <div className="-bottom-40 -left-40 absolute h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-600/10 blur-3xl" />
      </section>

      <div className="relative w-full max-w-md">
        {/* logo */}
        <section className="mb-8 text-center">
          <div className="relative mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
            <Dog size={28} className="text-white" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            HotDogTracker
          </h1>
        </section>

        <Card className="border-slate-700/50 bg-slate-800/50 shadow-2xl backdrop-blur-sm">
          <CardContent className="pt-6 text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold text-cyan-500 mb-2">404</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Page Not Found
              </h2>
              <p className="text-slate-400">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.back()}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                <ArrowLeft size={16} className="mr-2" />
                Go Back
              </Button>
              <Link href="/" className="block">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Home size={16} className="mr-2" />
                  Home Page
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
