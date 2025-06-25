import { BookDownIcon, BookUpIcon, DownloadIcon } from "lucide-react";
import {
  setSpeechEnabled,
  toggleOpenState,
} from "../../../app/ereader/ereaderSlice";
import Picker from "../Picker";
import { Button, Flex, IconButton, Switch, Tooltip } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Voice from "../Voice";
import { RootState } from "../../../app/store";
import { useContentReducers } from "../../hooks/useContentReducers";
import useDownloader from "../../hooks/useDownloader";

import {
  useGlobalShortcuts,
  registerShortcut,
  unregisterShortcut,
} from "../../hooks/useGlobalShortcuts";

const Header = ({
  hidePicker,
  isOpen,
  routeTextContent,
  // onSpeechProgress,
}: {
  hidePicker: boolean;
  isOpen: boolean;
  routeTextContent?: string[];
  // onSpeechProgress: (i: number) => void;
}) => {
  const reader = useSelector((state: RootState) => state.ereader);

  const { download } = useDownloader();

  const [textContent, setTextContent] = useState<string[]>([]);

  const [useBrowser] = useState<boolean>(true);
  const dispatch = useDispatch();

  const { narrate, navigateVerse } = useContentReducers();

  useEffect(() => {
    if (!reader.speechEnabled) return;
    const x = routeTextContent?.length;
    if (x) setTextContent(routeTextContent);
    if (!x) setTextContent(narrate().slice(0, 1));
  }, [routeTextContent, narrate, reader]);

  const onSpeechProgress = useCallback(() => {
    if (!reader.speechEnabled) return;
    navigateVerse("next");
  }, [reader, navigateVerse]);

  const displayHeaderClassName =
    "!gap-2 !p-2 !max-w-full overflow-auto !flex !justify-center !items-center !border-b";

  const handleDownload = useCallback(() => {
    download(
      `${reader.eContent.title}.json`,
      JSON.stringify(reader.eContent, null, 2),
    );
  }, [reader.eContent, download]);

  useGlobalShortcuts(); // Mount global listener once

  useEffect(() => {
    const toggleSpeech = {
      key: "V",
      action: (e: KeyboardEvent) => {
        if (reader.isOpen) {
          dispatch(setSpeechEnabled(!reader.speechEnabled));
          e.preventDefault();
        }
      },
    };

    registerShortcut(toggleSpeech);

    return () => {
      unregisterShortcut(toggleSpeech);
    };
  }, [navigateVerse, reader, dispatch]);

  return (
    <Flex
      className={`${hidePicker && !isOpen ? "!hidden" : ""} ${displayHeaderClassName}`}
    >
      <Picker
        trigger={<Button variant="soft">{reader.eContent.title}</Button>}
      />

      <Tooltip content="Toggle Ereader">
        <IconButton
          onClick={() => dispatch(toggleOpenState())}
          aria-label="Toggle Ereader"
          variant="soft"
        >
          {isOpen ? <BookDownIcon /> : <BookUpIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip content="Speech | ⌘ V">
        <Switch
          size="1"
          checked={reader.speechEnabled}
          onCheckedChange={() =>
            dispatch(setSpeechEnabled(!reader.speechEnabled))
          }
          variant="soft"
          className={`${!reader.speechEnabled && "!animate-pulse"}`}
        />
      </Tooltip>

      {/* Pass the whole array at once */}
      <Voice
        defaultModel={useBrowser}
        textContent={textContent}
        onSpeechProgress={onSpeechProgress}
      />

      <Tooltip content={`Download JSON - ${reader.eContent.title}`}>
        <IconButton
          onClick={handleDownload}
          aria-label="Download Book"
          variant="soft"
        >
          <DownloadIcon />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default Header;
