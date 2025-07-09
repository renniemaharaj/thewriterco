import Page from "../../../pkg/page/Page";
import Hero from "../../../pkg/page/Hero";
import Voice from "../../../pkg/bible/Voice";
import { useState, useEffect } from "react";
import { Card, TextArea, Button, Flex } from "@radix-ui/themes";

function splitIntoChunksByLength(
  text: string,
  maxLength: number = 400,
): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];

  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxLength) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += " " + sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

const Presenter = () => {
  const [rawText, setRawText] = useState("");
  const [parts, setParts] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  // Reset index if parts change
  useEffect(() => {
    setIndex(0);
  }, [parts]);

  const handleSpeechProgress = () => {
    if (index < parts.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, parts.length - 1));
  };

  const handleBack = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Page
      title="Presenter"
      description="Presenter for reading and presenting text content"
      wrapChildren
      className="min-w-[80%]"
      hero={
        <Hero
          header={<>Voice Presenter</>}
          subHeader={
            <>
              {" "}
              <br /> TheWriterCo{" "}
            </>
          }
          hint={
            <>
              A voice presenter which reads aloud text content, rendering in
              chunks.
            </>
          }
        />
      }
    >
      {/* Voice Reader */}
      <Flex mt="4" direction={"row"} gap="4">
        <Voice
          defaultModel
          textContent={parts[index] ?? ""}
          onSpeechProgress={handleSpeechProgress}
        />
      </Flex>

      {parts.length > 0 && (
        <div className="mt-4">
          <p className="mb-4">{parts[index]}</p>
          <div className="space-x-2">
            <Button onClick={handleBack} disabled={index === 0} variant="soft">
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={index === parts.length - 1}
              variant="solid"
              color="green"
            >
              Next
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Part {index + 1} of {parts.length}
          </p>
        </div>
      )}

      {/* Input and control */}
      <Card mt="4">
        <TextArea
          placeholder="Paste your document here..."
          style={{ width: "100%", height: "200px" }}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />
        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => setParts(splitIntoChunksByLength(rawText, 400))}
          >
            Set Contents
          </Button>
          <Button
            variant="soft"
            onClick={() => {
              setRawText("");
              setParts([]);
            }}
          >
            Clear
          </Button>
        </div>
      </Card>
    </Page>
  );
};

export default Presenter;
