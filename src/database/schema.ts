import { pgTable, uuid, timestamp, text, varchar } from "drizzle-orm/pg-core";
import users from "api/v1/users/users.schema";

const sessions = pgTable("session", {
  id: uuid("id").defaultRandom().primaryKey(),
  user: uuid("user")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expiresAt", {
    withTimezone: true,
  }).notNull(),
});

export { users, sessions };
