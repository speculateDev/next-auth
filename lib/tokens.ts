import crypto from "crypto";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuid } from "uuid";
import { sql } from "./db";
import { Token } from "@/schemas";
import { getPasswordResetTokenByEmail } from "@/data/resetToken";
import { getTwoFactorTokenByEmail } from "@/data/towFactorToken";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await sql`DELETE FROM VerificationToken WHERE id = ${existingToken.id}`;
  }

  const verificationToken =
    (await sql`INSERT INTO VerificationToken(email, token, expires) VALUES(${email}, ${token}, ${expires}) RETURNING *`) as Token[];

  return verificationToken[0];
};

export const generateResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await sql`DELETE FROM ResetToken WHERE id = ${existingToken.id}`;
  }

  const resetToken =
    (await sql`INSERT INTO ResetToken (email, token, expires) VALUES(${email}, ${token}, ${expires}) RETURNING *`) as Token[];

  return resetToken[0];
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  //TODO: change to 15min
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await sql`DELETE FROM twoFactorToken WHERE id = ${existingToken.id}`;
  }

  const twoFactorToken =
    (await sql`INSERT INTO twoFactorToken (email, token, expires) VALUES(${email}, ${token}, ${expires}) RETURNING *`) as Token[];

  return twoFactorToken[0];
};
