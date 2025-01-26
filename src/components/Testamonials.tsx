import { Text, Flex, Card, Tabs, Box } from "@radix-ui/themes";
import ChristianAIChatbox from "./additional/ChristianAI/Christianai";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

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
      "Jesus Christ's First Coming: Acknowledge that Jesus Christ, the Creator, Messiah, and Truth, has only came once (as of 2024) in the manner recorded in the KJV Bible.",
    author: "Jesus Christ's First Coming",
  },
];

export default function ClientTestamonials() {
  // const currentUser = useAppSelector(selectCurrentUser);
  // className={`w-full ${!currentUser?.firstName ? "!hidden" : ""}`}
  const [hero, setHero] = useState<string>("");
  const animateHero = (newHero: string) => {
    let currentText = "";
    let index = 0;
    const interval = setInterval(() => {
      if (index < newHero.length) {
        currentText += newHero[index];
        setHero(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust the interval time as needed
  };

  useEffect(() => {
    animateHero("Axioms for Artificial Intelligence");
  }, []);
  return (
    // <Section>
    <Flex>
      <SideBar
        variant="right"
        className="!justify-start !hidden md:!flex !shadow-none"
        centerBar={
          <Flex className="!flex-col w-[450px] !transition-all">
            <Text
              className="absolute m-6 min-h-15 pb-10 max-w-[400px] text-wrap"
              size="8"
              weight="bold"
              mb="9"
              style={{
                display: "block",
                textAlign: "center",
                color: "var(--hrtm-blue)",
                transition: "30ms",
              }}
            >
              {hero}
            </Text>
            <Tabs.Root defaultValue="axioms" className="mt-32">
              <Tabs.List>
                <Tabs.Trigger value="axioms">Axioms</Tabs.Trigger>
                <Tabs.Trigger value="documentation">Documentation</Tabs.Trigger>
                <Tabs.Trigger value="resources" disabled>
                  Resources
                </Tabs.Trigger>
              </Tabs.List>

              <Box pt="3">
                <Tabs.Content value="axioms">
                  <Flex className="!flex-row !flex-wrap !gap-4 w-full max-w-[600px]">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="flex flex-row gap-4 p-1">
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
                </Tabs.Content>
                <Tabs.Content value="documentation">
                  <Flex className="!flex-col !gap-4 !p-2 !items-start w-full">
                    <Box className="max-w-[600px] p-4 blurred-div">
                      <Text size="2" mb="2">
                        <strong>Overview:</strong> The axioms are designed to
                        provide a stable, consistent foundation from which
                        AI-generated responses can serve in the study of the
                        Bible.
                      </Text>
                    </Box>
                    <Box className="max-w-[600px] p-4 blurred-div">
                      <Text size="2" mb="2">
                        <strong>Usage:</strong> You can either chat with the
                        model on the right or search the Bible in plain English
                        by utilizing the header-embedded search bar below,
                        getting in return a list of verses that contextually
                        matches your query.
                      </Text>
                    </Box>
                  </Flex>
                </Tabs.Content>
                <Tabs.Content value="resources"></Tabs.Content>
              </Box>
            </Tabs.Root>
          </Flex>
        }
      />
      <Card
        className="!flex overflow-auto blurred-div !flex-col !mx-auto !rounded-none !justify-center !p-0"
        variant="ghost"
      >
        <ChristianAIChatbox className="min-w-[400px] max-w-[600px] !rounded-none" />
        <Flex className="!flex-col !gap-4 !p-2 !items-center"></Flex>
      </Card>
    </Flex>
  );
}
