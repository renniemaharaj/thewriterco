import { Flex } from "@radix-ui/themes";
import Ereader from "../../components/bible/Ereader";
import SideBar from "../../components/SideBar";
import Menu from "../../components/docs/Menu";
import Hint from "../../components/Hint";
import { useThemeContext } from "../../components/context/theme/useThemeContext";
import Chat from "../../components/ai/Chat";

const AI = () => {
  const { theme } = useThemeContext();

  return (
    <Flex className="!w-full !flex-col merriweather-bold !p-0`">
      {/* <BeforeHeader /> */}
      <SideBar
        variant="right"
        className="flex-col !w-full relative m-auto !h-[100vh] transition-all"
        childLeft={<></>}
        centerBar={
          <Menu
            className="!hidden md:!flex"
            children={
              <Hint>Click reasoning to go to the reasoning route.</Hint>
            }
          />
        }
        childRight={
          /* Chatbox Section */
          <Flex
            className={`${theme === "dark" ? "bg-[#171918]" : "border"} p-2 !flex !flex-[5] !flex-col border-not-rounded`}
          >
            <Chat
              highlightAxioms={() => {}}
              className="sm:!w-[100%] md:!w-[85%] !p-0 mx-auto !rounded-none"
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
