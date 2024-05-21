import { UserBodyAPIRequest, users } from "./users.schema";
import { ErrorCode } from "configs/errors.config";
import isEmailValid from "utils/validation/isValidEmail";
import isPasswordValid from "utils/validation/isPasswordValid";
import db from "database/client";
import { eq } from "drizzle-orm";

export const getUserValidationErrorCode = (
  body: UserBodyAPIRequest
): ErrorCode | undefined => {
  const { email, password, firstName, lastName } = body;

  // VALIDATE MAIL
  if (!email || email.length === 0) return "emailRequired";
  if (!isEmailValid(email)) return "emailInvalid";

  // VALIDATE PASSWORD
  if (!password) return "pwdRequired";
  if (password.length < 8) return "pwdLength";
  if (!isPasswordValid(password)) return "pwdChars";

  // VALIDATE FIRST NAME
  if (!firstName || firstName.length === 0) return "firstNameRequired";

  // VALIDATE LAST NAME
  if (!lastName || lastName.length === 0) return "lastNameRequired";

  return undefined;
};

export const getUserEmailUniqueErrorCode = async (
  email: string
): Promise<ErrorCode | undefined> => {
  const excistUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  console.log("USER EXCIST", excistUser);
  if (excistUser.length > 0) return "emailRegistered";

  return undefined;
};
