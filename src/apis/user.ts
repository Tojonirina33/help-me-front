import axiosInstance from "./axios";
import { endpoint } from "./endpoint";

export const getUserData = () => {
  return axiosInstance.get(endpoint.user.getData);
};
