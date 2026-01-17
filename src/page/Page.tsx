import { Card, Flex, Separator } from "@radix-ui/themes";
import { type ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import Reader from "../pkg/bible/reader/Reader";
import Block from "./Block";
import Footer from "./Footer";
import Navbar from "./Header";
import { motion } from "framer-motion";
import { pushResult } from "../app/page/pageSlice";
import { useTransitionNavigation } from "../pkg/hooks/useTransitionNavigation";
import Seo from "./Seo";
import usePageActions from "./hooks/usePageActions";

const Page = ({
  children,
  wrapChildren = false,
  returnChildren = false,
  hideBiblePicker = false,
  description,
  className,
  hero,
  title,
}: {
  children: ReactNode;
  returnChildren?: boolean;
  wrapChildren?: boolean;
  hideBiblePicker?: boolean;
  description?: string;
  className?: string;
  hero?: ReactNode;
  title?: string;
}) => {
  const { isPending, path } = useTransitionNavigation();

  const pageActions = usePageActions();

  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [isPending, path]);

  useEffect(() => {
    pageActions.forEach(action => {
      dispatch(pushResult(action));
    });
  }, [dispatch, pageActions]);

  useEffect(() => {
    dispatch(
      pushResult({
        route: "Catalogue",
        title: "Documentation",
        hint: "Discover poetry, articles, axioms, verbose, creativity, pro christianity, pro kjv and other Christian writings",
        action: { menu: "" },
      }),
    );
  }, [dispatch]);

  if (returnChildren)
    return [
      children,
      <Reader hidePicker={hideBiblePicker} />,
      <Seo title={title} description={description} />,
    ];
  else
    return (
      <div className="w-full">
        <Seo title={title} description={description} />

        <Navbar />

        {/** Voice reader */}
        <Reader hidePicker={hideBiblePicker} />

        {/** Page body*/}
        <Flex
          direction="column"
          align="center"
          justify="center"
          className={`!w-full !flex-col !mx-auto py-12 md:py-16 px-4 sm:px-6`}
        >
          {/** Page children on motion transition in */}
          <motion.div
            key={"tabsItem"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full max-w-6xl"
          >
            {wrapChildren && (
              <Card
                className={`w-full blurred-div !py-0 !px-0 !min-w-[300px] !transition-all !delay-300 ${className}`}
              >
                <Flex data-testid="heroElement" className={`!flex-col !gap-8 md:!gap-10 !w-full !max-w-full !py-8 md:!py-12 !px-4 sm:!px-6 md:!px-8`}>
                  {hero}
                </Flex>
                {isPending ? <Block /> : children}
              </Card>
            )}
            {!wrapChildren && (
              <>
                {hero}
                {isPending ? (
                  <Block />
                ) : (
                  <Flex className="!flex-col !gap-8 md:!gap-10 !w-full">
                    <Separator size={"2"} className="mx-auto mt-8 md:mt-10" />
                    {children}
                  </Flex>
                )}
              </>
            )}
          </motion.div>
        </Flex>

        <Separator className="mx-auto" size={"4"} />
        <Footer />
      </div>
    );
};

export default Page;
