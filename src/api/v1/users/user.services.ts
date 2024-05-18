import { isUserBodyValid } from "./user.valdiator";
import { users } from "./users.schema";
import db from "database/client";

export const getUsers = async () => {
  const data = await db.select().from(users);

  return { data, error: null };
};

export const createUser = async (body: any) => {
  const isValid = isUserBodyValid(body);

  const user = await db.insert(users).values(body).returning();
  return { data: user, error: null };
};
