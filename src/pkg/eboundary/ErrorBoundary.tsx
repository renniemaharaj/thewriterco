import { Flex, Button, Text, Code, Card, Separator } from "@radix-ui/themes";
import { ShieldAlert, RotateCcw, RefreshCw, Bug } from "lucide-react";
import { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { ResetElevenLabsState } from "../../app/elevenLabs/eleventLabsSlice";
import { useEffect } from "react";
import { recoveryFunctionMap } from "./config";
import { RecoveryCard } from "./RecoveryCard";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const recoveryFunctions = useSelector(
    (state: RootState) => state.errorBoundary.recoveryFunctions,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const handleRecoverElevenLabs = () => {
      dispatch(ResetElevenLabsState());
    };

    window.addEventListener("recover-elevenlabs", handleRecoverElevenLabs);

    return () => {
      window.removeEventListener("recover-elevenlabs", handleRecoverElevenLabs);
    };
  }, [dispatch]);

  const handleRecovery = (title: string) => {
    const recoverFn = recoveryFunctionMap[title];
    if (recoverFn) {
      recoverFn();
    } else {
      console.error(`No recovery function found for title: ${title}`);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen px-6 py-10 bg-gray-50"
    >
      <Card className="w-full max-w-2xl p-8 shadow-xl rounded-2xl bg-white">
        <Flex direction="column" align="center" gap="6">
          <Flex direction="column" align="center" className="flex-col !gap-2">
            {/* Header Icon */}
            <ShieldAlert
              className="w-14 h-14 text-blue-600"
              aria-hidden="true"
            />

            {/* Main Title */}
            <Text size="8" weight="bold" className="text-center">
              Application Crash Recovery
            </Text>

            {/* Subtext */}
            <Text size="4" color="gray" className="text-center max-w-md">
              Something went wrong, but don't worry — the app recovered. Choose
              a recovery option below.
            </Text>
          </Flex>

          {/* Actions */}
          <Flex direction="column" className="w-full !gap-2">
            {/* Error Message */}
            <Code
              variant="solid"
              color="red"
              className="!w-full !p-4 !overflow-auto !max-h-40 rounded-md bg-red-100 text-red-800"
            >
              {error.message}
            </Code>

            <Flex className="flex-row !justify-start !flex-wrap !gap-2">
              <Button
                variant="solid"
                color="blue"
                onClick={resetErrorBoundary}
                className="!max-w-[300px] !p-2"
                aria-label="Retry after error"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Retry
              </Button>

              <Button
                variant="solid"
                color="blue"
                onClick={() => window.location.reload()}
                className="!max-w-[300px] !p-2"
                aria-label="Restart application"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Restart
              </Button>

              <Button
                size="4"
                radius="full"
                variant="ghost"
                color="red"
                onClick={() =>
                  (window.location.href =
                    "mailto:rvesprey@gmail.com?subject=App Crash Report")
                }
                className="!max-w-[300px] !p-2"
                aria-label="Report crash issue"
              >
                <Bug className="w-5 h-5 mr-2" />
                Report Issue
              </Button>
            </Flex>
          </Flex>

          {/* Recovery Options */}
          {recoveryFunctions.length > 0 && (
            <>
              <Separator size="4" className="my-6 w-full" />
              <Text size="5" weight="bold" className="text-center">
                Recovery Options
              </Text>

              <Flex
                gap="4"
                wrap="wrap"
                justify="center"
                className="w-full !p-2"
              >
                {recoveryFunctions.map((recovery) => (
                  <RecoveryCard
                    key={recovery.title}
                    recovery={recovery}
                    handleRecovery={() => handleRecovery(recovery.title)}
                  />
                ))}
              </Flex>
            </>
          )}
        </Flex>
      </Card>
    </Flex>
  );
}

export default ErrorFallback;
