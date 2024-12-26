import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Button, Flex, IconButton, Select, Dialog } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Sword from "./articles/Sword";
import { EBook } from "../../app/ereader/types";
import {
  setEBook,
  setRenderStyle,
  toggleOpenState,
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
} from "../../app/ereader/ereaderSlice";
import { BookDownIcon, BookUpIcon } from "lucide-react";

const Ereader: React.FC = () => {
  // Redux state
  const eReaderState = useSelector((state: RootState) => state.ereader);
  const currentChapter = eReaderState.currentChapter;
  const currentVerse = eReaderState.currentVerse;
  // Local state
  const [readerState, setRenderState] = useState<"rich" | "bible">(
    eReaderState.readerStyle,
  );
  useEffect(() => {
    document.body.style.overflow = eReaderState.isOpen ? "hidden" : "auto";
  }, [eReaderState.isOpen]);

  const dispatch = useDispatch();

  // Update local state when Redux state changes
  useEffect(() => {
    setRenderState(eReaderState.readerStyle);
    setTimeout(() => (initialContentLoaded.current = true), 1000);

    // if (
    //   readerState === "bible" &&
    //   typeof eReaderState.eContent.content !== "string"
    // ) {
    //   const firstChapter = Object.keys(eReaderState.eContent.content)[0];
    //   handleChapterChange(firstChapter);
    // }
  }, [eReaderState, readerState]);

  const [parsedContent] = useState(eReaderState.eContent.content);

  const initialContentLoaded = useRef(false);

  const handleChapterChange = (chapter: string) => {
    dispatch(setGlobalCurrentChapter(chapter));
    dispatch(setGlobalCurrentVerse("1"));

    console.log("Chapter changed to", chapter);
  };

  const handleVerseChange = (verse: string) => {
    dispatch(setGlobalCurrentVerse(verse));

    console.log("Verse changed to", verse);
  };

  const navigateVerse = (direction: "prev" | "next") => {
    if (
      !currentChapter ||
      !currentVerse ||
      typeof eReaderState.eContent.content === "string"
    )
      return;

    const chapterVerses = Object.keys(
      eReaderState.eContent.content[currentChapter],
    );
    const currentIndex = chapterVerses.indexOf(currentVerse);
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex < 0 && direction === "prev") {
      const prevChapter = Object.keys(eReaderState.eContent.content)[
        Object.keys(eReaderState.eContent.content).indexOf(currentChapter) - 1
      ];
      if (prevChapter) {
        handleChapterChange(prevChapter);
        handleVerseChange(
          Object.keys(eReaderState.eContent.content[prevChapter]).slice(-1)[0],
        );
      }
    } else if (newIndex >= chapterVerses.length && direction === "next") {
      const nextChapter = Object.keys(eReaderState.eContent.content)[
        Object.keys(eReaderState.eContent.content).indexOf(currentChapter) + 1
      ];
      if (nextChapter) {
        handleChapterChange(nextChapter);
      }
    } else {
      handleVerseChange(chapterVerses[newIndex]);
    }
  };

  const shadowVerses = () => {
    if (
      !currentChapter ||
      !currentVerse ||
      typeof eReaderState.eContent.content === "string"
    )
      return [];
    const chapterVerses = Object.keys(
      eReaderState.eContent.content[currentChapter],
    );
    const currentIndex = chapterVerses.indexOf(currentVerse);

    return chapterVerses.slice(currentIndex + 1, currentIndex + 5);
  };

  const setEreaderState = (eBook: EBook) => {
    // Dispatch to Redux store
    dispatch(setEBook(eBook));

    // Set the render style to "bible"
    dispatch(setRenderStyle("bible"));
  };

  const BiblePicker = ({ trigger }: { trigger: ReactNode }) => {
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
            <Sword asChild setEBook={setEreaderState} />
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

  return (
    <div
      className={`${eReaderState.isOpen && "blurred-div"} ereaderBg ${
        eReaderState.isOpen && "h-full"
      } fixed bottom-0 left-0 w-full shadow-lg overflow-auto max-h-full z-20`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        {/* <h2 className="text-xl font-semibold">{eReaderState.eContent.title}</h2> */}
        <BiblePicker trigger={<Button>{eReaderState.eContent.title}</Button>} />
        <IconButton
          onClick={() => dispatch(toggleOpenState())}
          aria-label="Toggle Ereader"
        >
          {eReaderState.isOpen ? <BookDownIcon /> : <BookUpIcon />}
        </IconButton>
      </div>

      {eReaderState.isOpen && (
        <div className="!flex-col p-4 space-y-4">
          {eReaderState.eContent.description && (
            <p className="text-gray-700">{eReaderState.eContent.description}</p>
          )}
          {eReaderState.eContent.summary && (
            <p className="text-sm text-gray-500 italic">
              {eReaderState.eContent.summary}
            </p>
          )}
          <div className="text-sm text-gray-500">
            {eReaderState.eContent.author && (
              <p>Author: {eReaderState.eContent.author}</p>
            )}
            {eReaderState.eContent.date && (
              <p>Date: {eReaderState.eContent.date}</p>
            )}
          </div>
          {/* <Section className="justify-items-end">
            <ChristianAIChatbox className="!mx-10 !sticky !top-0" />
          </Section> */}
          {readerState === "bible" && (
            <div className="!gap-4 justify-center">
              <Select.Root
                defaultValue={currentChapter || ""}
                value={currentChapter || ""}
                onValueChange={(val) => handleChapterChange(val)}
              >
                <Select.Trigger>
                  <Button>{"Chapter " + currentChapter}</Button>
                </Select.Trigger>
                <Select.Content>
                  {Object.keys(eReaderState.eContent.content).map((chapter) => (
                    <Select.Item key={"chapter-" + chapter} value={chapter}>
                      {chapter}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <Select.Root
                value={currentVerse || ""}
                defaultValue={currentVerse || ""}
                onValueChange={(val) => handleVerseChange(val)}
              >
                <Select.Trigger>
                  <Button>{"Verse " + currentVerse}</Button>
                </Select.Trigger>
                <Select.Content>
                  {currentChapter &&
                    Object.keys(
                      typeof eReaderState.eContent.content !== "string"
                        ? eReaderState.eContent.content[currentChapter] || {}
                        : {},
                    ).map((verse) => (
                      <Select.Item key={"verse-" + verse} value={verse}>
                        {verse}
                      </Select.Item>
                    ))}
                </Select.Content>
              </Select.Root>
            </div>
          )}
          <Flex className="!justify-center !items-center space-x-4">
            <IconButton onClick={() => navigateVerse("prev")}>
              <ChevronLeftIcon />
            </IconButton>
            <div
              className="max-w-[700px] text-center p-4 shadow-lg !bg-transparent"
              style={{ flex: 1 }}
            >
              {readerState === "rich" && typeof parsedContent === "string" ? (
                <pre
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: parsedContent,
                  }}
                />
              ) : currentChapter && currentVerse ? (
                <div>
                  <h3 className="text-lg font-bold">
                    Chapter {currentChapter}, Verse {currentVerse}
                  </h3>
                  <p>
                    {typeof eReaderState.eContent.content !== "string" &&
                      eReaderState.eContent.content[currentChapter][
                        currentVerse
                      ]}
                  </p>
                </div>
              ) : (
                <p>No content to display.</p>
              )}
            </div>
            <IconButton onClick={() => navigateVerse("next")}>
              <ChevronRightIcon />
            </IconButton>
          </Flex>
          <Flex
            justify="center"
            align={"center"}
            className="!flex-col text-sm mt-4 gap-4 p-2 rounded-md"
          >
            {shadowVerses().length > 0 && (
              <div className="blurred-div max-w-[700px] text-center p-4 shadow-lg rounded-md">
                <p>
                  <span className="font-bold">
                    {typeof eReaderState.eContent.content !== "string" &&
                      currentChapter &&
                      `(${eReaderState.currentChapter}:${eReaderState.currentVerse}) ${eReaderState.eContent.content[currentChapter][currentVerse || 1]}`}
                  </span>
                  {shadowVerses()
                    .map(
                      (verse) =>
                        `(${eReaderState.currentChapter}:${verse}) ${
                          typeof eReaderState.eContent.content !== "string" &&
                          currentChapter &&
                          eReaderState.eContent.content[currentChapter][
                            verse || 1
                          ]
                        }`,
                    )
                    .join(" ")}
                </p>
              </div>
            )}
          </Flex>
        </div>
      )}
    </div>
  );
};

export default Ereader;
