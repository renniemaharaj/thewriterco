import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Card,
  Button,
  TextField,
  Flex,
  IconButton,
  Select,
  Dialog,
} from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { useThemeContext } from "../context/useThemeContext";
import Hint from "../Hint";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Sword from "./articles/Sword";
import { EBook } from "../../app/ereader/types";
import { setEBook, setRenderStyle } from "../../app/ereader/ereaderSlice";

const Ereader: React.FC = () => {
  // Redux state
  const eReaderState = useSelector((state: RootState) => state.ereader);

  // Local state
  const [isOpen, setIsOpen] = useState(false);
  const [readerState, setRenderState] = useState<"rich" | "bible">(
    eReaderState.readerStyle,
  );
  const [currentChapter, setCurrentChapter] = useState<string | null>();
  const [currentVerse, setCurrentVerse] = useState<string | null>();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Update local state when Redux state changes
  useEffect(() => {
    setRenderState(eReaderState.readerStyle);
    if (initialContentLoaded.current) setIsOpen(true);
    setTimeout(() => (initialContentLoaded.current = true), 1000);

    if (
      readerState === "bible" &&
      typeof eReaderState.eContent.content !== "string"
    ) {
      const firstChapter = Object.keys(eReaderState.eContent.content)[0];
      setCurrentChapter(firstChapter);
      setCurrentVerse("1");
    }
  }, [eReaderState, readerState]);

  const [parsedContent, setParsedContent] = useState(
    eReaderState.eContent.content,
  );

  const [searchTerm, setSearchTerm] = useState("");

  const initialContentLoaded = useRef(false);

  const { theme } = useThemeContext();
  const ereaderBg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (typeof eReaderState.eContent.content === "string") {
      const regex = new RegExp(term, "gi");
      setParsedContent(
        eReaderState.eContent.content.replace(
          regex,
          (match) => `<mark>${match}</mark>`,
        ),
      );
    }
  };

  const handleChapterChange = (chapter: string) => {
    setCurrentChapter(chapter);
    setCurrentVerse("1");
  };

  const handleVerseChange = (verse: string) => setCurrentVerse(verse);

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
        setCurrentChapter(prevChapter);
        setCurrentVerse(
          Object.keys(eReaderState.eContent.content[prevChapter]).slice(-1)[0], // Last verse
        );
      }
    } else if (newIndex >= chapterVerses.length && direction === "next") {
      const nextChapter = Object.keys(eReaderState.eContent.content)[
        Object.keys(eReaderState.eContent.content).indexOf(currentChapter) + 1
      ];
      if (nextChapter) {
        setCurrentChapter(nextChapter);
        setCurrentVerse("1");
      }
    } else {
      setCurrentVerse(chapterVerses[newIndex]);
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

  const dispatch = useDispatch();

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
            {/* <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close> */}
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
      className={`${ereaderBg} ${
        isOpen && "h-full"
      } fixed bottom-0 left-0 w-full shadow-lg overflow-auto max-h-full`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        {/* <h2 className="text-xl font-semibold">{eReaderState.eContent.title}</h2> */}
        <BiblePicker trigger={<Button>{eReaderState.eContent.title}</Button>} />
        <IconButton onClick={toggleOpen} aria-label="Toggle Ereader">
          {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </IconButton>
      </div>

      {isOpen && (
        <Flex className="!flex-col p-4 space-y-4">
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

          {readerState === "bible" && (
            <Flex className="!gap-4 justify-center">
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
                    <Select.Item key={chapter} value={chapter}>
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
                      <Select.Item key={verse} value={verse}>
                        {verse}
                      </Select.Item>
                    ))}
                </Select.Content>
              </Select.Root>
            </Flex>
          )}

          <Flex justify="center" className="!gap-2">
            <TextField.Root
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full max-w-[300px]"
              disabled={typeof eReaderState.eContent.content !== "string"}
            />
            <IconButton>
              <MagnifyingGlassIcon aria-label="Search" />
            </IconButton>
          </Flex>
          <Hint>Powerful search coming soon for biblical research</Hint>
          <Flex className="!justify-center !items-center space-x-4">
            <IconButton onClick={() => navigateVerse("prev")}>
              <ChevronLeftIcon />
            </IconButton>
            <Card
              className="max-w-[700px] text-center p-4 shadow-lg"
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
            </Card>
            <IconButton onClick={() => navigateVerse("next")}>
              <ChevronRightIcon />
            </IconButton>
          </Flex>

          <Flex
            justify="center"
            align={"center"}
            className="!flex-col text-sm mt-4 gap-4 p-2 rounded-md"
          >
            {shadowVerses().map((verse) => (
              <>
                <Card
                  key={verse}
                  className="max-w-[700px] text-center p-4 shadow-lg relative"
                >
                  <h4 className="font-semibold">Verse {verse}</h4>
                  <p>
                    {typeof eReaderState.eContent.content !== "string" &&
                      currentChapter &&
                      eReaderState.eContent.content[currentChapter][verse]}
                  </p>
                </Card>
                {verse === shadowVerses().slice(-1)[0] && (
                  <IconButton
                    onClick={() => handleVerseChange(verse)}
                    className="!absolute !opacity-50"
                    aria-label={`Forward to Verse ${verse}`}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                )}
              </>
            ))}
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default Ereader;
