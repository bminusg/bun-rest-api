import isValidEmail from "utils/validation/isValidEmail";

export const isUserBodyValid = (body: any): boolean => {
  const { mail } = body;

  // VALIDATE MAIL
  if (!mail) throw new Error("emailRequired");
  if (!isValidEmail(mail)) throw new Error("emailInvalid");

  return true;
};
