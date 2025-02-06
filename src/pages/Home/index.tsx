import { Button, Flex, Quote, Separator, Text } from "@radix-ui/themes";
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
        <Text className="text-sm text-muted-foreground text-center mt-2"></Text>
        <Quote className="italic animate-fade-in">
          Study to shew thyself approved unto God,
          <br />a workman that needeth not to be ashamed, rightly dividing the
          word of truth.
        </Quote>
        <Separator size={"1"} />
        <Quote className="italic animate-fade-in">
          But without faith it is impossible to please him:
          <br />
          for he that cometh to God must believe that he is,
          <br />
          and that he is a rewarder of them that diligently seek him.
        </Quote>
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
