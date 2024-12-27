import { Text, Flex, Card, Separator, Tabs, Box } from "@radix-ui/themes";
import Hint from "./Hint";
import ChristianAIChatbox from "./additional/Christianai";
import SideBar from "./SideBar";

const testimonials = [
  {
    quote:
      "Existence of God: Assume as true: God exists. It is impractical to prove or disprove this, as no one can transcend creation to verify an external source. Reasoning starts from this axiom: God is.",
    author: "Existence of God",
  },
  {
    quote:
      "KJV Bible as Truth: Accept the KJV Bible as the complete and authoritative word of God, containing all truth intended for us. Any conflicting translation—whether in character, word, verse, or chapter—is a falsehood.",
    author: "KJV Bible as Truth",
  },
  {
    quote:
      "Jesus Christ's First Coming: Acknowledge that Jesus Christ, the Creator, Messiah, and Truth, has already come once (as of 2024) in the manner recorded in the KJV Bible.",
    author: "Jesus Christ's First Coming",
  },
];

export default function ClientTestamonials() {
  // const currentUser = useAppSelector(selectCurrentUser);
  // className={`w-full ${!currentUser?.firstName ? "!hidden" : ""}`}
  return (
    // <Section>
    <Flex>
      <SideBar
        variant="right"
        className="!justify-start !hidden md:!flex !shadow-none"
        centerBar={
          <Flex className="!flex-col w-[500px]">
            <Text
              className="m-6"
              size="8"
              weight="bold"
              mb="9"
              style={{
                display: "block",
                textAlign: "center",
                color: "var(--hrtm-blue)",
                transition: "1s",
              }}
            >
              Axioms for Artificial Intelligence
            </Text>
            <Tabs.Root defaultValue="axioms">
              <Tabs.List>
                <Tabs.Trigger value="axioms">Axioms</Tabs.Trigger>
              </Tabs.List>

              <Box pt="3">
                <Tabs.Content value="axioms">
                  {/* <Separator size={"4"} /> */}
                  <Flex className="!flex-row !flex-wrap !gap-4 w-full max-w-[600px]">
                    {testimonials.map((testimonial) => (
                      <div className="flex flex-row gap-4">
                        <Text
                          as="label"
                          size="2"
                          weight="bold"
                          mt="4"
                          style={{ textAlign: "center" }}
                          className="min-w-[150px] text-center flex justify-center items-center"
                        >
                          {testimonial.author}
                        </Text>
                        <Text as="label" size="1" mt="4">
                          {testimonial.quote}
                        </Text>
                        {/* </pre> */}
                      </div>
                    ))}
                  </Flex>
                  <Flex className="!flex-[3] !flex-col !gap-4 !p-2 !items-center">
                    <Separator size={"4"} />
                    <Hint className="max-w-[400px]">
                      These axioms provide the most stable foundation for
                      Christianity, unlike doctrines that alter scripture to
                      address inconsistencies. The path must be narrow, and a
                      foundation cannot be built on shifting sand.
                    </Hint>
                  </Flex>
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Flex>
        }
      />
      {/* <Separator size={"3"} orientation={"vertical"} /> */}
      {/* <Flex className=""> */}
      {/* <Separator size={"3"} orientation={"vertical"} /> */}
      <Card
        // key={"testimonial" + index}
        className="!flex overflow-auto blurred-div !flex-col !mx-auto !rounded-none !justify-center !p-0"
        variant="ghost"
      >
        <ChristianAIChatbox className="min-w-[400px] max-w-[600px] !rounded-none" />
        <Flex className="!flex-col !gap-4 !p-2 !items-center">
          <Hint className="max-w-[400px]">
            Responses are generated based off of a theistic worldview; on the
            premises that God exists, the KJV Bible is true, and Jesus Christ
            has already come. The AI is designed to provide responses that are
            consistent with these axioms.
          </Hint>
          {/* <Hint className="max-w-[400px]">
            AI-powered responses, subjected to the axioms of Life. This feature
            is experimental for now as we need to sort out billing on our end
            for the SaaS, but it will preferably be free for all users.
          </Hint> */}
        </Flex>
      </Card>
      {/* </Flex> */}
    </Flex>

    // </Section>
  );
}
