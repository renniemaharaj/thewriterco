import {
  Callout,
  Card,
  Flex,
  IconButton,
  Separator,
  Text,
} from "@radix-ui/themes";
import Navbar from "./Header";
import Reader from "../bible/Reader";
import Footer from "./Footer";
import { ReactNode, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Sizer from "./Sizer";
import { useTransitionNavigation } from "../hooks/useTransitionNavigation";
import Block from "./Block";
import { useDispatch, useSelector } from "react-redux";
import { setEBook } from "../../app/ereader/ereaderSlice";
import { initialState } from "../../app/ereader/utils";
import { initialState as initialStatePage } from "../../app/page/config";
import { RootState } from "../../app/store";
import useLocalStorage from "../hooks/useLocalStorage";
import { dismissDeclaration } from "../../app/page/pageSlice";
import { Cross1Icon } from "@radix-ui/react-icons";

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

  const { dismissedDeclaration } = useSelector(
    (state: RootState) => state.page,
  );

  const [, setValue] = useLocalStorage("pageData", initialStatePage);

  const [showDeclaration, setShowDeclaration] = useState<boolean>(
    dismissedDeclaration < 3,
  );

  const dismissDeclarationOnce = () => {
    setShowDeclaration(false);
    dispatch(dismissDeclaration(dismissedDeclaration + 1));
  };

  useEffect(() => {
    setValue({ dismissedDeclaration });
  }, [dismissedDeclaration]);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "hidden";
    };
  }, []);

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [isPending, path]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEBook(initialState.eContent));
  }, [dispatch]);

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
      <Reader hidePicker={hideBiblePicker} />
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
      {showDeclaration && (
        <Callout.Root className="relative">
          <Callout.Icon>
            <IconButton
              size="1"
              variant="soft"
              className="!relative top-2 !right-2"
              onClick={() => dismissDeclarationOnce()}
            >
              <Cross1Icon />
            </IconButton>
          </Callout.Icon>

          <Callout.Text className="flex flex-col gap-2">
            <Text className="!text-center !text-lg !font-bold">
              There was none before the Lord Jesus, the Christ. There will be
              none after Him. He is LORD. He is God. He is the great Amen; the
              faithful Witness; the Beginning of the creation of God;
              everlasting Father. No man is able to loose or to bind his own
              lusts. For this cause was He purposed before the beginning of our
              time to be the blameless Mediator between man and the unseen
              Father, begotten of the Father Himself alone; of God. So the
              Father purposed His very Word, and God made His Word to be His own
              Son, not by woman, though He entered the world through a virgin,
              but of God. Hence, He is the Son of God; holy, holy, holy.
              Therefore there is no successor to Him. For His kingdom is
              everlasting and coming in full!
            </Text>
          </Callout.Text>
        </Callout.Root>
      )}
      <Separator size={"4"} />
      {/* <Footer /> */}
      <Footer />
    </>
  );
};

export default Page;
