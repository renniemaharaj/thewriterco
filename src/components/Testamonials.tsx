import { Text, Section, Flex, Card, Separator } from "@radix-ui/themes";
import Hint from "./Hint";
import ChristianAIChatbox from "./additional/Christianai";

const testimonials = [
  {
    quote:
      "Existence of God: Assume as true: God exists. It is impractical to prove or disprove this, as no one can transcend creation to verify an external source. Reasoning starts from this axiom: God is.",
    author: "Existence of God",
  },
  {
    quote:
      "KJV Bible as Truth: Accept the KJV Bible as the complete and authoritative word of God, containing all truth intended for us. Any conflicting translation—whether in character, word, verse, or chapter—is a falsehood.",
    author: "KJV Bible as Truth",
  },
  {
    quote:
      "Jesus Christ's First Coming: Acknowledge that Jesus Christ, the Creator, Messiah, and Truth, has already come once (as of 2024) in the manner recorded in the KJV Bible.",
    author: "Jesus Christ's First Coming",
  },
];

export default function ClientTestamonials() {
  return (
    <Section>
      <Flex
        justify={"between"}
        align={"center"}
        className="!flex-row !flex-wrap !gap-3 w-full p-5"
      >
        {/* Axioms */}
        <Flex className="!flex-[3] !flex-col !gap-4 !p-2 !items-center">
          <Text
            size="8"
            weight="bold"
            mb="9"
            style={{
              display: "block",
              textAlign: "center",
              color: "var(--hrtm-blue)",
              transition: "1s",
            }}
          >
            Axioms for AI
          </Text>
          <Separator size={"4"} />
          <Flex className="!flex-row !flex-wrap !gap-4 w-full max-w-[600px]">
            {testimonials.map((testimonial) => (
              <div className="flex flex-row gap-4">
                <Text
                  as="label"
                  size="2"
                  weight="bold"
                  mt="4"
                  style={{ textAlign: "center" }}
                  className="min-w-[200px] text-center flex justify-center items-center"
                >
                  {testimonial.author}
                </Text>
                <Text as="label" size="2" mt="4">
                  {testimonial.quote}
                </Text>
                {/* </pre> */}
              </div>
            ))}
          </Flex>
          <Separator size={"4"} />
          <Hint className="max-w-[400px]">
            These axioms provide the most stable foundation for Christianity,
            unlike doctrines that alter scripture to address inconsistencies.
            The path must be narrow so that scripture is fulfilled; narrow and
            free so that both poor and rich can afford to both go and come.
          </Hint>
        </Flex>
        <Separator size={"3"} orientation={"vertical"} />
        <Card
          // key={"testimonial" + index}
          className="blurred-div !flex !flex-col !mx-auto !w-[450px]"
          variant="surface"
        >
          <ChristianAIChatbox className="min-w-[400px]" />
          <Hint className="max-w-[400px]">
            Responses are shaped by prompts and axioms, but reserve your
            discernment. Thank you!
          </Hint>
          <Hint className="max-w-[400px]">
            AI-powered responses, subjected to the axioms of Life. This feature
            is experimental for now as we need to sort out billing on our end
            for the SaaS, but it will preferably be free for all users.
          </Hint>
        </Card>
      </Flex>
    </Section>
  );
}
