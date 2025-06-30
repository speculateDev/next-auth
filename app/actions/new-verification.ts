"use server";

import { sql } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  await sql`UPDATE users SET "emailVerified" = ${new Date()}, email = ${existingToken.email} WHERE id = ${existingUser.id}`;

  await sql`DELETE FROM VerificationToken WHERE id = ${existingToken.id}`;

  return { success: "Email verified" };
}

export default newVerification;
