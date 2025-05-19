import { Flex, Spinner } from "@radix-ui/themes";
import Page from "./Page";
import Hero from "./Hero";
import { memo } from "react";

export default function Block({ noPage }: { noPage?: boolean }) {
  const BlockingSpinnerMemo = memo(BlockingSpinner);
  const blockingSpinner = <BlockingSpinnerMemo className="mx-auto" />;
  return (
    (noPage && blockingSpinner) || (
      <Page
        title="Home"
        description="Welcome to The Writer Company"
        className="!gap-5"
        wrapChildren
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
                We're here to: give reasoning for faith; reinforcement to your
                shield, 🛡️ Wherewith ye shall quench all the fiery darts of the
                wicked. For his bow is set with a fiery deception 🏹
              </>
            }
          />
        }
      >
        {blockingSpinner}
        {/* </Flex> */}
      </Page>
    )
  );
}

export function BlockingSpinner({
  className,
  size,
}: {
  className?: string;
  size?: "1" | "2" | "3";
}) {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      className={`w-10 aspect-square rounded-full ${className}`}
    >
      <Spinner size={size || "2"} className="scale-125" />
    </Flex>
  );
}
