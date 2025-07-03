import { Card, Flex, Separator } from "@radix-ui/themes";
import Navbar from "./Header";
import Reader from "../bible/reader/Reader";
import Footer from "./Footer";
import { ReactNode, useEffect } from "react";
import Sizer from "./Sizer";
import { useTransitionNavigation } from "../hooks/useTransitionNavigation";
import Block from "./Block";
import { useDispatch, useSelector } from "react-redux";

// import light from "../../assets/Light.jpg";
import { RootState } from "../../app/store";
import { motion } from "framer-motion";
import Seo from "./Seo";
import { pushResult } from "../../app/page/pageSlice";
import usePageActions from "./hooks/usePageActions";
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

  const pageActions = usePageActions();

  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [isPending, path]);

  useEffect(() => {
    pageActions.forEach((action) => {
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
  return (
    <div>
      {/** React Helmet */}
      <Seo title={title} description={description} />

      {/** Records page orientation */}
      <Sizer />

      {/* <Navbar /> */}
      <Navbar />

      {/** Voice reader */}
      <Reader hidePicker={hideBiblePicker} />

      {/** Page body*/}
      <Flex
        direction="column"
        align="center"
        justify="center"
        className={`!w-full !flex-col !mx-auto pb-20 blurred-div-light`}
      >
        {/** Page children on motion transition in */}
        <motion.div
          key={"tabsItem"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="max-w-full"
        >
          {wrapChildren && (
            <Card
              className={`w-full blurred-div !py-6 top-3 !transition-all !delay-300 ${className} ${orientation === "horizontal" ? "!px-3" : "!px-0"}`}
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
        </motion.div>
      </Flex>

      {/* </Flex> */}
      <Separator size={"4"} />
      <Separator size={"4"} />
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default Page;
