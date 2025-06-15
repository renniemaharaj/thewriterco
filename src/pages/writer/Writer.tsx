import Page from "../../pkg/page/Page";
import Editor from "../../pkg/writer/Editor";

const Writer = () => {
  return (
    <Page
      wrapChildren
      title="Online Writer"
      description="The cleanest, most feature-rich online writer for modern writers"
    >
      <Editor />
    </Page>
  );
};

export default Writer;
