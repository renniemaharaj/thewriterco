import { BookDownIcon, BookUpIcon } from "lucide-react";
import { toggleOpenState } from "../../app/ereader/ereaderSlice";
import Picker from "./Picker";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { useDispatch } from "react-redux";
// import VoiceReader from "./VoiceReader";
// import { RootState } from "../../app/store";
// import { useCallback } from "react";

const Renderer = ({
  hidePicker,
  // override,
  // setOverride,
  isOpen,
  title,
}: {
  override?: string;
  setOverride?: (override: string) => void;
  elevenLabsPowered: boolean;
  hidePicker: boolean;
  isOpen: boolean;
  title: string;
}) => {
  // const content = useSelector(
  //   (state: RootState) => state.ereader.eContent.content
  // );

  // const readerContent = useCallback((): string => {
  //   if (typeof content === "string") {
  //     return content;
  //   } else {
  //     return Object.values(content)
  //       .flatMap((chapter) => Object.values(chapter))
  //       .join(" ");
  //   }
  // }, [content]);

  const dispatch = useDispatch();

  return (
    <Flex
      className={`${hidePicker && !isOpen ? "!hidden" : ""} !gap-2 !p-2 !max-w-full overflow-auto !flex !justify-center !items-center !border-b`}
    >
      <Picker trigger={<Button variant="soft">{title}</Button>} />
      <IconButton
        onClick={() => dispatch(toggleOpenState())}
        aria-label="Toggle Ereader"
        variant="soft"
      >
        {isOpen ? <BookDownIcon /> : <BookUpIcon />}
      </IconButton>

      {/* <VoiceReader
        override={override}
        value={readerContent()}
        setOverride={setOverride}
      /> */}
    </Flex>
  );
};

export default Renderer;
