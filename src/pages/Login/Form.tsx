//Formit for forms
import { Formik, Form } from "formik";

// Radix UI
import { Box, Button, Text, Flex, Link } from "@radix-ui/themes";

// Form validation schema
import { formValidationSchema } from "./login.schema";

// Form fields
import { FormCheckBox, FormTextField } from "../Signup/components";

// Google OAuth
// import {
//   CredentialResponse,
//   GoogleLogin,
//   GoogleOAuthProvider,
// } from "@react-oauth/google";

// Microsoft OAuth
// import { LoginButton } from "../../components/MSButton";

// Shorthand styles and radix properties
import { stylesDict } from "../../components/radixStyles";

// Redux Hooks and Actions
import { useLoginMutation } from "../../app/api/auth/authApiSlice";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials, isServerError } from "../../app/api/auth/authSlice";
import { ServerError } from "../../app/api/auth/authTypes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlockingSpinner } from "../../components/Block";
import { useThemeContext } from "../../components/context/useThemeContext";
import { AllowedColors } from "../../components/RadixColors";

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

export default function LoginForm() {
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formTitle] = useState<string>("Boarding");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setFormSubmitting(isLoading);
  }, [isLoading]);

  const { theme } = useThemeContext();
  const headingFontColor = theme === "light" ? "gray" : "white";

  return (
    <div className="p-5 rounded-lg shadow-[gray] shadow-sm max-w-[350px] min-w-[350px]">
      {/* Sing in with HRTM */}
      <Flex {...stylesDict.radix["flex_col-cent-gap-1"]}>
        <Text
          as="p"
          size="5"
          mb="5"
          weight={"bold"}
          color={headingFontColor as AllowedColors}
        >
          {!formSubmitting ? formTitle : "Please wait, processing your request"}
        </Text>
      </Flex>
      <Formik
        initialValues={{
          emailAddress: "",
          password: "",
          remember: true,
        }}
        validationSchema={formValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { emailAddress, password } = values;
          try {
            setSubmitting(true);
            const userData = await login({
              emailAddress,
              password,
            }).unwrap();
            console.log("User Data", userData);
            dispatch(setCredentials({ ...userData }));
            navigate("/boarding");
          } catch (error) {
            if (isServerError(error)) {
              const serverError = error as ServerError;
              let errors = "";
              serverError.data.forEach((errorObj) => {
                errors += `${errorObj.message}\n`;
              });
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
        {!formSubmitting ? (
          <Form>
            {/*Gap controls form fields*/}
            <Flex {...stylesDict.radix["flex_col-cent-gap-1"]} gap={"1"}>
              {/* Begin fields */}
              <FormTextField
                label="Email"
                name="emailAddress"
                type="text"
                placeholder="Enter email address"
              />
              <FormTextField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
              />
              {/* End fields */}
              <Box className="w-full">
                <Flex className="!justify-between w-full">
                  <FormCheckBox name="remember">Stay signed in?</FormCheckBox>

                  <Link size={"1"} href="/recover">
                    Forgot password?
                  </Link>
                </Flex>
              </Box>
              <Text
                as="div"
                color="red"
                className="w-full p-1 text-center !text-[0.8rem]"
              >
                {error}
              </Text>
              <Flex gap={"1"} className="w-full">
                <Button
                  variant="solid"
                  type="submit"
                  className="!w-full !mt-2 !mb-2"
                >
                  Sign in
                </Button>
              </Flex>
            </Flex>
          </Form>
        ) : (
          <Flex justify={"center"} className="!mb-4">
            <BlockingSpinner />
          </Flex>
        )}
      </Formik>

      <Flex {...stylesDict.radix["flex_col-cent-gap-1"]} gap={"4"}>
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
