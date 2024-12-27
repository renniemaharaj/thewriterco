import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import Hint from "../Hint";

export type Result = {
  book: string;
  title: string;
  verseNo: number;
  chapterNo: number;
  verse: string;
};
const SearchResults = ({
  displayResults,
  displayedResults,
  onOpenChange,
}: {
  displayResults: boolean;
  displayedResults: Result[];
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
        <Dialog.Title>Intelligent Matching</Dialog.Title>
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
                  {result.verseNo}:{result.chapterNo}
                </Text>
              </Flex>
            </Flex>
            <Text size="1" color="gray">
              {result.verse}
            </Text>
          </Flex>
        ))}

        <Hint className="max-w-[400px]">
          These results are generated. If search fails then you can either try
          again or fine tune your search query.
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
