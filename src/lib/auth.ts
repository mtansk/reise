import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../lib/prisma";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth(
  {
    adapter: PrismaAdapter(prisma),
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
        }

        if (trigger === "update" && session) {
          _token.name = session.name;
        }

        return _token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
        }

        return session;
      },
    },
  },
);
