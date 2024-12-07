import * as Yup from "yup";

export const formValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
});
