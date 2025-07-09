import { useState } from "react";
import { IconButton, Flex, Text, Separator } from "@radix-ui/themes";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useTransitionNavigation } from "../hooks/useTransitionNavigation";
import Link from "../link/Link";
import ThemeButton from "./ThemeButton";
import Search from "./search/Search";
import Auth from "../firebase/auth/component/Auth";

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
        className={`w-full !justify-evenly py-2 shadow-md sticky top-0 blurred-div !rounded-none transition-all ${readerState.isOpen ? "z-0" : "z-10"}`}
      >
        <Flex className="gap-4 flex-row md:flex-row items-center justify-between px-4">
          <Text
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigateWT("/")}
          >
            TheWriterCo
          </Text>

          {/* Search Bar - Hidden on Small Screens */}
          <Search
            placeHolderOnFocus="Filter by keywords 🧐"
            placeholderOnBlur="Discover"
            disabled={false}
          />
          {/* Theme Toggle & Menu Button */}
          <ThemeButton />
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
          <ul className={`md:flex hidden gap-2 mt-2 md:mt-0`}>
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
            <Separator orientation="vertical" className="my-auto" />
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
