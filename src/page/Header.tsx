import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Separator, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import Auth from "../pkg/firebase/auth/component/Auth";
import { useTransitionNavigation } from "../pkg/hooks/useTransitionNavigation";
import Link from "../pkg/link/Link";
import ThemeButton from "./ThemeButton";
import Search from "./search/Search";

const navLinks = [
  { label: "Writer", href: "/writer", disabled: false },
  { label: "KJV", href: "/kjv" },
  { label: "Read", href: "/read" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const readerState = useSelector((state: RootState) => state.reader);

  const { navigateWT } = useTransitionNavigation();

  return (
    <>
      <Flex
        data-testid="header"
        className={`w-full !justify-between py-3 md:py-4 px-4 md:px-6 shadow-sm sticky top-0 blurred-div !rounded-none transition-all ${readerState.isOpen ? "z-0" : "z-10"}`}
      >
        <Flex className="gap-4 md:gap-6 items-center justify-start flex-1">
          <Text className="text-2xl md:text-3xl font-bold cursor-pointer hover:opacity-80 transition-opacity text-slate-900 dark:text-white" onClick={() => navigateWT("/")}>
            TheWriterCo
          </Text>

          {/* Search Bar - Hidden on Small Screens */}
          <div className="hidden md:block flex-1 max-w-sm ml-4">
            <Search
              placeHolderOnFocus="Filter by keywords 🧐"
              placeholderOnBlur="Discover"
              disabled={false}
            />
          </div>
        </Flex>

        {/* Right Side: Theme Toggle & Navigation */}
        <Flex className="gap-2 md:gap-4 items-center">
          {/* Search Bar - Mobile */}
          <div className="md:hidden flex-1">
            <Search
              placeHolderOnFocus="Search 🧐"
              placeholderOnBlur="Search"
              disabled={false}
            />
          </div>
          
          {/* Theme Toggle */}
          <ThemeButton />
          
          {/* Hamburger Menu */}
          <IconButton
            variant="soft"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation"
            className="flex md:!hidden"
            size="2"
          >
            {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </IconButton>

          {/* Navigation Links - Desktop */}
          <ul className={`hidden md:flex gap-1 items-center`}>
            {navLinks.map(
              (link, index) =>
                !link.disabled && (
                  <li key={index}>
                    <Link href={link.href} animate as="button">
                      {link.label}
                    </Link>
                  </li>
                ),
            )}
            <Separator orientation="vertical" className="my-auto mx-2" />
            <li>
              <Auth variant="image" />
            </li>
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
