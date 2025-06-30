"use server";
import * as z from "zod";
import { RegisterSchema, Token } from "@/schemas";
import bcrypt from "bcryptjs";
import { sql } from "../../lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;

  const verficationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verficationToken.email, verficationToken.token);

  return { success: "Confirmation email sent!" };
};
