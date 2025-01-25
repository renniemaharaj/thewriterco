import { Flex, Separator } from "@radix-ui/themes";
// import Footer from "../../components/additional/footer";
import Navbar from "../../components/additional/NavBar";
import Hero from "../../components/additional/Hero";
// import Articles from "../../components/additional/articles/Articles";
import Sword from "../../components/additional/articles/Sword";
import Ereader from "../../components/additional/Ereader";
import { EBook } from "../../app/ereader/types";
import { useDispatch } from "react-redux";
import { setEBook, setRenderStyle } from "../../app/ereader/ereaderSlice";
import ClientExperiences from "../../components/Testamonials";

import Footer from "./Footer";

//Suppress ESLint errors
const Index: React.FC = () => {
  const dispatch = useDispatch();

  // const { theme, specifyTheme } = useThemeContext();

  const setEreaderState = (eBook: EBook) => {
    // Dispatch to Redux store
    dispatch(setEBook(eBook));

    // Set the render style to "bible"
    dispatch(setRenderStyle("bible"));
  };

  return (
    <Flex className="!w-full !flex-col merriweather-bold !p-0`">
      <ClientExperiences />
      <Navbar />
      <Hero />

      {/* <Articles /> */}
      <Separator size={"4"} />
      <Sword setEBook={setEreaderState} />
      {/* <Footer /> */}
      <Footer />
      <Ereader />
    </Flex>
  );
};

export default Index;
