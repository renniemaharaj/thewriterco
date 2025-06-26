/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Dialog, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { ScanText } from "lucide-react";
import { useDispatch } from "react-redux";
import { setContent } from "../../app/writer/writerSlice";
import { useCallback } from "react";
import { useTransitionNavigation } from "../hooks/useTransitionNavigation";

const Edit = ({ content }: { content: any }) => {
  const dispatch = useDispatch();
  const { navigateWT } = useTransitionNavigation();
  const copyAndLaunch = useCallback(() => {
    dispatch(setContent(content));
    navigateWT("/writer");
  }, [content, dispatch, navigateWT]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton
          variant="soft"
          className="!absolute !bottom-1 !left-1 !z-10"
        >
          <Tooltip content="Copy Document">
            <ScanText />
          </Tooltip>
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Copy Document</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Copy and launch this document in the online writer? This will clear
          any unsaved work.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="soft" onClick={copyAndLaunch}>
              Confirm
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Edit;
