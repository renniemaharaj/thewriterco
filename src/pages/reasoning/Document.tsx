import Page from "../../pkg/page/Page";
import Documentation from "../../pkg/docs/Documentation";

const Document = () => {
  return (
    <Page
      title="Rationale"
      wrapChildren
      className="!overflow-visible"
      description="Learn how to build study documents using our tools"
    >
      {/* Actual documentation */}
      <Documentation />
    </Page>
  );
};

export default Document;
