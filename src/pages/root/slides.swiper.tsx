import { Flex, Text, Quote, Separator } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "../../components/link/Link";

const flexClassName =
  "!flex-col !items-center !justify-center gap-2 w-full h-[300px]";
const textClassName =
  "text-bold font-semibold text-foreground text-center leading-tight";
const quoteClassName = "italic animate-fade-in px-6";

export const swiperSlides = [
  <Flex className={flexClassName}>
    <Text className={textClassName}>
      Confess with your mouth the Lord Jesus, <br />
      and believe in your heart ❤️
    </Text>
    <Separator size={"1"} />
    <Quote className={quoteClassName}>
      That if thou shalt confess with thy mouth the Lord Jesus, <br />
      and shalt believe in thine heart that God hath raised him from the dead,
      thou shalt be saved.
      <br />
      <br />
      For with the heart man believeth unto righteousness; and with the mouth
      confession is made unto salvation.
    </Quote>
  </Flex>,

  <Flex className={flexClassName}>
    <Text className={textClassName}>
      Reinforce your faith with <br /> reasoning
    </Text>
    <Separator size={"1"} />
    <Quote className={quoteClassName}>
      Above all, taking the shield of faith,
      <br /> wherewith ye shall be able to quench all the fiery darts of the
      wicked.
    </Quote>
    <Link as="button" variant="soft" href="/reasoning">
      Explore reasoning
    </Link>
  </Flex>,

  <Flex className={flexClassName}>
    <Text className={textClassName}>
      Explore the Bible through our <br /> AI-powered study tools
    </Text>
    <Separator size={"1"} />
    <Quote className={quoteClassName}>
      Study to shew thyself approved unto God, <br /> a workman that needeth not
      to be ashamed, rightly dividing the word of truth.
    </Quote>
    <Link as="button" variant="soft" href="/ai">
      Begin Studying Now
    </Link>
  </Flex>,

  <Flex className={flexClassName}>
    <Text className={textClassName}>
      Convert your conversations to bible studies <br />
      as web pages, with our tools
    </Text>
    <Separator size={"1"} />
    <Quote className={quoteClassName}>
      Study to shew thyself approved unto God, <br /> a workman that needeth not
      to be ashamed, rightly dividing the word of truth.
    </Quote>
    <Link as="button" variant="soft" href="/doc/studyDocument">
      Learn More
    </Link>
  </Flex>,

  <Flex className={flexClassName}>
    <Text className={textClassName}>
      Open source on <br /> Github
    </Text>
    <GitHubLogoIcon /> <Separator size={"1"} />
    <Link
      as="button"
      variant="soft"
      href="https://github.com/renniemaharaj/thewriterco"
      external
    >
      React Front-End
    </Link>
    <Link
      as="button"
      variant="soft"
      href="https://github.com/renniemaharaj/thewriterco-auth-go"
      external
    >
      Golang Back-End
    </Link>
  </Flex>,
];
