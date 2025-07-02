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

  // const fieldsToUpdate = Object.entries(values)
  //   // .filter(([_, value]) => value !== undefined)
  //   .map(([key, value]) => sql`${key} = ${value}`)
  //   .reduce((acc, part) => sql`${acc}, ${part}`);

  await sql`UPDATE users SET name = ${values.name} WHERE id = ${user.id}`;

  return { success: "Settings Updated successfully!" };
};
