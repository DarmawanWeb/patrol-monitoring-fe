"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Dog, Eye, EyeOff } from "lucide-react";

import { toast } from "sonner";
import { apiUrl } from "@/lib/env";

import { setAuthData } from "@/lib/cookie";

const schema = z.object({
  email: z.string().email("Enter a valid e-mail address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function AuthPages() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${apiUrl}/auth/login`, {
        email: data.email,
        password: data.password,
      });
      const { accessToken, refreshToken } = res.data.data;
      setAuthData(accessToken, refreshToken);
      toast.success("Signed in successfully!");
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const msg =
          (err.response.data as { message?: string })?.message ??
          "Login failed";
        toast.error(msg);
      } else {
        toast.error("Unexpected error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-3xl font-bold tracking-tight text-white">
            HotDogTracker
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time Monitoring Platform
          </p>
        </section>

        <Card className="border-slate-700/50 bg-slate-800/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-0">
            <CardTitle className="text-2xl font-bold text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to your account to continue monitoring
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  E-mail
                </Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  className={`border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/50 ${
                    errors.email
                      ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                      : ""
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <Alert className="border-red-500/20 bg-red-500/10 py-2">
                    <AlertDescription className="text-sm text-red-400">
                      {errors.email.message}
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
                    className="absolute right-0 top-0 h-full px-3 py-2 text-slate-400 hover:bg-transparent hover:text-slate-300"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                {errors.password && (
                  <Alert className="border-red-500/20 bg-red-500/10 py-2">
                    <AlertDescription className="text-sm text-red-400">
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
                    Signing In…
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="text-xs text-slate-400 underline hover:text-slate-300"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-xs text-slate-400 underline hover:text-slate-300"
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
