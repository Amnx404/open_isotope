"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { FcGoogle } from "react-icons/fc";

export function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = () => {
    try {
      setIsLoading(true);
      setError(null);
      
      void signIn("google", { 
        callbackUrl: "/dashboard",
        redirect: true
      });
      
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setError("An error occurred during Google sign-in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 text-base"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <FcGoogle className="h-5 w-5" />
        {isLoading ? "Signing up..." : "Sign up with Google"}
      </Button>
    </div>
  );
}