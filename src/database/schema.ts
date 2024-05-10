import { uuid, text, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("uuid4").defaultRandom().primaryKey(),
  mail: text("email").notNull(),
});
