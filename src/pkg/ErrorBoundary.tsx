import { Flex, Button, Text, Code } from "@radix-ui/themes";
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
      gap="4"
      className="min-h-screen px-6"
    >
      {/* <Card className="max-w-lg p-6 shadow-lg border border-gray-200 rounded-lg"> */}
      <Text size="6" weight="bold">
        Something went wrong
      </Text>
      <Text size="2" color="gray" className="mt-2">
        An unexpected error occurred. You can try the following actions:
      </Text>

      <Code
        variant="ghost"
        className="p-3 mt-4 overflow-auto max-h-32 bg-gray-100 rounded-md text-red-600"
      >
        {error.message}
      </Code>

      <Flex gap="3" className="mt-6 !gap-4">
        <Button
          variant="solid"
          color="blue"
          className="!p-1"
          onClick={resetErrorBoundary}
        >
          Retry
        </Button>
        <Button
          variant="solid"
          color="blue"
          className="!p-1"
          onClick={() => window.location.reload()}
        >
          Restart
        </Button>
        <Button
          variant="outline"
          color="gray"
          className="!p-1"
          onClick={() => setValue(initialState)}
        >
          Reset App
        </Button>
        <Button
          variant="ghost"
          color="red"
          className="!p-1"
          onClick={() =>
            (window.location.href =
              "mailto:rvesprey@gmail.com?subject=App Crash Report")
          }
        >
          Report Issue
        </Button>
      </Flex>
      {/* </Card> */}
    </Flex>
  );
}

export default ErrorFallback;
