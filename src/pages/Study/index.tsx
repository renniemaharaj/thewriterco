import { Flex } from "@radix-ui/themes";
// import Footer from "../../components/Footer";
import Menu from "../../components/documentation/Menu";
import Page from "../../components/Page";
// import Footer from "../../components/additional/footer";

const Index = () => {
  return (
    <Page>
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="!w-full !p-10 max-w-[550px] mx-auto"
      >
        <Menu />
      </Flex>
    </Page>
  );
};

export default Index;
