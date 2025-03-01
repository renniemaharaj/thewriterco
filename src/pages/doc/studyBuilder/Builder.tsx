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

const Builder = () => {
  return (
    <Page wrapChildren>
      <Hero
        header={<>Study Documents</>}
        subHeader={
          <>
            The Writer <br />
            Company
          </>
        }
        hint={
          <>You will learn how to build a study document using our tools 🗎 ❤️</>
        }
      />
      <Flex className="!w-full animate-fade-in !flex-col merriweather-bold !p-2 gap-4">
        <Box className="p-4">
          <Heading size="4">Power Your Bible Studies with AI</Heading>
          <Text>
            The Writer Company AI helps you study the Bible with AI-powered
            insights.
            <br />
            <br />
            Have you tried our AI chatbot? Visit <Link href="/ai">/ai</Link> to
            interact with an AI trained for Bible studies. It answers questions
            concisely, provides long-form explanations, and is structured
            according to Christian beliefs.
          </Text>
        </Box>

        <Box className="p-4">
          <Heading size="4">Why Our AI?</Heading>
          <Text>Our AI is constrained to three core axioms:</Text>
          <br />
          <br />
          <ul className="list-disc list-inside">
            <li>
              <strong>God is</strong>
            </li>
            <li>
              <strong>The KJV is the authoritative written truth</strong>
            </li>
            <li>
              <strong>Jesus is Truth</strong>
            </li>
          </ul>
          <br />
          <Text>
            These axioms ensure responses stay within biblical doctrine,
            preventing deviations or manipulations common in AI interactions.
            Read more on axioms and rationale{" "}
            <Link href="/reasoning">/reasoning</Link>.
          </Text>
        </Box>

        <Box className="p-4">
          <Heading size="4">What Are Study Documents?</Heading>
          <Text>
            Study documents are web-based resources generated from your AI
            conversations. They include:
          </Text>
          <br />
          <br />
          <ul className="list-disc list-inside">
            <li>
              <strong>Table of Contents</strong>
            </li>
            <li>
              <strong>
                Summarized, structured study based on conversations
              </strong>
            </li>
            <li>
              <strong>Meta information and branding</strong>
            </li>
          </ul>
          <br />
          <Text>
            These static HTML pages can be read offline, shared, or even printed
            for personal use.
          </Text>
        </Box>

        <Box className="p-4">
          <Heading size="4">How to Get a Study Document</Heading>
          <br />
          <br />
          <ol className="list-disc list-inside">
            <li>
              <strong>Engage in a meaningful conversation</strong> with the AI
              to cover your topic thoroughly.
            </li>
            <li>
              <strong>Frame your prompts effectively</strong> to get structured
              responses. Example:
              <br />
              <br />
              <Blockquote>
                "With no unnecessary, verbose, or redundant words, can you tell
                me about the number 10 and how the Bible uses it symbolically?"
              </Blockquote>
              <br />
              <br />
            </li>
            <li>
              <strong>Refine your responses</strong> by building on AI-generated
              answers:
              <br />
              <br />
              <Blockquote>
                "It's interesting that God spoke 10 times when creating. Can you
                reference those ten times and explain them?"
              </Blockquote>
              <br />
              <br />
            </li>
            <li>
              <strong>Avoid directly asking the AI for a study document</strong>
              . Instead, guide the AI to build context for later document
              extraction.
            </li>
          </ol>
          <br />
        </Box>

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
          <Heading size="4">Requesting a Study Document</Heading>
          <ol>
            <li>
              <strong>Indicate to the AI</strong> that you will be making a
              study request soon:
              <br />
              <br />
              <Blockquote>
                "I am going to provide you with further instructions on
                generating a study document based on our conversation. Until
                then, please elaborate on the key points we've discussed."
              </Blockquote>
              <br />
              <br />
            </li>
            <li>
              <strong>Use the request button</strong>: 'Request Study Document'
              or 'Request Web Page.'
            </li>
            <li>
              The AI will generate an HTML document, which you can{" "}
              <strong>download, copy, or save</strong> as a `.html` file.
            </li>
          </ol>
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

export default Builder;
