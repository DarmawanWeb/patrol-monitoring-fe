"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dog, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
});

export default function AuthPages() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Form submitted:", data);
      setIsLoading(false);
      router.push("/");
    }, 2000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <section className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="-top-40 -right-40 absolute h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 blur-3xl" />
        <div className="-bottom-40 -left-40 absolute h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-600/10 blur-3xl" />
      </section>

      <div className="relative w-full max-w-md">
        <section className="mb-8 text-center">
          <div className="relative mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
            <Dog size={28} className="text-white" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-transparent" />
          </div>
          <h1 className="font-bold text-3xl text-white tracking-tight">
            HotDogTracker
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Real-time Monitoring Platform
          </p>
        </section>

        <Card className="border-slate-700/50 bg-slate-800/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-0">
            <CardTitle className="font-bold text-2xl text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to your account to continue monitoring
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  className={`border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50 ${
                    errors.username
                      ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                      : ""
                  }`}
                  {...register("username")}
                />
                {errors.username && (
                  <Alert className="border-red-500/20 bg-red-500/10 py-2">
                    <AlertDescription className="text-red-400 text-sm">
                      {errors.username.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`border-slate-600/50 bg-slate-700/50 pr-10 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50 ${
                      errors.password
                        ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                        : ""
                    }`}
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 text-slate-400 hover:bg-transparent hover:text-slate-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                {errors.password && (
                  <Alert className="border-red-500/20 bg-red-500/10 py-2">
                    <AlertDescription className="text-red-400 text-sm">
                      {errors.password.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 font-medium text-white shadow-lg transition-all duration-200 hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center">
          <p className="text-slate-500 text-xs">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="text-slate-400 text-xs underline hover:text-slate-300"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-slate-400 text-xs underline hover:text-slate-300"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
