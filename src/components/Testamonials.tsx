import { Text, Flex, Card, Tabs, Box, ScrollArea } from "@radix-ui/themes";
import { motion } from "framer-motion";
import ChristianAIChatbox from "./additional/ChristianAI/Christianai";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import Frame from "./frames/Frame";
import { FrameBarSetup } from "./frames/types";
import { frameSetups } from "./frames/frameVarients";
import { debounce } from "lodash";

const axioms = [
  {
    title: "Existence of God",
    description:
      "Assume as true: God exists. It is impractical to prove or disprove this, as no one can transcend creation to verify an external source.",
  },
  {
    title: "KJV Bible as Truth",
    description:
      "The KJV Bible is the complete and authoritative word of God. Any conflicting translation—whether in character, word, verse, or chapter—is false.",
  },
  {
    title: "Jesus Christ's First Coming",
    description:
      "Jesus Christ, the Creator, Messiah, and Truth, has come once (as of 2024) as recorded in the KJV Bible.",
  },
];

export default function ClientTestimonials() {
  const [hero, setHero] = useState("Axioms for Artificial Intelligence");

  useEffect(() => {
    setTimeout(() => {
      setHero("Axioms for Artificial Intelligence");
    }, 200);
  }, []);

  const [framePostion, setFramePosition] = useState<FrameBarSetup>(
    frameSetups.CornersNorthEastSM,
  );

  const highlightAxioms = () => {
    setTimeout(() => {
      setFramePosition(frameSetups.CornersSouthEastSM);
      setTimeout(() => {
        setFramePosition(frameSetups.CornersNorthEastSM);
      }, 350);
    }, 1000);
  };

  useEffect(() => {
    highlightAxioms();
  }, []);

  const debounceHighlightAxioms = debounce(() => {
    highlightAxioms();
  }, 100);
  return (
    <Flex className="h-screen w-full md:flex-row transition-all !justify-evenly">
      {/* Sidebar */}
      <SideBar
        variant="right"
        className="!hidden md:!flex flex-col w-[450px] h-full p-6 transition-all"
        centerBar={
          <ScrollArea className="flex flex-col h-full">
            <Text
              className="max-w-[400px] text-wrap hero-glow"
              size="8"
              weight="bold"
              style={{
                display: "block",
                textAlign: "center",
                transition: "300ms",
              }}
            >
              {hero}
            </Text>
            <Tabs.Root defaultValue="axioms" className="mt-8">
              <Tabs.List className="flex space-x-4 border-b pb-2">
                <Tabs.Trigger value="axioms" className="px-4 py-2">
                  Axioms
                </Tabs.Trigger>
                <Tabs.Trigger value="documentation" className="px-4 py-2">
                  Documentation
                </Tabs.Trigger>
              </Tabs.List>

              <Box pt="3">
                {/* Axioms Section */}
                <Tabs.Content value="axioms" className="!p-1 !overflow-hidden">
                  <Frame {...framePostion} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="!gap-4"
                  >
                    {axioms.map((axiom, index) => (
                      <Card
                        key={index}
                        variant="ghost"
                        className="!p-2 rounded-xl !my-2 !mx-2"
                      >
                        <Text size="2" className="mb-2">
                          <strong>{axiom.title}</strong>
                        </Text>
                        <Text size="2" className="ml-2">
                          {axiom.description}
                        </Text>
                      </Card>
                    ))}
                  </motion.div>
                </Tabs.Content>

                {/* Documentation Section */}
                <Tabs.Content value="documentation">
                  <Box className="space-y-4 p-4">
                    <Card variant="ghost" className="p-4 rounded-xl">
                      <Text size="2">
                        <strong>Overview:</strong> The axioms provide a stable,
                        consistent foundation for AI-generated responses in the
                        study of the Bible.
                      </Text>
                    </Card>
                    <Card variant="ghost" className="p-4 rounded-xl">
                      <Text size="2">
                        <strong>Usage:</strong> You can chat with the AI or use
                        the search bar to find verses contextually matching your
                        query.
                      </Text>
                    </Card>
                  </Box>
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </ScrollArea>
        }
      />

      {/* Chatbox Section */}
      <Card
        className="!flex overflow-auto !flex-col !mx-auto !rounded-none !justify-center !p-0 !mt-2"
        variant="ghost"
      >
        <ChristianAIChatbox
          highlightAxioms={debounceHighlightAxioms}
          className="min-w-[400px] max-w-[600px] !rounded-none"
        />
        <Flex className="!flex-col !gap-4 !p-2 !items-center"></Flex>
      </Card>
    </Flex>
  );
}
