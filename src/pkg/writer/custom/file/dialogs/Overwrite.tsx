import { Button, Dialog, Flex } from "@radix-ui/themes";

const Overwrite = ({
  confirmUpload,
  showUploadConfirm,
  setShowUploadConfirm,
}: {
  confirmUpload: () => void;
  showUploadConfirm: boolean;
  setShowUploadConfirm: (v: boolean) => void;
}) => {
  return (
    <Dialog.Root open={showUploadConfirm} onOpenChange={setShowUploadConfirm}>
      <Dialog.Content>
        <Dialog.Title>Upload Document</Dialog.Title>
        <Dialog.Description>Overwrite your current work?</Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={() => setShowUploadConfirm(false)}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="solid" color="blue" onClick={confirmUpload}>
              Upload
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Overwrite;
