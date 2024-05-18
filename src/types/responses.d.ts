import { StatusCode } from "hono/utils/http-status";

export interface ErrorMessageResponse {
  message: string;
  status: StatusCode;
  code: string;
  i18n: string;
}
