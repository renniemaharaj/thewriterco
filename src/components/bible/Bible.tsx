import React from "react";
import { Flex, Tabs, Box } from "@radix-ui/themes";

import {
  canonicalGospels,
  actsOfApostles,
  epistlesOfPaul,
  generalEpistles,
  bookOfRevelation,
  pentateuch,
  historicalBooks,
  wisdomBooks,
  propheticBooks,
} from "./config";
import Hint from "../Hint";
import { useDispatch, useSelector } from "react-redux";
import fetchGitBlob, { kjvRepoUrl } from "../hooks/data/gitGetter";
import { EBook } from "../../app/ereader/types";
import Block from "../Block";
import { setOpenState } from "../../app/ereader/ereaderSlice";
import Book from "../book/Book";
import { RootState } from "../../app/store";

type SwordProps = {
  setEBook: (state: EBook) => void;
  asChild?: boolean;
};
const divisions = {
  "Canonical Gospels": canonicalGospels,
  "Acts of the Apostles": actsOfApostles,
  "Epistles of Paul": epistlesOfPaul,
  "General Epistles": generalEpistles,
  "Book of Revelation": bookOfRevelation,
  "The Pentateuch": pentateuch,
  "Historical Books": historicalBooks,
  "Wisdom Books": wisdomBooks,
  "Prophetic Books": propheticBooks,
};
const Sword: React.FC<SwordProps> = ({ setEBook, asChild }) => {
  const dispatch = useDispatch();
  const [isFetchingContent, setIsFetchingContent] = React.useState(false);

  const handleArticleClick = ({
    title,
    date,
  }: {
    title: string;
    date: string;
  }) => {
    setIsFetchingContent(true);
    fetchGitBlob(kjvRepoUrl, title, "json").then((content) => {
      setTimeout(() => dispatch(setOpenState(true)), 100);
      setEBook({
        title,
        content: JSON.parse(content),
        date,
      } as EBook);
      setIsFetchingContent(false);
    });
  };

  const eReaderState = useSelector((state: RootState) => state.ereader);

  return (
    <>
      {isFetchingContent && <Block />}
      {/* <section id="biblical" className={`${!asChild && "pb-10"}`}> */}

      {/* <Section className={` mx-auto `}> */}
      <Flex className="w-full mx-auto pb-10 flex-col items-center text-center">
        {!asChild && (
          <>
            <h2 className="text-2xl font-bold">
              The Word of God{" "}
              <span className="w-full text-center">
                <br />- KJV
              </span>
            </h2>
            {/* <Heading size="4" align="center" className="mb-8">
              The Word of God - KJV
            </Heading> */}
            <Hint className="max-w-[450px]">
              The Writer Company is KJV only. We are against the subtle
              conditioning towards an ultimate acceptance of a watered-down
              bible version. 😬
            </Hint>
          </>
        )}
        <Tabs.Root defaultValue="Canonical Gospels">
          <Tabs.List className="!flex-wrap">
            {Object.keys(divisions).map((division) => (
              <Tabs.Trigger key={division} value={division}>
                {division}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Box pt="3">
            {Object.entries(divisions).map(([division, books]) => (
              <Tabs.Content key={division} value={division}>
                <Flex
                  direction="row"
                  gap="3"
                  wrap="wrap"
                  className="relative !justify-center"
                >
                  {books.map((book, index) => (
                    <React.Fragment key={index}>
                      <Book
                        title={"Holy Bible"}
                        division={book}
                        version="KJV"
                        className="!w-[6rem] animate-fade-in"
                        // onOpenClassName={`absolute z-20 translate-x-[-50%] translate-y-[-50%] `}
                        actionPagesFlipped={
                          eReaderState.eContent.title === book &&
                          eReaderState.isOpen
                        }
                        onClick={() =>
                          handleArticleClick({
                            title: book,
                            date: Date.now().toString(),
                          })
                        }
                      />
                    </React.Fragment>
                    // <ArticleCard
                    //   key={book}
                    //   title={book}
                    //   date="Dec 04, 2024" // Static date for demo
                    // />
                  ))}
                </Flex>
              </Tabs.Content>
            ))}
          </Box>
        </Tabs.Root>
      </Flex>
      {/* </Section> */}
      {/* </section> */}
    </>
  );
};

export default Sword;
