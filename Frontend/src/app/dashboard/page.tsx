// src/app/dashboard/page.tsx
import { redirect } from "next/navigation";

import { auth } from "~/server/auth";
import { DashboardHeader } from "~/app/dashboard/_components/DashboardHeader";
import { WalletCard } from "~/app/dashboard/_components/WalletCard";
import { SpendingGraph } from "~/app/dashboard/_components/SpendingGraph";

export default async function DashboardPage() {
  const session = await auth();

  // If not authenticated, redirect to signin page
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={session.user} />
      <main className="container mx-auto py-6 px-4 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WalletCard />
          <SpendingGraph />
        </div>
      </main>
    </div>
  );
}