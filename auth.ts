import NextAuth from "next-auth";
import authConfig from "./auth.config";
import NeonAdapter from "@auth/neon-adapter";
import { pool } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: NeonAdapter(pool),
  session: { strategy: "jwt" },
  ...authConfig,
});
