import { Flex, Separator } from "@radix-ui/themes";
import Navbar from "./additional/NavBar";
import Ereader from "./additional/Ereader";
import Footer from "./Footer";
import { ReactNode, useEffect, useState } from "react";
import { ChevronRightIcon, HomeIcon } from "lucide-react";

const Page = ({
  children,
  hideBiblePicker = true,
}: {
  children: ReactNode;
  hideBiblePicker?: boolean;
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

  const classNameURL =
    "text-yellow-500 hover:text-yellow-700 cursor-pointer transition-colors duration-200";
  return (
    <>
      {/* <Navbar /> */}
      <Navbar />
      <section className="p-0 w-full">
        <div className="flex flex-row w-full p-5 gap-2 items-center">
          {locationParts.length > 0 && (
            <button
              onClick={() => (location.href = "/")}
              aria-label="Go to Home"
              className="hover:scale-105 transition-transform duration-150"
            >
              <HomeIcon className="w-5 h-5 text-yellow-500 hover:text-yellow-700" />
            </button>
          )}
          {locationParts.map((part, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={classNameURL}>{part}</span>
              {index < locationParts.length - 1 && (
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </section>
      <Ereader hidePicker={hideBiblePicker} />
      <Flex className="!w-full animate-fade-in !flex-col merriweather-bold !p-0">
        {children}
      </Flex>
      <Separator size={"4"} />
      <Separator size={"4"} />
      {/* <Footer /> */}
      <Footer />
    </>
  );
};

export default Page;
