import Page from "../../pkg/page/Page";
import Editor from "../../pkg/writer/Editor";

const Writer = () => {
  return (
    <Page wrapChildren title="Writer" description="Online Writer">
      <Editor />
    </Page>
  );
};

export default Writer;
