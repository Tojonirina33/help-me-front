"use client";
import { login } from "@/src/apis/authentification";
import { useAppDispatch } from "@/src/redux/reduxHook";
import { setUserState } from "@/src/redux/slices/user.slice";
import { LoginFormData, LoginResponse } from "@/src/types/authentification";
import { loginValidationSchema } from "@/src/utils/Validation/Auhentification";
import { localStorageItem } from "@/src/utils/constant";
import { StorageUtils } from "@/src/utils/storageUtils";
import { logError } from "@/src/utils/utils";
import { Button } from "@mantine/core";
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LoginContainer = () => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  //

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    } as LoginFormData,
    onSubmit: async (value: LoginFormData) => {
      setIsLoading(true);
      try {
        const result: AxiosResponse<LoginResponse> = await login(value);

        StorageUtils.saveData(localStorageItem.accessToken, result.data.access);
        StorageUtils.saveData(
          localStorageItem.refreshToken,
          result.data.refresh
        );

        dispatch(setUserState(result.data.user));
        StorageUtils.saveData("user-data", JSON.stringify(result.data.user));
        setSuccess(true);
        setErrorLogin(null);
        router.push("/dashboard");
      } catch (error: any) {
        toast.error("Erreur");
        logError(error || error.message || error);
        setErrorLogin("Username ou mot de passe invalid");
      } finally {
        setIsLoading(false);
      }
    },
    isInitialValid: false,
    validationSchema: loginValidationSchema,
  });

  return success ? (
    <div></div>
  ) : (
    <section className="w-1/2 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[1.8rem] text-black-text font-bold">Bienvenue</h1>
          <p className="text-md text-black-text">Bon retour parmi nous!</p>
          <p className="text-md text-black-text">Connectez-vous</p>
        </div>
        <form className="w-full mt-6" onSubmit={formik.handleSubmit}>
          <div className="px-4 py-2 bg-white rounded-sm my-4">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              className="w-full m-0 p-0 border-none focus:ring-0 text-black-text placeholder:text-grey-text"
              {...formik.getFieldProps("username")}
            />
          </div>
          <div className="px-4 py-2 bg-white rounded-sm my-4">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full m-0 p-0 box-border border-none focus:ring-0 text-black-text placeholder:text-grey-text"
              {...formik.getFieldProps("password")}
            />
          </div>
          <p className="text-sm text-grey-text font-[600] flex flex-row justify-end">
            Mot de passe oublié?
          </p>
          {errorLogin && <p className="my-2 text-red2">{errorLogin}</p>}

          <Button
            type="submit"
            fullWidth
            size="md"
            className="bg-red1 hover:bg-red2 text-white text-base py-2 rounded-sm mt-4 disabled:opacity-50"
            loading={isLoading}
            loaderProps={{ type: "dots" }}
            disabled={!formik.isValid ? true : false}
          >
            Se connecter
          </Button>
        </form>
        <footer className="mt-12 text-sm font-[500]">
          <span className="text-black-text cursor-default">
            Vous n&apos;avez pas de compte?
          </span>{" "}
          <Link href={"/signup"} className="text-primary">
            Inscrivez-vous
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default LoginContainer;
