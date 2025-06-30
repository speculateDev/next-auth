import { sql } from "@/lib/db";
import { Token } from "@/schemas";

export const getPasswordResetTokenByToken = async (
  token: string
): Promise<Token | null> => {
  try {
    const res =
      (await sql`SELECT * FROM ResetToken WHERE token = ${token}`) as Token[];

    if (!res.length) {
      return null;
    }

    return res[0];
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (
  email: string
): Promise<null | Token> => {
  try {
    const res =
      (await sql`SELECT * FROM ResetToken WHERE email = ${email}`) as Token[];

    if (!res.length) {
      return null;
    }

    return res[0];
  } catch {
    return null;
  }
};
