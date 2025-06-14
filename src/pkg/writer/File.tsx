/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Flex,
  Popover,
  Text,
  Dialog,
  TextField,
} from "@radix-ui/themes";
import {
  ChevronDown,
  DownloadCloud,
  FolderHeart,
  UploadCloud,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useCallback, useEffect, useRef, useState } from "react";
import useDownloader from "../hooks/useDownloader";
import { saveToLocalStorage, setContent } from "../../app/writer/writerSlice";
import Hint from "../Hint";
import useLocalStorage from "../hooks/useLocalStorage";

type FileProps = {
  triggerRemount: () => void;
  setEditorContent: (content: any) => void;
};

const File = ({ triggerRemount, setEditorContent }: FileProps) => {
  const writer = useSelector((state: RootState) => state.writer);
  const { content, saves } = writer;
  const dispatch = useDispatch();
  const downloader = useDownloader();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedSave, setSelectedSave] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [showUploadConfirm, setShowUploadConfirm] = useState(false);
  const [titleDialogOpen, setTitleDialogOpen] = useState(false);
  const [titleDialogMode, setTitleDialogMode] = useState<"save" | "download">(
    "save",
  );
  const [titleInput, setTitleInput] = useState("");

  const [, setValue] = useLocalStorage("writerData", writer);

  const handleTitleDialogOpen = (mode: "save" | "download") => {
    setTitleDialogMode(mode);
    setTitleInput("");
    setTitleDialogOpen(true);
  };

  const handleTitleSubmit = () => {
    if (!titleInput.trim()) return;
    const title = titleInput.trim();

    if (titleDialogMode === "save") {
      dispatch(saveToLocalStorage({ title, content }));
    } else if (titleDialogMode === "download") {
      downloader.download(`${title}.html`, content);
    }

    setTitleDialogOpen(false);
    setTitleInput("");
  };

  useEffect(() => {
    setValue(writer);
  }, [writer]);

  const loadSave = useCallback(() => {
    const save = saves.find((s) => s.title === selectedSave);
    if (save) {
      dispatch(setContent(save.content));
      setEditorContent(save.content);
      triggerRemount();
    }
    setSelectedSave(null);
  }, [selectedSave, saves, dispatch, triggerRemount, setEditorContent]);

  const handleUploadChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.name.endsWith(".html")) {
        setUploadFile(file);
        setShowUploadConfirm(true);
      }
    },
    [],
  );

  const confirmUpload = useCallback(() => {
    if (uploadFile) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(setContent(reader.result as string));
        setEditorContent(reader.result as string);
        triggerRemount();
      };
      reader.readAsText(uploadFile);
      setUploadFile(null);
      setShowUploadConfirm(false);
    }
  }, [uploadFile, dispatch, setEditorContent, triggerRemount]);

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".html"
        onChange={handleUploadChange}
      />

      <Popover.Root>
        <Popover.Trigger>
          <Button
            variant="soft"
            className="!absolute !top-4 !flex !items-center !justify-between !w-full !p-3 !transition !max-w-fit !rounded-full"
            aria-controls="file-content"
          >
            <span className="font-semibold">Files</span>
            <ChevronDown />
          </Button>
        </Popover.Trigger>

        <Popover.Content className="!p-4 !min-w-[40rem]">
          <Flex direction="row" gap="6" className="blurred-div">
            {/* LEFT COLUMN: Import/Export */}
            <Flex direction="column" gap="3" className="w-1/2">
              <Text size="2" weight="bold">
                Import / Export
              </Text>

              <Button
                variant="outline"
                className="!justify-start"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload
              </Button>

              <Flex className="!w-full !gap-1">
                <Button
                  variant="soft"
                  color="green"
                  className="!flex-[3] !justify-start"
                  onClick={() => handleTitleDialogOpen("download")}
                >
                  <DownloadCloud className="mr-2 h-4 w-4" />
                  Download
                </Button>

                <Button
                  variant="soft"
                  className="!flex-[1]"
                  onClick={() => handleTitleDialogOpen("save")}
                >
                  <FolderHeart className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </Flex>

              <Hint>
                <>Uploaded images or videos won't persist, use link instead</>
              </Hint>
            </Flex>

            {/* RIGHT COLUMN: Saved Files */}
            <Flex direction="column" gap="3" className="w-1/2">
              <Text size="2" weight="bold">
                Local Storage
              </Text>

              <Flex
                direction="column"
                wrap="wrap"
                gap="3"
                justify="start"
                align={"start"}
                className="mt-4 max-h-[600px] overflow-auto"
              >
                {saves?.length ? (
                  saves.map((save, index) => (
                    <Dialog.Root
                      key={index}
                      open={selectedSave === save.title}
                      onOpenChange={(open) =>
                        setSelectedSave(open ? save.title : null)
                      }
                    >
                      <Dialog.Trigger>
                        <Button
                          variant="ghost"
                          className="flex flex-col items-center justify-center w-24 h-24 rounded-md border border-gray-300 hover:bg-blue-50 transition-all"
                        >
                          <span className="text-2xl">📄</span>
                          <span className="text-xs mt-1 text-center break-words">
                            {save.title}
                          </span>
                        </Button>
                      </Dialog.Trigger>
                      <Dialog.Content>
                        <Dialog.Title>Load "{save.title}"?</Dialog.Title>
                        <Dialog.Description>
                          This will overwrite your current document.
                        </Dialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button
                              variant="soft"
                              color="gray"
                              onClick={() => setSelectedSave(null)}
                            >
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button
                              variant="solid"
                              color="blue"
                              onClick={loadSave}
                            >
                              Load
                            </Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>
                  ))
                ) : (
                  <Text size="1" color="gray">
                    No saves yet
                  </Text>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>

      {/* Upload Overwrite Warning Dialog */}
      <Dialog.Root open={showUploadConfirm} onOpenChange={setShowUploadConfirm}>
        <Dialog.Content>
          <Dialog.Title>Upload Document</Dialog.Title>
          <Dialog.Description>Overwrite your current work?</Dialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setShowUploadConfirm(false)}
              >
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

      {/* Reusable Title Prompt Dialog */}
      <Dialog.Root open={titleDialogOpen} onOpenChange={setTitleDialogOpen}>
        <Dialog.Content>
          <Dialog.Title>
            {titleDialogMode === "save" ? "Save" : "Download"} Document
          </Dialog.Title>
          <Dialog.Description>Title this document</Dialog.Description>
          <TextField.Root
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Untitled"
            mt="2"
          />
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setTitleDialogOpen(false)}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button variant="soft" onClick={handleTitleSubmit}>
                {titleDialogMode === "save" ? "Save" : "Download"}
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default File;
