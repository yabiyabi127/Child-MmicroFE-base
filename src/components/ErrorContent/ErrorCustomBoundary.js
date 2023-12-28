import React from "react";
import { useHistory } from "react-router-dom";
import { NotFound, Forbidden, NetworkError, ErrorContent } from "./index";

const ErrorFallbackComponent = ({ error, resetErrorBoundary, title }) => {
  const history = useHistory();
  let errorMessage = "";
  if (error.toString() === "0")
    return <NetworkError {...{ refetch: resetErrorBoundary, title }} />;
  else if (error.toString() === "403")
    return <Forbidden {...{ history, title }} />;
  else if (error.toString() === "401") {
    errorMessage = "Anda tidak terauthentifikasi untuk mengakses data ini.";
    return <ErrorContent message={errorMessage} title={title} />;
  } else if (error.toString() === "404") {
    errorMessage = "Data tidak ditemukan.";
    return <NotFound {...{ history, title }} />;
  }
  errorMessage = "Terjadi kesalahan sistem.";
  return <ErrorContent message={errorMessage} title={title} />;
};
export default ErrorFallbackComponent;
