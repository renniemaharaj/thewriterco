import { Button } from "@radix-ui/themes";
import { useCallback, useState } from "react";

type RecoveryButtonProps = {
  onClick: () => Promise<boolean>;
  textContent: React.ReactNode;
};

const RecoveryButton = ({ onClick, textContent }: RecoveryButtonProps) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleMethod = useCallback(async () => {
    setLoading(true);
    try {
      const result = await onClick();
      if (result) {
        setDisabled(true);
      }
    } catch (error) {
      console.error("Recovery failed:", error);
    } finally {
      setLoading(false);
    }
  }, [onClick]);

  const sharedActionClass =
    "error-action !w-full !max-w-[300px] !h-12 !p-4 text-sm rounded-md flex items-center justify-center";

  return (
    <Button
      variant="solid"
      color="blue"
      onClick={handleMethod}
      className={`${sharedActionClass}`}
      aria-label="Retry after error"
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Spinner />
          Loading...
        </span>
      ) : (
        <>{textContent}</>
      )}
    </Button>
  );
};

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

export default RecoveryButton;
