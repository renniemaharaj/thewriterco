import {
  Button,
  Dialog,
  Flex,
  Select,
  Link,
  SegmentedControl,
  Popover,
  Separator,
  Tooltip,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import Ereader from "../../components/bible/Ereader";
import SideBar from "../../components/SideBar";
import Menu from "../../components/docs/Menu";
import { useThemeContext } from "../../components/context/theme/useThemeContext";
import Chat from "../../components/ai/Chat";
import {
  EllipsisVerticalIcon,
  FileCode2,
  FullscreenIcon,
  HomeIcon,
  MaximizeIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  clearMessages,
  setMessageBoxMode,
  setResponseConstraint,
} from "../../app/chat/chatSlice";
import fetchGitBlob, {
  templateRepoUrl,
} from "../../components/hooks/data/gitFetcher";
import { Helmet } from "react-helmet-async";
import { toggleFlowSlice } from "../../app/flow/flowSlice";
import Sizer from "../../components/page/Sizer";

const AI = () => {
  const { theme } = useThemeContext();

  const [summaryVisible, setSummaryVisible] = useState(false);

  const [authorValue, setAuthorValue] = useState("");

  const chatData = useSelector((state: RootState) => state.chat);
  // const { orientation } = chatData;

  const dispatch = useDispatch();

  const chatState = useSelector((state: RootState) => state.chat);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chatRef = useRef<any>(null);

  const messageBoxRef = useRef<HTMLDivElement>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<string>("default"); // Default to the first template

  const [templates, setTemplates] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const scrollMessageBoxToBottom = () => {
    messageBoxRef.current?.scrollTo({
      top: messageBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  async function fetchTemplateCatalogue() {
    fetchGitBlob(templateRepoUrl, "catalogue", "json")
      .then((content) => {
        const catalogue = JSON.parse(content);
        setTemplates(catalogue.templates);
      })
      .catch((error) => console.error(error));
  }

  async function getTemplateContent(template: string) {
    return fetchGitBlob(templateRepoUrl, template, "html")
      .then((content) => {
        return content;
      })
      .catch((error) => console.error(error));
  }

  function displaySummaizerDialog() {
    setSummaryVisible(true);
  }

  async function requestSummarizedDocument() {
    getTemplateContent(selectedTemplate).then((content) => {
      chatRef.current?.handleMessageSend(
        content + "\n" + getRequestInstructions(),
        false,
      );
    });
  }

  function getRequestInstructions() {
    const instructions = ` 
      -@here Please analyze conversation with the user and generate a document using the provided template.
      Include the following:
      1. A comprehensive summary of discussion
      2. The document formatted according to the template
      3. Clear instructions for:
         - Downloading the document
         - Saving it as study_name.html
         - Opening it in a browser
      
      Note: If conversation lacks substantial content, please:
      - Provide a brief overview of the template's purpose

      Ensure to respond through the appropriate schemas!

      Please add author: ${authorValue || "Anonymous"}.
      `;

    return instructions;
  }

  const PanelBar = (
    <Flex
      className={`${theme === "dark" ? "bg-[#171918]" : "border"} ${chatData.orientation === "horizontal" ? " pt-2 !flex-col" : "!flex-row !justify-center"}  !items-center gap-2 !p-1`}
    >
      <Sizer />
      {/* <Flex> */}
      <Tooltip content="go home">
        <IconButton
          variant="ghost"
          onClick={() => (location.href = "/")}
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
          size="2"
          variant="ghost"
          onClick={() => {
            {
              dispatch(clearMessages());
              dispatch(toggleFlowSlice());
            }
          }}
        >
          <Trash2Icon />
        </IconButton>
      </Tooltip>

      <Tooltip content="toggle ui">
        <IconButton
          size="2"
          variant="ghost"
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

      <Tooltip content="request study">
        <IconButton
          size="2"
          variant="ghost"
          onClick={() => displaySummaizerDialog()}
        >
          <FileCode2 />
        </IconButton>
      </Tooltip>
    </Flex>
  );

  useEffect(() => {
    fetchTemplateCatalogue();
  }, []);

  return (
    <Flex className="!w-[100vw] !flex-col merriweather-bold !p-0`">
      <Helmet>
        <title>{`TheWriterCo - AI`}</title>
        <meta
          name="description"
          content={"Study the bible with with TheWriterCo's AI and tools."}
        />
      </Helmet>
      {/* <BeforeHeader /> */}
      <SideBar
        variant="center"
        className="flex-col relative m-auto !w-[100vw] !h-[100vh] transition-all gap-1"
        orientation={chatData.orientation}
        childLeft={<Menu className="!hidden md:!flex" />}
        centerBar={PanelBar}
        childRight={
          /* Chatbox Section */
          <Flex
            ref={messageBoxRef}
            className={`${theme === "dark" ? "bg-[#171918]" : "border"} !flex w-[100%] md:!min-w-[70%] !h-[100vh] !overflow-auto`}
          >
            {/* <span className="text-[0.6rem] text-gray-600 absolute top-1 left-1 z-20">
              Discern generated content!
            </span> */}
            <Chat
              className="!w-full mx-auto sm:!w-[100%] md:!w-[90%]"
              scrollMessageBoxToBottom={scrollMessageBoxToBottom}
              ref={chatRef}
            />
          </Flex>
        }
      />
      {/* <Ereader /> */}
      <Ereader hidePicker={true} />
      {/* Summary Menu */}
      <Dialog.Root
        open={summaryVisible}
        onOpenChange={(open) => {
          setSummaryVisible(open);
        }}
      >
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Request Study Document</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Request a study based on your current conversation{" "}
            <Link href="/doc/studyDocument">Study Document</Link>
          </Dialog.Description>
          <Flex direction="column" gap="3">
            <Flex direction="column" gap="2">
              <Text as="label" size="2" mb="1" weight="bold">
                Select Template:
              </Text>
              <Select.Root
                value={selectedTemplate}
                onValueChange={(value) => setSelectedTemplate(value)}
              >
                <Select.Trigger />
                <Select.Content>
                  {templates.map((template) => (
                    <Tooltip key={template.id} content={template.description}>
                      <Select.Item
                        value={template.name.toString().toLowerCase()}
                      >
                        <Text size="2">{template.name}</Text>
                      </Select.Item>
                    </Tooltip>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>
            <TextField.Root
              placeholder="Author's Name"
              value={authorValue}
              onChange={(e) => setAuthorValue(e.target.value)}
            />
          </Flex>
          {/* </Hint> */}

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                onClick={() => {
                  requestSummarizedDocument();
                  setSummaryVisible(false);
                }}
              >
                Request
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
};

export default AI;
