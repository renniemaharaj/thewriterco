import { Badge, Card, Flex, IconButton } from "@radix-ui/themes";
import { Block, Code } from "./types";
import { CopyIcon, DownloadIcon } from "lucide-react";
import MonacoEditor from "../MonacoEditor";

const Editor: React.FC<{ block: Block }> = ({ block }) => {
  return (
    <Card className="!p-3 w-full !rounded-xl !border-none !outline-none">
      <Flex className="!flex-row !gap-2 !mb-2 !justify-between">
        <Badge variant="soft" className="!mr-2">
          {(block.content as Code).filename}
        </Badge>
        <Flex className="!flex-row !gap-2 !mb-2">
          <IconButton
            variant="soft"
            size="1"
            onClick={() => {
              navigator.clipboard.writeText(
                (block.content as Code).codeContent,
              );
            }}
          >
            <CopyIcon className="scale-50" />
          </IconButton>
          <IconButton
            variant="soft"
            size="1"
            onClick={() => {
              const blob = new Blob([(block.content as Code).codeContent], {
                type: (block.content as Code).mimeType || "text/plain",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = (block.content as Code).filename;
              a.click();
            }}
          >
            <DownloadIcon className="scale-50" />
          </IconButton>
        </Flex>
      </Flex>
      <MonacoEditor
        language={(block.content as Code).language || "plaintext"}
        code={(block.content as Code).codeContent}
        height={(block.content as Code).editorHeight || 400}
        editable={false}
      />
    </Card>
  );
};

export default Editor;
