"use client";
import { useAppDispatch, useAppSelector } from "../redux/reduxHook";
import { IUserState, setUserState } from "../redux/slices/user.slice";
import { localStorageItem } from "./constant";
import { StorageUtils } from "./storageUtils";

export const isAuth = () => {
  if (StorageUtils.getData<string>(localStorageItem.accessToken)) {
    try {
      const dispatch = useAppDispatch();
      const userState = useAppSelector((state) => state.user);
      if (userState.id) {
        return true;
      }
      const user = StorageUtils.getData<string>(localStorageItem.userData);
      if (user) {
        dispatch(setUserState(JSON.parse(user) as IUserState));
        return true;
      }
      return false;
      //! todo: Recuperer les informations de l'utilisateur
      // const response = await
    } catch (error: any) {}

    return true;
  }
  return false;
};

export const isSuperAdmin = () => {
  return false;
};

export const isAdministrateur = () => {
  return false;
};

export const isDoctor = () => {
  return false;
};

export const isClient = () => {
  return false;
};
