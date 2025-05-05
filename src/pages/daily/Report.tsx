import {
  Card,
  Flex,
  Heading,
  Inset,
  Text,
  Link,
  Button,
} from "@radix-ui/themes";
import { ReportObject } from "../../pkg/hooks/data/useDailyReports";
import { getRandomElement } from "./utils";

const PlaceholderImage =
  "https://aharvey.com/wp-content/uploads/2018/03/bg-placeholder.jpg";

export const Report = ({
  report,
  onFocus,
}: {
  report: ReportObject;
  onFocus?: (title: string) => void;
}) => {
  const image = getRandomElement(
    "images" in report &&
      Array.isArray(report.images) &&
      report.images.length > 0
      ? report.images
      : [PlaceholderImage],
  );

  const handleReadMore = () => {
    if (onFocus) {
      onFocus(report.title);
    }
  };

  return (
    <Card size="3" variant="classic" style={{ maxWidth: 400 }}>
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src={image}
          alt={report.title}
          style={{
            display: "block",
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
        />
      </Inset>
      <Flex direction="column" gap="2" mt="3">
        <Heading size="4">{report.title}</Heading>
        <Text size="1" color="gray">
          {new Date(report.date).toLocaleDateString()}
        </Text>
        <Text size="2" className="max-h-60 overflow-hidden text-ellipsis">
          {report.summary}
        </Text>
        <Button variant="soft" onClick={handleReadMore}>
          Read more...
        </Button>
        <Flex gap="1" wrap="wrap" mt="2">
          {report.tags.map((tag) => (
            <Text size="1" color="blue" key={tag}>
              #{tag}
            </Text>
          ))}
        </Flex>
        <Link href={report.url} target="_blank" mt="2">
          View source →
        </Link>
      </Flex>
    </Card>
  );
};

export default Report;
