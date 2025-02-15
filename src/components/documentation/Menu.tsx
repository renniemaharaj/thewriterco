import React, { useEffect, useRef, useState } from "react";
import KJVersions from "./KJVersion";
import Usages from "./Usages";
import Axioms from "./Axioms";
import Collapsible from "../Collapsible";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Contribute from "./Contribute";

import {
  Text,
  Flex,
  Tabs,
  Box,
  ScrollArea,
  Separator,
  Callout,
} from "@radix-ui/themes";

import { motion } from "framer-motion";

import Frame from "../frames/Frame";
import { FrameBarSetup } from "../frames/types";
import { frameSetups } from "../frames/frameVarients";
import { debounce } from "lodash";
import Strong from "./Strong";
import FTEvidence from "./FTEvidence";

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
    title: "Jesus Christ as Truth",
    description: `This third axiom follows logically from the previous two. If God is, and the KJV Bible is true, then the KJV Bible's account of Jesus Christ's is also true. External historical sources also confirm the existence of Jesus Christ, but the KJV Bible is our primary source within this framework.`,
  },
];

const Menu = ({
  axiomsMentioned,
  className,
  children,
}: {
  axiomsMentioned?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  const hero = "Reasoning";

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

  useEffect(() => {
    debounceHighlightAxioms();
  }, [axiomsMentioned]);

  return (
    <ScrollArea
      className={`${className} !mx-auto flex-[2] p-2 pt-7 flex-col h-full`}
    >
      <Text
        className="text-wrap cursor-pointer text-2xl m-auto"
        weight="bold"
        style={{
          display: "block",
          textAlign: "center",
          transition: "300ms",
        }}
        onClick={() => (location.href = "/reasoning")}
      >
        {hero}
      </Text>
      {children}
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
            <Box className="space-y-4 !p-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="!gap-4 relative !overflow-hidden"
              >
                <Flex className="!flex-col !gap-4 !p-3 !overflow-hidden">
                  <Frame {...framePostion} />
                  {axioms.map((axiom, index) => (
                    // <Card>
                    <Collapsible
                      key={index}
                      title={axiom.title}
                      children={
                        <Strong
                          point={axiom.title}
                          content={<Text>{axiom.description}</Text>}
                        />
                      }
                    />
                    // </Card>
                  ))}
                </Flex>
              </motion.div>
            </Box>
            <Box className="space-y-4 p-4">
              {/* <Card> */}
              <Callout.Root className="mt-5">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Verbose reasoning in the "Verbose" tab.
                </Callout.Text>
              </Callout.Root>
              {/* </Card> */}
            </Box>
          </Tabs.Content>

          {/* Reasoning Section */}
          <Tabs.Content value="reasoning">
            <Text weight="bold" className="text-1xl">
              Reasoning for Axioms
            </Text>

            <Axioms />

            <Separator size="4" className="!my-2" />

            <Text weight="bold" className="text-1xl">
              Arguments for KJV
            </Text>

            <KJVersions />

            <Separator size="4" className="!my-2" />

            <Text weight="bold" className="text-1xl">
              Evidence for Christianity
            </Text>

            <FTEvidence />
          </Tabs.Content>
          {/* Services Section */}
          <Tabs.Content value="services">
            <Text weight="bold" className="text-1xl">
              Services, Usages and Limits
            </Text>
            <Usages />
            <Separator size="4" className="!my-2" />
            <Text weight="bold" className="text-1xl">
              Developer Contribute, Issues
            </Text>
            <Contribute />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </ScrollArea>
  );
};

export default Menu;
