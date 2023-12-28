import { isRejectedWithValue } from "@reduxjs/toolkit";
import { notification } from "antd";

export const reduxErrorHandling = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    notification["error"]({
      message: "Error",
      description: action.payload.message,
      placement: "topRight",
    });
  }
  return next(action);
};
