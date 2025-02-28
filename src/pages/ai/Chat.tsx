import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Tooltip,
  Text,
  Select,
} from "@radix-ui/themes";
import Ereader from "../../components/bible/Ereader";
import SideBar from "../../components/SideBar";
import Menu from "../../components/docs/Menu";
import Hint from "../../components/Hint";
import { useThemeContext } from "../../components/context/theme/useThemeContext";
import Chat from "../../components/ai/Chat";
import {
  CircleFadingPlusIcon,
  FileCode2,
  FullscreenIcon,
  MaximizeIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setMessageBoxMode } from "../../app/chat/chatSlice";
import fetchGitBlob, {
  templateRepoUrl,
} from "../../components/hooks/data/gitFetcher";
import Collapsible from "../../components/Collapsible";

const AI = () => {
  const { theme } = useThemeContext();

  const [summaryVisible, setSummaryVisible] = useState(false);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );

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
        -@here Please summarize this conversation and generate the presented document using the attached template.
        "-@here In addition to the template, please include instructions on how to use the document, download file from code block interface editor, or copy code directly, save as study_name.html, and open in a browser.
        "-@here If there was little to no conversation, please provide a brief summary of the template and its intended use. Please decline or ask to confirm if the conversation has little to no content.
        `;

    return instructions;
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

      <Tooltip content="Request web page study on current conversation">
        <IconButton
          size="2"
          variant="soft"
          onClick={() => displaySummaizerDialog()}
        >
          <FileCode2 />
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

  useEffect(() => {
    fetchTemplateCatalogue();
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
            Request a study based on your current conversation
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

            {/* <Hint> */}
            <Collapsible title="Important">
              <Flex direction="column" className="text-white pl-5 space-y-2">
                <Text size={"1"}>
                  Ensure your conversation is complete before requesting. The
                  document will be generated as a static web page
                </Text>
                <Text size={"1"}>
                  You can download and open the file directly in your browser.
                </Text>
              </Flex>
            </Collapsible>
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
