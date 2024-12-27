import React, { useCallback, useEffect, useState } from "react";
import {
  Link,
  IconButton,
  Flex,
  TextField,
  Box,
  Text,
  Button,
  Separator,
} from "@radix-ui/themes";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useThemeContext } from "../context/useThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { MoonIcon, ScanSearchIcon, SunIcon } from "lucide-react";
import SearchLoading from "../SearchLoading";
import { useSendFindReqMutation } from "../../app/api/apiSlice";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";
import SearchResults, { Result } from "./SearchResults";

type NavLink = {
  label: string;
  href: string;
  disabled?: boolean;
};

const navLinksArray: NavLink[] = [
  { label: "About", href: "#footer", disabled: false },
  { label: "Articles", href: "#articles", disabled: false },
  { label: "Biblical", href: "#biblical", disabled: false },
  { label: "Sources", href: "#footer", disabled: false },
  { label: "Deducer", href: "/deducer", disabled: false },
  { label: "Home", href: "/boarding", disabled: false },
];

const Navbar: React.FC = () => {
  const [navLinks] = useState<NavLink[]>(navLinksArray);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, specifyTheme } = useThemeContext();

  const eReaderState = useSelector((state: RootState) => state.ereader);

  const linkHoverClassName =
    theme === "light" ? "after:bg-gray-900" : "after:bg-gray-100";
  const linkClassName = `text-gray-700 relative after:content-[''] after:block after:h-0.5 after:scale-x-0 
    hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left`;

  const formRef = React.useRef<HTMLFormElement>(null);
  const [localSearchState, setLocalSearchState] = useState("");

  const [sendFindReq, { isLoading }] = useSendFindReqMutation();

  const [displayedResults, setDisplayedResults] = useState<Result[]>([]);
  const [displayResults, setDisplayResults] = useState(false);

  const handleFindReq = useCallback(
    async (input: string) => {
      try {
        // alert("Searching for: " + input);
        const response = await sendFindReq({
          message: input,
        }).unwrap();
        const formattedResponse = response.response;
        // console.log("Response from find request:", formattedResponse.toString);
        setDisplayedResults(JSON.parse(JSON.stringify(formattedResponse)));
        setDisplayResults(true);
      } catch (error) {
        console.error("Error during find request:", error);
        setDisplayedResults([]);
        setDisplayResults(true);
      }
    },
    [input, sendFindReq],
  );

  useEffect(() => {
    const searchBox = formRef.current;
    if (searchBox) {
      searchBox.onsubmit = (e) => {
        e.preventDefault();
        handleFindReq(localSearchState);
      };
    }
  }, [handleFindReq, localSearchState]);

  return (
    <Box
      className={`py-4 !rounded-none transition-all shadow-md sticky top-0 z-10 blurred-div !overflow-hidden ${
        eReaderState.isOpen
          ? "!z-0 relative left-[50%] translate-x-[-50%] "
          : "w-full"
      }`}
    >
      <SearchResults
        displayResults={displayResults}
        displayedResults={displayedResults}
        onOpenChange={setDisplayResults}
      />
      <Flex
        align={"center"}
        className="container mx-auto flex !justify-between !items-center !px-1 !gap-2 !max-w-5xl"
      >
        {/* Logo Section */}
        <Text as="div" size="4" weight="bold">
          TheWriterCo
        </Text>

        {/* Centered Search Bar */}
        <Flex
          justify="center"
          align="center"
          className="!w-full max-w-[400px] !md:w-auto !gap-4"
        >
          <form ref={formRef} className="flex gap-2 w-full max-w-lg">
            <TextField.Root
              onChange={(e) => setLocalSearchState(e.target.value)}
              value={localSearchState}
              type="text"
              id="article-search-box-id"
              placeholder="Search the bible in pure english"
              className="w-full"
            />
            <IconButton disabled={isLoading} type="submit" aria-label="Search">
              <ScanSearchIcon aria-label="Search" width="18" height="18" />
            </IconButton>
            <SearchLoading isLoading={isLoading} />
          </form>
          <div className="md:hidden">
            <IconButton
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
            </IconButton>
          </div>

          {/* <Flex
            align={"end"}
            justify={"center"}
            className="!w-full p-2 !justify-center"
          > */}
          <Separator size="2" orientation={"vertical"} />
          <Button className="!sticky !top-0" variant="ghost">
            {theme === "dark" ? (
              <MoonIcon
                className="!w-6 !h-6 !text-white animate-pulse"
                onClick={() => specifyTheme("light")}
              />
            ) : (
              <SunIcon
                className="!w-6 !h-6 !text-yellow-400 animate-pulse"
                onClick={() => specifyTheme("dark")}
              />
            )}
          </Button>
          {/* </Flex> */}
        </Flex>
        {/* <Separator size="2" orientation={"vertical"} /> */}
        {/* Navigation Links (Hidden on smaller screens) */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(
            (link, index) =>
              !link.disabled && (
                <li key={"md-" + link.href + index}>
                  <Link
                    underline="none"
                    color="gray"
                    href={link.href}
                    className={`${linkHoverClassName} ${linkClassName}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ),
          )}
        </ul>
      </Flex>

      {/* Collapsible Menu (Small Screens) */}
      {isMenuOpen && (
        <Flex className="md:hidden mt-4">
          <ul className="space-y-4 px-4 py-2">
            {navLinks.map(
              (link, index) =>
                !link.disabled && (
                  <li key={"sm-" + link.href + index}>
                    <Link
                      underline="none"
                      color="gray"
                      href={link.href}
                      className={`${linkHoverClassName} ${linkClassName}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
            )}
          </ul>
        </Flex>
      )}
    </Box>
  );
};

export default Navbar;
