import React, { useState } from "react";
import { Link, IconButton, Flex, TextField, Box, Text } from "@radix-ui/themes";
import {
  HamburgerMenuIcon,
  Cross1Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { useThemeContext } from "../context/useThemeContext";

type NavLink = {
  label: string;
  href: string;
  disabled?: boolean;
};

const navLinks: NavLink[] = [
  { label: "About", href: "#footer", disabled: false },
  { label: "Articles", href: "#articles", disabled: false },
  { label: "Biblical", href: "#biblical", disabled: false },
  { label: "Sources", href: "#footer", disabled: false },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useThemeContext();
  const linkHoverClassName =
    theme === "light" ? "after:bg-gray-900" : "after:bg-gray-100";
  const linkClassName = `text-gray-700 relative after:content-[''] after:block after:h-0.5 after:scale-x-0 
    hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left`;
  return (
    <Box className="py-4 shadow-md">
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
          className="!w-full max-w-[400px] !md:w-auto !gap-2"
        >
          <form
            id="article-search-box-form-id"
            className="flex gap-2 w-full max-w-lg"
          >
            <TextField.Root
              type="text"
              id="article-search-box-id"
              placeholder="Search words"
              className="w-full"
              disabled={true}
            />
            <IconButton>
              <MagnifyingGlassIcon aria-label="Search" width="18" height="18" />
            </IconButton>
          </form>
          <div className="md:hidden">
            <IconButton
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
            </IconButton>
          </div>
        </Flex>

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
        <Flex className="md:hidden border-t border-gray-200 mt-4">
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
