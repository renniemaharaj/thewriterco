import { Flex, Button, Text, Code, Card } from "@radix-ui/themes";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialState } from "../app/chat/config";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const chatState = useSelector((state: RootState) => state.chat);
  const [, setValue] = useLocalStorage("chatData", chatState);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen px-6 bg-gray-50"
    >
      <Card className="w-full max-w-md p-8 shadow-lg rounded-2xl bg-white">
        <Flex direction="column" align="center" gap="5">
          <Text size="7" weight="bold" className="text-center">
            Something went wrong
          </Text>
          <Text size="3" color="gray" className="text-center">
            An unexpected error occurred. Please try one of the options below.
          </Text>

          <Code
            variant="ghost"
            className="w-full p-4 overflow-auto max-h-32 rounded-lg bg-gray-100 text-red-600 text-sm"
          >
            {error.message}
          </Code>

          <Flex direction="column" gap="3" className="w-full mt-4">
            <Button
              size="3"
              radius="full"
              variant="soft"
              color="blue"
              onClick={resetErrorBoundary}
              className="w-full"
            >
              Retry
            </Button>
            <Button
              size="3"
              radius="full"
              variant="soft"
              color="blue"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Restart
            </Button>
            <Button
              size="3"
              radius="full"
              variant="outline"
              color="gray"
              onClick={() => setValue(initialState)}
              className="w-full"
            >
              Reset App
            </Button>
            <Button
              size="3"
              radius="full"
              variant="ghost"
              color="red"
              onClick={() =>
                (window.location.href =
                  "mailto:rvesprey@gmail.com?subject=App Crash Report")
              }
              className="w-full"
            >
              Report Issue
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default ErrorFallback;
