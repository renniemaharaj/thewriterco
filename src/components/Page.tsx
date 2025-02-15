import { Flex, Separator } from "@radix-ui/themes";
import Navbar from "./additional/NavBar";
import Ereader from "./additional/Ereader";
import Footer from "./Footer";
import { ReactNode, useEffect } from "react";

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
  return (
    <>
      {/* <Navbar /> */}
      <Navbar />
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
