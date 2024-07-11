import { LoginFormData, SignupFormData } from "../types/authentification";
import { endpoint } from "./endpoint";
import axiosPublicInstance from "./axiosPublicInstance";

export const login = (values: LoginFormData) => {
  return axiosPublicInstance.post(endpoint.auth.login, values);
};

export const signup = (values: SignupFormData) =>{
  return axiosPublicInstance.post(endpoint.auth.signup, values);
}