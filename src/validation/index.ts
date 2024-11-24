import * as yup from "yup";
export const registerSchema = yup.object({
  username: yup
    .string()
    .min(5, "Username should be at least 5 characters.")
    .required("username is required"),
  email: yup
    .string()
    .required("email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invalid email format"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be at least 8 characters"),
});
export const loginSchema = yup.object({
  identifier: yup
    .string()
    .required("email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invalid email format"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be at least 8 characters"),
});
