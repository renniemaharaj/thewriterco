import { Text, Button, Flex, Separator } from "@radix-ui/themes";
import Page from "../../components/page/Page";
import Hero from "../../components/Hero";

export default function NoPage() {
  return (
    <Page
      wrapChildren
      title="404 - Page Not Found"
      description="Page not found"
      hero={
        <Hero
          header="Welcome to"
          subHeader={
            <>
              The Writer <br />
              Company
            </>
          }
          hint={
            <>
              We're here to give reasoning for faith; reinforcement to your
              shield 🛡️ Wherewith ye shall quench all the fiery darts of the
              wicked. For his bow is set with a fiery deception 🏹
            </>
          }
        />
      }
    >
      <Text as="div" color="red" className="!w-full !text-center animate-pulse">
        Oops! This page doesn't exist 😔
      </Text>

      <Separator size="4" className="m-4" />

      <Flex direction="column" align="center" gap="3">
        <Button
          onClick={() => (window.location.href = "/")}
          variant="soft"
          aria-label="Go to Homepage"
          className="!w-full"
        >
          Go Home
        </Button>

        <Flex gap="3" className="!w-full">
          <Button
            onClick={() => (window.location.href = "/ai")}
            variant="soft"
            className="!flex-1"
            aria-label="Visit TheWriterCo AI"
          >
            TheWriterCo AI
          </Button>
          <Button
            onClick={() => (window.location.href = "/reasoning")}
            variant="soft"
            className="!flex-1"
            aria-label="Read Rationale"
          >
            Rationale
          </Button>
        </Flex>
      </Flex>
    </Page>
  );
}
