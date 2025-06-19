import React, { useCallback, useEffect, useState } from "react";
import { Flex, Tabs, Box } from "@radix-ui/themes";

import Block from "../page/Block";
import BookFragment from "./Book";
import { bibleDivisions } from "./config";
import { SwordProps } from "./types";
import Search from "./Search";
import Seeker from "./Seeker";
import useBible from "../hooks/useBible";

const Bible: React.FC<SwordProps> = ({ showAnimation }) => {
  const [searchText, setSearchText] = useState("");

  const { handleBookOpen, isLoading } = useBible();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [isLoading]);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const getMatchingDivisions = useCallback(() => {
    return Object.entries(bibleDivisions)
      .map(([division, books]) => {
        const filteredBooks = books.filter(
          (book) =>
            book.toLowerCase().includes(searchText.toLowerCase()) ||
            searchText === "",
        );
        return filteredBooks.length > 0
          ? { division, books: filteredBooks }
          : null;
      })
      .filter(Boolean) as { division: string; books: string[] }[];
  }, [searchText]);

  const matchingDivisions = getMatchingDivisions();
  const allTabs = Object.keys(bibleDivisions);
  const tabsToShow = searchText
    ? matchingDivisions.map((d) => d.division)
    : allTabs;

  const getBooksForDivision = (division: string) => {
    return matchingDivisions.find((d) => d.division === division)?.books || [];
  };

  const renderTabs = () =>
    tabsToShow.map((division) => {
      const books = getBooksForDivision(division);

      return (
        <Tabs.Trigger key={division} value={division} className="!h-fit">
          <Flex className="flex-col items-center justify-center">
            {division}
            {searchText && books.length > 0 && (
              <Seeker books={books} onClick={handleBookOpen} />
            )}
          </Flex>
        </Tabs.Trigger>
      );
    });

  const renderBooks = (division: string) => {
    const books = getBooksForDivision(division);

    return (
      <Tabs.Content key={division} value={division}>
        <Flex
          direction="row"
          gap="3"
          wrap="wrap"
          className="relative !justify-center"
        >
          {books.map((book, index) => (
            <BookFragment
              key={index}
              book={book}
              title="HB"
              showAnimation={showAnimation}
              onClick={() => handleBookOpen(book)}
            />
          ))}
        </Flex>
      </Tabs.Content>
    );
  };

  if (isLoading) {
    return <Block noPage />;
  }

  return (
    <Flex className="w-full mx-auto pb-10 gap-10 flex-col items-center text-center">
      <Box>
        <Search onChange={handleSearchChange} />
      </Box>

      <Tabs.Root
        defaultValue={tabsToShow[0]}
        className="!h-fit !overflow-visible"
      >
        <Tabs.List className="!flex-wrap !overflow-visible">
          {renderTabs()}
        </Tabs.List>
        <Box pt="3">{tabsToShow.map(renderBooks)}</Box>
      </Tabs.Root>
    </Flex>
  );
};

export default Bible;
