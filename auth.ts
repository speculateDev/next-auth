import NextAuth from "next-auth";
import authConfig from "./auth.config";
import NeonAdapter from "@auth/neon-adapter";
import { pool, sql } from "./lib/db";
import { getUserById } from "./data/user";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: string;
    };
  }

  interface User {
    id: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await sql`UPDATE users SET "emailVerified" = ${new Date()} WHERE id = ${
        user.id
      } RETURNING *`;
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow Oauth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent non verifiedEmails
      if (!existingUser?.emailVerified) return false;

      //TODO: add 2FA check

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as "string";
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: NeonAdapter(pool),
  session: { strategy: "jwt" },
  ...authConfig,
});
