import { Card, Flex, Separator } from "@radix-ui/themes";
import Navbar from "./Header";
import Reader from "../bible/reader/Reader";
import Footer from "./Footer";
import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Sizer from "./Sizer";
import { useTransitionNavigation } from "../hooks/useTransitionNavigation";
import Block from "./Block";
import { useSelector } from "react-redux";

// import light from "../../assets/Light.jpg";
import { RootState } from "../../app/store";
import { motion } from "framer-motion";
// import useTheme from "../hooks/useTheme";

const Page = ({
  children,
  hero,
  hideBiblePicker = false,
  wrapChildren = false,
  className,
  title,
  description,
}: {
  children: ReactNode;
  hero?: ReactNode;
  wrapChildren?: boolean;
  hideBiblePicker?: boolean;
  className?: string;
  title?: string;
  description?: string;
}) => {
  const { isPending, path } = useTransitionNavigation();

  const { orientation } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [isPending, path]);

  return (
    <div>
      <Helmet>
        {title !== "" && <title>{`TheWriterCo - ${title}`}</title>}
        {description !== "" && (
          <meta name="description" content={description} />
        )}
      </Helmet>
      <Sizer />
      {/* <Navbar /> */}
      <Navbar />

      <Reader hidePicker={hideBiblePicker} />
      <motion.div
        key={"tabsItem"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          className={`!w-full md:!w-[99%] !flex-col !mx-auto pb-20 blurred-div-light`}
        >
          {wrapChildren && (
            <Card
              className={`w-full blurred-div !py-6 top-3 ${className} ${orientation === "horizontal" ? "!px-3" : "!px-0"}`}
            >
              <Flex
                data-testid="heroElement"
                className={`!flex-col !gap-10 !w-full !max-w-full`}
              >
                {hero}
              </Flex>
              {isPending ? <Block noPage /> : children}
            </Card>
          )}
          {!wrapChildren && (
            <>
              {hero}{" "}
              {isPending ? (
                <Block noPage />
              ) : (
                <Flex className="!flex-col !gap-10">
                  <Separator size={"2"} className="mx-auto mt-10" />
                  {children}
                </Flex>
              )}
            </>
          )}
        </Flex>
      </motion.div>

      {/* </Flex> */}
      <Separator size={"4"} />
      <Separator size={"4"} />
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default Page;
