export const logError = (error, info) => {
  console.log(error);
};

export const getErrorMessage = (error, callback) => {
  const { status, message } = error;
  let finalMessage = "";
  switch (status.toString()) {
    default:
      finalMessage = message;
      break;
    case "0":
      finalMessage = status;
      break;
    case "403":
      finalMessage = status;
      break;
    case "404":
      finalMessage = status;
      break;
    case "401":
      finalMessage = status;
      break;
    case "500":
      finalMessage = status;
      break;
  }
  console.log("finalMessage", finalMessage);
  callback(finalMessage);
};
