import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { NextAuthProvider } from "~/app/_components/auth-provider";

export const metadata: Metadata = {
  title: "LiteLLM Proxy with PayU Integration",
  description: "A unified API proxy service for LLM providers with PayU wallet integration",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body suppressHydrationWarning={true} className="min-h-screen bg-background text-foreground antialiased">
        <NextAuthProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}