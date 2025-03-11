import { InfoCircledIcon } from "@radix-ui/react-icons";
import Hero from "../../../components/Hero";
import Page from "../../../components/page/Page";
import { Link, Text, Blockquote, Callout, Flex } from "@radix-ui/themes";
import Content from "../Content";
import BreakII from "../BreakII";
import List from "../List";
import Snippet from "../Snippet";

const Guide = () => {
  return (
    <Page
      wrapChildren
      title="Google Gemini-Pool Guide"
      description="Learn how to use the Google Gemini-Pool Go library"
      hero={
        <Hero
          header={<>Google Gemini-Pool</>}
          subHeader={
            <>
              <br />
              TheWriterCo Open Source
            </>
          }
          hint={
            <>
              Learn how to manage Google Gemini API keys efficiently using our
              open-source Go library.
            </>
          }
        />
      }
    >
      <Flex className="!flex-col merriweather-bold gap-4">
        <Content header="Introduction to Google Gemini-Pool">
          <Text>
            Limited to google gemini api keys? I know, renting a GPU is
            expensive and buying your own is even more expensive (not to mention
            high maintenance.)
            <BreakII />
            Google, and many other companies, offer free API keys to use their
            service through free tiers. However, these free tiers are limited in
            the number of requests you can make per day. This is where Google
            Gemini-Pool comes in.
            <BreakII />
            If you're able to get multiple API keys, you can use Google
            Gemini-Pool to manage them efficiently. This way, you can get a
            little more juice out of the free tier.
            <BreakII />
            Is this legal? Yes, as long as you're not abusing the free tier.
            One, two, or even three API keys should be fine. But if you're using
            10, 20, or 100 API keys, you're probably abusing the free tier.
            <BreakII />
            Either way (we aren't here to police you), Google Gemini-Pool is an
            open-source Go library designed to manage multiple Google Gemini API
            keys efficiently. It provides thread-safe API key management,
            session wrapping, queue-based retrials, and exponential backoff.
            Each key is used in a round-robin fashion, ensuring that no key is
            overused. If a key fails, it is retried with exponential backoff.
            (These are all highly configurable.)
            <BreakII />
            It even sends validation errors back to the next model in the queue
            / backoff to increase the chances of a successful response.
            <BreakII />
            Check out the GitHub repository:{" "}
            <Link href="https://github.com/renniemaharaj/google-gemini-pool">
              Google Gemini-Pool
            </Link>
          </Text>
        </Content>

        <Content header="Why Use Google Gemini-Pool?">
          <Text>
            Our library offers:
            <BreakII />
            <List
              list={[
                "Efficient API key rotation",
                "Thread-safe session management",
                "Exponential backoff and retries",
                "Custom validation of API responses",
                "& more",
              ]}
            />
            <BreakII />
            This ensures your google-gemini-api-powered applications remain
            stable and resilient, even under heavy loads.
          </Text>
        </Content>

        <Content header="Getting Started">
          <List
            list={[
              "Install the package using Go modules: `go get github.com/TheWriterCo/google-gemini-pool`",
              "Import the package into your Go project.",
              "Initialize the API key manager and configure your pool.",
            ]}
          />
          <BreakII />
          <Blockquote>
            Example setting up a pool with keys
            <Snippet
              code={`package main

import (
  "fmt"
  "github.com/TheWriterCo/google-gemini-pool"
)

func main() {
 // Store json object, [] of transformer.API: key and base for pool
var GEMINI_API_KEYS_POOL = []transformer.API{
    {
        Key:  "YOUR_API_KEY",
        Base: "gemini-20-pro-exp-0205", // or your preferred model
    },
}

// Create a new pool instance
pool := pool.Instance{}

// Loads from GEMINI_API_KEYS_POOL environment variable & pushes all to pool
pool.InitializePool()

// Push one (1) single transformer.API key to channel
myGeminiKey := transformer.API{
    {
        Key:  "YOUR_API_KEY",
        Base: "gemini-20-pro-exp-0205", // or your preferred model
    },
}

// Push directly to exposed channel
pool.Channel <- myGeminiKey
}`}
              language="go"
            />
          </Blockquote>
        </Content>

        <Content header="Prompting">
          <Text>
            To prompt the AI, request a session from the pool and send a prompt
            (basic usage), or use the advanced features for more control.
            <BreakII />
            <Blockquote>
              Example sending a prompt to the pool
              <Snippet
                code={`
session, cleanup, err := pool.Queue(context.Background())
if err != nil {
    log.Fatalf("Failed to queue session: %v", err)
}
defer cleanup()

// Send a simple string
response, err := session.SendString(context.Background(), "Hello World")
if err != nil {
    log.Fatalf("Error: %v", err)
}

// See github repo for more advanced usage
fmt.Println(response)
    `}
                language="go"
              />
            </Blockquote>
          </Text>
        </Content>

        <Content header="Advanced Usage">
          <List
            list={[
              "Custom retry logic with exponential backoff",
              "Handling rate limits dynamically",
              "Logging and monitoring API key usage",
              "Structured inputs and output validation",
            ]}
          />
        </Content>

        <Callout.Root variant="soft" className="p-4">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            <strong>Note:</strong> Ensure you comply with Google's API usage
            policies when using multiple keys.
          </Callout.Text>
        </Callout.Root>
      </Flex>
    </Page>
  );
};

export default Guide;
