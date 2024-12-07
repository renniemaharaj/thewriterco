import { Field, FormStepMeta } from "./types";

// Used to override the individual field groups when collapsed
export const overrideGroups = "Signup";

// The initial and default title of the form, can be overridden by the formStepMetas
export const initialFormTitle = "Create an account";

// Form states and their display messages, omit any or all to have initialFormTitle used
export const formStepMetas: FormStepMeta[] = [
  {
    displayMessage: "Contact",
    state: "Contact",
  },
  {
    displayMessage: "Security",
    state: "Security",
  },
];

// The fields of the form
export const formFields: Field[] = [
  {
    label: "User Name",
    name: "userName",
    type: "text",
    placeholder: "User Name",
    group: "You",
  },
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    group: "You",
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    group: "You",
  },
  {
    label: "Email",
    name: "emailAddress",
    type: "email",
    placeholder: "Email",
    group: "Contact",
  },
  {
    label: "Contact me about HRTM products and services",
    name: "contactMe",
    type: "checkbox",
    defaultValue: true,
    group: "Contact",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
    group: "Security",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    group: "Security",
  },
];
