import { Flex } from "@radix-ui/themes";
import Collapsible from "../../Collapsible";
import Editor from "../Editor";
import type { Block, Code as WCode } from "../types";

const Code = ({ block }: { block: Block }) => {
  return (
    <Flex className="w-full">
      <Collapsible className="!w-full" title={(block.content as WCode).filename}>
        <Editor block={block} />
      </Collapsible>
    </Flex>
  );
};

export default Code;
