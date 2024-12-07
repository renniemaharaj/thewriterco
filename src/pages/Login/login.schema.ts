import * as Yup from "yup";

export const formValidationSchema = Yup.object({
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: Yup.string().required("Required"),
  remember: Yup.boolean(),
});
