import React from "react";
import Page from "../../../components/page/Page";
import Hero from "../../../components/Hero";
import { Box, Callout, Flex } from "@radix-ui/themes";
import { conversation } from "./conversation";
import Message from "../../../components/ai/Message";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const Example = () => {
  return (
    <Page wrapChildren>
      <Hero
        header={<>Study Documents</>}
        subHeader={
          <>
            <br />
            TheWriterCo
          </>
        }
        hint={
          <>This is an example of context building and study document 🗎 ❤️</>
        }
      />
      <Box className="p-4">
        <br />
        {/* <Card> */}
        <Flex className={`flex-col !w-full !h-fit pb-[150px]`}>
          {conversation.map((block, index) => (
            <React.Fragment key={index}>
              <Message block={block} />
            </React.Fragment>
          ))}
        </Flex>
        {/* </Card> */}
      </Box>

      <Callout.Root variant="soft" className="p-4">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          <strong>Tip:</strong> If the code editor, in the conversation extract,
          is too small, please consider using a larger screen for the best
          experience.
        </Callout.Text>
      </Callout.Root>
    </Page>
  );
};

export default Example;
