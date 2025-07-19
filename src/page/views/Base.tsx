import { Text, Button, Link, Flex, Badge } from "@radix-ui/themes";
import { FlagIcon, HomeIcon } from "lucide-react";
import Page from "../Page";
import Hero from "../Hero";
import { ReactNode } from "react";
import { useTransitionNavigation } from "../../pkg/hooks/useTransitionNavigation";
// import Link from "next/link";

function Missing({
  title,
  description,
  error,
  cause,
  actions,
}: {
  title: string;
  description: string;
  error: string;
  cause: string;
  actions?: ReactNode[];
}) {
  const { path } = useTransitionNavigation();
  return (
    <Page
      wrapChildren
      title={title}
      description={description}
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
      <div className="w-full text-center space-y-4 mt-6">
        <Flex
          align={"center"}
          direction="row"
          className="gap-1 !justify-center"
        >
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
          {error}
        </Text>

        <Text as="p" color="gray" size="3">
          {cause}
        </Text>

        <div className="flex justify-center gap-4 flex-wrap">
          {actions ? (
            <>{actions}</>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </Page>
  );
}

export default Missing;
