// import Footer from "../../components/Footer";
import { Flex } from "@radix-ui/themes";
import Menu from "../../components/documentation/Menu";
import Page from "../../components/Page";
// import Hint from "../../components/Hint";
// import Footer from "../../components/additional/footer";

const Index = () => {
  return (
    <Page>
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="w-full md:!w-[60%] mx-auto pb-20"
      >
        <Menu />
      </Flex>
    </Page>
  );
};

export default Index;
