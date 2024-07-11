import axios from "axios";
import { StorageUtils } from "../utils/storageUtils";
import { localStorageItem } from "../utils/constant";
import { endpoint } from "./endpoint";

const baseURL = `http://localhost:8000`;
const axiosParams = {
  baseURL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = StorageUtils.getData(localStorageItem.accessToken);
    if (token !== null) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    }
    return config;
  },
  (error) => {
    // gerer les erreurs de la requete
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (
      response.status !== 200 &&
      response.status !== 201 &&
      response.status !== 203 &&
      response.status !== 204
    ) {
      return Promise.reject(new Error("Error"));
    } else {
      return response;
    }
  },
  async (error) => {
    if (error.response?.status === 401) {
      const prevRequest = error.config;

      const refreshToken = StorageUtils.getData<string>(localStorageItem.refreshToken);
      if (refreshToken && !prevRequest.sent) {
        prevRequest.sent = true;

        try {
          const response = await axios.post(`${baseURL}${endpoint.auth.refreshToken}`, null, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          const newAccessToken = response.data.access_token;
          const newRefreshToken = response.data.refresh_token;

          StorageUtils.saveData(localStorageItem.accessToken, newAccessToken);
          StorageUtils.saveData(localStorageItem.refreshToken, newRefreshToken);
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance.request(error.config);
        } catch (error) {
          console.log(
            "==================*********************************=================="
          );
          console.log("refresh token expired ou invalid");
          console.log(
            "==================*********************************=================="
          );
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
