// import { config } from "dotenv";
// config({ path: "../.env" });

console.log("test: ", process.env.test);

import { sql } from "../lib/db";

async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL,
        name VARCHAR(255),
        email VARCHAR(255),
        "emailVerified" TIMESTAMPTZ,
        image TEXT,
        password VARCHAR(255),

        PRIMARY KEY (id)
    );
  `;

  await sql`
  CREATE TABLE IF NOT EXISTS accounts (
      id SERIAL,
      "userId" INTEGER NOT NULL,
      type VARCHAR(255) NOT NULL,
      provider VARCHAR(255) NOT NULL,
      "providerAccountId" VARCHAR(255) NOT NULL,
      refresh_token TEXT,
      access_token TEXT,
      expires_at BIGINT,
      id_token TEXT,
      scope TEXT,
      session_state TEXT,
      token_type TEXT,

      PRIMARY KEY (id)
);
  `;

  console.log("✅ Tables created (if not exists).");
  process.exit();
}

initDB().catch((err) => {
  console.error("❌ Failed to init DB:", err);
  process.exit(1);
});
