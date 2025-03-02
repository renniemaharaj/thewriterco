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
  Card,
  Button,
  Badge,
  IconButton,
  Tooltip,
} from "@radix-ui/themes";
import { conversation } from "./conversation";
import React from "react";
import { Code, MarkupResponse, Scripture } from "../../../components/ai/types";
import {
  BookTextIcon,
  CopyIcon,
  DownloadIcon,
  ShieldAlertIcon,
} from "lucide-react";
import MonacoEditor from "../../../components/MonacoEditor";
import fetchGitBlob, {
  kjvRepoUrl,
} from "../../../components/hooks/data/gitFetcher";
import { useDispatch } from "react-redux";
import {
  setEBook,
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
  setOpenState,
  setRenderStyle,
} from "../../../app/ereader/ereaderSlice";
import { EBook } from "../../../app/ereader/types";

const Builder = () => {
  const dispatch = useDispatch();

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
        <Box className="p-4">
          <Heading size="4">
            The following conversation was used to generate a study document:
          </Heading>
          <br />
          <Card>
            <Flex className={`flex-col !w-full !h-fit pb-[150px]`}>
              {conversation.map((block, index) => (
                <React.Fragment key={index}>
                  <Flex justify="center" className={`!flex-col !w-full !gap-1`}>
                    <Flex
                      direction="column"
                      justify={block.sender === "User" ? "end" : "start"}
                      className={`${
                        block.sender === "User"
                          ? "text-right !self-end"
                          : "text-left"
                      } max-w-[90%] !text-sm !max-h-fit !overflow-hidden !p-2 opacity-0 animate-fade-in`}
                      style={{
                        animationDuration: "0.5s",
                        animationFillMode: "forwards",
                      }}
                    >
                      {block.sender === "User" && (
                        <Card className="!border-none !outline-none whitespace-pre-wrap">
                          {/* <pre className="whitespace-pre-wrap !text-left"> */}
                          {(block.content as MarkupResponse).markupContent}
                          {/* </pre> */}
                        </Card>
                      )}
                      {block.sender === "System" && (
                        <Card className="text-red-500 !flex !flex-col !items-center !gap-2 max-w-[300px]">
                          <Flex className="!gap-2">
                            <Flex>
                              <ShieldAlertIcon />
                            </Flex>
                            <Text>
                              {(block.content as MarkupResponse).markupContent}
                            </Text>
                          </Flex>

                          <Flex className="!flex-row !gap-2">
                            <Button variant="soft" disabled className="mt-2">
                              Resend
                            </Button>
                            <Button variant="soft" disabled className="mt-2">
                              New Chat
                            </Button>
                          </Flex>
                        </Card>
                      )}
                      {block.sender === "AI" && block.type === "markup" && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: (block.content as MarkupResponse)
                              .markupContent,
                          }}
                        />
                      )}
                      {block.sender === "AI" && block.type === "code" && (
                        <Card className="!p-1">
                          <Flex className="!flex-row !gap-2 !mb-2 !justify-between">
                            <Badge variant="soft" className="!mr-2">
                              {(block.content as Code).filename}
                            </Badge>
                            <Flex className="!flex-row !gap-2 !mb-2">
                              <IconButton
                                variant="soft"
                                size="1"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    (block.content as Code).codeContent,
                                  );
                                }}
                              >
                                <CopyIcon className="scale-50" />
                              </IconButton>
                              <IconButton
                                variant="soft"
                                size="1"
                                onClick={() => {
                                  const blob = new Blob(
                                    [(block.content as Code).codeContent],
                                    {
                                      type:
                                        (block.content as Code).mimeType ||
                                        "text/plain",
                                    },
                                  );
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement("a");
                                  a.href = url;
                                  a.download = (block.content as Code).filename;
                                  a.click();
                                }}
                              >
                                <DownloadIcon className="scale-50" />
                              </IconButton>
                            </Flex>

                            {/* <Badge variant="soft">{(block.content as Code).language}</Badge> */}
                          </Flex>
                          <MonacoEditor
                            language={
                              (block.content as Code).language || "plaintext"
                            }
                            code={(block.content as Code).codeContent}
                            height={(block.content as Code).editorHeight || 400}
                          />
                        </Card>
                      )}

                      {block.sender === "AI" && block.type === "scripture" && (
                        <Card size="1">
                          <Flex className="!flex-row !gap-2 flex-wrap">
                            {(block.content as Scripture).verses.map(
                              (verse, idx) => (
                                <React.Fragment key={`verse-${idx}`}>
                                  <Tooltip content={verse.verseContent}>
                                    <IconButton
                                      variant="ghost"
                                      size="1"
                                      className="animate-pulse !font-bold"
                                      onClick={() => {
                                        fetchGitBlob(
                                          kjvRepoUrl,
                                          verse.book,
                                          "json",
                                        ).then((content) => {
                                          dispatch(
                                            setEBook({
                                              title: verse.book,
                                              content: JSON.parse(content),
                                              date: new Date().toDateString(),
                                            } as EBook),
                                          );
                                          dispatch(setRenderStyle("bible"));
                                          dispatch(
                                            setGlobalCurrentChapter(
                                              verse.chapterNo.toString(),
                                            ),
                                          );
                                          dispatch(
                                            setGlobalCurrentVerse(
                                              verse.verseNo.toString(),
                                            ),
                                          );
                                          setTimeout(
                                            () => dispatch(setOpenState(true)),
                                            100,
                                          );
                                        });
                                      }}
                                    >
                                      <BookTextIcon /> {verse.book}{" "}
                                      {verse.chapterNo} :{verse.verseNo}
                                    </IconButton>
                                  </Tooltip>
                                </React.Fragment>
                              ),
                            )}
                          </Flex>
                        </Card>
                      )}
                    </Flex>
                  </Flex>
                </React.Fragment>
              ))}
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Page>
  );
};

export default Builder;
