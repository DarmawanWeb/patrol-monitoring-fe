"use client";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type SignInFormValue = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<SignInFormValue>({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });

  const onSubmit = async (data: SignInFormValue) => {
    startTransition(async () => {
      toast.success(`Login successful! Redirecting to sign in...${data.email}`);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your email.."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl className="relative">
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="ml-auto w-full" type="submit">
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <div className="flex gap-2 pt-2 text-sm">
          <h3>Dont have an account?</h3>
          <Link
            href="sign-up"
            className="hover:text-primary underline underline-offset-4"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
}
