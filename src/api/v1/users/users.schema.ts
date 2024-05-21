import { uuid, text, timestamp, varchar, pgTable } from "drizzle-orm/pg-core";
import { type InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  hashedPassword: varchar("hashedPassword").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type UserDB = InferSelectModel<typeof users>;
export interface UserBodyAPIRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface UserBodyResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UsersColumns = keyof UserDB;

export type UserQueries = {
  [key in UsersColumns]?: any;
};

export default users;
