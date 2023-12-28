import { API_AUTHWS } from "setup/application.properties";
import { PublicRequest } from "setup/setupAxios";

export const updateToken = (refreshToken) => {
  return PublicRequest.post(API_AUTHWS + "/user/update-token", null, {
    headers: {
      Authorization: refreshToken,
      accept: "application/json",
    },
  });
};
