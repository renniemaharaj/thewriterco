import { BookDownIcon, BookUpIcon } from "lucide-react";
import { toggleOpenState } from "../../app/ereader/ereaderSlice";
import Picker from "./Picker";
import { Button, IconButton } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import VoiceReader from "./VoiceReader";
import { RootState } from "../../app/store";
import { useCallback } from "react";

const Renderer = ({
  hidePicker,
  override,
  isOpen,
  title,
}: {
  override?: string;
  hidePicker: boolean;
  isOpen: boolean;
  title: string;
}) => {
  const eReaderState = useSelector((state: RootState) => state.ereader);

  const content = eReaderState.eContent.content;

  const readerContent = useCallback((): string => {
    if (override) {
      return override;
    }
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
    <div
      className={`${hidePicker && !isOpen ? "!hidden" : ""} flex justify-center gap-2 items-center p-4 border-b`}
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
      <VoiceReader value={readerContent()} />
    </div>
  );
};

export default Renderer;
