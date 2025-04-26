import { Button, Dialog, Flex } from "@radix-ui/themes";
import Hint from "../Hint";
import { Block } from "./types";

import Message from "./Message";

const SearchResults = ({
  displayResults,
  block,
  onOpenChange,
}: {
  displayResults: boolean;
  block: Block;
  onOpenChange: (open: boolean) => void;
}) => {
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
          {!block
            ? "Something went wrong, please provide a clear request or try again."
            : "Showing results from the model."}
        </Dialog.Description>

        <Message block={block} />

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
