import { Flex, Text, Button, Quote, Separator } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const flexClassName = "!flex-col items-center justify-center gap-2";
const textClassName =
  "text-bold font-semibold text-foreground text-center leading-tight";
const quoteClassName = "italic animate-fade-in px-6";

export const swiperSlides = [
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
    <Button
      variant="soft"
      onClick={() =>
        (window.location.href =
          "https://github.com/renniemaharaj/thewriterco-auth-go")
      }
    >
      Golang Back-End
    </Button>
  </Flex>,
];
