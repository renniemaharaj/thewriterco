import { Card, Flex, IconButton, Separator, Text } from "@radix-ui/themes";
import Navbar from "./NavBar";
import Ereader from "../bible/Ereader";
import Footer from "./Footer";
import { ReactNode, useEffect, useState } from "react";
import { ChevronRightIcon, HomeIcon } from "lucide-react";

const Page = ({
  children,
  hideBiblePicker = true,
  wrapChildren = false,
}: {
  children: ReactNode;
  hideBiblePicker?: boolean;
  wrapChildren?: boolean;
}) => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "hidden";
    };
  }, []);

  const [locationParts, setLocationParts] = useState<string[]>([]);

  useEffect(() => {
    setLocationParts(window.location.pathname.split("/"));
  }, []);

  const upperCaseFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      {/* <Navbar /> */}
      <Navbar />
      <section className="p-0 w-full">
        <div className="flex flex-row w-full p-5 gap-2 items-center">
          {locationParts.length > 0 && (
            <IconButton
              variant="soft"
              onClick={() => (location.href = "/")}
              aria-label="Go to Home"
              className="hover:scale-105 transition-transform duration-150 !cursor-pointer"
            >
              <HomeIcon />
            </IconButton>
          )}
          {locationParts.map((part, index) => (
            <div key={index} className="flex items-center gap-2">
              <Text color="gray">{upperCaseFirstLetter(part)}</Text>
              {index < locationParts.length - 1 && (
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </section>
      <Ereader hidePicker={hideBiblePicker} />
      <Flex className="!w-full animate-fade-in !flex-col merriweather-bold !p-0">
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="w-full md:!w-[80%] mx-auto pb-20"
        >
          {wrapChildren && <Card className="!p-5">{children}</Card>}
          {!wrapChildren && children}
        </Flex>
      </Flex>
      <Separator size={"4"} />
      <Separator size={"4"} />
      {/* <Footer /> */}
      <Footer />
    </>
  );
};

export default Page;
