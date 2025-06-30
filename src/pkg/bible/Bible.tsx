import React, { useCallback, useEffect, useState } from "react";
import { Flex, Tabs, Box, Card } from "@radix-ui/themes";

import Block from "../page/Block";
import BookFragment from "./Book";
import { bibleDivisions } from "./config";
import { SwordProps } from "./types";
import Search from "./Search";
import Seeker from "./Seeker";
import useBible from "../hooks/useBible";
import { Carousel } from "../Carousel";
import Tab from "./Tab";
import { motion } from "framer-motion";

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

  const [selectedTab, setSelectedTab] = useState(tabsToShow[0]);

  const getBooksForDivision = (division: string) => {
    return matchingDivisions.find((d) => d.division === division)?.books || [];
  };

  const renderTabs = () =>
    tabsToShow.map((division, index) => {
      const books = getBooksForDivision(division);

      return (
        <motion.div
          key={index + "tabsItem"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Tabs.Trigger key={division} value={division} className="!h-fit !p-1">
            <Flex className="flex-col items-center justify-center">
              <Tab title={division} selected={selectedTab === division} />

              {searchText && books.length > 0 && (
                <Seeker books={books} onClick={handleBookOpen} />
              )}
            </Flex>
          </Tabs.Trigger>
        </motion.div>
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
            <motion.div
              key={index + "tabsItem"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <BookFragment
                key={index}
                book={book}
                title="HB"
                showAnimation={showAnimation}
                onClick={() => handleBookOpen(book)}
              />
            </motion.div>
          ))}
        </Flex>
      </Tabs.Content>
    );
  };

  if (isLoading) {
    return <Block noPage />;
  }

  return (
    <Flex className="w-full md:!w-[50rem] mx-auto pb-10 gap-10 flex-col items-center text-center">
      <Flex className="!w-full !items-center !justify-center">
        <Box>
          <Search onChange={handleSearchChange} />
        </Box>
      </Flex>
      <Card className="w-full !h-fit">
        <Tabs.Root
          defaultValue={tabsToShow[0]}
          onValueChange={setSelectedTab}
          className="w-full !h-fit"
        >
          <Tabs.List className="!flex-wrap !h-fit ">
            <Carousel items={renderTabs()} />
            {/* {renderTabs()} */}
          </Tabs.List>
          <Box className="!pt-10">{tabsToShow.map(renderBooks)}</Box>
        </Tabs.Root>
      </Card>
    </Flex>
  );
};

export default Bible;
