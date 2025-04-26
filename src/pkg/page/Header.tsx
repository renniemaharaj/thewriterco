import React, { useCallback, useEffect, useState, useRef } from "react";
import { IconButton, Flex, TextField, Text, Button } from "@radix-ui/themes";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useThemeContext } from "../context/theme/useThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ScanSearchIcon, SunIcon, SunMoonIcon } from "lucide-react";
import SearchLoading from "../ai/SearchLoading";
import { useSendFindReqMutation } from "../../app/api/apiSlice";
import SearchResults from "../ai/SearchResults";
import { Block, ResponseBlock, Scripture } from "../ai/types";
import { useTransitionNavigation } from "../hooks/useTransitionNavigation";
import Link from "../link/Link";

const navLinks = [
  { label: "Studies", href: "/studies", disabled: false },
  { label: "KJV", href: "/kjv" },
  //&
  { label: "AI", href: "/ai" },
  { label: "Pool", href: "/doc/geminiPool" },
  //*s
];
const emptyBlock: Block = {
  role: "system",
  type: "scripture",
  content: {
    type: "scripture",
    verses: [],
  },
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, specifyTheme } = useThemeContext();
  const eReaderState = useSelector((state: RootState) => state.ereader);

  const { navigateWT } = useTransitionNavigation();
  const [localSearchState, setLocalSearchState] = useState("");
  const [sendFindReq, { isLoading }] = useSendFindReqMutation();
  const [block, setBlock] = useState<Block>(emptyBlock);
  const [displayResults, setDisplayResults] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const handleFindReq = useCallback(
    async (input: string) => {
      try {
        const data = await sendFindReq({ message: input }).unwrap();
        const genaiResponse = JSON.parse(data.response);

        if (!genaiResponse.responseBlocks) {
          throw new Error("Invalid AI response format: Missing responseBlocks");
        }

        genaiResponse.responseBlocks.forEach((block: ResponseBlock) => {
          if (block.type === "scripture") {
            setBlock({
              role: "model",
              type: "scripture",
              content: block.content as Scripture,
            });
            setDisplayResults(true);
          }
        });
      } catch (error) {
        console.error("Error during find request:", error);
        setBlock({
          role: "model",
          type: "scripture",
          content: {
            type: "scripture",
            verses: [],
          },
        });

        setDisplayResults(true);
      }
    },
    [sendFindReq],
  );

  useEffect(() => {
    const searchBoxForm = formRef.current;
    if (searchBoxForm) {
      const onSearchBoxFormSubmit = (e: Event) => {
        e.preventDefault();
        if (!localSearchState) return;
        handleFindReq(localSearchState);
      };
      searchBoxForm.addEventListener("submit", onSearchBoxFormSubmit);

      return () => {
        searchBoxForm.removeEventListener("submit", onSearchBoxFormSubmit);
      };
    }
  }, [handleFindReq, localSearchState]);

  useEffect(() => {
    const searchBox = searchBoxRef.current;
    if (searchBox) {
      const onSearchBoxFocus = (e: Event) => {
        searchBox.style.transition = "width 0.3s";
        searchBox.style.width = "250px";
        searchBox.placeholder = "Ask anything in plain English 🧐";
        e.preventDefault();
      };

      const onSearchBoxBlur = (e: Event) => {
        searchBox.style.width = "200px";
        searchBox.placeholder = "Query relative scripture";
        e.preventDefault();
      };

      searchBox.addEventListener("focus", onSearchBoxFocus);
      searchBox.addEventListener("blur", onSearchBoxBlur);

      return () => {
        searchBox.removeEventListener("focus", onSearchBoxFocus);
        searchBox.removeEventListener("blur", onSearchBoxBlur);
      };
    }
  }, [searchBoxRef]);

  return (
    <>
      <SearchResults
        displayResults={displayResults}
        block={block}
        onOpenChange={setDisplayResults}
      />

      <Flex
        data-testid="header"
        className={`w-full !justify-evenly py-2 shadow-md sticky top-0 blurred-div !rounded-none transition-all ${eReaderState.isOpen ? "z-0" : "z-10"}`}
      >
        <Flex className="gap-4 flex-row md:flex-row items-center justify-between px-4">
          <Text
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigateWT("/")}
          >
            TheWriterCo
          </Text>

          {/* Search Bar - Hidden on Small Screens */}
          <form
            ref={formRef}
            className="hidden md:flex items-center gap-3 max-w-lg"
          >
            <TextField.Root
              ref={searchBoxRef}
              onChange={(e) => setLocalSearchState(e.target.value)}
              value={localSearchState}
              type="text"
              className="transition-all"
              placeholder="Query relative scripture"
              size="2"
            />
            <IconButton
              disabled={isLoading}
              type="submit"
              aria-label="Search"
              variant="soft"
              // highContrast
            >
              <ScanSearchIcon width="18" height="18" />
            </IconButton>
            <SearchLoading isLoading={isLoading} />
          </form>

          {/* Theme Toggle & Menu Button */}
          <Flex className="items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => specifyTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:block"
            >
              {theme === "dark" ? (
                <SunMoonIcon className="w-6 h-6 text-white animate-pulse" />
              ) : (
                <SunIcon className="w-6 h-6 text-yellow-400 animate-pulse" />
              )}
            </Button>
          </Flex>
        </Flex>

        {/* Navigation */}
        <Flex className="items-center">
          {/* Hamburger Menu */}
          <IconButton
            variant="soft"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation"
            className="flex md:!hidden flex-col"
          >
            {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </IconButton>

          {/* Navigation Links */}
          <ul className={`md:flex hidden space-x-6 mt-2 md:mt-0 items-center`}>
            {navLinks.map(
              (link, index) =>
                !link.disabled && (
                  <li key={index}>
                    <Link href={link.href} animate>
                      {link.label}
                    </Link>
                  </li>
                ),
            )}
          </ul>
        </Flex>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <Flex className="flex md:!hidden flex-col items-center py-4 w-full">
            <ul className="space-y-4">
              {navLinks.map(
                (link, index) =>
                  !link.disabled && (
                    <li key={index}>
                      <Link href={link.href} animate>
                        {link.label}
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Navbar;
