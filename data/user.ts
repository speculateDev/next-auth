import { sql } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await sql`SELECT * FROM users WHERE id = ${id}`;

    return user;
  } catch (error) {
    return null;
  }
};
