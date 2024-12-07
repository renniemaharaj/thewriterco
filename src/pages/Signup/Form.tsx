import { Box, Button, Flex, Tabs, Text } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import { Field, FormStepMeta, Tab } from "./types.ts";
import { useEffect, useState } from "react";
import {
  FormCheckBox,
  FormTextField,
  FormTextFieldTypes,
} from "./components.tsx";
// import {
//   CredentialResponse,
//   GoogleLogin,
//   GoogleOAuthProvider,
// } from "@react-oauth/google";

// import { LoginButton } from "../../components/MSButton.tsx";

import { FieldValues } from "./types.ts";
// Shorthand styles and radix properties
import { stylesDict } from "../../components/radixStyles.ts";
import "./signup.styles.css";

import { overrideGroups, initialFormTitle } from "./fields.ts";

// Redux Hooks and Actions
import { useRegisterMutation } from "../../app/api/auth/authApiSlice";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials, isServerError } from "../../app/api/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ServerError } from "../../app/api/auth/authTypes";
import { BlockingSpinner } from "../../components/Block.tsx";
import { AllowedColors } from "../../components/RadixColors.ts";
import { useThemeContext } from "../../components/context/useThemeContext.tsx";

export default function FormA({
  schema,
  formFields,
  collapsed,
  // defaultGroup,
  formStepMetas,
}: {
  schema: object;
  formFields: Field[];
  collapsed?: boolean;
  // defaultGroup: string;
  formStepMetas?: FormStepMeta[];
}) {
  const [stepFormState, setStepFormState] = useState<string>(
    collapsed ? overrideGroups : formFields[0].group,
  );
  const [formTitle, setFormTitle] = useState<string>(
    formStepMetas ? formStepMetas[0].displayMessage : initialFormTitle,
  );
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  //Initial values for formik
  const initialValues: FieldValues = (formFields as unknown as Field[]).reduce(
    (acc, field) => ({
      ...acc,
      [field.name as string]: field.defaultValue || "",
    }),
    {},
  );

  // Handle Google login success
  // const handleReactAuthGS = (response: CredentialResponse) => {
  //   const token = response.credential; // This is the JWT from Google
  //   console.log("JWT Token:", token);
  //   // Send the token to your backend or handle it in your frontend
  // };

  // Handle Google login failure
  // const handleReactAuthGF = () => {
  //   console.error("Google Login Failed");
  // };

  //Grouping for radix tabs
  const formTabs: Tab[] = (formFields as unknown as Field[]).reduce<Tab[]>(
    (acc, field: Field) => {
      const group = collapsed && overrideGroups ? overrideGroups : field.group;
      const tab = acc.find((tab) => tab.name === group);
      if (tab) {
        tab.members.push(field);
      } else {
        acc.push({
          name: group,
          Title: group,
          members: [field],
        });
      }
      return acc;
    },
    [],
  );

  // Set form title based on form state
  useEffect(() => {
    const meta = formStepMetas?.find((meta) => meta.state === stepFormState);
    setFormTitle(meta?.displayMessage ?? initialFormTitle);
  }, [stepFormState, formStepMetas]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setFormSubmitting(isLoading);
  }, [isLoading]);

  const { theme } = useThemeContext();
  const headingFontColor = theme === "light" ? "gray" : "white";

  return (
    <div className="sticky p-5 rounded-lg shadow-[gray] shadow-sm max-w-[350px] min-w-[350px]">
      {/* Form title, dynamically used*/}
      <Flex {...stylesDict.radix["flex_col-cent-gap-1"]}>
        <Text
          as="p"
          mb="5"
          size="5"
          weight={"bold"}
          color={headingFontColor as AllowedColors}
          className="animations-opacity-1"
        >
          {!formSubmitting ? formTitle : "We're checking your information"}
        </Text>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        // Form on submit takes a function returning hooks
        // validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          setFormSubmitting(true);
          const {
            userName,
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
          } = values;
          try {
            const userData = await register({
              // @Sa-Yoor, refractor this
              userName: String(userName),
              firstName: String(firstName),
              lastName: String(lastName),
              emailAddress: String(emailAddress),
              password: String(password),
              confirmPassword: String(confirmPassword),
            }).unwrap();
            console.log("User Data", userData);
            dispatch(setCredentials({ ...userData }));
            navigate("/welcome");
          } catch (error) {
            if (isServerError(error)) {
              const serverError = error as ServerError;
              let errors = "";
              serverError.data.forEach((errorObj) => {
                console.log(errorObj.message);
                errors += `${errorObj.message}\n`;
              });
              console.log(errors);
              setError(errors);
            } else {
              setError(
                "Internal server error. Please try again later or contact support.",
              );
            }
          }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, errors, isSubmitting }) => {
          return !isSubmitting ? (
            <Form onSubmit={handleSubmit}>
              {/* Gap controls form fields spacing */}
              <Flex {...stylesDict.radix["flex_col-cent-gap-1"]}>
                <Tabs.Root
                  onValueChange={(e) => setStepFormState(e as string)}
                  value={stepFormState}
                >
                  {/*Render tabs*/}
                  <Tabs.List>
                    {formTabs.map((tab) => (
                      <Tabs.Trigger
                        value={tab.name}
                        key={tab.name}
                        style={{
                          color: tab.members.some((member) =>
                            Object.keys(errors).includes(member.name),
                          )
                            ? "red"
                            : undefined,
                        }}
                      >
                        {tab.Title}
                      </Tabs.Trigger>
                    ))}
                  </Tabs.List>
                  <Box pt="3">
                    {formTabs.map((tab) => (
                      <Tabs.Content value={tab.name} key={tab.name}>
                        {tab.members.map((field) => {
                          if (field.type === "checkbox") {
                            return (
                              <FormCheckBox key={field.name} name={field.name}>
                                {field.label}
                              </FormCheckBox>
                            );
                          } else {
                            return (
                              <FormTextField
                                key={field.name}
                                name={field.name}
                                label={field.label as string}
                                placeholder={field.placeholder || ""}
                                type={field.type as FormTextFieldTypes}
                              />
                            );
                          }
                        })}
                      </Tabs.Content>
                    ))}
                  </Box>
                </Tabs.Root>
                <Text
                  as="div"
                  color="red"
                  className="w-full p-1 text-center !text-[0.8rem]"
                >
                  {error}
                </Text>
                <Flex gap="1" className="w-full">
                  {!collapsed && Object.keys(errors).length ? (
                    <Button
                      variant="solid"
                      type="button"
                      disabled={formTabs
                        .find((tab) => tab.name === stepFormState)
                        ?.members.some((member) =>
                          Object.prototype.hasOwnProperty.call(
                            errors,
                            member.name,
                          ),
                        )}
                      onClick={() => {
                        setStepFormState(
                          formTabs.find((tab) =>
                            tab?.members.some((member) =>
                              Object.prototype.hasOwnProperty.call(
                                errors,
                                member.name,
                              ),
                            ),
                          )?.name as string,
                        );
                      }}
                      className="!flex-1 !mt-2 !mb-2"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="solid"
                      type="submit"
                      disabled={isSubmitting}
                      className="!flex-1 animate-pulse !mt-2 !mb-2"
                    >
                      Sign up
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Form>
          ) : (
            <Flex justify={"center"} className="!mb-4">
              <BlockingSpinner />
            </Flex>
          );
        }}
      </Formik>

      <Flex
        {...stylesDict.radix["flex_col-cent-gap-1"]}
        gap={"4"}
        className="p-1"
      >
        {/* Google Recaptcha */}
        {/* <div className="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div> */}

        {/* {!formSubmitting && (
          <> */}
        {/* Separator for third-party logins */}
        {/* <Flex align={"center"} justify={"center"}>
              <Separator size={"2"} />
              <Text as="p" size="1" weight={"bold"}>
                SOCIAL ACCOUNTS
              </Text>
              <Separator size={"2"} />
            </Flex> */}

        {/* Google login */}
        {/* <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
              <div className="w-full">
                <GoogleLogin
                  onSuccess={handleReactAuthGS}
                  onError={handleReactAuthGF}
                  // text="Sign in with Google"
                />
              </div>
            </GoogleOAuthProvider> */}
        {/* Microsoft login */}
        {/* <LoginButton className="!w-full" /> */}
        {/* </>
        )} */}
      </Flex>
    </div>
  );
}
