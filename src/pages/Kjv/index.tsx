import { Flex } from "@radix-ui/themes";
import Sword from "../../components/additional/articles/Sword";

import Ereader from "../../components/additional/Ereader";
import { EBook } from "../../app/ereader/types";
import { useDispatch } from "react-redux";
import { setEBook, setRenderStyle } from "../../app/ereader/ereaderSlice";
import Navbar from "../../components/additional/NavBar";
import Footer from "../Home/Footer";
const Index = () => {
  const dispatch = useDispatch();
  const setEreaderState = (eBook: EBook) => {
    // Dispatch to Redux store
    dispatch(setEBook(eBook));

    // Set the render style to "bible"
    dispatch(setRenderStyle("bible"));
  };
  return (
    <Flex className="!w-full !flex-col merriweather-bold !p-0`">
      {/* <Navbar /> */}
      <Navbar />

      {/* <Sword />*/}
      <Sword setEBook={setEreaderState} />
      {/* <Ereader /> */}
      <Ereader />

      {/* <Footer /> */}
      <Footer />
    </Flex>
  );
};

export default Index;
