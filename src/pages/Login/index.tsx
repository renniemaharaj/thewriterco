//Radix UI
import { Flex, Section } from "@radix-ui/themes";

//Assets
// import hrtmlogo from "../../assets/HRTM Logo 800X800 Transparent.png";

// Styles
import { stylesDict } from "../../components/radixStyles";

// Login form
import LoginForm from "./Form";

// Styles
import "./styles.css";

export default function Login() {
  return (
    <Section>
      {/*Gap controls Logo - Form - Footer spacing*/}
      <Flex {...stylesDict.radix["flex_col-cent-gap-1"]} gap={"5"}>
        {/* <img
          src={hrtmlogo}
          alt="HRTM logo"
          className="hrtm-page-login_form-login-logo"
        /> */}

        {/* Login Form */}
        <LoginForm />
        {/* Login Form*/}

        {/* HRTM additionals and login*/}
        {/* <Flex {...stylesDict.radix["flex_col-cent-gap-1"]}>
          <Link size={"2"} href="/signup">
            Create account?
          </Link>
        </Flex> */}
      </Flex>
    </Section>
  );
}
