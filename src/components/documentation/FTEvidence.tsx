import { Box, Flex, Link, Separator } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import Collapsible from "../Collapsible";
import Strong from "./Strong";

interface FTEvidence {
  title: string;
  points: string[];
}

const ftevidence: FTEvidence[] = [
  {
    title: "Does Truth Exist?",
    points: [
      "Claim: There is no truth. Response: Is that true?",
      "Claim: There is no such thing as absolute truth. Response: Are you absolutely sure?",
      "Claim: There isn't the truth, only my truth. Response: Is that just your truth or the truth?",
      "Claim: You ought not judge. Response: Isn't that a judgment?",
    ],
  },
  {
    title: "Does God Exist?",
    points: [
      "Cosmological Argument (Beginning of the Universe): If the universe had a beginning, it must have had a beginner. Evidence: Second Law of Thermodynamics, Universe is expanding, Radiation Afterglow, Great Galaxy Seeds, Einstein's Theory of General Relativity. Conclusion: The universe had a beginning, therefore it must have had a beginner.",
      "Teleological Argument (Design): If there is design in the universe and life, there must be a designer. Evidence: Fine-tuning of the universe, Complexity of life (DNA). Conclusion: The universe and life are designed, therefore there must be a designer.",
      "Moral Argument: If there is one thing morally wrong, there must be a God. Evidence: Objective moral values exist. Conclusion: There must be a moral lawgiver, which is God.",
    ],
  },
  {
    title: "Are Miracles Possible?",
    points: [
      "Greatest Miracle: The creation of the universe out of nothing (Genesis 1:1). Evidence: Even atheists admit the universe had a beginning.",
      "Purpose of Miracles: To show that someone speaks for God. Examples: Moses, Elijah, Jesus, and the apostles.",
    ],
  },
  {
    title: "New Testament, Truth?",
    points: [
      "Embarrassing Stories: If the New Testament writers were making up stories, they wouldn't include embarrassing details about themselves. Examples: Disciples doubting Jesus, Peter being called Satan, Women discovering the empty tomb.",
      "Excruciating Deaths: The New Testament writers were willing to die for their belief in the resurrection. Evidence: The apostles' beliefs and practices changed dramatically after the resurrection. They had no motive to lie and every motive to say it didn't happen if it wasn't true.",
    ],
  },
  {
    title: "Conclusion",
    points: [
      "Summary of Arguments: Truth Exists: Objective truth is real. God Exists: Supported by cosmological, teleological, and moral arguments. Miracles are Possible: If God exists, miracles are possible. New Testament Reliability: Embarrassing stories and excruciating deaths support the truth of the resurrection.",
    ],
  },
];

const FTEvidence = () => {
  return (
    <Box className="space-y-4 !p-1">
      <Flex className="gap-4 !flex-col">
        {ftevidence.map((argument, index) => (
          // <Card>
          <Collapsible
            key={index}
            title={argument.title}
            children={
              <Strong
                point={argument.title}
                content={
                  <ul className="mt-2 space-y-2 list-disc pl-4">
                    {argument.points.map((point, i) => (
                      <li key={i}>
                        <Text size="2">{point}</Text>
                      </li>
                    ))}
                  </ul>
                }
              />
            }
          />
        ))}
      </Flex>

      <Separator size="4" className="!my-2" />
      <Link
        href="https://www.youtube.com/watch?v=TWkYGzVGwTA"
        className="text-center"
      >
        Source: LIVE from Heritage Bible Church (Lincoln, NE) - IDHEFTBAA (Dr
        Frank Turek)
      </Link>
    </Box>
  );
};

export default FTEvidence;
