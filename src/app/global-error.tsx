"use client";

import { Dog, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
          <section className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="-top-40 -right-40 absolute h-80 w-80 rounded-full bg-gradient-to-br from-red-500/10 to-orange-600/10 blur-3xl" />
            <div className="-bottom-40 -left-40 absolute h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-600/10 blur-3xl" />
          </section>

          <div className="relative w-full max-w-md">
            <section className="mb-8 text-center">
              <div className="relative mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
                <AlertTriangle size={28} className="text-white" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400/20 to-transparent" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                HotDogTracker
              </h1>
            </section>

            <Card className="border-slate-700/50 bg-slate-800/50 shadow-2xl backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Application Error
                  </h2>
                  <p className="text-slate-400">
                    A critical error occurred. Please refresh the page or
                    contact support.
                  </p>
                </div>

                <Button
                  onClick={reset}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Reload Application
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </body>
    </html>
  );
}
