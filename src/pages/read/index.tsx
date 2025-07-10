import Page from "../../pkg/page/Page";
import Documentation from "../../pkg/docs/Documentation";

const Index = () => {
  return (
    <Page
      title="Rationale"
      wrapChildren
      className="!overflow-visible"
      description="Read articles, poetry, theological material and more"
    >
      {/* Actual documentation */}
      <Documentation />
    </Page>
  );
};

export default Index;
