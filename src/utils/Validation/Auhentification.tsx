import * as Yup from "yup";

export const passwordErrorMessage = {
  minMessage: "Au moins 8 caractères",
  minisculeMessage:
    "Le mot de passe doit contenir au moins une lettre minuscule",
  majusculeMessage:
    "Le mot de passe doit contenir au moins une lettre majuscule",
  numberMessage: "Le mot de passe doit contenir au moins un chiffre",
};

export const usernameValidationSchema = Yup.string()
  .required("Nom d'utilisateur obligatoire")
  .min(4, "Au moins 4 caractères");

export const passwordValidationSchema = Yup.string()
  .required("Mot de passe obligatoire")
  .min(8, passwordErrorMessage.minMessage)
  .matches(/[a-z]/, passwordErrorMessage.minisculeMessage)
  .matches(/[A-Z]/, passwordErrorMessage.majusculeMessage)
  .matches(/[0-9]/, passwordErrorMessage.numberMessage);

export const matchPaswwordValidationSchema = Yup.string()
  .required("Confirmation mot de passe obligatoire")
  .min(8, "Au moins 8 caractères");

export const codeValidationSchema = Yup.string().required("Code obligatoire");

export const signupValidationSchema = Yup.object({
  username: usernameValidationSchema,
  password1: passwordValidationSchema,
  password2: matchPaswwordValidationSchema,
  identity_key: codeValidationSchema,
});

export const loginValidationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
