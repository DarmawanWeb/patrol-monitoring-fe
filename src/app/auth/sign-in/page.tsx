import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "./_components/sign-in-form";

export default function SignInViewPage() {
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
          <SignInForm />
        </CardContent>
      </Card>
      <section className="text-muted-foreground px-8 text-center text-sm">
        <p>
          By clicking continue, you agree to our{" "}
          <Link
            href="#"
            className="hover:text-primary underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="hover:text-primary underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        </p>
      </section>
    </>
  );
}
