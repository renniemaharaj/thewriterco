import { Button, Flex, Separator, Text } from "@radix-ui/themes";
// import Footer from "../../components/additional/footer";
import Navbar from "../../components/additional/NavBar";
import Hero from "../../components/additional/Hero";
// import Articles from "../../components/additional/articles/Articles";
import Sword from "../../components/additional/articles/Sword";
import Ereader from "../../components/additional/Ereader";
import { EBook } from "../../app/ereader/types";
import { useDispatch } from "react-redux";
import { setEBook, setRenderStyle } from "../../app/ereader/ereaderSlice";
// import BeforeHeader from "../../components/BeforeHeader";

import Footer from "./Footer";

//Suppress ESLint errors
const Index: React.FC = () => {
  const dispatch = useDispatch();

  // const { theme, specifyTheme } = useThemeContext();

  const setEreaderState = (eBook: EBook) => {
    // Dispatch to Redux store
    dispatch(setEBook(eBook));

    // Set the render style to "bible"
    dispatch(setRenderStyle("bible"));
  };

  return (
    <Flex className="!w-full !flex-col merriweather-bold !p-0`">
      {/* <Navbar /> */}
      <Navbar />

      {/* <Hero /> */}
      <Hero />

      <Flex className="w-full flex-col items-center justify-center p-8">
        <Text className="text-2xl font-semibold text-foreground text-center leading-tight">
          Explore the Bible through our <br /> AI-powered study tool
        </Text>
        <Text className="text-sm text-muted-foreground text-center mt-2">
          Engage with an AI model designed to help you study scripture deeply.
        </Text>
        <Button
          variant="soft"
          className="mt-5 px-6 py-3 text-lg font-medium rounded-lg"
          onClick={() => (location.href = "/ai")}
        >
          Start Chatting Now
        </Button>
      </Flex>
      <Separator size={"4"} />

      {/* <Sword />*/}
      <Sword setEBook={setEreaderState} />

      {/* <Footer /> */}
      <Footer />

      {/* <Ereader /> */}
      <Ereader />
    </Flex>
  );
};

export default Index;
