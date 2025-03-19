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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Sign Up</h1>
        <SignUpForm />
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-400 hover:text-blue-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}