import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import users from "api/v1/users/users.schema";

const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expiresAt", {
    withTimezone: true,
  }).notNull(),
});

export { users, sessions };
