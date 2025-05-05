import { config } from "dotenv";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

config({ path: ".env" }); // or .env.local
/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */

if (!process.env.DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable");
}

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL);
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
