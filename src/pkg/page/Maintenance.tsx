import { Text, Button, Link, Flex, Badge } from "@radix-ui/themes";
import Page from "./Page";
import Hero from "./Hero";
import { useTransitionNavigation } from "../hooks/useTransitionNavigation";
import { BanIcon, HomeIcon } from "lucide-react";

export default function Maintenance() {
  const { path } = useTransitionNavigation();
  return (
    <Page
      wrapChildren
      title="Route Disabled"
      description="This page has been disabled"
      hero={
        <Hero
          header="This route is"
          subHeader={
            <>
              Temporarily <br />
              Disabled
            </>
          }
        />
      }
    >
      <div className="w-full text-center space-y-4 mt-6">
        <Flex align={"center"} direction="row" className="gap-1">
          <Badge color="gold">🔒 https</Badge>
          <Badge color="green">thewriterco.com</Badge>
          <Badge color="green">/</Badge>
          <Badge color="red" className="animate-pulse">
            {path}
          </Badge>
        </Flex>

        <Text as="div" color="red" size="3" className="animate-pulse">
          This route is currently disabled.
        </Text>

        <Text as="p" color="gray" size="3">
          It may be under maintenance or intentionally blocked.
        </Text>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/">
            <Button size="1" variant="soft">
              <HomeIcon className="scale-75" />
              Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button disabled size="1" variant="soft">
              <BanIcon className="scale-75" />
              Request Access
            </Button>
          </Link>
        </div>
      </div>
    </Page>
  );
}
