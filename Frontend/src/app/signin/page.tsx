import Link from "next/link";
import { redirect } from "next/navigation";

import { SignInForm } from "~/app/_components/SignInForm";
import { auth } from "~/server/auth";

export default async function SignInPage() {
  const session = await auth();

  // Redirect to home if already authenticated
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Sign In</h1>
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-full max-w-md">
          <SignInForm />
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:text-primary/80 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}