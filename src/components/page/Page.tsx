import { Card, Flex, IconButton, Separator, Text } from "@radix-ui/themes";
import Navbar from "./NavBar";
import Ereader from "../bible/Ereader";
import Footer from "./Footer";
import { ReactNode, useEffect, useState } from "react";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useThemeContext } from "../context/theme/useThemeContext";

const Page = ({
  children,
  hero,
  hideBiblePicker = true,
  wrapChildren = false,
  className,
  title,
  description,
}: {
  children: ReactNode;
  hero?: ReactNode;
  hideBiblePicker?: boolean;
  wrapChildren?: boolean;
  className?: string;
  title?: string;
  description?: string;
}) => {
  const { theme } = useThemeContext();

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
      <Helmet>
        {title !== "" && <title>{`TheWriterCo - ${title}`}</title>}
        {description !== "" && (
          <meta name="description" content={description} />
        )}
      </Helmet>

      {/* <Navbar /> */}
      <Navbar />
      <section className="p-2 w-full max-w-full">
        <div className="flex flex-row w-full max-w-full overflow-clip p-5 gap-2 items-center ">
          {locationParts.length > 0 && (
            <IconButton
              variant="soft"
              onClick={() => (location.href = "/")}
              aria-label="Go to Home"
              className={`${theme === "dark" ? "!text-white" : "!text-yellow-400"}`}
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
      {/* <Flex className="!w-full animate-fade-in !flex-col merriweather-bold !p-2"> */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        className={`!w-full md:!w-[80%] !flex-col !mx-auto pb-20 ${className}`}
      >
        {wrapChildren && (
          <Card className={`!p-5 !max-w-[100%] gap-5 ${className}`}>
            {[hero, children].map((child, index) => (
              <div key={index}>{child}</div>
            ))}
          </Card>
        )}
        {!wrapChildren && [hero, <div>{children}</div>]}
      </Flex>
      {/* </Flex> */}
      <Separator size={"4"} />
      <Separator size={"4"} />
      {/* <Footer /> */}
      <Footer />
    </>
  );
};

export default Page;
