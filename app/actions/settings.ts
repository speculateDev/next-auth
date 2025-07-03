"use server";

import * as z from "zod";

import { SettingsSchema } from "@/schemas";
import { sql } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Check DB
  const dbUser = getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  // Oauth has no pass no email and no 2FA

  if (user.isOauth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactoredEnabled = undefined;
  }

  // const fieldsToUpdate = Object.entries(values)
  //   // .filter(([_, value]) => value !== undefined)
  //   .map(([key, value]) => sql`${key} = ${value}`)
  //   .reduce((acc, part) => sql`${acc}, ${part}`);

  // await sql`UPDATE users SET ${fieldsToUpdate} WHERE id = ${user.id}`;

  return { success: "Settings Updated successfully!" };
};
