import { sql } from "@/lib/db";
import { Token } from "@/schemas";

export const getTwoFactorTokenByToken = async (
  token: string
): Promise<Token | null> => {
  try {
    const res =
      (await sql`SELECT * FROM twoFactorToken WHERE token = ${token}`) as Token[];

    if (!res.length) {
      return null;
    }

    return res[0];
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (
  email: string
): Promise<Token | null> => {
  try {
    const res =
      (await sql`SELECT * FROM twoFactorToken WHERE email = ${email}`) as Token[];

    if (!res.length) {
      return null;
    }

    return res[0];
  } catch {
    return null;
  }
};
