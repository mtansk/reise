import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../lib/prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { createGuestUser } from "@/server/functions/auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      isGuest: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    isGuest: boolean;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(
  {
    adapter: PrismaAdapter(prisma),
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      Credentials({
        credentials: {},
        async authorize() {
          const user = await createGuestUser();
          return user;
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user, trigger, session }) {
        const _token = { ...token };

        if (user) {
          _token.id = user.id;
          _token.isGuest = user.isGuest ?? false;
        }

        if (trigger === "update" && session) {
          _token.name = session.name;
        }

        return _token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;

          session.user.isGuest =
            (token as unknown as { isGuest?: boolean })
              .isGuest ?? false;
        }

        return session;
      },
    },
  },
);
