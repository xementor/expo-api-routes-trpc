import { Client as LibsqlClient, createClient } from "@libsql/client/web";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql/web";
config({ path: ".env" }); // or .env.local

export const db = drizzle({
  connection: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
