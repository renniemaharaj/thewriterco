import React from "react";
import {
  Card,
  Flex,
  Text,
  Heading,
  Section,
  Tabs,
  Box,
} from "@radix-ui/themes";

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
} from "./utils/bible/bibleDivisions";
import Hint from "../../Hint";
import { useDispatch } from "react-redux";
import fetchGitBlob from "./utils/bible/gitgetter";
import { EBook } from "../../../app/ereader/types";
import Block from "../../Block";
import { setOpenState } from "../../../app/ereader/ereaderSlice";

type Article = {
  title: string;
  date: string;
};

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
    fetchGitBlob(title).then((content) => {
      setTimeout(() => dispatch(setOpenState(true)), 100);
      setEBook({
        title,
        content: JSON.parse(content),
        date,
      } as EBook);
      setIsFetchingContent(false);
    });
  };

  const ArticleCard = ({ title, date }: Article) => {
    return (
      <Card
        variant="classic"
        className="p-4 rounded-lg w-full md:w-1/3 transition-shadow cursor-pointer hover:shadow-lg drop-shadow-md shadow-[gray]"
        style={{
          //   border: "1px solid var(--gray-a6)",
          backgroundColor: "var(--gray-a3)",
        }}
        onClick={() => handleArticleClick({ title, date })}
      >
        <Flex direction="column" gap="2">
          <Heading size="3" weight="bold">
            {title}
          </Heading>
          <Text color="gray" size="2">
            {date}
          </Text>
        </Flex>
      </Card>
    );
  };

  return (
    <>
      {isFetchingContent && <Block />}
      <section id="biblical" className={`${!asChild && "py-12"}`}>
        {!asChild && (
          <>
            <Heading size="4" align="center" className="mb-8">
              The Word of God - KJV
            </Heading>
            <Hint className="max-w-[450px]">
              The word of God preserved in KJV translation. The Writer Company
              provides the full KJV bible free of charge for consumtion and
              research purposes. We make no attempt in any way to claim
              ownership of the KJV text.
            </Hint>
          </>
        )}

        <Section className={`container mx-auto ${asChild && "!pt-0"}`}>
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
                  <Text size="2" weight="bold" className="mb-4">
                    {division}
                  </Text>
                  <Flex
                    direction="row"
                    gap="4"
                    wrap="wrap"
                    className="justify-center"
                  >
                    {books.map((book) => (
                      <ArticleCard
                        key={book}
                        title={book}
                        date="Dec 04, 2024" // Static date for demo
                      />
                    ))}
                  </Flex>
                </Tabs.Content>
              ))}
            </Box>
          </Tabs.Root>
        </Section>
      </section>
    </>
  );
};

export default Sword;
