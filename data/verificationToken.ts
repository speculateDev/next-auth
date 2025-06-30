import { sql } from "../lib/db";
import { Token } from "@/schemas";

export const getVerificationTokenByToken = async (
  token: string
): Promise<Token | null> => {
  try {
    const res =
      (await sql`SELECT * FROM VerificationToken WHERE token = ${token} LIMIT 1`) as Token[];

    if (!res.length) {
      return null;
    }

    return res[0];
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (
  email: string
): Promise<Token | null> => {
  try {
    const res =
      (await sql`SELECT * FROM VerificationToken WHERE email = ${email} LIMIT 1`) as Token[];

    if (!res.length) {
      return null;
    }

    return res[0];
  } catch {
    return null;
  }
};
