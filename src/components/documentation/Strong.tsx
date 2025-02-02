import { Card, Text } from "@radix-ui/themes";

const Strong = ({ point, content }: { point: string; content: string }) => {
  return (
    <Card variant="ghost" className="p-4 rounded-xl">
      <Text size="2">
        <strong>{point}:</strong> {content}
      </Text>
    </Card>
  );
};

export default Strong;
