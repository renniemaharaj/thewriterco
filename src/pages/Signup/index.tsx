// Radix UI
import { Flex, Link, Section } from "@radix-ui/themes";

//HRTM components
// import Inserts from "../../components/Inserts";

// HRTM assets
// import hrtmlogo from "../../assets/HRTM Logo 800X800 Transparent.png";

// Styles
import "./signup.styles.css";
import { stylesDict } from "../../components/radixStyles";

// Signup form
// import SignupForm from "../../components/forms/signup/SignupForm";
import { formValidationSchema } from "./schema";
import FormA from "./Form";

import { formFields, formStepMetas } from "./fields";

export default function Signup() {
  return (
    <Section>
      <Flex>
        {/* Left column with logo and information */}
        {/* <Flex
          {...stylesDict.radix["flex_col-cent-gap-1"]}
          gap={"3"}
          className="break-760px-display-none page-signup_flex_side"
        > */}
        {/* Logo appears when reasons load */}
        <div className="page-signup_flex_left_logo">
          {/* <img
              src={hrtmlogo}
              alt="HRTM Consulting logo"
              loading="lazy"
              className="page-signup_flex_left_logo"
            /> */}
        </div>

        {/* HRTM Promises now renamed as inserts and feed*/}
        {/* <Inserts /> */}
      </Flex>

      {/* Right column with form and social logins */}
      <Flex
        {...stylesDict.radix["flex_col-cent-gap-1"]}
        gap={"5"}
        className="page-signup_flex_side"
      >
        {/* Signup form abstracted out */}
        <FormA
          schema={formValidationSchema}
          formFields={formFields}
          formStepMetas={formStepMetas}
          // collapsed={Math.random() * 10 > 5}
        />

        {/* Link to login page */}
        <Flex {...stylesDict.radix["flex_col-cent-gap-1"]}>
          <Link size={"2"} href="/login">
            Login instead?
          </Link>
        </Flex>
      </Flex>
      {/* </Flex> */}
    </Section>
  );
}
