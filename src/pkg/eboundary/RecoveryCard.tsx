import { Card, Text } from "@radix-ui/themes";
import { useState } from "react";
import { RecoveryFunction } from "../../app/errorBoundary/types";

export function RecoveryCard({
  recovery,
  handleRecovery,
}: {
  recovery: RecoveryFunction;
  handleRecovery: () => Promise<void> | void; // supports async if needed
}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const onRecoverClick = async () => {
    try {
      setStatus("loading");
      await Promise.resolve(handleRecovery()); // handles async or sync
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "loading":
        return "Attempting to recover...";
      case "success":
        return "Recovered successfully!";
      case "error":
        return "Recovery failed.";
      default:
        return "Recover";
    }
  };

  return (
    <Card className="flex flex-col justify-between p-6 h-full !max-w-[300px] shadow-sm hover:shadow-md transition rounded-lg">
      {/* Title */}
      <Text className="text-xl font-bold mb-4">{recovery.title}</Text>

      {/* Details */}
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        {recovery.description && (
          <dl className="flex flex-col gap-1">
            <div className="flex justify-between">
              <dt className="font-medium text-gray-700">Description:</dt>
              <dd className="text-right text-gray-600">
                {recovery.description}
              </dd>
            </div>
          </dl>
        )}

        {recovery.componentRoute && (
          <dl className="flex flex-col gap-1">
            <div className="flex justify-between">
              <dt className="font-medium text-gray-700">Route:</dt>
              <dd className="text-right text-gray-600">
                {recovery.componentRoute}
              </dd>
            </div>
          </dl>
        )}
      </div>

      {/* Button */}
      <button
        onClick={onRecoverClick}
        disabled={status === "loading"}
        className={`mt-6 w-full font-semibold py-2 px-4 transition-colors ${
          status === "success"
            ? "bg-green-600 text-white hover:bg-green-700"
            : status === "error"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
        } ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {getStatusText()}
      </button>
    </Card>
  );
}
