import { defineConfig } from "drizzle-kit";

const postgresURL = process.env.POSTGRES_URL;
if (!postgresURL) throw new Error("DB Postgres URL is not defined");

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  dbCredentials: {
    url: postgresURL,
  },
});
