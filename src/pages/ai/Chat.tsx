import { Flex, IconButton } from "@radix-ui/themes";
import Ereader from "../../components/bible/Ereader";
import SideBar from "../../components/SideBar";
import Menu from "../../components/docs/Menu";
import Hint from "../../components/Hint";
import { useThemeContext } from "../../components/context/theme/useThemeContext";
import Chat from "../../components/ai/Chat";
import { CircleFadingPlusIcon } from "lucide-react";
import { useRef } from "react";

const AI = () => {
  const { theme } = useThemeContext();

  const messageBoxRef = useRef<HTMLDivElement>(null);

  const scrollMessageBoxToBottom = () => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Flex className="!w-[100vw] !flex-col merriweather-bold !p-0`">
      {/* <BeforeHeader /> */}
      <SideBar
        variant="center"
        className="flex-col relative m-auto !w-[100vw] !h-[100vh] transition-all gap-1"
        childLeft={
          <Menu
            className="!hidden md:!flex"
            children={
              <Hint>Click reasoning to go to the reasoning route.</Hint>
            }
          />
        }
        centerBar={
          <Flex
            className={`${theme === "dark" ? "bg-[#171918]" : "border"} !flex-col justify-center items-center pt-2`}
          >
            <IconButton
              size="2"
              variant="soft"
              onClick={() => (location.href = "/ai")}
            >
              <CircleFadingPlusIcon />
            </IconButton>
          </Flex>
        }
        childRight={
          /* Chatbox Section */
          <Flex
            ref={messageBoxRef}
            className={`${theme === "dark" ? "bg-[#171918]" : "border"}  p-1 !flex w-[100%] md:!min-w-[70%] !overflow-auto`}
          >
            <span className="text-[0.6rem] text-gray-600 absolute top-1 left-1 z-20">
              Discern generated content!
            </span>
            <Chat
              highlightAxioms={() => {}}
              className="!w-full mx-auto sm:!w-[100%] md:!w-[90%]"
              scrollMessageBoxToBottom={scrollMessageBoxToBottom}
            />
          </Flex>
        }
      />
      {/* <Ereader /> */}
      <Ereader hidePicker={true} />
    </Flex>
  );
};

export default AI;
