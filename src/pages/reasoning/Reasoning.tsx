// import Footer from "../../components/Footer";
import { Flex } from "@radix-ui/themes";
import Menu from "../../components/docs/Menu";
import Page from "../../components/page/Page";
import Hint from "../../components/Hint";
// import Hint from "../../components/Hint";
// import Footer from "../../components/additional/footer";

const Reasoning = () => {
  return (
    <Page
      wrapChildren={true}
      title="Rationale"
      description="Reasoning for faith"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="w-full md:!w-[60%] mx-auto pb-20"
      >
        <Menu
          children={
            <Hint className="max-w-[400px] overflow-hidden">
              We're here to: give reasoning for faith; reinforcement to your
              shield, 🛡️
              {/* <br /> */}
              Wherewith ye shall quench all the fiery darts of the wicked. For
              his bow is set with a fiery deception 🏹
            </Hint>
          }
        />
      </Flex>
    </Page>
  );
};

export default Reasoning;
