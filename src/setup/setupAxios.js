import axios from "axios";
import {
  API_CARNET_KEY,
  API_HDFS_KEY,
  API_REFERENSI_KEY,
  CONTAINER_STORAGE_TYPE,
  CONTAINER_STORAGE_ID,
} from "./application.properties";
import { getCookie, setObjectToSession } from "utils/browserStorage";
import jwtDecode from "jwt-decode";
import { getKeycloak, setKeycloak } from "utils/DataKeycloak";
import { updateToken } from "store/reducers/auth/authRequest";

const saveRefreshToken = (refreshToken) => {
  const storageType = CONTAINER_STORAGE_TYPE;
  const storageId = encodeURIComponent(CONTAINER_STORAGE_ID);

  if (storageType.toLowerCase() === "cookies") {
    const currentItem = getCookie(storageId);
    let rkcFromStorage = currentItem?.rkc;
    if (rkcFromStorage) {
      let rkc = JSON.parse(decodeURI(currentItem?.rkc));
      rkc = Object.assign(rkc, { kt: refreshToken });
      rkcFromStorage = Object.assign(rkcFromStorage, { rkc });
      setObjectToSession(storageId, { rkc: JSON.stringify(rkc) });
    }
  } else if (storageType.toLowerCase === "localstorage") {
    const currentItem = decodeURI(localStorage.getItem(storageId));
    let rkcFromStorage = currentItem?.rkc;
    if (rkcFromStorage) {
      let rkc = JSON.parse(decodeURI(currentItem?.rkc));
      rkc = Object.assign(rkc, { kt: refreshToken });
      rkcFromStorage = Object.assign(rkcFromStorage, { rkc });
      localStorage.setItem(storageId, { rkc: JSON.stringify(rkc) });
    }
  }
};
const isExpiredJWT = (token) => {
  try {
    //Milisecond Now
    const dateNow = new Date();
    const now = dateNow.getTime() / 1000;

    //Milisecond Expired
    const tokenData = token.split(".")[1];
    const decodedJWT = JSON.parse(atob(tokenData));
    const expired = decodedJWT.exp;

    if (expired < now) {
      // expired
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const PublicRequest = axios.create();
const PfpdRequest = axios.create();
const ReferensiRequest = axios.create();
const HdfsRequest = axios.create();
const CarnetRequest = axios.create();

const defaultConfig = (config, store, apiKeyName, apiKeyValue) => {
  const { access_token, refresh_token } = getKeycloak();

  const originalRequest = config;
  if (apiKeyName && apiKeyValue) {
    config.headers[apiKeyName] = apiKeyValue;
  }

  if (isExpiredJWT(access_token) && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          config.headers["Authorization"] = "Bearer " + token;
          return config;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = refresh_token;
    return new Promise(function (resolve, reject) {
      updateToken(refreshToken)
        .then(({ data }) => {
          const accessKeycloak = jwtDecode(data.item.access_token);
          const { nip } = accessKeycloak;
          if (!nip) {
            const errMessage = {
              message:
                "Data yang diterima tidak memiliki nip, silahkan hubungi admin.",
            };
            processQueue(errMessage, null);
            reject({
              message:
                "Data yang diterima tidak memiliki nip, silahkan hubungi admin.",
            });
          } else {
            saveRefreshToken(data.item.refresh_token);
            setKeycloak({
              access_token: data.item.access_token,
              refresh_token: data.item.refresh_token,
            });
            config.headers.Authorization = `Bearer ${data.item.access_token}`;
            processQueue(null, data.item.access_token);
            resolve(config);
          }
        })
        .catch((err) => {
          processQueue(err, null);
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  } else {
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  }
};

const setupAxios = (store) => {
  // Do something before request is sent
  axios.interceptors.request.use(
    async (config) => defaultConfig(config, store),
    function (error) {
      return Promise.reject(error);
    }
  );
  CarnetRequest.interceptors.request.use(
    async (config) =>
      defaultConfig(config, store, "beacukai-api-key", API_CARNET_KEY),
    function (error) {
      return Promise.reject(error);
    }
  );
  PfpdRequest.interceptors.request.use(
    async (config) =>
      defaultConfig(config, store, "beacukai-api-key", API_CARNET_KEY),
    function (error) {
      return Promise.reject(error);
    }
  );
  ReferensiRequest.interceptors.request.use(
    async (config) =>
      defaultConfig(config, store, "beacukai-api-key", API_REFERENSI_KEY),
    function (error) {
      return Promise.reject(error);
    }
  );
  HdfsRequest.interceptors.request.use(
    async (config) =>
      defaultConfig(config, store, "beacukai-api-key", API_HDFS_KEY),
    function (error) {
      return Promise.reject(error);
    }
  );
};

export {
  setupAxios,
  PublicRequest,
  PfpdRequest,
  ReferensiRequest,
  HdfsRequest,
  CarnetRequest,
};
