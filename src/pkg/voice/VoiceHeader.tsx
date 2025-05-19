import { Flex, IconButton } from "@radix-ui/themes";
import { AudioLines, PauseIcon, StopCircle } from "lucide-react";
import { VoiceReaderEngine } from "../hooks/useVoiceReader";

export type VoiceHeaderProps = {
  voiceReaderEngine: VoiceReaderEngine;
  playing: boolean;
  paused: boolean;
  handlePlay: () => void;
  handlePause: () => void;
  handleResume: () => void;
  handleStop: () => void;
};

const VoiceHeader = ({
  voiceReaderEngine,
  handlePlay,
  playing,
  paused,
  handlePause,
  handleResume,
  handleStop,
}: VoiceHeaderProps) => {
  const voiceReaderIconClass =
    "text-gray-500 hover:animate-pulse transition-colors duration-200";

  return (
    <Flex className="gap-2 items-center">
      <IconButton
        onClick={handlePlay}
        variant="soft"
        aria-label="Play"
        className={`${voiceReaderIconClass} ${paused && "!hidden"}`}
        disabled={playing && !paused}
      >
        <AudioLines />
      </IconButton>

      <IconButton
        onClick={handleResume}
        variant="soft"
        aria-label="Resume"
        className={`${!paused && "!hidden"}`}
        disabled={!paused}
      >
        <AudioLines />
      </IconButton>

      <IconButton
        onClick={handlePause}
        variant="soft"
        aria-label="Pause"
        className={`${voiceReaderIconClass} ${paused && "!hidden"}`}
        disabled={!voiceReaderEngine.speaking || paused}
      >
        <PauseIcon />
      </IconButton>

      <IconButton
        onClick={handleStop}
        variant="soft"
        aria-label="Stop"
        disabled={!playing && !paused}
      >
        <StopCircle />
      </IconButton>
    </Flex>
  );
};

export default VoiceHeader;
