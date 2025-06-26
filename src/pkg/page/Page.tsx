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
// import { setEBook } from "../../app/ereader/ereaderSlice";
// import { initialState } from "../../app/ereader/utils";

import light from "../../assets/Light.jpg";
import { RootState } from "../../app/store";

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
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "hidden";
    };
  }, []);

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [isPending, path]);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setEBook(initialState.eContent));
  // }, [dispatch]);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${light})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(2px)",
        }}
        className="absolute inset-0 z-[-1] opacity-50 !top-0 !left-0 w-[100vw] h-[100vh]"
      />
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
      <Flex
        direction="column"
        align="center"
        justify="center"
        className={`!w-full md:!w-[99%] !flex-col !mx-auto pb-20 blurred-div-light`}
      >
        {wrapChildren && (
          <Card
            className={`w-full blurred-div !py-3 top-3 ${className} ${orientation === "horizontal" ? "!px-3" : "!px-0"}`}
          >
            <Flex
              data-testid="heroElement"
              className={`!flex-col !gap-10 !w-full !max-w-full`}
            >
              {hero}
            </Flex>
            {children}
          </Card>
        )}
        {!wrapChildren && (
          <>
            {hero}{" "}
            {isPending ? (
              <Block />
            ) : (
              <Flex className="!flex-col !gap-10">
                <Separator size={"2"} className="mx-auto mt-10" />
                {children}
              </Flex>
            )}
          </>
        )}
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
