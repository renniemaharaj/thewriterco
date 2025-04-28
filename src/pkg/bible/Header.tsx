import { BookDownIcon, BookUpIcon } from "lucide-react";
import { toggleOpenState } from "../../app/ereader/ereaderSlice";
import Picker from "./Picker";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import Voice from "./Voice";
import { RootState } from "../../app/store";
import ElevenLabs from "../voice/ElevenLabs";

const Header = ({
  hidePicker,
  isOpen,
  routeTextContent,
}: {
  hidePicker: boolean;
  isOpen: boolean;
  routeTextContent: string;
}) => {
  const eReaderState = useSelector((state: RootState) => state.ereader);
  const elevenLabs = useSelector((state: RootState) => state.elevenLabs);
  const elevenLabsActive = elevenLabs.enabled;

  const [useBrowser, setUseBrowser] = useState<boolean>(true);
  const [textContent, setTextContent] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    setUseBrowser(!elevenLabsActive);
  }, [elevenLabsActive]);

  // 🚀 Memoized version of NarratedContent — only recalculates when eReaderState.eContent changes
  const narratedContent = useMemo(() => {
    const content = eReaderState.eContent.content;
    if (typeof content === "string") return content;
    return Object.values(content)
      .flatMap((chapter) => Object.values(chapter))
      .join(" ");
  }, [eReaderState.eContent]);

  useEffect(() => {
    if (routeTextContent.trim() !== "") {
      setTextContent(routeTextContent);
    } else {
      setTextContent(narratedContent);
    }
  }, [routeTextContent, narratedContent]);

  const displayHeaderClassName =
    "!gap-2 !p-2 !max-w-full overflow-auto !flex !justify-center !items-center !border-b";

  return (
    <Flex
      className={`${hidePicker && !isOpen ? "!hidden" : ""} ${displayHeaderClassName}`}
    >
      {/* Bible picker */}
      <Picker
        trigger={<Button variant="soft">{eReaderState.eContent.title}</Button>}
      />

      {/* Toggle */}
      <IconButton
        onClick={() => dispatch(toggleOpenState())}
        aria-label="Toggle Ereader"
        variant="soft"
      >
        {isOpen ? <BookDownIcon /> : <BookUpIcon />}
      </IconButton>

      {/* Voice */}
      <Voice defaultModel={useBrowser} textContent={textContent} />
      <ElevenLabs trigger={<Button variant="soft">ElevenLabs</Button>} />
    </Flex>
  );
};

export default Header;
