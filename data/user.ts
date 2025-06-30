import { sql } from "@/lib/db";
import { User } from "@/schemas/index";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const res =
      (await sql`SELECT * FROM users WHERE email = ${email}`) as User[];

    if (!res.length) {
      return null;
    }

    return res[0];
  } catch {
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const res = (await sql`SELECT * FROM users WHERE id = ${id}`) as User[];

    if (!res.length) {
      return null;
    }

    return res[0];
  } catch {
    return null;
  }
};
