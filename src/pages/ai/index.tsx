import { Flex } from "@radix-ui/themes";
import Reader from "../../pkg/bible/reader/Reader";
import SideBar from "../../pkg/SideBar";
import ChatBox from "../../pkg/ai/ChatBox";
import Panel from "./Panel";
import { useRef } from "react";
import { useOrientation } from "../../pkg/hooks/useOrientation";
import Seo from "../../pkg/page/Seo";
import Wrap from "./Wrap";

const Index = () => {
  const orientation = useOrientation();

  const messageBoxRef = useRef<HTMLDivElement>(null);

  const scrollHandler = () => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Flex className="!w-[100vw] !flex-col merriweather-bold !p-0`">
      <Seo
        title="TheWriterCo - AI"
        description="Study the bible with with TheWriterCo's AI and tools"
      />
      <SideBar
        variant="center"
        className="flex-col relative m-auto !w-[100vw] !max-w-[800px] !h-[100vh] transition-all gap-1"
        orientation={orientation}
        childLeft={<></>}
        centerBar={<Panel scrollHandler={scrollHandler} />}
        childRight={
          <Wrap ref={messageBoxRef}>
            <ChatBox
              className="!w-full mx-auto sm:!w-[100%] md:!w-[90%]"
              scrollHandler={scrollHandler}
            />
          </Wrap>
        }
      />
      <Reader hidePicker={true} />
    </Flex>
  );
};

export default Index;
