import { Text, Button, Link, Flex } from "@radix-ui/themes";
import { HomeIcon } from "@radix-ui/react-icons";
import Page from "../../components/page/Page";
import Hero from "../../components/Hero";
import { useTransitionNavigation } from "../../components/hooks/useTransitionNavigation";
// import Link from "next/link";

export default function NoPage() {
  const { path } = useTransitionNavigation();
  return (
    <Page
      wrapChildren
      title="Page Not Found"
      description="404 - Page Not Found"
      hero={
        <Hero
          header="Welcome to"
          subHeader={
            <>
              The Writer <br />
              Company
            </>
          }
          // hint={<></>}
        />
      }
    >
      <div className="w-full text-center space-y-4 mt-6">
        <Flex direction="row" className="gap-2">
          <Text as="p" color="green" size="3">
            https🔒
          </Text>
          <Text as="p" color="green" size="3">
            thewriterco.com ✅
          </Text>
          <Text as="p" color="red" size="3">
            {path}
          </Text>
        </Flex>

        <Text as="div" color="red" size="5" className="animate-pulse">
          Oops! This page doesn’t exist
        </Text>

        <Text as="p" color="gray" size="3">
          You may have followed a broken link
        </Text>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/">
            <Button>
              <HomeIcon />
              Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="soft" disabled>
              Report
            </Button>
          </Link>
        </div>
      </div>
    </Page>
  );
}
