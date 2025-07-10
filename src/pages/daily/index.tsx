import {
  Box,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
  Card,
  Callout,
} from "@radix-ui/themes";
import Hero from "../../pkg/page/Hero";
import Page from "../../pkg/page/Page";
import { useDailyReports } from "../../pkg/hooks/data/useDailyReports";
import React, { useState, useEffect, useRef } from "react";
import { Report } from "./Report"; // renamed for clarity
import { ReportObject } from "../../pkg/hooks/data/useDailyReports";
import { getRandomElement } from "./utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "../../pkg/link/Link";

const Index = () => {
  const { reports, loading, error } = useDailyReports();
  const [currentReport, setCurrentReport] = useState<ReportObject | null>(null);

  const currentReportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentReport && currentReportRef.current) {
      currentReportRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentReport]);

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
              Company
            </>
          }
          hint="Daily News Report"
        />
      }
    >
      <Box mt="5" className="!flex !items-center !justify-center">
        {loading && (
          <Flex justify="center" align="center" p="5">
            <Spinner />
          </Flex>
        )}

        {error && (
          <Text color="red" align="center">
            {error}
          </Text>
        )}

        {!loading && !error && currentReport && (
          <Card ref={currentReportRef} size="4" variant="classic" mb="6">
            <Flex direction={{ initial: "column", md: "row" }} gap="5">
              <img
                src={getRandomElement(currentReport.images ?? [])}
                alt={currentReport.title}
                style={{
                  width: "100%",
                  maxWidth: 350,
                  maxHeight: 350,
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <Flex direction="column" justify="center" gap="3">
                <Heading size="5">{currentReport.title}</Heading>
                <Text color="gray">
                  {new Date(currentReport.date).toLocaleDateString()}
                </Text>
                <Text>{currentReport.summary}</Text>
                <Flex gap="2" wrap="wrap">
                  {currentReport.tags.map((tag) => (
                    <Text size="1" color="blue" key={tag}>
                      #{tag}
                    </Text>
                  ))}
                </Flex>
                <Link href={currentReport.url} external>
                  Read full report →
                </Link>
              </Flex>
            </Flex>
          </Card>
        )}

        {!loading && !error && (
          <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
            {reports.map((report, index) => (
              <React.Fragment key={`report-${index}`}>
                <Report
                  report={report}
                  onFocus={() => setCurrentReport(report)}
                />
              </React.Fragment>
            ))}
          </Grid>
        )}
      </Box>
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          You can track the progress of our new golang, news scraper or
          contribute to it's development on{" "}
          <Link external href="https://github.com/renniemaharaj/news-go">
            Git Source
          </Link>
        </Callout.Text>
      </Callout.Root>
    </Page>
  );
};

export default Index;
