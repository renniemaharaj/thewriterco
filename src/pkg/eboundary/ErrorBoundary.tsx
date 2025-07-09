import { Flex, Text, Code, Card, Separator } from "@radix-ui/themes";
import { ShieldAlert, RotateCcw, RefreshCw, Bug } from "lucide-react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { recoveryFunctionMap } from "./config";
import { RecoveryCard } from "./RecoveryCard";
import RecoveryButton from "./RecoveryButton";
import Button from "../button/Button";
import { sharedActionClass } from "./classes";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const recoveryFunctions = useSelector(
    (state: RootState) => state.errorBoundary.recoveryFunctions,
  );

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
      className="min-h-screen"
    >
      <Card className="!max-w-2xl !p-8 shadow-xl !rounded-2xl">
        <Flex direction="column" align="center" gap="6">
          <Flex direction="column" align="center" className="flex-col !gap-2">
            {/* Header Icon */}
            <ShieldAlert
              className="w-14 h-14 text-blue-600"
              aria-hidden="true"
            />

            {/* Main Title */}
            <Text size="8" weight="bold" className="text-center">
              Application Crashed
            </Text>

            {/* Subtext */}
            <Text size="4" color="gray" className="text-center max-w-md">
              Something went wrong, but don't worry — let's recover your state
            </Text>
          </Flex>

          {/* Actions */}
          <Flex direction="column" className="!w-full !my-8 !gap-2">
            {/* Error Message */}
            <Code
              variant="solid"
              className="!w-full !p-4 !overflow-auto !max-h-40 rounded-md !bg-red-100 !text-red-800"
            >
              {error.message}
            </Code>
          </Flex>
          <Flex className="flex-row !justify-start !flex-wrap !gap-2">
            <RecoveryButton
              onClick={async () => {
                resetErrorBoundary();
                // simulate recovery logic
                await new Promise((res) => setTimeout(res, 1500));
                return true; // or "error" based on logic
              }}
              textContent={
                <>
                  <RotateCcw className="w-5 h-5 mr-2 flip" />
                  "Retry"
                </>
              }
            />

            <Button
              variant="soft"
              color="gold"
              onClick={() => window.location.reload()}
              className={sharedActionClass}
              aria-label="Restart application"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reload
            </Button>

            <Button
              color="gold"
              onClick={() =>
                (window.location.href =
                  "mailto:rvesprey@gmail.com?subject=App Crash Report")
              }
              className={sharedActionClass}
              aria-label="Report crash issue"
            >
              <Bug className="w-5 h-5 mr-2" />
              Report
            </Button>
          </Flex>

          {/* Recovery Options */}
          {recoveryFunctions.length > 0 && (
            <>
              <Separator size="4" className="my-6 w-full" />
              <Text size="5" weight="bold" className="text-center">
                Registered Functions
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
