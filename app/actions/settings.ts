"use server";

import * as z from "zod";

import { SettingsSchema } from "@/schemas";
import { sql } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Check DB
  const dbUser = await getUserById(user.id);
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

  if (values.email && user.email !== values.email) {
    const existingUser = await getUserByEmail(values.email);

    // check if email is already used (not one's email)
    if (existingUser && existingUser.id !== user.id) {
      return { error: "email already in use!" };
    }

    const verficationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(verficationToken.email, verficationToken.token);

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const isMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!isMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPass = await bcrypt.hash(values.password, 10);
    values.password = hashedPass;
    values.newPassword = undefined;
  }

  // Update DB
  await sql`
    UPDATE users
    SET
      name = ${values.name}, 
      email = ${values.email}, 
      password = ${values.password}, 
      "isTwoFactorEnabled" = ${values.isTwoFactoredEnabled}, 
      role = ${values.role}
    WHERE id = ${user.id}  
  `;

  return { success: "Settings Updated successfully!" };
};
