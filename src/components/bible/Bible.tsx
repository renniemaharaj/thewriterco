import React from "react";
import { Flex, Tabs, Box } from "@radix-ui/themes";

import { useDispatch } from "react-redux";
import fetchGitBlob, { kjvRepoUrl } from "../hooks/data/gitFetcher";
import { EBook } from "../../app/ereader/types";
import Block from "../Block";
import { setOpenState } from "../../app/ereader/ereaderSlice";
import BookFragment from "./BookFragment";
import { bibleDivisions } from "./bibleDivisions";
import { SwordProps } from "./types";
import Search from "./Search";

const Sword: React.FC<SwordProps> = ({ setEBook }) => {
  const dispatch = useDispatch();
  const [isFetchingContent, setIsFetchingContent] = React.useState(false);

  const [searchText, setSearchText] = React.useState("");
  const lowerSearch = searchText.toLowerCase();

  const matchingDivisions = Object.entries(bibleDivisions)
    .map(([division, books]) => {
      const filteredBooks = books.filter((book) =>
        book.toLowerCase().includes(lowerSearch),
      );
      return filteredBooks.length > 0
        ? { division, books: filteredBooks }
        : null;
    })
    .filter(Boolean) as { division: string; books: string[] }[];

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

  const allTabs = Object.keys(bibleDivisions);
  const tabsToShow: string[] = searchText
    ? matchingDivisions.map((d) => d.division)
    : allTabs;

  return (
    <>
      {isFetchingContent && <Block />}
      <Flex className="w-full mx-auto pb-10 flex-col items-center text-center">
        <Box>
          <Search onChange={(str: string) => setSearchText(str)} />
        </Box>

        <Tabs.Root defaultValue={tabsToShow[0]}>
          <Tabs.List className="!flex-wrap">
            {tabsToShow.map((division) => (
              <Tabs.Trigger
                key={division}
                value={division}
                className={
                  searchText &&
                  matchingDivisions.some((d) => d.division === division)
                    ? "bg-yellow-100 text-black"
                    : ""
                }
              >
                {division}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Box pt="3">
            {tabsToShow.map((division) => {
              const books = searchText
                ? matchingDivisions.find((d) => d.division === division)
                    ?.books || []
                : bibleDivisions[division];

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
                        title="Holy Bible"
                        onClick={() =>
                          handleArticleClick({
                            title: book,
                            date: Date.now().toString(),
                          })
                        }
                      />
                    ))}
                  </Flex>
                </Tabs.Content>
              );
            })}
          </Box>
        </Tabs.Root>
      </Flex>
    </>
  );
};

export default Sword;
