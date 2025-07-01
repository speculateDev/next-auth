"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/resetToken";
import { getUserByEmail } from "@/data/user";
import { sql } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  // Validate password
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { password } = validatedFields.data;

  // check if token exist
  const exisitngToken = await getPasswordResetTokenByToken(token);

  if (!exisitngToken) {
    return { error: "Invalid token!" };
  }

  // check if expired
  const hasExpired = new Date(exisitngToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  // check if it relevant to any user
  const existingUser = await getUserByEmail(exisitngToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  // Update user password
  const hashedPass = await bcrypt.hash(password, 10);
  await sql`UPDATE users SET password = ${hashedPass} WHERE id = ${existingUser.id}`;

  // Delete the token
  await sql`DELETE FROM ResetToken WHERE id = ${exisitngToken.id}`;

  return { success: "Password updated!" };
};
