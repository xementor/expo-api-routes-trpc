import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/server/db"; // Import your database connection
import * as schema from "@/server/db/schema";
import { getBaseUrl } from "@/trpc/shared";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
    schema: schema, // Your database schema
  }),

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${getBaseUrl()}/api/auth/callback/google`,
    },
  },

  baseURL: getBaseUrl(), // Base URL of your Better Auth backend.
  crossSubDomainCookies: {
    enabled: true,
  },

  defaultCookieAttributes: {
    secure: true,
    httpOnly: true,
    sameSite: "none", // Allows CORS-based cookie sharing across subdomains
    partitioned: true, // New browser standards will mandate this for foreign cookies
  },

  trustedOrigins: ["myapp://", getBaseUrl()],
  plugins: [expo()],
});
