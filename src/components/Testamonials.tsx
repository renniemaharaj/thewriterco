import {
  Text,
  Flex,
  Card,
  Tabs,
  Box,
  ScrollArea,
  Separator,
} from "@radix-ui/themes";
import { motion } from "framer-motion";
import ChristianAIChatbox from "./additional/ChristianAI/Christianai";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import Frame from "./frames/Frame";
import { FrameBarSetup } from "./frames/types";
import { frameSetups } from "./frames/frameVarients";
import { debounce } from "lodash";
import KJVArguments from "./KJVArguments";

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
                    <Text size="5" weight="bold">
                      Tools for Bible Study
                    </Text>
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
                    <Separator size="4" className="!my-2" />
                    <Text size="5" weight="bold">
                      KJV Choice Reasoning
                    </Text>
                    <Card variant="ghost" className="p-4 rounded-xl">
                      <Text size="2">
                        <strong>For a foundation sake:</strong> If we are to
                        explore the bible through artificial intelligence, we
                        must not enter with confusion. If there is any confusion
                        in your prompt, confusion will be reflected in responses
                        from the generative model. Only one must be a
                        foundation. If not one then two? Maybe three? Why not
                        all? So the question is, which version of the bible is
                        preferred?
                      </Text>
                    </Card>
                    <Card variant="ghost" className="p-4 rounded-xl">
                      <Text size="2">
                        <strong>Thewriterco said what?</strong> Should you throw
                        away your other translations? No, but for the sake of
                        consistency, the KJV is our preferred translation for
                        exploring generative artificial intelligence in the
                        study of the Bible. Why do we need multiple translations
                        anyway? Does the KJV lack something that other versions
                        have? To say this is to say that the KJV is not the word
                        of God. If the KJV is not the word of God, then what is?
                      </Text>
                    </Card>
                    <Separator size="4" className="!my-2" />
                    <Text size="5" weight="bold">
                      Arguments for KJV Translation
                    </Text>
                    <KJVArguments />
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
