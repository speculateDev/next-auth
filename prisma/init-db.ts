import { sql } from "../lib/db";
console.log("test: ", process.env.test);

async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL,
        name VARCHAR(255),
        email VARCHAR(255),
        "emailVerified" TIMESTAMPTZ,
        image TEXT,
        password VARCHAR(255),
        role VARCHAR DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        "isTwoFactorEnabled" BOOLEAN DEFAULT FALSE,

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

  await sql`
  CREATE TABLE IF NOT EXISTS VerificationToken (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    token VARCHAR(255) UNIQUE,
    expires TIMESTAMP,

    UNIQUE  (email, token)
  );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ResetToken(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255),
      token VARCHAR(255) UNIQUE,
      expires TIMESTAMP,

      UNIQUE(email, token)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS twoFactorToken (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255),
      token VARCHAR(255),
      expires TIMESTAMP,

      UNIQUE(email, token)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS twoFactorConfirmation(
      id SERIAL PRIMARY KEY,
      'userId' INTEGER,

      CONSTRAINT fk_users FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(userId)
    )
  `;

  console.log("✅ Tables created (if not exists).");
  process.exit();
}

initDB().catch((err) => {
  console.error("❌ Failed to init DB:", err);
  process.exit(1);
});
