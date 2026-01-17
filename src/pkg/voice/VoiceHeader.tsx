import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { AudioLines, PauseIcon, StopCircle } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import {
  registerShortcut,
  unregisterShortcut,
  useGlobalShortcuts,
} from "../hooks/useGlobalShortcuts";
import type { VoiceReaderEngine } from "../hooks/useVoiceReader";

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
  const voiceReaderIconClass = "text-gray-500 hover:animate-pulse transition-colors duration-200";

  const readerOpen = useSelector((state: RootState) => state.reader.isOpen);
  useGlobalShortcuts(); // Mount global listener once
  useEffect(() => {
    const stopShortcut = {
      key: "Escape",
      action: (e: KeyboardEvent) => {
        if (playing && readerOpen) handleStop();
        e.preventDefault();
      },
    };

    const playStopShortcut = {
      key: " ",
      action: (e: KeyboardEvent) => {
        if (!readerOpen) return;
        if (playing) {
          handleStop();
          e.preventDefault();
        } else {
          handlePlay();
          e.preventDefault();
        }
      },
    };

    registerShortcut(stopShortcut);
    registerShortcut(playStopShortcut);

    return () => {
      unregisterShortcut(stopShortcut);
      unregisterShortcut(playStopShortcut);
    };
  }, [handlePlay, handleStop, playing, readerOpen]);
  return (
    <Flex className="gap-2 items-center">
      <Tooltip content="⌘ Space Key">
        <IconButton
          onClick={handlePlay}
          variant="soft"
          aria-label="Play"
          className={`${voiceReaderIconClass} ${paused && "!hidden"}`}
          disabled={playing && !paused}
        >
          <AudioLines />
        </IconButton>
      </Tooltip>

      <Tooltip content="⌘ Space Key">
        <IconButton
          onClick={handleResume}
          variant="soft"
          aria-label="Resume"
          className={`${!paused && "!hidden"}`}
          disabled={!paused}
        >
          <AudioLines />
        </IconButton>
      </Tooltip>

      <Tooltip content="⌘ Space Key">
        <IconButton
          onClick={handlePause}
          variant="soft"
          aria-label="Pause"
          className={`${voiceReaderIconClass} ${paused && "!hidden"}`}
          disabled={!voiceReaderEngine.speaking || paused}
        >
          <PauseIcon />
        </IconButton>
      </Tooltip>

      <Tooltip content="⌘ Space Key">
        <IconButton
          onClick={handleStop}
          variant="soft"
          aria-label="Stop"
          disabled={!playing && !paused}
        >
          <StopCircle />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default VoiceHeader;
