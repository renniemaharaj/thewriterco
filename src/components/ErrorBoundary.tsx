import { Flex, Button, Text, Code } from "@radix-ui/themes";
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      className="min-h-screen"
    >
      <Text size="6" className="font-bold">
        Oops! Something went wrong.
      </Text>
      <Text size="2" className="mt-2">
        Please try again or contact support if the problem persists.
      </Text>
      <Code
        variant="ghost"
        className="p-4 mt-4 text-left overflow-auto max-h-40 max-w-[50%]"
      >
        <Text className="text-center text-red-600">{error.message}</Text>
      </Code>
      <Button
        variant="solid"
        color="blue"
        className="mt-4"
        onClick={resetErrorBoundary}
      >
        Try Again
      </Button>
    </Flex>
  );
}
export default ErrorFallback;
