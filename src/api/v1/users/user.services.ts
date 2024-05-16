import { isUserBodyValid } from "./user.valdiator";
import { users } from "./users.schema";
import db from "database/client";

export const getUsers = async () => {
  const data = await db.select().from(users);

  return { data, error: null };
};

export const createUser = async (body) => {
  const isValid = isUserBodyValid(body);

  if (isValid) {
    const user = await db.insert(users).values(body).returning();
    console.log("USER", user);

    return { data: user, error: null };
  } else {
    return {
      data: null,
      error: { message: "Invalid", code: "code", status: 400 },
    };
  }
};
