import { eq, and } from "drizzle-orm";
import db from "database/client";
import {
  getUserEmailUniqueErrorCode,
  getUserValidationErrorCode,
} from "./user.valdiator";
import {
  UserBodyAPIRequest,
  UserBodyResponse,
  UserQueries,
  UsersColumns,
  users,
  UserDB,
} from "./users.schema";

// FIND MANY USERS

export const findManyUsers = async (
  queries: UserQueries | {} = {}
): Promise<{
  data: UserBodyResponse[] | null;
  error: null;
}> => {
  const userData = await db.select().from(users);

  return {
    data: userData.map((userDataItem) =>
      generateUserBodyResponse(userDataItem)
    ),
    error: null,
  };
};

// FIND ONE USER
export const findOneUser = async (
  queries: UserQueries
): Promise<{
  data: UserBodyResponse[] | null;
  error: null;
}> => {
  const hasQueries = Object.keys(queries).length;

  const conditions = Object.keys(queries).map((key) => {
    const columnKey = key as UsersColumns;
    const value = queries[columnKey];

    return eq(users[columnKey], value);
  });

  const userData = await db
    .select()
    .from(users)
    .where(and(...conditions));

  return {
    data: userData.map((userDataItem) =>
      generateUserBodyResponse(userDataItem)
    ),
    error: null,
  };
};

// POST
export const createUser = async (
  body: UserBodyAPIRequest
): Promise<{
  data: UserBodyResponse[] | null;
  error: null;
}> => {
  // BODY VALIDATION
  const userValidationErrorCode = getUserValidationErrorCode(body);
  if (userValidationErrorCode) throw userValidationErrorCode;

  // CHECK IF EMAIL IS UNIQUE
  const userEmailUniqueErrorCode = await getUserEmailUniqueErrorCode(
    body.email
  );
  if (userEmailUniqueErrorCode) throw userEmailUniqueErrorCode;

  // HASHING PASSWORD
  const hashedPassword = await Bun.password.hash(body.password);

  // USER INPUT
  const input = {
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
    hashedPassword,
  };

  const userData = await db.insert(users).values(input).returning();

  return {
    data: userData.map((userDataItem) =>
      generateUserBodyResponse(userDataItem)
    ),
    error: null,
  };
};

const generateUserBodyResponse = (userItem: UserDB): UserBodyResponse => {
  const userBodyResponse = { ...userItem };
  delete (userBodyResponse as Partial<UserDB>).hashedPassword;

  return userBodyResponse;
};
