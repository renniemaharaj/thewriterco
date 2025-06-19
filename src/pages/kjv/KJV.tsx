import Bible from "../../pkg/bible/Bible";
import Page from "../../pkg/page/Page";
import { Card, Flex, Text } from "@radix-ui/themes";
import Hero from "../../pkg/page/Hero";
import Link from "../../pkg/link/Link";
import useBible from "../../pkg/hooks/useBible";
import { useURLState } from "../../pkg/hooks/useURLState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import {
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
} from "../../app/ereader/ereaderSlice";

const KJV = () => {
  const ereaderSlice = useSelector((state: RootState) => state.ereader);
  const { handleBookOpen } = useBible();

  const [bookTitle, setBookTitle] = useURLState("bt");
  const [chapter, setChapter] = useURLState("c");
  const [verse, setVerse] = useURLState("v");
  const [open, setOpen] = useURLState("o");

  const dispatch = useDispatch();

  useEffect(() => {
    setBookTitle(ereaderSlice.eContent.title);
    setChapter(ereaderSlice.currentChapter);
    setVerse(ereaderSlice.currentVerse);
    setOpen(ereaderSlice.isOpen ? "1" : "0");
  }, [ereaderSlice, setBookTitle, setChapter, setVerse, setOpen]);

  useEffect(() => {
    if (bookTitle && chapter && verse && open) {
      if (!ereaderSlice.eContent.content) {
        handleBookOpen(bookTitle);
        dispatch(setGlobalCurrentChapter(chapter));
        dispatch(setGlobalCurrentVerse(verse));
      }
    }
  }, [dispatch, ereaderSlice, handleBookOpen, bookTitle, chapter, verse, open]);

  return (
    <Page
      wrapChildren={true}
      title="KJV Bible"
      description="Read the KJV Bible"
      hero={
        <Hero
          header="The Word of God"
          subHeader="KJV"
          hint={
            <Text>
              The Writer Company is KJV first. We are against the subtle
              conditioning towards an ultimate acceptance of a watered-down
              bible version. 😬
            </Text>
          }
        />
      }
    >
      <Flex
        direction="column"
        align="center"
        className="w-full md:!w-[80%] mx-auto gap-6"
      >
        {/* Bible Reader */}
        <Bible showAnimation={true} />

        {/* Static Meta Info */}
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
  );
};

export default KJV;
