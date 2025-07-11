import { Badge, Card, Flex, IconButton } from "@radix-ui/themes";
import { Block, Code } from "./types";
import { CopyIcon, DownloadIcon } from "lucide-react";
import MonacoEditor from "../MonacoEditor";
import { useCallback } from "react";
import useDownloader from "../hooks/useDownloader";
import useCopy from "../hooks/useCopy";

const Editor: React.FC<{ block: Block }> = ({ block }) => {
  const { download } = useDownloader();
  const { copyText } = useCopy();

  const handleDownload = useCallback(() => {
    const file = block.content as Code;
    download(file.filename, file.codeContent, file.mimeType);
  }, [block, download]);

  const handleCopy = useCallback(() => {
    copyText((block.content as Code).codeContent);
  }, [block, copyText]);

  return (
    <Card className="!p-3 w-full !rounded-xl !border-none !outline-none">
      <Flex className="!flex-row !gap-2 !mb-2 !justify-between">
        <Badge variant="soft" className="!mr-2">
          {(block.content as Code).filename}
        </Badge>
        <Flex className="!flex-row !gap-2 !mb-2">
          <IconButton variant="soft" size="1" onClick={handleCopy}>
            <CopyIcon className="scale-50" />
          </IconButton>
          <IconButton variant="soft" size="1" onClick={handleDownload}>
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
