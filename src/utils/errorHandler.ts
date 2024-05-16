const getErrorCode = (): string => {
  return "errorCode";
};

const errorHandler = (error: any): ErrorMessage => {
  console.error(error);

  return {
    message: error?.message ?? error,
    code: getErrorCode(),
    status: 500,
  };
};
