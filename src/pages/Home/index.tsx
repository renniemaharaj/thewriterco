import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import Navbar from "../../components/additional/NavBar";
import Hero from "../../components/additional/Hero";

import Footer from "./Footer";

//Suppress ESLint errors
const Index: React.FC = () => {
  return (
    <Flex className="!w-full !flex-col merriweather-bold !p-0`">
      {/* <Navbar /> */}
      <Navbar />

      {/* <Hero /> */}
      <Hero />
      <Separator size={"4"} />
      <Flex className="w-full flex-col items-center justify-center p-8 gap-2">
        <Text className="text-2xl font-semibold text-foreground text-center leading-tight">
          Explore the Bible through our <br /> AI-powered study tools
        </Text>
        <Text className="text-sm text-muted-foreground text-center mt-2">
          Engage with an AI model designed to help you study scripture deeply.
          <br />
          Service are free and open, no account required.
        </Text>
        <Button
          variant="soft"
          className="mt-5 px-6 py-3 text-lg font-medium rounded-lg"
          onClick={() => (location.href = "/ai")}
        >
          Begin Studying Now
        </Button>
      </Flex>
      <Separator size={"4"} />

      {/* <Footer /> */}
      <Footer />
    </Flex>
  );
};

export default Index;
