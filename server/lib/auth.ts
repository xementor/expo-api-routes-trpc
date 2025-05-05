import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/server/db"; // Import your database connection
import * as schema from "@/server/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: schema, // Your database schema
  }),

  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["myapp://", "http://localhost:8081"],
  plugins: [expo()],
});
