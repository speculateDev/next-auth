// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = db;
// }
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: "../.env" });

console.log("test-env: ", process.env.test);

declare global {
  var sql: ReturnType<typeof neon> | undefined;
}

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

// console.log("url: ", process.env.DATABASE_URL);

export const sql =
  globalThis.sql ||
  neon(process.env.DATABASE_URL, {
    fetchOptions: { timeout: 20000 }, // 20 seconds
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.sql = sql;
}
