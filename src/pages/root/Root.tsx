import { Card, Flex } from "@radix-ui/themes";
import Hero from "../../components/Hero";

import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";
import Page from "../../components/page/Page";
import { swiperSlides } from "./slides.swiper";
import { swiperProps } from "./config.swiper";

const Root: React.FC = () => {
  return (
    <Page title="Home" description="Welcome to The Writer Company">
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
          </>
        }
      />
      {/* <Separator size={"4"} /> */}
      <Flex className="relative w-full flex-row md:!w-[70%]">
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
    </Page>
  );
};

export default Root;
