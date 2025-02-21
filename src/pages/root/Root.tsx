import { Card, Flex } from "@radix-ui/themes";
import Hero from "../../components/Hero";

import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";
import Page from "../../components/page/Page";
import { swiperSlides } from "./slides.swiper";
import { swiperProps } from "./config.swiper";

const Root: React.FC = () => {
  return (
    <Page>
      <Hero />
      {/* <Separator size={"4"} /> */}
      <Flex className="w-full flex-row md:!w-[80%]">
        <Swiper {...swiperProps} slidesPerView={2}>
          {swiperSlides.map((item, index) => (
            <SwiperSlide key={index}>
              <Card key={index}>{item}</Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    </Page>
  );
};

export default Root;
