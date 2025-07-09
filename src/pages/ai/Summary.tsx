import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import fetchGitBlob from "../../pkg/hooks/data/useFetchGitBlob";
import { templateRepoPath } from "../../pkg/hooks/data/presets";
import getRequestInstructions from "./utils";

const Summary = ({
  summaryVisible,
  setSummaryVisible,
  chatRef,
}: {
  summaryVisible: boolean;
  setSummaryVisible: (v: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chatRef: React.MutableRefObject<any>;
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default"); // Default to the first template
  const [authorValue, setAuthorValue] = useState("");
  const [templates, setTemplates] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  async function fetchTemplateCatalogue() {
    fetchGitBlob(templateRepoPath, "/main/catalogue", "json")
      .then((content) => {
        const catalogue = JSON.parse(content);
        setTemplates(catalogue.templates);
      })
      .catch((error) => console.error(error));
  }

  async function getTemplateContent(template: string) {
    return fetchGitBlob(templateRepoPath, `/main/${template}`, "html")
      .then((content) => {
        return content;
      })
      .catch((error) => console.error(error));
  }

  async function requestSummarizedDocument() {
    getTemplateContent(selectedTemplate).then((content) => {
      chatRef.current?.handleMessageSend(
        content + "\n" + getRequestInstructions(authorValue),
        false,
      );
    });
  }

  useEffect(() => {
    fetchTemplateCatalogue();
  }, []);
  return (
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
                    <Select.Item value={template.name.toString().toLowerCase()}>
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
  );
};

export default Summary;
