import * as Yup from "yup";

export const formValidationSchema = Yup.object({
  userName: Yup.string().required("User Name is required").min(3, "Too Short!"),
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "Too Short!"),
  lastName: Yup.string().required("Last name is required").min(3, "Too Short!"),
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z0-9]{8,}$/, "Password must be at least 8 characters")
    .matches(/(?=.*[0-9])/, "Password must contain at least one number")
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter",
    )
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter",
    ),
  contactMe: Yup.boolean(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});
