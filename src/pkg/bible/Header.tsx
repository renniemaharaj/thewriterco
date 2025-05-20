import { BookDownIcon, BookUpIcon, DownloadIcon } from "lucide-react";
import { toggleOpenState } from "../../app/ereader/ereaderSlice";
import Picker from "./Picker";
import { Button, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Voice from "./Voice";
import { RootState } from "../../app/store";
import { useContentReducers } from "../hooks/useContentReducers";
import useDownloader from "../hooks/useDownloader";

const Header = ({
  hidePicker,
  isOpen,
  routeTextContent,
  // onSpeechProgress,
}: {
  hidePicker: boolean;
  isOpen: boolean;
  routeTextContent?: string[];
  onSpeechProgress: (i: number) => void;
}) => {
  const eReaderState = useSelector((state: RootState) => state.ereader);
  const elevenLabs = useSelector((state: RootState) => state.elevenLabs);
  const elevenLabsActive = elevenLabs.enabled;

  const { download } = useDownloader();

  const [textContent, setTextContent] = useState<string[]>([]);

  const [useBrowser, setUseBrowser] = useState<boolean>(true);
  const dispatch = useDispatch();

  const { narrate, navigateVerse } = useContentReducers();

  useEffect(() => {
    const x = routeTextContent?.length;
    if (x) setTextContent(routeTextContent);
    if (!x) setTextContent(narrate().slice(0, 1));
  }, [routeTextContent, narrate]);

  const onSpeechProgress = () => {
    navigateVerse("next");
  };

  useEffect(() => {
    setUseBrowser(!elevenLabsActive);
  }, [elevenLabsActive]);

  const displayHeaderClassName =
    "!gap-2 !p-2 !max-w-full overflow-auto !flex !justify-center !items-center !border-b";

  const handleDownload = useCallback(() => {
    download(
      `${eReaderState.eContent.title}.json`,
      JSON.stringify(eReaderState.eContent, null, 2),
    );
  }, [eReaderState.eContent, download]);

  return (
    <Flex
      className={`${hidePicker && !isOpen ? "!hidden" : ""} ${displayHeaderClassName}`}
    >
      <Picker
        trigger={<Button variant="soft">{eReaderState.eContent.title}</Button>}
      />
      <Tooltip content={`Download JSON - ${eReaderState.eContent.title}`}>
        <IconButton
          onClick={handleDownload}
          aria-label="Download Book"
          variant="soft"
        >
          <DownloadIcon />
        </IconButton>
      </Tooltip>

      <Tooltip content="Toggle Ereader">
        <IconButton
          onClick={() => dispatch(toggleOpenState())}
          aria-label="Toggle Ereader"
          variant="soft"
        >
          {isOpen ? <BookDownIcon /> : <BookUpIcon />}
        </IconButton>
      </Tooltip>

      {/* Pass the whole array at once */}
      <Voice
        defaultModel={useBrowser}
        textContent={textContent}
        onSpeechProgress={onSpeechProgress}
      />
    </Flex>
  );
};

export default Header;
