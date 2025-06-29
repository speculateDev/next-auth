// import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { LoginSchema, User } from "./schemas/index";
import { getUserByEmail } from "./data/user";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const res = (await getUserByEmail(email)) as User[];

          const user = res[0];
          if (!user || !user.password) return null;

          const isMatched = await bcrypt.compare(password, user.password);
          if (isMatched) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
