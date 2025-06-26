import { Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import Hero from "../../pkg/page/Hero";

import { Swiper, SwiperSlide } from "swiper/react";
import Page from "../../pkg/page/Page";
import { swiperSlides } from "./slides.swiper";
import { swiperProps } from "./config.swiper";
import Book from "../../pkg/book/Book";
import { useTransitionNavigation } from "../../pkg/hooks/useTransitionNavigation";
import Renderer from "../../pkg/writer/Renderer";
import { home_art } from "./art/home_art";

const Root: React.FC = () => {
  const { navigateWT } = useTransitionNavigation();
  return (
    <Page
      title="Home"
      description="Welcome to The Writer Company"
      className="!gap-5 !w-[95%]"
      wrapChildren
      hero={
        <Hero
          header="Welcome to"
          subHeader={
            <>
              The Writer <br />
              Company
            </>
          }
          hint={
            <>
              We're here to: give reasoning for faith; reinforcement to your
              shield, 🛡️ Wherewith ye shall quench all the fiery darts of the
              wicked. For his bow is set with a fiery deception 🏹
              <Separator size="3" className="my-5 mx-auto" />
            </>
          }
        />
      }
    >
      {/* <Separator size={"4"} /> */}
      <Flex className="flex-row !w-full gap-5">
        <Flex className="!flex-col !hidden !w-0 md:!w-[25%] gap-5 mx-auto !max-w-[400px] md:!flex">
          <Card>
            <Flex className="!flex-col !items-center !gap-5">
              <Book
                title="Bible"
                division="Complete"
                version="KJV"
                className="!w-[6rem] !z-10"
                onClick={() => navigateWT("/kjv")}
                showAnimation
              />
              <Heading size="4" className="text-md font-bold">
                KJV Reader
              </Heading>
              <Text className="!text-center !text-sm">
                Read, play audio or download
              </Text>
            </Flex>
          </Card>
        </Flex>
        <Flex className="!relative !flex-row !w-[75%] gap-5 mx-auto">
          <Swiper {...swiperProps} slidesPerView="auto">
            {swiperSlides.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                <Card key={index}>{item}</Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      </Flex>
      <Flex className="mt-10">
        <Renderer content={home_art} />
      </Flex>
    </Page>
  );
};

export default Root;
