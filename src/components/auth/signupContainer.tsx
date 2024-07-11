"use client";
import Link from "next/link";
import { useFormik } from "formik";
import { SignupFormData } from "@/src/types/authentification";
import { signup } from "@/src/apis/authentification";
import { signupValidationSchema } from "@/src/utils/Validation/Auhentification";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { StorageUtils } from "@/src/utils/storageUtils";
import { localStorageItem } from "@/src/utils/constant";
import { useAppDispatch } from "@/src/redux/reduxHook";
import { setUserState } from "@/src/redux/slices/user.slice";
import { ToastContainer, toast } from "react-toastify";

const SignupContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isUsernameTouched, setIsUsernameTouched] = useState(false);
  const [isPassword1Touched, setIsPassword1Touched] = useState(false);
  const [isPassword2Touched, setIsPassword2Touched] = useState(false);
  const [isCodeTouched, setIsCodeTouched] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password1: "",
      password2: "",
      identity_key: "",
    } as SignupFormData,
    onSubmit: async (value: SignupFormData) => {
      setIsLoading(true);
      try {
        console.log(value);

        const result = await signup(value);
        console.log("registration success", result);

        StorageUtils.saveData(localStorageItem.accessToken, result.data.access);
        StorageUtils.saveData(
          localStorageItem.refreshToken,
          result.data.refresh
        );

        dispatch(setUserState(result.data.user));
        StorageUtils.saveData("user-data", JSON.stringify(result.data.user));
        router.push("/dashboard");
      } catch (error: any) {
        if (error.response.data.identity_key) {
          toast.error("Code invalide");
        } else if (error.response.data.username) {
          toast.error("Le nom d'utilisateur est déjà utilisé");
        } else {
          toast.error("Une erreur s'est produit");
        }
        console.log(error.response.data);
        setIsLoading(false);
      }
    },
    isInitialValid: false,
    validationSchema: signupValidationSchema,
  });

  return (
    <section className="w-1/2 flex flex-col items-center justify-center">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[1.8rem] text-black-text font-bold">Bienvenue</h1>
          <p className="text-md text-black-text">Bon retour parmi nous!</p>
          <p className="text-md text-black-text">Connectez-vous</p>
        </div>
        <form className="w-full mt-6" onSubmit={formik.handleSubmit}>
          <div className=" w-full my-4">
            <div
              className={`w-full px-4 py-2 bg-white rounded-sm box-border
               ${
                 formik.errors.username && isUsernameTouched
                   ? " border-red2 border-[1px] "
                   : " border-none "
               }`}
            >
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                className={`w-full m-0 p-0 border-none focus:ring-0 text-black-text placeholder:text-grey-text 
                 `}
                {...formik.getFieldProps("username")}
                onBlur={() => setIsUsernameTouched(true)}
              />
            </div>
            {formik.errors.username && isUsernameTouched && (
              <p className="mx-1 text-sm text-red2 max-w-[250px] ">
                {formik.errors.username}
              </p>
            )}
          </div>

          <div className="my-4">
            <div
              className={`px-4 py-2 bg-white rounded-sm box-border
               ${
                 formik.errors.password1 && isPassword1Touched
                   ? " border-red2 border-[1px] "
                   : " border-none "
               }`}
            >
              <input
                type="password"
                placeholder="Mot de passe"
                className={`w-full m-0 p-0 border-none focus:ring-0 text-black-text placeholder:text-grey-text 
                 `}
                {...formik.getFieldProps("password1")}
                onBlur={() => setIsPassword1Touched(true)}
              />
            </div>
            {formik.errors.password1 && isPassword1Touched && (
              <p className="mx-1 text-sm text-red2 max-w-[250px] ">
                {formik.errors.password1}
              </p>
            )}
          </div>

          <div className="my-4">
            <div
              className={`px-4 py-2 bg-white rounded-sm box-border
               ${
                 formik.errors.password2 && isPassword2Touched
                   ? " border-red2 border-[1px] "
                   : " border-none "
               }`}
            >
              <input
                type="password"
                placeholder="Confirmation mot de passe"
                className={`w-full m-0 p-0 border-none focus:ring-0 text-black-text placeholder:text-grey-text 
                 `}
                {...formik.getFieldProps("password2")}
                onBlur={() => setIsPassword2Touched(true)}
              />
            </div>
            {formik.values.password1 !== formik.values.password2 && isPassword2Touched ? (
              <p className="mx-1 text-sm text-red2 max-w-[250px] ">
                Confirmation mot de passe invalide
              </p>
            ) : (
              formik.errors.password1 &&
              isPassword2Touched && (
                <p className="mx-1 text-sm text-red2 max-w-[250px] ">
                  {formik.errors.password1}
                </p>
              )
            )}
          </div>

          <div className="my-4">
            <div
              className={`px-4 py-2 bg-white rounded-sm box-border
               ${
                 formik.errors.identity_key && isCodeTouched
                   ? " border-red2 border-[1px] "
                   : " border-none "
               }`}
            >
              <input
                type="text"
                placeholder="Code d'inscription"
                className={`w-full m-0 p-0 border-none focus:ring-0 text-black-text placeholder:text-grey-text 
                 `}
                {...formik.getFieldProps("identity_key")}
                onBlur={() => setIsCodeTouched(true)}
              />
            </div>
            {formik.errors.identity_key && isCodeTouched && (
              <p className="mx-1 text-sm text-red2 max-w-[250px] ">
                {formik.errors.identity_key}
              </p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            size="md"
            className="bg-red1 hover:bg-red2 text-white text-base py-2 rounded-sm mt-4 disabled:opacity-50"
            loading={isLoading}
            loaderProps={{ type: "dots" }}
            disabled={!formik.isValid || formik.values.password1 !== formik.values.password2}
          >
            S&apos;inscrire
          </Button>
          
        </form>
        <footer className="mt-12 text-sm font-[500]">
          <span className="text-black-text cursor-default">
            Vous avez déjà un compte?
          </span>{" "}
          <Link href={"/login"} className="text-primary">
            Connectez-vous
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default SignupContainer;
