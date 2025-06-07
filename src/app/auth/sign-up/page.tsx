import { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "../sign-in/_components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignUpViewPage() {
  return (
    <>
      <Card className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Sign up to get started with your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
      <section className="text-muted-foreground px-8 text-center text-sm">
        <p>
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="hover:text-primary underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-primary underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        </p>
      </section>
    </>
  );
}
