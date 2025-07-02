import NextAuth from "next-auth";
import authConfig from "./auth.config";
import NeonAdapter from "@auth/neon-adapter";
import { pool, sql } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/towFactorConfirmation";
import "./types/auth";

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

      // 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          user.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await sql`DELETE FROM twoFactorConfirmation WHERE id = ${twoFactorConfirmation.id}`;
      }

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as "string";
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  adapter: NeonAdapter(pool),
  session: { strategy: "jwt" },
  ...authConfig,
});
