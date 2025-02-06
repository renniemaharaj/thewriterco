import { Flex } from "@radix-ui/themes";

import ChristianAIChatbox from "./additional/ChristianAI/Christianai";
import SideBar from "./SideBar";

import { useThemeContext } from "./context/useThemeContext";
import Menu from "./documentation/Menu";
import { useState } from "react";

export default function BeforeHeader() {
  const { theme } = useThemeContext();

  const [axiomsMentioned, setAxiomsMentioned] = useState(false);

  return (
    <SideBar
      variant="right"
      className="flex-col !w-full relative m-auto !h-[100vh] transition-all"
      childLeft={<></>}
      centerBar={
        <Menu axiomsMentioned={axiomsMentioned} className="!hidden md:!flex" />
      }
      childRight={
        /* Chatbox Section */
        <Flex
          className={`${theme === "dark" ? "bg-[#171918]" : "border"} p-2 !flex !flex-[5] !flex-col border-not-rounded`}
        >
          <ChristianAIChatbox
            highlightAxioms={() => setAxiomsMentioned(!axiomsMentioned)}
            className="w-[100%] md:!w-[85%] !max-w-[100%] !p-0 mx-auto !rounded-none"
          />
        </Flex>
      }
    />
  );
}
