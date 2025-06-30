import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuid } from "uuid";
import { sql } from "./db";
import { Token } from "@/schemas";

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
