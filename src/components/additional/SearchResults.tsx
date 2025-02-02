import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import Hint from "../Hint";
import { Scripture } from "./NavBar";

// export type Result = {
//   book: string;
//   title: string;
//   verseNo: number;
//   chapterNo: number;
//   verse: string;
// };
const SearchResults = ({
  displayResults,
  displayedResults,
  onOpenChange,
}: {
  displayResults: boolean;
  displayedResults: Scripture[];
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog.Root
      open={displayResults}
      onOpenChange={(value) => {
        onOpenChange(value);
      }}
    >
      <Dialog.Content maxWidth="450px" className="max-h-full overflow-auto">
        <Dialog.Title>Contextual, Relative Matching</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {!displayedResults.length
            ? "Something went wrong, please provide a clear request or try again."
            : "Showing results from the model."}
        </Dialog.Description>

        {displayedResults.map((result, index) => (
          <Flex key={index} direction="column" gap="2" className="mb-4">
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
          search fails then you can either try again after 30 seconds, and or
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
