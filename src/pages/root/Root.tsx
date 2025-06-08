import {
  Callout,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import Hero from "../../pkg/page/Hero";

import { Swiper, SwiperSlide } from "swiper/react";
import Page from "../../pkg/page/Page";
import { swiperSlides } from "./slides.swiper";
import { swiperProps } from "./config.swiper";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { HandCoinsIcon } from "lucide-react";
import Link from "../../pkg/link/Link";
import android_192 from "../../assets/favicon_io/android-chrome-192x192.png";
import Book from "../../pkg/book/Book";
import { useTransitionNavigation } from "../../pkg/hooks/useTransitionNavigation";

const Root: React.FC = () => {
  const { navigateWT } = useTransitionNavigation();
  return (
    <Page
      title="Home"
      description="Welcome to The Writer Company"
      className="!gap-5"
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
              <img
                src={android_192}
                alt="Android Chrome Icon"
                className="w-20 h-20 mx-auto mt-2 animate-pulse"
              />
              <Heading size="4" className="text-md font-bold">
                Support Us
              </Heading>
              <Flex className="items-center gap-2 text-sm mt-2">
                <HandCoinsIcon className="h-5 w-5 text-primary" />
                <Link href="https://paypal.me/newrennie" external animate>
                  Paypal Contribute
                </Link>
              </Flex>
            </Flex>
          </Card>

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
          <Card>
            <Flex className="!flex-col !items-center !gap-5">
              <Heading size="4" className="text-md font-bold">
                Our Mission
              </Heading>
              <Text className="!text-center !text-sm">
                Advocacy of a KJV first approach and preservation of strong
                theological reasoning for faith.
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
      <Separator size={"4"} className="mx-auto m-5" />
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text className="flex flex-col gap-2">
          <Text className="!text-center !text-lg !font-bold">
            Please note: Services implementing artificial intelligence have been
            permanently disabled for the public. However, you may fork our
            github repositories, for your personal use. Do enjoy!
          </Text>
        </Callout.Text>
      </Callout.Root>
    </Page>
  );
};

export default Root;
