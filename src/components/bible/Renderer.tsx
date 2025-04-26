import { BookDownIcon, BookUpIcon } from "lucide-react";
import { toggleOpenState } from "../../app/ereader/ereaderSlice";
import Picker from "./Picker";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import VoiceReader from "./VoiceReader";
import { RootState } from "../../app/store";
import { useCallback } from "react";

const Renderer = ({
  hidePicker,
  override,
  setOverride,
  isOpen,
  title,
}: {
  override?: string;
  setOverride?: (override: string) => void;
  hidePicker: boolean;
  isOpen: boolean;
  title: string;
}) => {
  const content = useSelector(
    (state: RootState) => state.ereader.eContent.content,
  );

  // Function to get the content for the reader, is a callback to avoid unnecessary re-renders
  // and to ensure that the content is only recalculated when the content changes
  const readerContent = useCallback((): string => {
    if (typeof content === "string") {
      return content;
    } else {
      return Object.values(content)
        .flatMap((chapter) => Object.values(chapter))
        .join(" ");
    }
  }, [content]);

  const dispatch = useDispatch();

  return (
    <Flex
      className={`${hidePicker && !isOpen ? "!hidden" : ""} !gap-2 !p-2 !max-w-full overflow-auto !flex !justify-center !items-center !border-b`}
    >
      {/* Picker component to select different books */}
      <Picker trigger={<Button variant="soft">{title}</Button>} />
      {/* Button to toggle the open state of the Ereader */}
      <IconButton
        onClick={() => dispatch(toggleOpenState())}
        aria-label="Toggle Ereader"
        variant="soft"
      >
        {isOpen ? <BookDownIcon /> : <BookUpIcon />}
      </IconButton>

      {/* VersePlayer component to play the selected verse */}
      <VoiceReader
        override={override}
        value={readerContent()}
        setOverride={setOverride}
      />
    </Flex>
  );
};

export default Renderer;
