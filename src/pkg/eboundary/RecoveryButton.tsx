import { useCallback, useState } from "react";
import Button from "../button/Button";
import { Spinner } from "@radix-ui/themes";
import { sharedActionClass } from "./classes";

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

  return (
    <Button
      color="gold"
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

export default RecoveryButton;
