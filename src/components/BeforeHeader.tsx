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
import { useEffect, useRef, useState } from "react";
import Frame from "./frames/Frame";
import { FrameBarSetup } from "./frames/types";
import { frameSetups } from "./frames/frameVarients";
import { debounce } from "lodash";
import KJVArguments from "./documentation/KJVArguments";
import Usages from "./documentation/Usages";
import Axioms from "./documentation/Axioms";

const axioms = [
  {
    title: "Existence of God",
    description:
      "It is beyond the scope of our current confines to either prove or disprove this, we assume as true: God is.",
  },
  {
    title: "KJV Bible as Truth",
    description:
      "The KJV Bible is the complete and authoritative written source, and word of God.",
  },
  {
    title: "Jesus Christ's First Coming",
    description:
      "Jesus Christ, the Creator, Messiah, and Truth, has come once (as of 2024) as recorded in the KJV Bible.",
  },
];

export default function BeforeHeader() {
  const hero = "Axioms for Artificial Intelligence";

  const [framePostion, setFramePosition] = useState<FrameBarSetup>(
    frameSetups.CornersNorthEastSM,
  );

  const axiomParentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleMouseOver = () => {
      setFramePosition(frameSetups.CenteredSM);
    };

    const handleMouseLeave = () => {
      setFramePosition(frameSetups.CornersNorthEastSM);
    };

    const parent = axiomParentRef.current;

    if (parent) {
      parent.addEventListener("mouseover", handleMouseOver);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (parent) {
        parent.removeEventListener("mouseover", handleMouseOver);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [axiomParentRef, setFramePosition]);

  return (
    <SideBar
      variant="right"
      className="flex-col w-[96vw] relative m-auto pt-7 !h-[100vh] transition-all !box-border"
      childLeft={
        <ScrollArea className="!hidden md:!flex !w-[400px] pr-7 flex-col h-full">
          <Text
            className="text-wrap"
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
            <Tabs.List className="flex space-x-4 !shadow-none pb-2">
              <Tabs.Trigger value="axioms" className="px-4 py-2">
                Axioms
              </Tabs.Trigger>
              <Tabs.Trigger value="reasoning" className="px-4 py-2">
                Verbose
              </Tabs.Trigger>
              <Tabs.Trigger value="services" className="px-4 py-2">
                Services
              </Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
              {/* Axioms Section */}
              <Tabs.Content
                ref={axiomParentRef}
                value="axioms"
                className="!overflow-visible"
              >
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

              {/* Reasoning Section */}
              <Tabs.Content value="reasoning">
                <Text size="4" weight="bold">
                  Reasoning for Axioms
                </Text>

                <Axioms />

                <Separator size="4" className="!my-2" />

                <Text size="4" weight="bold">
                  Arguments for KJV Translation
                </Text>

                <KJVArguments />
              </Tabs.Content>
              {/* Services Section */}
              <Tabs.Content value="services" className="w-[95%]">
                <Text size="4" weight="bold">
                  Services, Usages and Limits
                </Text>
                <Usages />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </ScrollArea>
      }
      centerBar={<></>}
      childRight={
        /* Chatbox Section */
        <Card
          className="!flex overflow-auto !flex-col !mx-auto !rounded-none !justify-center"
          variant="ghost"
        >
          <ChristianAIChatbox
            highlightAxioms={debounceHighlightAxioms}
            className="min-w-[400px] max-w-[600px] !rounded-none"
          />
          <Flex className="!flex-col !gap-4 !p-2 !items-center"></Flex>
        </Card>
      }
    />
  );
}
