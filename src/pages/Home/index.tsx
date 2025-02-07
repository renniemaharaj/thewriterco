import { Button, Flex, Quote, Separator, Text } from "@radix-ui/themes";
import Navbar from "../../components/additional/NavBar";
import Hero from "../../components/additional/Hero";

import { Carousel } from "../../components/additional/Carousel";
import React from "react";
import Footer from "../../components/Footer";
import Ereader from "../../components/additional/Ereader";
// import Footer from "../../components/additional/footer";

const carouselItems = [
  <Flex className="!w-[100vw] !flex-col items-center justify-center p-8 gap-2">
    <Text className="text-2xl font-semibold text-foreground text-center leading-tight">
      Explore the Bible through our <br /> AI-powered study tools
    </Text>
    <Quote className="italic animate-fade-in">
      Study to shew thyself approved unto God,
      <br />a workman that needeth not to be ashamed, rightly dividing the word
      of truth.
    </Quote>
    <Separator size={"1"} />
    <Quote className="italic animate-fade-in">
      And take the helmet of salvation, and the sword of the Spirit,
      <br /> which is the word of God:
    </Quote>
    <Button
      variant="soft"
      className="mt-5 px-6 py-3 text-lg font-medium rounded-lg"
      onClick={() => (location.href = "/ai")}
    >
      Begin Studying Now
    </Button>
  </Flex>,
  <Flex className="!w-[100vw] mx-auto !flex-col items-center justify-center p-8 gap-2">
    <Text className="text-3xl font-bold text-primary text-center leading-tight mt-2">
      Reinforce your faith with
      <br /> sound reasoning
    </Text>
    <Quote className="italic animate-fade-in text-lg text-center px-6">
      But sanctify the Lord God in your hearts,
      <br /> and be ready always to give an answer to every man who asketh
      <br /> you a reason for the hope that is in you, with meekness and fear.
    </Quote>
    <Separator size={"1"} />
    <Quote className="italic animate-fade-in text-lg text-center px-6">
      Above all, taking the shield of faith,
      <br /> wherewith ye shall be able to quench all the fiery darts of the
      wicked.
    </Quote>

    <Button
      variant="soft"
      className="px-6 text-lg font-medium rounded-lg"
      onClick={() => (location.href = "/reasoning")}
    >
      Explore reasoning
    </Button>
  </Flex>,
];
//Suppress ESLint errors
const Index: React.FC = () => {
  return (
    <Flex className="!w-full !flex-col merriweather-bold !p-0`">
      {/* <Navbar /> */}
      <Navbar />

      <Ereader hidePicker={true} />

      {/* <Hero /> */}
      <Hero />
      <Separator size={"4"} />
      <Carousel
        variant="no-scrollbar"
        autoScroll={true}
        // className=""
        items={carouselItems.map((item, idx) => (
          <React.Fragment key={`exe-${idx}`}>{item}</React.Fragment>
        ))}
      />

      <Separator size={"4"} />

      {/* <Box className="space-y-4 p-4"> */}

      {/* </Box> */}
      <Separator size={"4"} />
      {/* <Footer /> */}
      <Footer />
    </Flex>
  );
};

export default Index;
