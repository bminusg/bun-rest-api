import { errorConfigs, ErrorMessageResponse } from "configs/errors.config";

const errorHandler = (error: any): ErrorMessageResponse => {
  const errorCode = error.message ?? error;

  const errorResponse = errorConfigs.find(
    (errorCodeItem: ErrorMessageResponse) => errorCodeItem.code === errorCode
  ) ?? { message: error, status: 500, i18n: "", code: errorCode };

  // TODO LOGGER HERE
  console.error(error);

  return errorResponse;
};

export default errorHandler;
