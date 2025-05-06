import { Card, Text } from "@radix-ui/themes";
import { ReactNode } from "react";

const Strong = ({ point, content }: { point: string; content: ReactNode }) => {
  return (
    <Card variant="ghost" className="p-4 rounded-xl">
      <Text size="2">
        <strong>{point}:</strong> {content}
      </Text>
    </Card>
  );
};

export default Strong;
