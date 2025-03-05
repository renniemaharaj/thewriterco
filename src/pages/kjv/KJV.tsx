import Bible from "../../components/bible/Bible";

import { EBook } from "../../app/ereader/types";
import { useDispatch } from "react-redux";
import { setEBook, setRenderStyle } from "../../app/ereader/ereaderSlice";
import Page from "../../components/page/Page";
import { Flex, Text } from "@radix-ui/themes";
import Hero from "../../components/Hero";
// import Footer from "../../components/additional/footer";
// import Footer from "../../components/Footer";
const KJV = () => {
  const dispatch = useDispatch();
  const setEreaderState = (eBook: EBook) => {
    // Dispatch to Redux store
    dispatch(setEBook(eBook));

    // Set the render style to "bible"
    dispatch(setRenderStyle("bible"));
  };
  return (
    <Page
      wrapChildren={true}
      title="KJV Bible"
      description="Read the KJV Bible"
      hero={
        <Hero
          header="The Word of God"
          subHeader="KJV"
          hint={
            <Text>
              The Writer Company is KJV only. We are against the subtle
              conditioning towards an ultimate acceptance of a watered-down
              bible version. 😬
            </Text>
          }
        />
      }
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="w-full md:!w-[80%] mx-auto"
      >
        {/* <Sword />*/}
        <Bible setEBook={setEreaderState} />
      </Flex>
    </Page>
  );
};

export default KJV;
