import { Flex, Quote } from "@radix-ui/themes";
// import Footer from "../../components/Footer";
import Menu from "../../components/documentation/Menu";
import Page from "../../components/Page";
import Hint from "../../components/Hint";
// import Footer from "../../components/additional/footer";

const Index = () => {
  return (
    <Page>
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="!w-full md:!w-[25rem] mx-auto"
      >
        <Menu
          children={
            <Hint>
              <Quote className="italic animate-fade-in px-6">
                We're here to: give reasoning for faith; reinforcement to your
                shield, 🛡️
                <br />
                <br />
                Wherewith ye shall quench all the fiery darts of the wicked. For
                his bow is set with a fiery deception 🏹
              </Quote>
            </Hint>
          }
        />
      </Flex>
    </Page>
  );
};

export default Index;
