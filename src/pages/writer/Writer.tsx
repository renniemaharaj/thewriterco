import Hero from "../../pkg/page/Hero";
import Page from "../../pkg/page/Page";
import Editor from "../../pkg/writer/Editor";

const Writer = () => {
  return (
    <Page
      wrapChildren
      title="Writer"
      description="Online Writer"
      hero={
        <Hero
          header="Welcome to"
          subHeader={
            <>
              The Writer <br />
              Company
            </>
          }
        />
      }
    >
      <Editor />
    </Page>
  );
};

export default Writer;
