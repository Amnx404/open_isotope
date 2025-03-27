// src/server/auth/auth-options.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        // If no user is found at all
        if (!user) {
          throw new Error("No user found with this email");
        }

        // If user exists but no password (Google sign-in user)
        if (!user.password) {
          throw new Error("This account uses Google to sign in. Please sign in with Google.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user;
      }
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
    session: ({ session, token }) => ({
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