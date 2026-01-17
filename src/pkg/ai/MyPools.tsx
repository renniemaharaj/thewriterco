import { Button, Dialog, Flex, Separator } from "@radix-ui/themes";
import { memo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import Collapsible from "../Collapsible";
import Form from "./Form";
import Model from "./Model";

const MyPools = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const chatData = useSelector((state: RootState) => state.chat);
  return (
    <Dialog.Root open={open} onOpenChange={open => setOpen(open)}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your pools
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {chatData.models?.map(model => (
            <Collapsible title="Pool 1" children={<Model model={model} />} />
          ))}
          <Separator size={"4"} className="my-2" />

          <Form />
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default memo(MyPools);
