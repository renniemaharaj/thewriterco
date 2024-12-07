import { Flex, Separator } from "@radix-ui/themes";
import Footer from "../../components/additional/footer";
import Navbar from "../../components/additional/NavBar";
import Hero from "../../components/additional/Hero";
import Articles from "../../components/additional/articles/Articles";
import Sword from "../../components/additional/articles/Sword";
import Hint from "../../components/Hint";
import ThemeSwitcher from "../../components/additional/ThemeSwitcher";
import Ereader from "../../components/additional/Ereader";
import { EBook } from "../../app/ereader/types";
import { useDispatch } from "react-redux";
import { setEBook, setRenderStyle } from "../../app/ereader/ereaderSlice";

//Suppress ESLint errors
const Index: React.FC = () => {
  const dispatch = useDispatch();
  const setEreaderState = (eBook: EBook) => {
    // Dispatch to Redux store
    dispatch(setEBook(eBook));

    // Set the render style to "bible"
    dispatch(setRenderStyle("bible"));
  };

  return (
    <Flex className="!w-full !flex-col merriweather-bold`">
      <Navbar />

      <Flex align={"center"} className="!w-full p-2 !justify-center">
        <Hint className="max-w-[450px]">
          Please feel free to choose your preferred theme. Default should be
          system detected.
        </Hint>
        <ThemeSwitcher className="!max-w-fit" />
      </Flex>

      <Hero />

      <Separator size={"4"} />
      <Articles />
      <Sword setEBook={setEreaderState} />

      <Footer />

      <Ereader />
    </Flex>
  );
};

export default Index;
