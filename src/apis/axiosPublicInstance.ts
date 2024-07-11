import axios from "axios";

const baseURL = `http://localhost:8000`;
const axiosParams = {
  baseURL,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const axiosPublicInstance = axios.create(axiosParams);

axiosPublicInstance.interceptors.request.use(
  async (config: any) => {
    return config;
  },
  (error) => {
    // gerer les erreurs de la requete
    return Promise.reject(error);
  }
);

axiosPublicInstance.interceptors.response.use(
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
    // if (error.response.code === "ECONNABORTED") {
    // } else {
    //   return Promise.reject(error);
    // }
    return Promise.reject(error);
  }
);

export default axiosPublicInstance;
