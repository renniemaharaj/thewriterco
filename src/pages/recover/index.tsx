//Radix UI
import { Flex, Link, Section } from "@radix-ui/themes";

//Assets
// import hrtmlogo from "../../assets/HRTM Logo 800X800 Transparent.png";

// Styles
import { stylesDict } from "../../components/radixStyles";

//Form
import RecoveryForm from "./Form";

export default function Recovery() {
  return (
    <Section>
      {/*Gap controls Logo - Form - Footer spacing*/}
      <Flex {...stylesDict.radix["flex_col-cent-gap-1"]} gap={"5"}>
        {/* <img src={hrtmlogo} alt="HRTM logo" /> */}

        {/* <Recovery Form */}
        <RecoveryForm />
        {/* <Recovery Form */}

        {/* HRTM additionals and login*/}
        <Flex {...stylesDict.radix["flex_col-cent-gap-1"]}>
          <Link size={"2"} href="/login">
            Login instead?
          </Link>
        </Flex>
      </Flex>
    </Section>
  );
}
