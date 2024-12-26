import { Text, Section, Flex, Card } from "@radix-ui/themes";
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
      <Flex className="!flex-row !flex-wrap !gap-1 w-full p-5">
        {/* Axioms */}
        <Flex className="!flex-[3] !flex-col !gap-2 !items-center">
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
          <Hint className="max-w-[400px]">
            An axiom is defined as "a statement or proposition which is regarded
            as being established, accepted, or self-evidently true" - Oxford
            dictionary.
          </Hint>
          <Flex className="!flex-row !flex-wrap !gap-4 w-full max-w-[600px]">
            {testimonials.map((testimonial, index) => (
              <Card
                key={"testimonial" + index}
                className="blurred-div !flex !flex-col !sticky !top-0"
                variant="surface"
              >
                <Text
                  as="label"
                  size="2"
                  weight="bold"
                  mt="4"
                  style={{ textAlign: "center" }}
                >
                  {testimonial.author}
                </Text>
                <Text as="label" size="2" mt="4">
                  {testimonial.quote}
                </Text>
                {/* </pre> */}
              </Card>
            ))}
          </Flex>
          <Hint className="max-w-[400px]">
            These axioms provide the most stable foundation for Christianity,
            unlike doctrines that alter scripture to address inconsistencies.
            The path must be narrow so that scripture is fulfilled; narrow and
            free so that both poor and rich can afford to both go and come.
          </Hint>
        </Flex>
        <Flex className="!flex-[4]">
          <ChristianAIChatbox className="min-w-[400px]" />
        </Flex>
      </Flex>
    </Section>
  );
}
