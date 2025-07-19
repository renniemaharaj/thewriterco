import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useBible from "../../pkg/hooks/useBible";
import { useURLState } from "../../pkg/hooks/useURLState";
import { AlertDialog, Button, Card, Flex, Text } from "@radix-ui/themes";
import {
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
} from "../../app/reader/readerSlice";
import Bible from "../../pkg/bible/Bible";
import Link from "../../pkg/link/Link";
import Page from "../../page/Page";

const Index = () => {
  const ereaderSlice = useSelector((state: RootState) => state.reader);
  const { handleBookOpen } = useBible();

  const [initialURLState, setInitialURLState] = useState<{
    bookTitle: string | null;
    chapter: string | null;
    verse: string | null;
  } | null>(null);

  const [bookTitle, setBookTitle] = useURLState("bt");
  const [chapter, setChapter] = useURLState("c");
  const [verse, setVerse] = useURLState("v");
  const [open, setOpen] = useURLState("o");

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Only run once to capture the initial URL state before anything overrides it
    setInitialURLState({
      bookTitle,
      chapter,
      verse,
    });

    if (
      bookTitle &&
      chapter &&
      verse &&
      open &&
      (bookTitle !== ereaderSlice.eBook.title ||
        chapter !== ereaderSlice.currentChapter ||
        verse !== ereaderSlice.currentVerse)
    ) {
      setDialogOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once on mount

  // Set URL from Redux state
  useEffect(() => {
    setBookTitle(ereaderSlice.eBook.title);
    setChapter(ereaderSlice.currentChapter);
    setVerse(ereaderSlice.currentVerse);
    setOpen(ereaderSlice.isOpen ? "1" : "0");
  }, [ereaderSlice, setBookTitle, setChapter, setVerse, setOpen]);

  // Handle confirm
  const handleConfirmLoadFromURL = () => {
    if (!initialURLState) return;

    handleBookOpen(initialURLState.bookTitle!);
    dispatch(setGlobalCurrentChapter(initialURLState.chapter!));
    dispatch(setGlobalCurrentVerse(initialURLState.verse!));
    setDialogOpen(false);

    // Sync URL after confirmed load
    setBookTitle(initialURLState.bookTitle!);
    setChapter(initialURLState.chapter!);
    setVerse(initialURLState.verse!);
    setOpen("1");
  };

  return (
    <>
      {/* AlertDialog Confirmation */}
      <AlertDialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Load Scripture</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Would you like to load{" "}
            <strong>
              {initialURLState?.bookTitle} {initialURLState?.chapter}:
              {initialURLState?.verse}
            </strong>{" "}
            from the URL? This will override your current state
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={handleConfirmLoadFromURL} variant="soft">
                Load
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* Page layout */}
      <Page
        wrapChildren={true}
        title="KJV Bible"
        description="Read the KJV Bible"
      >
        <Flex
          direction="column"
          align="center"
          className="w-full mx-auto gap-6"
        >
          <Bible showAnimation={true} />

          <Card className="!flex text-center w-full !items-center !justify-center">
            <Flex className="flex-row gap-4">
              <Text size="3" className="text-md font-bold mb-4" weight="bold">
                KJV Bible
              </Text>
              <Text size="3" color="gray">
                66 Books • 1,189 Chapters • 31,102 Verses
              </Text>
              <Link
                animate
                external
                href="https://github.com/renniemaharaj/kjv-bible"
              >
                Git Source
              </Link>
            </Flex>
          </Card>
        </Flex>
      </Page>
    </>
  );
};

export default Index;
