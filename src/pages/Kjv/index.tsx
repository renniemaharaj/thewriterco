import Sword from "../../components/additional/articles/Sword";

import { EBook } from "../../app/ereader/types";
import { useDispatch } from "react-redux";
import { setEBook, setRenderStyle } from "../../app/ereader/ereaderSlice";
import Page from "../../components/Page";
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
    <Page>
      {/* <Sword />*/}
      <Sword setEBook={setEreaderState} />
    </Page>
  );
};

export default Index;
