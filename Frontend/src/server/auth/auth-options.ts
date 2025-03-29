// src/server/auth/auth-options.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig, type Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

import { db } from "~/server/db";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (account?.provider === "google" && user.email) {
        const existingUser = await db.user.findFirst({
          where: {
            email: user.email,
          },
        });

        if (existingUser) {
          // Update existing user info with Google info if available
          await db.user.update({
            where: { id: existingUser.id },
            data: {
              name: user.name || existingUser.name,
              image: user.image || existingUser.image,
            },
          });

          // Check if Google account is already linked
          const existingAccount = await db.account.findFirst({
            where: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });

          // Link the Google account to the existing user if not already linked
          if (!existingAccount) {
            await db.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            });
          }
          
          // Use the existing user instead of creating a new one
          user.id = existingUser.id;
          return true;
        }
      }
      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    session: ({ session, token }: { session: any; token: JWT }): Session => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        email: token.email,
        name: token.name,
        image: token.picture,
      },
    }),
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt"
  },
  // Make sure to have a good secret for production
  secret: process.env.AUTH_SECRET,
  // Enable debug in development
  debug: process.env.NODE_ENV === "development",
};