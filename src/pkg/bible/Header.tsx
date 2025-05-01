import { BookDownIcon, BookUpIcon } from "lucide-react";
import { toggleOpenState } from "../../app/ereader/ereaderSlice";
import Picker from "./Picker";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Voice from "./Voice";
import { RootState } from "../../app/store";
import ElevenLabs from "../voice/ElevenLabs";
import { useContentReducers } from "../hooks/useContentReducers";

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

  return (
    <Flex
      className={`${hidePicker && !isOpen ? "!hidden" : ""} ${displayHeaderClassName}`}
    >
      <Picker
        trigger={<Button variant="soft">{eReaderState.eContent.title}</Button>}
      />

      <IconButton
        onClick={() => dispatch(toggleOpenState())}
        aria-label="Toggle Ereader"
        variant="soft"
      >
        {isOpen ? <BookDownIcon /> : <BookUpIcon />}
      </IconButton>

      {/* Pass the whole array at once */}
      <Voice
        defaultModel={useBrowser}
        textContent={textContent}
        onSpeechProgress={onSpeechProgress}
      />

      <ElevenLabs trigger={<Button variant="soft">ElevenLabs</Button>} />
    </Flex>
  );
};

export default Header;
