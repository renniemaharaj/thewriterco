import { useSelector } from "react-redux";
import { useOrientation } from "../../pkg/hooks/useOrientation";
import Page from "../../pkg/page/Page";
import Editor from "../../pkg/writer/Editor";
import Renderer from "../../pkg/writer/Renderer";
import { turn_screen } from "./art/turn_screen";
import { RootState } from "../../app/store";

const Writer = () => {
  const fullscreen = useSelector((state: RootState) => state.writer.fullscreen);
  const orientation = useOrientation();
  return (
    <Page
      wrapChildren
      hideBiblePicker={false}
      returnChildren={fullscreen}
      className="!overflow-visible"
      title="Online Writer"
      description="The cleanest, most feature-rich online writer for modern writers"
    >
      {orientation === "horizontal" ? (
        <Editor />
      ) : (
        <Renderer content={turn_screen} />
      )}
    </Page>
  );
};

export default Writer;
