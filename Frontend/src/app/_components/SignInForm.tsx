"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    try {
      setIsLoading(true);
      
      void signIn("google", { 
        callbackUrl: "/dashboard",
        redirect: true
      });
      
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 text-base"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <FcGoogle className="h-5 w-5" />
        {isLoading ? "Signing in..." : "Sign in with Google"}
      </Button>
    </div>
  );
}