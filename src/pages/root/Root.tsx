import { Button, Card, Flex, Quote, Separator, Text } from "@radix-ui/themes";
import Hero from "../../components/Hero";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
  Navigation,
  EffectCoverflow,
} from "swiper/modules"; // Import modules
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation"; // Import styles for pagination & navigation
import "swiper/css/effect-coverflow"; // Import coverflow effect CSS

import React from "react";
import Page from "../../components/page/Page";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const flexClassName = "!flex-col items-center justify-center gap-2";
const textClassName =
  "text-bold font-semibold text-foreground text-center leading-tight";
const quoteClassName = "italic animate-fade-in px-6";

const carouselItems = [
  <Flex className={flexClassName}>
    <Text className={textClassName}>
      Explore the Bible through our <br /> AI-powered study tools
    </Text>
    <Quote className={quoteClassName}>
      Study to shew thyself approved unto God, <br /> a workman that needeth not
      to be ashamed, rightly <br /> dividing the word of truth.
    </Quote>
    <Separator size={"1"} />
    <Quote className={quoteClassName}>
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

  <Flex className={flexClassName}>
    <Text className={textClassName}>
      Reinforce your faith with <br /> reasoning
    </Text>

    <Quote className={quoteClassName}>
      But sanctify the Lord God in your hearts,
      <br /> and be ready always to give an answer to every man <br /> who
      asketh you a reason for the hope that is in you, with <br /> meekness and
      fear.
    </Quote>
    <Separator size={"1"} />
    <Quote className={quoteClassName}>
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
  <Flex className={flexClassName}>
    <Text className={textClassName}>
      Contribute on <br /> Github
    </Text>
    <Quote className={quoteClassName}>
      We'd love to have you contribute to our open-source project.
    </Quote>
    <Separator size={"1"} />
    <GitHubLogoIcon />{" "}
    <Button
      variant="soft"
      onClick={() =>
        (window.location.href = "https://github.com/renniemaharaj/thewriterco")
      }
    >
      React Front-End
    </Button>
  </Flex>,
];

const Root: React.FC = () => {
  return (
    <Page>
      <Hero />
      {/* <Separator size={"4"} /> */}
      <Flex className="w-full flex-row md:!w-[60%]">
        <Swiper
          speed={1000}
          className="flex-[1] !flex p-5"
          spaceBetween={100}
          slidesPerView={1}
          loop={true}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          // slidesPerView={2}
          pagination={{ clickable: true }} // Enables pagination (dots)
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 500,
            modifier: 1,
            slideShadows: false,
          }}
          // navigation={true} // Enables previous/next arrows
          autoplay={{ delay: 10000, disableOnInteraction: false }} // Auto-slide every 3s
          modules={[Pagination, Autoplay, Navigation, EffectCoverflow]} // Include Swiper modules
        >
          {carouselItems.map((item, index) => (
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
