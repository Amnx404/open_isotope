import Link from "next/link";
import { redirect } from "next/navigation";

import { SignUpForm } from "~/app/_components/SignUpForm";
import { auth } from "~/server/auth";

export default async function SignUpPage() {
  const session = await auth();

  // Redirect to home if already authenticated
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Sign Up</h1>
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-full max-w-md">
          <SignUpForm />
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:text-primary/80 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}