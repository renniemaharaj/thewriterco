import { Flex, Separator } from "@radix-ui/themes";
// import Footer from "../../components/Footer";
import Navbar from "../../components/additional/NavBar";
import Menu from "../../components/documentation/Menu";
import Footer from "../../components/Footer";
// import Footer from "../../components/additional/footer";

const Index = () => {
  return (
    <Flex className="!w-full  !flex-col merriweather-bold !p-0`">
      {/* <Navbar /> */}
      <Navbar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="!w-full !p-10 max-w-[550px] mx-auto"
      >
        <Menu />
      </Flex>
      <Separator size="4" className="!my-2" />
      {/* <Footer /> */}
      <Footer />
    </Flex>
  );
};

export default Index;
