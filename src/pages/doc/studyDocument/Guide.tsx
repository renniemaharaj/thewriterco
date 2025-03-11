import { InfoCircledIcon } from "@radix-ui/react-icons";
import Hero from "../../../components/Hero";
import Page from "../../../components/page/Page";
import {
  Link,
  Text,
  Heading,
  Blockquote,
  Callout,
  Flex,
  Box,
} from "@radix-ui/themes";
import Content from "../Content";
import BreakII from "../BreakII";
import List from "../List";

const Guide = () => {
  return (
    <Page
      wrapChildren
      title="Study Documents Guide"
      description="Learn how to build study documents using our tools"
      hero={
        <Hero
          header={<>Study Documents</>}
          subHeader={
            <>
              <br />
              TheWriterCo
            </>
          }
          hint={
            <>
              You will learn how to build a study document using our tools 🗎 ❤️
            </>
          }
        />
      }
    >
      <Flex className="!flex-col merriweather-bold gap-4">
        <Content header="Power Your Bible Studies with AI">
          <Text>
            The Writer Company AI helps you study the Bible with AI-powered
            insights.
            <BreakII />
            Have you tried our AI chatbot? Visit <Link href="/ai">/ai</Link> to
            interact with an AI trained for Bible studies. It answers questions
            concisely, provides long-form explanations, and is structured
            according to Christian beliefs.
          </Text>
        </Content>

        <Content header="Why Our AI?">
          <Text>
            Our solution is constrained to three core axioms:
            <BreakII />
            <List
              list={[
                "God is",
                "The KJV is the authoritative written truth",
                "Jesus is Truth",
              ]}
            />
            <BreakII />
            These axioms ensure responses stay within biblical doctrine,
            preventing deviations or manipulations common in AI interactions.
            Read more on axioms and rationale{" "}
            <Link href="/reasoning">/reasoning</Link>.
          </Text>
        </Content>

        <Content header="What Are Study Documents?">
          <Text>
            Study documents are web-based resources generated from your AI
            conversations. They include:
          </Text>
          <BreakII />
          <List
            list={[
              "Table of Contents",
              "Summarized, structured study based on conversations",
              "Meta information and branding",
            ]}
          />
          <BreakII />
          <Text>
            These static HTML pages can be read offline, shared, or even printed
            for personal use.
          </Text>
        </Content>

        <Content header="How to Get a Study Document">
          <List
            list={[
              "Engage in a meaningful conversation with the AI to cover your topic thoroughly.",
              "Frame your prompts effectively to get structured responses.",
            ]}
          />
          <BreakII />
          <Blockquote>
            "With no unnecessary, verbose, or redundant words, can you tell me
            about the number 10 and how the Bible uses it symbolically?"
          </Blockquote>
          <BreakII />
          <List
            list={[
              "Refine your responses by building on AI-generated answers.",
              "Avoid directly asking the AI for a study document. Instead, guide the AI to build context for later document extraction.",
            ]}
          />
          <BreakII />
          <Blockquote>
            "It's interesting that God spoke 10 times when creating. Can you
            reference those ten times and explain them?"
          </Blockquote>
        </Content>

        <Content header="Requesting a Study Document">
          <List
            list={[
              "Indicate to the AI that you will be making a study request soon.",
            ]}
          />
          <BreakII />
          <Blockquote>
            "I am going to provide you with further instructions on generating a
            study document based on our conversation. Until then, please
            elaborate on the key points we've discussed."
          </Blockquote>
          <BreakII />
          <List
            list={[
              "Use the request button: 'Request Study Document' or 'Request Web Page.'",
              "The AI will generate an HTML document, which you can download, copy, or save as a `.html` file.",
            ]}
          />
        </Content>

        <Callout.Root variant="soft" className="p-4">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            <strong>Note:</strong> Conversations have a token limit to ensure
            efficient processing. Documentation on token usage will be released
            soon.
          </Callout.Text>
        </Callout.Root>

        <Box className="p-4">
          <Heading size="4">Example</Heading>
          <Link href="/doc/studyDocument/example">Example document</Link>
        </Box>

        <Callout.Root variant="soft" className="p-4">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            <strong>Tip:</strong> If you plan to host study documents on your
            own server, a future guide will provide instructions on
            self-hosting.
          </Callout.Text>
        </Callout.Root>
      </Flex>
    </Page>
  );
};

export default Guide;
