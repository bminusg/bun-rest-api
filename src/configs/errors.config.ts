import { StatusCode } from "hono/utils/http-status";

export const errorConfigs = [
  {
    message: "Please provide a valid mail adress syntax",
    code: "emailInvalid",
    i18n: "validation.emailInvalid",
    status: 400,
  },
  {
    message: "A Email adress entry is required",
    code: "emailRequired",
    i18n: "validation.emailRequired",
    status: 400,
  },
  {
    message: "A Email adress is already assigned",
    code: "emailRegistered",
    i18n: "validation.emailRegistered",
    status: 403,
  },
  {
    message: "A password entry is required",
    code: "pwdRequired",
    i18n: "validation.pwdRequired",
    status: 400,
  },
  {
    message: "Make sure that your password is at least 8 characters long",
    code: "pwdLength",
    i18n: "validation.pwdLength",
    status: 400,
  },
  {
    message:
      "Ensure that your password contains at least a capital letter, a lowercase letter, a number and a special character (!@#$%^&*()\\-_+.)",
    code: "pwdChars",
    i18n: "validation.pwdChars",
    status: 400,
  },
  {
    message: "First name entry is required",
    code: "firstNameRequired",
    i18n: "validation.firstNameRequired",
    status: 400,
  },
  {
    message: "Last name entry is required",
    code: "lastNameRequired",
    i18n: "validation.lastNameRequired",
    status: 400,
  },
] as const;

export type ErrorCode = (typeof errorConfigs)[number]["code"];

export interface ErrorMessageResponse {
  message: string;
  status: StatusCode;
  code: ErrorCode;
  i18n: string;
}
