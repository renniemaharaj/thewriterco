import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import Ereader from "../../components/bible/Ereader";
import SideBar from "../../components/SideBar";
import Menu from "../../components/docs/Menu";
import Hint from "../../components/Hint";
import { useThemeContext } from "../../components/context/theme/useThemeContext";
import Chat from "../../components/ai/Chat";
import {
  CircleFadingPlusIcon,
  FullscreenIcon,
  MaximizeIcon,
  SparkleIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setMessageBoxMode } from "../../app/chat/chatSlice";
import { summaryTemplate } from "./template";

const AI = () => {
  const { theme } = useThemeContext();

  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );

  const dispatch = useDispatch();

  const chatState = useSelector((state: RootState) => state.chat);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chatRef = useRef<any>(null);

  const messageBoxRef = useRef<HTMLDivElement>(null);

  const scrollMessageBoxToBottom = () => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  function getSummarizeInstructions() {
    return (
      summaryTemplate +
      "\n" +
      "-@here Please summarize this conversation and generate the presented document using the attached template." +
      "\n" +
      "-@here In addition to the template, please include instructions on how to use the document, download, save as study_name.html, and open in a browser."
    );
  }

  const PanelBar = (
    <Flex
      className={`${theme === "dark" ? "bg-[#171918]" : "border"} ${orientation === "horizontal" ? " pt-2 !flex-col" : "!flex-row !justify-center"}   !items-center gap-2`}
    >
      <Tooltip content="Start a new conversation">
        <IconButton
          size="2"
          variant="soft"
          onClick={() => (location.href = "/ai")}
        >
          <CircleFadingPlusIcon />
        </IconButton>
      </Tooltip>

      <Tooltip content="Toggle input visibility">
        <IconButton
          size="2"
          variant="soft"
          onClick={() =>
            dispatch(
              setMessageBoxMode(
                chatState.messageBoxMode === "hidden" ? "visible" : "hidden",
              ),
            )
          }
        >
          {chatState.messageBoxMode === "hidden" ? (
            <MaximizeIcon />
          ) : (
            <FullscreenIcon />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip content="Request summarized document">
        <IconButton
          size="2"
          variant="soft"
          onClick={() =>
            chatRef.current?.handleMessageSend(
              getSummarizeInstructions(),
              false,
            )
          }
        >
          <SparkleIcon />
        </IconButton>
      </Tooltip>
    </Flex>
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].contentRect.width < 768) {
        setOrientation("vertical");
      } else {
        setOrientation("horizontal");
      }
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Flex className="!w-[100vw] !flex-col merriweather-bold !p-0`">
      {/* <BeforeHeader /> */}
      <SideBar
        variant="center"
        className="flex-col relative m-auto !w-[100vw] !h-[100vh] transition-all gap-1"
        orientation={orientation}
        childLeft={
          <Menu
            className="!hidden md:!flex"
            children={
              <Hint>Click reasoning to go to the reasoning route.</Hint>
            }
          />
        }
        centerBar={PanelBar}
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
              ref={chatRef}
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
