import { IUserState } from "../redux/slices/user.slice";

export interface SignupFormData {
  username: string;
  password1: string;
  password2: string;
  identity_key: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: IUserState;
}
