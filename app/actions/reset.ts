"use server";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { z } from "zod";
import { generateResetToken } from "@/lib/tokens";
import { sendResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found!" };
  }

  //TODO: generate token && send email
  const resetToken = await generateResetToken(email);
  await sendResetEmail(resetToken.email, resetToken.token);

  return { success: "Reset email sent" };
};
