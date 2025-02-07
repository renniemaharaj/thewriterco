import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import Hint from "../Hint";
// import { Scripture } from "./NavBar";
import fetchGitBlob from "./articles/utils/bible/gitgetter";
import { Verse } from "./ChristianAI/types";

import {
  setEBook,
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
  setOpenState,
  setRenderStyle,
} from "../../app/ereader/ereaderSlice";
import { EBook } from "../../app/ereader/types";
import { useDispatch } from "react-redux";

const SearchResults = ({
  displayResults,
  displayedResults,
  onOpenChange,
}: {
  displayResults: boolean;
  displayedResults: Verse[];
  onOpenChange: (open: boolean) => void;
}) => {
  const dispatch = useDispatch();
  return (
    <Dialog.Root
      open={displayResults}
      onOpenChange={(value) => {
        onOpenChange(value);
      }}
    >
      <Dialog.Content maxWidth="450px" className="max-h-[400px]  overflow-auto">
        <Dialog.Title>Contextual, Relative Matching</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {!displayedResults.length
            ? "Something went wrong, please provide a clear request or try again."
            : "Showing results from the model."}
        </Dialog.Description>

        {displayedResults.map((result, index) => (
          <Flex
            key={index}
            direction="column"
            gap="2"
            className="mb-4 cursor-pointer hover:animate-pulse"
            onClick={() => {
              fetchGitBlob((result as Verse).book).then((content) => {
                dispatch(
                  setEBook({
                    title: (result as Verse).book,
                    content: JSON.parse(content),
                    date: new Date().toDateString(),
                  } as EBook),
                );
                dispatch(setRenderStyle("bible"));
                dispatch(
                  setGlobalCurrentChapter(
                    (result as Verse).chapterNo.toString(),
                  ),
                );
                dispatch(
                  setGlobalCurrentVerse((result as Verse).verseNo.toString()),
                );
                setTimeout(() => dispatch(setOpenState(true)), 100);
              });
            }}
          >
            <Flex justify="between">
              <Flex className="!flex-row">
                <Text size="2" weight="bold">
                  {result.book}-
                </Text>
                <Text size="2" weight="bold">
                  {result.chapterNo}:{result.verseNo}
                </Text>
              </Flex>
            </Flex>
            <Text size="1" color="gray">
              {result.verseContent}
            </Text>
          </Flex>
        ))}

        <Hint className="max-w-[400px]">
          These results are generated and are subject to rate-limiting. If
          search fails then you can either try again after 15 seconds, and or
          fine tune your search query.
        </Hint>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SearchResults;
