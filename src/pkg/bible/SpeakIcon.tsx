import { IconButton } from "@radix-ui/themes";
import { AudioLines } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export type SpeakProps = {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

const SpeakIcon = ({ onClick, className, disabled }: SpeakProps) => {
  const speaking = useSelector((state: RootState) => state.reader.speaking);
  return (
    <IconButton
      className={`!animate-pulse ${className}`}
      variant="soft"
      onClick={onClick}
      disabled={disabled || speaking}
      aria-label="Speak"
    >
      <AudioLines />
    </IconButton>
  );
};

export default SpeakIcon;
