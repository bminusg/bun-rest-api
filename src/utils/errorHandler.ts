import { ErrorMessageResponse } from "types/responses";
import errorCodesJSON from "configs/errors.json";

const errorCodes: ErrorMessageResponse[] =
  errorCodesJSON as ErrorMessageResponse[];

const errorHandler = (error: any): ErrorMessageResponse => {
  const errorCode = error.message;

  const errorResponse = errorCodes.find(
    (errorCodeItem: ErrorMessageResponse) => errorCodeItem.code === errorCode
  ) ?? { message: error, status: 500, i18n: "", code: errorCode };

  // TODO LOGGER HERE
  console.error(error);

  return errorResponse;
};

export default errorHandler;
