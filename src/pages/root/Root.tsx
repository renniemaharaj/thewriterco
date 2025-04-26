import {
  Callout,
  Card,
  Flex,
  IconButton,
  Separator,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import Hero from "../../pkg/page/Hero";

import { Swiper, SwiperSlide } from "swiper/react";

import React, { useRef } from "react";
import Page from "../../pkg/page/Page";
import { swiperSlides } from "./slides.swiper";
import { swiperProps } from "./config.swiper";
import Chat from "../../pkg/ai/Chat";
import { useDispatch } from "react-redux";
import { clearMessages } from "../../app/chat/chatSlice";
import { toggleFlowSlice } from "../../app/flow/flowSlice";
import { Trash2Icon } from "lucide-react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "../../pkg/link/Link";

const Root: React.FC = () => {
  const messageBoxRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const scrollMessageBoxToBottom = () => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

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
      <Flex className="!relative flex-col !w-full gap-5">
        <Flex className="!relative w-full !flex-row md:!w-[70%] gap-5 mx-auto">
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
        <Separator size={"4"} className="mx-auto m-5" />
        <Flex className="!relative w-full !flex-row !justify-center !items-center gap-5 mx-auto">
          <Text className="!text-center !text-lg !font-bold">
            TheWriterCo AI
          </Text>
          <Tooltip content="delete chat">
            <IconButton
              size="2"
              variant="soft"
              onClick={() => {
                {
                  dispatch(clearMessages());
                  dispatch(toggleFlowSlice());
                }
              }}
            >
              <Trash2Icon />
            </IconButton>
          </Tooltip>
          <Link href="ai">Go</Link>
        </Flex>

        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text className="flex flex-col gap-2">
            {/* <Card className="!flex !flex-col !gap-2 !w-full mx-auto !min-h-fit !static"> */}
            <Text className="!text-center !text-lg !font-bold">
              Powered by our open source, Google Gemini-Pool, Go Manager
            </Text>

            <Text className="!text-center !text-md">
              A pool manager for handling multiple Google Gemini API keys
              efficiently. This package provides thread-safe API key management
              and session wrapping for Google's Gemini AI models. Featuring
              queue-based retrying, exponential backoff and custom validation,
              and is written in Go for performance{" "}
              <Link href="/doc/geminiPool">Learn More</Link> or{" "}
              <Link
                external
                href="https://github.com/renniemaharaj/google-gemini-pool"
              >
                Source
              </Link>{" "}
            </Text>
            {/* </Card> */}
          </Callout.Text>
        </Callout.Root>

        {/* <Flex className="!w-full md:!w-[70%] mx-auto "> */}
        <Card className="!w-full mx-auto !min-h-fit !static">
          <Flex className="!w-full md:!w-[70%] max-w-[700px] !h-[400px] mx-auto overflow-auto">
            <Chat
              className="!w-full mx-auto sm:!w-[100%] "
              scrollMessageBoxToBottom={scrollMessageBoxToBottom}
            />
          </Flex>
        </Card>
      </Flex>
      {/* </Flex> */}
    </Page>
  );
};

export default Root;
