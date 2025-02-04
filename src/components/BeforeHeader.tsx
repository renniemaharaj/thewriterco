import {
  Text,
  Flex,
  Card,
  Tabs,
  Box,
  ScrollArea,
  Separator,
  Callout,
} from "@radix-ui/themes";
import { motion } from "framer-motion";
import ChristianAIChatbox from "./additional/ChristianAI/Christianai";
import SideBar from "./SideBar";
import { useEffect, useRef, useState } from "react";
import Frame from "./frames/Frame";
import { FrameBarSetup } from "./frames/types";
import { frameSetups } from "./frames/frameVarients";
import { debounce } from "lodash";
import KJVersions from "./documentation/KJVersion";
import Usages from "./documentation/Usages";
import Axioms from "./documentation/Axioms";
import Collapsible from "./Collapsible";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Contribute from "./documentation/Contribute";
import { useThemeContext } from "./context/useThemeContext";

const axioms = [
  {
    title: "Existence of God",
    description:
      "It is impossible for any created being to transcend creation and directly verify an external source, assume as true: God is.",
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
  const hero = "TheWriterCo";

  const { theme } = useThemeContext();

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
      className="flex-col !w-full relative m-auto !h-[100vh] transition-all"
      childLeft={
        <ScrollArea className="!hidden md:!flex !mx-auto flex-[2.2] p-2 pt-7 flex-col h-full">
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
                className="!overflow-visible relative"
              >
                <Box className="space-y-4 p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="!gap-4 relative !overflow-hidden"
                  >
                    <Flex className="!flex-col !gap-4 !p-4 !overflow-hidden">
                      <Frame {...framePostion} />
                      {axioms.map((axiom, index) => (
                        <Collapsible
                          key={index}
                          title={axiom.title}
                          children={
                            <Card
                              key={index}
                              variant="ghost"
                              className="!p-2 rounded-xl !my-2 !mx-2"
                            >
                              <Text size="2" className="mb-2">
                                <strong>{axiom.title}:</strong>
                              </Text>
                              <Text size="2" className="ml-2">
                                {axiom.description}
                              </Text>
                            </Card>
                          }
                        />
                      ))}
                    </Flex>
                  </motion.div>
                </Box>
                <Box className="space-y-4 p-4">
                  <Callout.Root className="mt-5">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      Verbose reasoning in the "Verbose" tab.
                    </Callout.Text>
                  </Callout.Root>
                  <Separator size="4" className="!my-2" />
                  <Callout.Root className="mt-5">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      We recommend viewing this site in dark mode.
                    </Callout.Text>
                  </Callout.Root>
                </Box>
              </Tabs.Content>

              {/* Reasoning Section */}
              <Tabs.Content value="reasoning">
                <Text size="4" weight="bold">
                  Reasoning for Axioms
                </Text>

                <Axioms />

                <Separator size="4" className="!my-2" />

                <Text size="4" weight="bold">
                  Considerations for KJV
                </Text>

                <KJVersions />
              </Tabs.Content>
              {/* Services Section */}
              <Tabs.Content value="services" className="w-[95%]">
                <Text size="4" weight="bold">
                  Services, Usages and Limits
                </Text>
                <Usages />
                <Separator size="4" className="!my-2" />
                <Text size="4" weight="bold">
                  Developer Contribute, Issues, and Feedback
                </Text>
                <Contribute />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </ScrollArea>
      }
      centerBar={<></>}
      childRight={
        /* Chatbox Section */
        <Flex
          className={`${theme === "dark" ? "bg-[#171918]" : "border"} p-2 !flex !flex-[5] !flex-col border-not-rounded`}
        >
          <ChristianAIChatbox
            highlightAxioms={debounceHighlightAxioms}
            className="w-[100%] md:!w-[85%] !max-w-[100%] !p-0 mx-auto !rounded-none"
          />
        </Flex>
      }
    />
  );
}
