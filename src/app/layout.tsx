import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { NextAuthProvider } from "~/app/_components/auth-provider";

export const metadata: Metadata = {
  title: "LiteLLM Proxy with PayU Integration",
  description: "A unified API proxy service for LLM providers with PayU wallet integration",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NextAuthProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}