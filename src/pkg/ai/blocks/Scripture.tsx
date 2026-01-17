import { Flex } from "@radix-ui/themes";
import React from "react";
import type { Block, Scripture as WScripture } from "../types";
import Verse from "./Verse";

const Scripture = ({ block }: { block: Block }) => {
  return (
    <Flex className="!flex-row !gap-3 !justify-center !items-center !flex-wrap">
      {(block.content as WScripture).verses.map((verse, idx) => (
        <React.Fragment key={`verse-${idx}`}>
          <Verse verse={verse} />
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Scripture;
