import { Card, Flex, Separator } from "@radix-ui/themes";

import { Swiper, SwiperSlide } from "swiper/react";
import Hero from "../../page/Hero";
import Page from "../../page/Page";
import Renderer from "../../pkg/writer/Renderer";
import { home_art } from "./art/home_art";
import { swiperProps } from "./config.swiper";
import { swiperSlides } from "./slides.swiper";

const Index: React.FC = () => {
  return (
    <Page
      title="Home"
      description="Welcome to The Writer Company"
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
              We're here to: give reasoning for faith; reinforcement to your shield, 🛡️ Wherewith ye
              shall quench all the fiery darts of the wicked. For his bow is set with a fiery
              deception 🏹
              <Separator size="3" className="my-5 mx-auto" />
            </>
          }
        />
      }
    >
      <Flex className="flex-col !w-full gap-6 md:gap-8">
        <Flex className="!relative !flex-row !w-full gap-5 md:gap-6 justify-center">
          <Swiper {...swiperProps} slidesPerView="auto" className="!w-full max-w-5xl">
            {swiperSlides.map((item, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <Card className="!shadow-md hover:!shadow-lg transition-shadow !h-full" key={index}>{item}</Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      </Flex>
      <Flex className="!hidden md:!flex mt-10 md:mt-12 pb-2 !overflow-auto !w-full justify-center">
        <div className="max-w-5xl w-full">
          <Renderer content={home_art} />
        </div>
      </Flex>
    </Page>
  );
};

export default Index;
