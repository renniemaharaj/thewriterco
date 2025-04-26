import { Card, Flex, Separator } from "@radix-ui/themes";
import Navbar from "./Header";
import Reader from "../bible/Reader";
import Footer from "./Footer";
import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Sizer from "./Sizer";
import { useTransitionNavigation } from "../hooks/useTransitionNavigation";
import Block from "../Block";
import Toast from "../toast/Toast";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

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
  const { isPending, path } = useTransitionNavigation();

  const { toasts } = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "hidden";
    };
  }, []);

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [isPending, path]);

  return (
    <>
      {toasts.length > 0 &&
        toasts.map((toast, index) => (
          <Toast key={index} message={toast.message} success={toast.success} />
        ))}
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
      <Reader hidePicker={hideBiblePicker} />
      {/* <Flex className="!w-full animate-fade-in !flex-col merriweather-bold !p-2"> */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        className={`!w-full md:!w-[90%] !flex-col !mx-auto pb-20  ${className}`}
      >
        {wrapChildren && (
          <Card className={`!p-5 !max-w-full ${className}`}>
            <Flex
              data-testid="heroElement"
              className="!flex-col !gap-10  !w-full !max-w-full"
            >
              {hero}
              <Separator size={"2"} className="mx-auto" />
              {children}
            </Flex>
          </Card>
        )}
        {!wrapChildren && [hero, isPending ? <Block /> : <div>{children}</div>]}
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
