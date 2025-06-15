/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Flex,
  Popover,
  Text,
  Dialog,
  TextField,
  Separator,
} from "@radix-ui/themes";
import {
  CheckIcon,
  ChevronDown,
  CodeXml,
  DownloadCloud,
  FolderHeart,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useCallback, useEffect, useRef, useState } from "react";
import useDownloader from "../hooks/useDownloader";
import {
  deleteByTitle,
  saveToLocalStorage,
  setContent,
  setTitle,
} from "../../app/writer/writerSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import Collapsible from "../Collapsible";
import FlexBreak from "./FlexBreak";

type FileProps = {
  triggerRemount: () => void;
  setEditorContent: (content: any) => void;
};

const File = ({ triggerRemount, setEditorContent }: FileProps) => {
  const writer = useSelector((state: RootState) => state.writer);
  const { content, saves, title } = writer;
  const dispatch = useDispatch();
  const downloader = useDownloader();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [showUploadConfirm, setShowUploadConfirm] = useState(false);

  const [, setValue] = useLocalStorage("writerData", writer);

  const findSaveByTitle = useCallback(
    (title: string) => saves.find((s) => s.title === title),
    [saves],
  );

  const handleSave = () => {
    if (title.trim()) {
      dispatch(saveToLocalStorage({ title: title.trim(), content }));
    }
  };

  const handleNewDocument = useCallback(() => {
    dispatch(setContent(""));
    dispatch(setTitle(""));
    setEditorContent("");
    triggerRemount();
  }, [dispatch, triggerRemount, setEditorContent]);

  const handleDownload = () => {
    if (title.trim()) {
      downloader.download(`${title.trim()}.html`, content);
    }
  };

  const loadSave = useCallback(
    (title: string) => {
      const save = findSaveByTitle(title);
      if (save) {
        dispatch(setContent(save.content));
        dispatch(setTitle(save.title));
        setEditorContent(save.content);
        triggerRemount();
      }
    },
    [dispatch, findSaveByTitle, triggerRemount, setEditorContent],
  );

  const deleteSave = useCallback(
    (title: string) => {
      dispatch(deleteByTitle(title));
    },
    [dispatch],
  );

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
        const fileName = uploadFile.name.replace(".html", "");
        dispatch(setContent(reader.result as string));
        dispatch(setTitle(fileName));
        setEditorContent(reader.result as string);
        triggerRemount();
      };
      reader.readAsText(uploadFile);
      setUploadFile(null);
      setShowUploadConfirm(false);
    }
  }, [uploadFile, dispatch, setEditorContent, triggerRemount]);

  const contentExactsSaved = useCallback(
    () => findSaveByTitle(title)?.content === content,
    [findSaveByTitle, content, title],
  );

  useEffect(() => {
    setValue(writer);
  }, [writer, setValue]);

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

              <Flex className="!w-full !gap-1">
                <Button
                  variant="outline"
                  className="!flex-[3] !justify-start"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Upload
                </Button>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button variant="soft" className="!flex-[1]">
                      New
                    </Button>
                  </Dialog.Trigger>

                  <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      Are you sure? This will wipe your current document
                    </Dialog.Description>

                    <Flex direction="column" gap="3"></Flex>

                    <Flex gap="3" mt="4" justify="end">
                      <Dialog.Close>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button variant="soft" onClick={handleNewDocument}>
                          Confirm
                        </Button>
                      </Dialog.Close>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
              </Flex>

              <TextField.Root
                value={title}
                onChange={(e) => dispatch(setTitle(e.target.value))}
                placeholder="Title required"
                mt="2"
              />

              <Flex className="!w-full !gap-1">
                <Button
                  variant="soft"
                  color="green"
                  className="!flex-[3] !justify-start"
                  onClick={handleDownload}
                  disabled={title.trim() === ""}
                >
                  <DownloadCloud className="mr-2 h-4 w-4" />
                  Download
                </Button>

                <Button
                  variant="soft"
                  className="!flex-[1]"
                  onClick={handleSave}
                  disabled={title.trim() === "" || contentExactsSaved()}
                >
                  {contentExactsSaved() ? (
                    <CheckIcon className="mr-2 h-4 w-4" />
                  ) : (
                    <FolderHeart className="mr-2 h-4 w-4" />
                  )}
                  Save
                </Button>
              </Flex>

              <Text size="1" color="gray">
                Uploaded images or videos won't persist, use link instead
              </Text>
            </Flex>
            <Separator orientation={"vertical"} size="3" className="my-auto" />
            {/* RIGHT COLUMN: Saved Files */}
            <Flex direction="column" gap="3" className="w-1/2">
              <Text size="2" weight="bold">
                Local Storage
              </Text>

              <Flex
                direction="row"
                wrap="wrap"
                gap="3"
                justify="start"
                align="start"
                className="mt-4 !max-h-[300px] !overflow-auto"
              >
                {saves?.length > 0 ? (
                  <Text size="1" color="gray">
                    Save to secure or update documents
                  </Text>
                ) : (
                  <Text size="1" color="gray">
                    No saves yet
                  </Text>
                )}
                {saves?.length > 0 &&
                  saves.map((save, index) => (
                    <Collapsible
                      key={index}
                      title={save.title}
                      renderedTitle={
                        <Flex>
                          <span className="text-2xl">📄</span>
                          <span
                            className={`text-xs mt-1 text-center font-medium max-w-[11rem] overflow-hidden text-ellipsis whitespace-nowrap ${
                              title === save.title && "!font-bold"
                            }`}
                          >
                            {save.title}
                          </span>
                        </Flex>
                      }
                      // variant="soft"
                      className="!w-full !justify-start"
                    >
                      <Flex className="!flex-row !gap-3">
                        <Button
                          variant="ghost"
                          onClick={() => loadSave(save.title)}
                        >
                          <CodeXml className="w-4 h-4" />
                          Render
                        </Button>

                        <Button
                          variant="ghost"
                          onClick={() => deleteSave(save.title)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Trash
                        </Button>
                        <FlexBreak />
                      </Flex>
                    </Collapsible>
                  ))}
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
    </>
  );
};

export default File;
