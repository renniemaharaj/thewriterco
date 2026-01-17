import { Flex } from "@radix-ui/themes";
import React from "react";
import Hero from "../../page/Hero";
import Page from "../../page/Page";
import Current from "./Current";
import { Report } from "./Report"; // renamed for clarity
import useReportReducers from "./hooks/useReportReducers";
import useSocketHandler from "./hooks/useSocketHandler";

const Index = () => {
  const { state } = useReportReducers();
  // eslint-disable-next-line no-empty-pattern
  const {} = useSocketHandler();

  return (
    <Page
      wrapChildren
      title="Daily Reports"
      description="Daily reports and news by the writer company"
      hero={
        <Hero
          header="Welcome to"
          subHeader={
            <>
              The Writer <br />
              Company Daily
            </>
          }
        />
      }
    >
      <Flex mt="5" className="flex-col !items-center !justify-center">
        <Current />

        <Flex className="!flex-col gap-4 !w-full">
          {state.map((report, index) => (
            <React.Fragment key={`report-${index}`}>
              <Report report={report} />
            </React.Fragment>
          ))}
        </Flex>
      </Flex>
    </Page>
  );
};

export default Index;
