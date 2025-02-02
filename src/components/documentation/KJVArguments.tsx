import { Box, Card, Flex, Link, Separator } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import Collapsible from "../Collapsible";

interface KJVPoint {
  title: string;
  points: string[];
}

const kjvArguments: KJVPoint[] = [
  {
    title: "Family of Texts",
    points: [
      "Old Testament from Jerusalem (Hebrew Masoretic)",
      "New Testament from Antioch (Byzantine/Textus Receptus)",
      "Over 5,000 manuscripts in agreement",
    ],
  },
  {
    title: "Quality of Translators",
    points: [
      "47 highly educated scholars",
      "Many spoke 9 different languages",
      "Were Bible believers",
    ],
  },
  {
    title: "Text Preservation",
    points: [
      "Maintains all verses",
      "Contains 60,000 more words than NIV",
      "No verses removed (like Acts 8:37)",
    ],
  },
  {
    title: "Mathematical Design",
    points: [
      "Many numerical patterns involving 7s and 1611",
      "Word counts that divide perfectly",
      "These patterns absent in other versions",
    ],
  },
  {
    title: "Historical Context",
    points: [
      "Came at right time in history",
      "Was purified 'seven times' through translations",
      "Published in 1611 after 7 years of work",
    ],
  },
];

const KJVArguments = () => {
  return (
    <Box className="space-y-4 p-4">
      <Flex className="gap-4 !flex-col">
        {kjvArguments.map((argument, index) => (
          <Collapsible
            key={index}
            title={argument.title}
            children={
              <Card variant="ghost" key={index} className="p-4 rounded-xl">
                <strong>{argument.title}:</strong>
                <ul className="mt-2 space-y-2 list-disc pl-4">
                  {argument.points.map((point, i) => (
                    <li key={i}>
                      <Text size="2">{point}</Text>
                    </li>
                  ))}
                </ul>
              </Card>
            }
          />
        ))}
      </Flex>
      <Separator size="4" className="!my-2" />
      <Link
        href="https://www.youtube.com/watch?v=zzMKhuMfLF0&t=2875s"
        className="text-center"
      >
        Source: Robert Breaker Why King James Only? Youtube Video
      </Link>
    </Box>
  );
};

export default KJVArguments;
