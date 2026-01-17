import { Button, Card, Flex, IconButton, Separator, Switch, Tooltip } from "@radix-ui/themes";
import { BookDownIcon, BookUpIcon, DownloadIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSpeechEnabled, toggleOpenState } from "../../../../app/reader/readerSlice";
import type { RootState } from "../../../../app/store";
import { useContentReducers } from "../../../hooks/useContentReducers";
import useDownloader from "../../../hooks/useDownloader";
import Picker from "../../Picker";
import Voice from "../../Voice";

import { useAtomValue } from "jotai";
import { extraHeaderItemsAtom } from "../../../../app/_atoms/reader/atoms";
import {
  registerShortcut,
  unregisterShortcut,
  useGlobalShortcuts,
} from "../../../hooks/useGlobalShortcuts";
import Favorites from "../favorites/Favorites";

const Header = ({
  hidePicker,
  isOpen,
  routeTextContent,
  // onSpeechProgress,
}: {
  hidePicker: boolean;
  isOpen: boolean;
  routeTextContent?: string;
}) => {
  const reader = useSelector((state: RootState) => state.reader);

  const { download } = useDownloader();

  const [textContent, setTextContent] = useState<string>("");

  const [useBrowser] = useState<boolean>(true);
  const dispatch = useDispatch();

  const { narrate, navigateVerse } = useContentReducers();

  const extraHeaderItems = useAtomValue(extraHeaderItemsAtom);

  useEffect(() => {
    if (!reader.speechEnabled) return;
    const x = routeTextContent?.length;
    if (x) setTextContent(routeTextContent);
    if (!x) setTextContent(narrate()[0]);
  }, [routeTextContent, narrate, reader]);

  const onSpeechProgress = useCallback(() => {
    if (!reader.speechEnabled) return;
    navigateVerse("next");
  }, [reader, navigateVerse]);

  const displayHeaderClassName =
    "!gap-3 !p-2 !max-w-full !overflow-auto !flex !justify-center !items-center";

  const handleDownload = useCallback(() => {
    download(`${reader.eBook.title}.json`, JSON.stringify(reader.eBook, null, 2));
  }, [reader.eBook, download]);

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
    <Card className="!p-1">
      <Flex className={`${hidePicker && !isOpen ? "!hidden" : ""} ${displayHeaderClassName}`}>
        <Picker trigger={<Button variant="soft">{reader.eBook.title}</Button>} />
        <Separator orientation="vertical" size="2" />
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
            onCheckedChange={() => dispatch(setSpeechEnabled(!reader.speechEnabled))}
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

        <Tooltip content={`Download JSON - ${reader.eBook.title}`}>
          <IconButton onClick={handleDownload} aria-label="Download Book" variant="soft">
            <DownloadIcon />
          </IconButton>
        </Tooltip>

        <Tooltip content="Favorites">
          <Favorites />
        </Tooltip>
        {extraHeaderItems.length > 0 && <Separator orientation="vertical" className="my-auto" />}
        {extraHeaderItems}
      </Flex>
    </Card>
  );
};

export default Header;
