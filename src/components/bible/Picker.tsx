import { Button, Dialog, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import Bible from "./Bible";
import { EBook } from "../../app/ereader/types";
import { setEBook, setRenderStyle } from "../../app/ereader/ereaderSlice";
import { useDispatch } from "react-redux";

const Picker = ({ trigger }: { trigger: ReactNode }) => {
  const dispatch = useDispatch();
  const setEreaderState = (eBook: EBook) => {
    dispatch(setEBook(eBook));
    dispatch(setRenderStyle("bible"));
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content
        aria-describedby="Explore the various districts of the Holy Bible KJV"
        maxWidth="450px"
      >
        <Dialog.Title>
          Explore the various districts of the Holy Bible KJV
        </Dialog.Title>
        <Flex direction="column" gap="3">
          <Bible asChild showAnimation={false} setEBook={setEreaderState} />
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button>Close</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Picker;
