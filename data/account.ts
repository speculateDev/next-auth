import { sql } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const res = await sql`SELECT * FROM accounts WHERE "userId" = ${userId}`;

    if (!Array.isArray(res) || !res.length) {
      return null;
    }

    return res[0];
  } catch {
    return null;
  }
};
