import { IconButton, Tooltip } from "@radix-ui/themes";
import { BookTextIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
  setOpenState,
} from "../../../app/reader/readerSlice";
import useBible from "../../hooks/useBible";
import type { Verse as WVerse } from "../types";

const Verse = ({ verse }: { verse: WVerse }) => {
  const { handleBookOpen } = useBible();
  const dispatch = useDispatch();

  return (
    <Tooltip content={verse.verseContent}>
      <IconButton
        variant="ghost"
        size="1"
        className="animate-pulse !font-bold "
        onClick={() => {
          handleBookOpen(verse.book);
          dispatch(setGlobalCurrentChapter(verse.chapterNo));
          dispatch(setGlobalCurrentVerse(verse.verseNo));
          setTimeout(() => dispatch(setOpenState(true)), 100);
        }}
      >
        <BookTextIcon />
        {"-"} {verse.book} {verse.chapterNo} {" : "}
        {verse.verseNo}
      </IconButton>
    </Tooltip>
  );
};

export default Verse;
