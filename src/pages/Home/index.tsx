import { Button, Flex, Quote, Separator, Text } from "@radix-ui/themes";
import Hero from "../../components/additional/Hero";

import { Carousel } from "../../components/additional/Carousel";
import React from "react";
import Page from "../../components/Page";
import Menu from "../../components/documentation/Menu";
// import Footer from "../../components/additional/footer";

const carouselItems = [
  <Flex className="w-[90%] flex-col items-center  p-8 gap-2">
    <Text className="text-2xl font-semibold text-foreground text-center leading-tight">
      Explore the Bible through our <br /> AI-powered study tools
    </Text>
    <Text className="text-sm text-muted-foreground text-center mt-2"></Text>
    <Quote className="italic animate-fade-in text-lg r px-6">
      Study to shew thyself approved unto God, <br /> a workman that needeth not
      to be ashamed, rightly <br /> dividing the word of truth.
    </Quote>
    <Separator size={"1"} />
    <Quote className="italic animate-fade-in text-lg px-6">
      And take the helmet of salvation, and the sword of the Spirit, <br />
      which is the word of God:
    </Quote>
    <Button
      variant="soft"
      className="mt-5 px-6 py-3 text-lg font-medium rounded-lg"
      onClick={() => (location.href = "/ai")}
    >
      Begin Studying Now
    </Button>
  </Flex>,

  <Flex className="w-[90%] flex-col items-center  p-8 gap-2">
    <Text className="text-3xl font-bold text-primary text-center leading-tight ">
      Reinforce your faith with <br /> reasoning
    </Text>

    <Quote className="italic animate-fade-in text-lg  px-6">
      But sanctify the Lord God in your hearts,
      <br /> and be ready always to give an answer to every man <br /> who
      asketh you a reason for the hope that is in you, with <br /> meekness and
      fear.
    </Quote>
    <Separator size={"1"} />
    <Quote className="italic animate-fade-in text-lg  px-6">
      Above all, taking the shield of faith,
      <br /> wherewith ye shall be able to quench all the fiery darts of the
      wicked.
    </Quote>
    <Button
      variant="soft"
      className="mt-5 px-6 py-3 text-lg font-medium rounded-lg"
      onClick={() => (location.href = "/reasoning")}
    >
      Explore reasoning
    </Button>
  </Flex>,
];

const Index: React.FC = () => {
  return (
    <Page>
      <>
        {/* <Hero /> */}
        <Hero />
        <Separator size={"4"} />
        <Flex className="!w-full">
          <Carousel
            autoScroll={true}
            variant="no-scrollbar"
            className="flex-[1]"
            items={carouselItems}
          />
          <Flex className="!hidden md:!flex flex-[1] justify-center items-center h-[400px]">
            <Menu className="max-w-[400px]" />
          </Flex>
        </Flex>
      </>
    </Page>
  );
};

export default Index;
