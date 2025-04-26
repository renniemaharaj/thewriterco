import { Text, Button, Link, Flex, Badge } from "@radix-ui/themes";
import Page from "../../components/page/Page";
import Hero from "../../components/page/Hero";
import { useTransitionNavigation } from "../../components/hooks/useTransitionNavigation";
import { FlagIcon, HomeIcon } from "lucide-react";
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
        <Flex align={"center"} direction="row" className="gap-1">
          {/* <Text as="p" color="green" size="3">
            
          </Text> */}
          <Badge color="gold">🔒 https</Badge>
          {/* <Text as="p" color="green" size="3"></Text> */}
          <Badge color="green">thewriterco.com</Badge>
          <Badge color="green">/</Badge>
          <Badge color="red" className="animate-pulse">
            {" "}
            {path}
          </Badge>
        </Flex>

        <Text as="div" color="red" size="3" className="animate-pulse">
          Oops! This page doesn’t exist
        </Text>

        <Text as="p" color="gray" size="3">
          You may have followed a broken link
        </Text>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/">
            <Button size="1" variant="soft">
              <HomeIcon className="scale-75" />
              Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="1" variant="soft" disabled>
              <FlagIcon className="scale-75" />
              Report
            </Button>
          </Link>
        </div>
      </div>
    </Page>
  );
}
