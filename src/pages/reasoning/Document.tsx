import Page from "../../pkg/page/Page";
import Documentation from "../../pkg/docs/Documentation";
import Hero from "../../pkg/page/Hero";
// import { TabItem } from "../../pkg/docs/Menu";

const Document = () => {
  return (
    <Page
      title="Rationale"
      wrapChildren
      className="!overflow-visible"
      description="Learn how to build study documents using our tools"
      hero={
        <Hero
          header={<>Rationale</>}
          subHeader={
            <>
              <br />
              TheWriterCo
            </>
          }
          hint={
            <>
              Here is reasoning and various other written resources for your
              faith
            </>
          }
        />
      }
    >
      {/* Actual documentation */}
      <Documentation />
    </Page>
  );
};

export default Document;
