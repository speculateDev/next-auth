import { sql } from "@/lib/db";
import { TwoFactor } from "@/schemas";

export const getTwoFactorConfirmationByUserId = async (id: string) => {
  try {
    const res =
      (await sql`SELECT * FROM twoFactorConfirmation WHERE "userId" = ${id}`) as TwoFactor[];

    if (!res.length) {
      return null;
    }

    return res[0];
  } catch {
    return null;
  }
};
