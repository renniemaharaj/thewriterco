import { Card, Flex, Separator } from "@radix-ui/themes";
import Navbar from "./Header";
import Ereader from "../bible/Ereader";
import Footer from "./Footer";
import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Sizer from "./Sizer";

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
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "hidden";
    };
  }, []);

  return (
    <>
      <Helmet>
        {title !== "" && <title>{`TheWriterCo - ${title}`}</title>}
        {description !== "" && (
          <meta name="description" content={description} />
        )}
      </Helmet>
      <Sizer />
      {/* <Navbar /> */}
      <Navbar />
      <section className="p-2 w-full max-w-full">
        {/* <LocationTile /> */}
      </section>
      <Ereader hidePicker={hideBiblePicker} />
      {/* <Flex className="!w-full animate-fade-in !flex-col merriweather-bold !p-2"> */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        className={`!w-full md:!w-[90%] !flex-col !mx-auto pb-20  ${className}`}
      >
        {wrapChildren && (
          <Card className={`!p-5 !max-w-full ${className}`}>
            <Flex className="!flex-col !gap-10  !w-full !max-w-full">
              {hero}
              <Separator size={"2"} className="mx-auto" />
              {children}
            </Flex>
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
