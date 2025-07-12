import {
  Flex,
  IconButton,
  Popover,
  Tooltip,
  Text,
  Separator,
  SegmentedControl,
} from "@radix-ui/themes";
import {
  EllipsisVerticalIcon,
  FileCode2,
  HomeIcon,
  Trash2Icon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setResponseConstraint, clearMessages } from "../../app/chat/chatSlice";
import { RootState } from "../../app/store";
import { useOrientation } from "../../pkg/hooks/useOrientation";
import { useTransitionNavigation } from "../../pkg/hooks/useTransitionNavigation";
import Summary from "./Summary";
import { useState } from "react";
import useCustomBG from "../../pkg/page/hooks/useCustomBG";

const Panel = ({ scrollHandler }: { scrollHandler: () => void }) => {
  const [summaryVisible, setSummaryVisible] = useState(false);
  const chatState = useSelector((state: RootState) => state.chat);
  const orientation = useOrientation();
  const { customBG } = useCustomBG();
  const { navigateWT } = useTransitionNavigation();
  const dispatch = useDispatch();
  function displaySummaizerDialog() {
    setSummaryVisible(true);
  }
  return (
    <Flex
      className={`${customBG} ${orientation === "horizontal" ? " pt-2 !flex-col" : "!flex-row !justify-center"}  !items-center gap-3 !p-3`}
    >
      <Summary
        summaryVisible={summaryVisible}
        setSummaryVisible={setSummaryVisible}
        scrollHandler={scrollHandler}
      />
      {/* <Flex> */}
      <Tooltip content="go home">
        <IconButton
          variant="ghost"
          onClick={() => navigateWT("/")}
          aria-label="Go to Home"
        >
          <HomeIcon />
        </IconButton>
      </Tooltip>

      <Popover.Root>
        <Popover.Trigger>
          <IconButton variant="ghost">
            <EllipsisVerticalIcon className="scale-75" />
          </IconButton>
        </Popover.Trigger>
        <Popover.Content>
          <Text className="!w-full !text-center text-sm">Response Length</Text>
          <Separator size="4" className="!my-2" />
          <Flex gap="3">
            <SegmentedControl.Root
              variant="classic"
              size={"2"}
              defaultValue={chatState.responseConstraint}
              // defaultValue={responseConstraint}
            >
              <SegmentedControl.Item
                value="shorter"
                // onClick={() => setResponseConstraint("shorter")}
                onClick={() => dispatch(setResponseConstraint("shorter"))}
              >
                <Tooltip content="Shorter responses, best for quick replies">
                  <Text>1</Text>
                </Tooltip>
              </SegmentedControl.Item>

              <SegmentedControl.Item
                value="short"
                // onClick={() => setResponseConstraint("short")}
                onClick={() => dispatch(setResponseConstraint("short"))}
              >
                <Tooltip content="Short responses, great for quick replies">
                  <Text>2</Text>
                </Tooltip>
              </SegmentedControl.Item>

              <SegmentedControl.Item
                value="detailed"
                // onClick={() => setResponseConstraint("detailed")}
                onClick={() => dispatch(setResponseConstraint("detailed"))}
              >
                <Tooltip content="Regular responses, best for detailed replies">
                  <Text>3</Text>
                </Tooltip>
              </SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>
        </Popover.Content>
      </Popover.Root>

      {/* </Flex> */}
      <Tooltip content="delete chat">
        <IconButton
          size="3"
          variant="ghost"
          onClick={() => {
            {
              dispatch(clearMessages());
            }
          }}
        >
          <Trash2Icon />
        </IconButton>
      </Tooltip>

      <Tooltip content="request study">
        <IconButton
          size="3"
          variant="ghost"
          onClick={() => displaySummaizerDialog()}
        >
          <FileCode2 />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default Panel;
