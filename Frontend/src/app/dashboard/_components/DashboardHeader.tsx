"use client";

import { signOut } from "next-auth/react";
import { type User } from "next-auth";
import { Button } from "~/components/ui/button";

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome, {user.name ?? "User"}!
          </h2>
        </div>
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="ml-auto"
        >
          Sign out
        </Button>
      </div>
    </header>
  );
}