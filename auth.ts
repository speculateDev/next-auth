import NextAuth from "next-auth";
import authConfig from "./auth.config";
import NeonAdapter from "@auth/neon-adapter";
import { pool } from "./lib/db";
import { getUserById } from "./data/user";
import { User } from "./schemas";

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
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
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

      const existingUser = (await getUserById(token.sub)) as User[];
      if (!existingUser) return token;

      token.role = existingUser[0].role;
      return token;
    },
  },
  adapter: NeonAdapter(pool),
  session: { strategy: "jwt" },
  ...authConfig,
});
