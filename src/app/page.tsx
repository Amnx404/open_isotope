import Link from "next/link";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-end mb-16">
          <div className="flex gap-4">
            <Link
              href="/signin"
              className="rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
            LiteLLM Proxy with PayU Integration
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            A unified API proxy service for LLM providers with seamless PayU wallet integration.
            Manage your AI costs efficiently and securely.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-md bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground hover:bg-primary/90 transition"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="rounded-md bg-secondary px-8 py-3 text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div id="features" className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-3">Unified API Access</h3>
            <p className="text-muted-foreground">
              Single endpoint for multiple LLM providers. Simplify your integration and switch providers seamlessly.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
            <p className="text-muted-foreground">
              Integrated PayU wallet for secure and convenient payment processing. Monitor and manage your API usage costs.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-3">Usage Analytics</h3>
            <p className="text-muted-foreground">
              Detailed insights into your API usage, costs, and performance metrics. Make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
