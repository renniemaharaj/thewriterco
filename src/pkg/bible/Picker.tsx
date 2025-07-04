import { Button, Dialog, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import Bible from "./Bible";

const Picker = ({ trigger }: { trigger: ReactNode }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content
        aria-describedby="Explore the various districts of the Holy Bible KJV"
        maxWidth="450px"
      >
        <Dialog.Title className="w-full text-center">
          Holy Bible KJV
        </Dialog.Title>
        <Flex direction="column" gap="3">
          <Bible asChild showAnimation={false} />
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
