import { useVoiceReader } from "../hooks/useVoiceReader";

import { Flex, IconButton } from "@radix-ui/themes";
import { PlayIcon, PauseIcon, StopCircle } from "lucide-react";
import { useEffect, useState } from "react";

const VoiceReader = ({ value: value }: { value: string }) => {
  const { speak, pause, resume, stop, speaking, paused } = useVoiceReader();

  const [stopped, setStopped] = useState(true);

  useEffect(() => {
    if (speaking) setStopped(false);
    if (!speaking && !paused) setStopped(true);
  }, [speaking]);

  const setStop = () => {
    setStopped(true);
    stop();
  };

  const voiceReaderIconClassName =
    "text-gray-500 hover:animate-pulse transition-colors duration-200 ease-in-out";

  return (
    <Flex className="gap-2 items-center">
      <IconButton
        className={`${voiceReaderIconClassName} ${paused && "!hidden"}`}
        disabled={!stopped}
        onClick={() => speak(value)}
        variant="soft"
        aria-label="Play"
      >
        <PlayIcon />
      </IconButton>
      <IconButton
        className={`${!paused && "!hidden"}`}
        onClick={resume}
        variant="soft"
        aria-label="Resume"
        disabled={!paused}
      >
        <PlayIcon />
      </IconButton>
      <IconButton
        onClick={pause}
        variant="soft"
        aria-label="Pause"
        className={`${voiceReaderIconClassName} ${paused && "!hidden"}`}
        disabled={!speaking || paused}
      >
        <PauseIcon />
      </IconButton>

      <IconButton
        onClick={setStop}
        variant="soft"
        aria-label="Stop"
        disabled={stopped}
      >
        <StopCircle />
      </IconButton>
    </Flex>
  );
};

export default VoiceReader;
