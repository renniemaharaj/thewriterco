import Bible from "../../components/bible/Bible";

import { EBook } from "../../app/ereader/types";
import { useDispatch } from "react-redux";
import { setEBook, setRenderStyle } from "../../app/ereader/ereaderSlice";
import Page from "../../components/page/Page";
import { Flex } from "@radix-ui/themes";
// import Footer from "../../components/additional/footer";
// import Footer from "../../components/Footer";
const Index = () => {
  const dispatch = useDispatch();
  const setEreaderState = (eBook: EBook) => {
    // Dispatch to Redux store
    dispatch(setEBook(eBook));

    // Set the render style to "bible"
    dispatch(setRenderStyle("bible"));
  };
  return (
    <Page wrapChildren={true}>
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

export default Index;
