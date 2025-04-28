import { Flex, IconButton } from "@radix-ui/themes";
import { PauseIcon, StopCircle, AudioLines } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ElevenVoice } from "../hooks/data/useElevenLabs";
import { VoiceReaderEngine } from "../hooks/useVoiceReader";

export type Variant = SpeechSynthesisVoice | ElevenVoice;

export type VoiceReaderProps = {
  textContent: string;
  defaultModel: boolean;
  selectedVoice: Variant;
  activeVoice: VoiceReaderEngine;
  apiKey?: string;
};

const VoiceReader = ({
  defaultModel,
  textContent,
  selectedVoice,
  activeVoice,
}: VoiceReaderProps) => {
  const [stopped, setStopped] = useState(true);

  const setStop = useCallback(() => {
    setStopped(true);
    activeVoice.stop();
  }, [activeVoice]);

  const handlePlay = useCallback(() => {
    if (!textContent || !selectedVoice) return;

    activeVoice.stop(); // Important: stop any old speech first.

    activeVoice.speak(textContent, {
      voiceName: defaultModel
        ? (selectedVoice as ElevenVoice).voice_id
        : (selectedVoice as SpeechSynthesisVoice).name,
    });
  }, [activeVoice, textContent, selectedVoice, defaultModel]);

  const handleResume = useCallback(() => {
    activeVoice.resume();
  }, [activeVoice]);

  const handlePause = useCallback(() => {
    activeVoice.pause();
  }, [activeVoice]);

  useEffect(() => {
    setStopped(!activeVoice.speaking && !activeVoice.paused);
  }, [activeVoice.speaking, activeVoice.paused]);

  const voiceReaderIconClass =
    "text-gray-500 hover:animate-pulse transition-colors duration-200";

  return (
    <Flex direction="column" gap="2">
      <Flex className="gap-2 items-center">
        <IconButton
          onClick={handlePlay}
          variant="soft"
          aria-label="Play"
          className={`${voiceReaderIconClass} ${activeVoice.paused && "!hidden"}`}
          disabled={!stopped}
        >
          <AudioLines />
        </IconButton>

        <IconButton
          onClick={handleResume}
          variant="soft"
          aria-label="Resume"
          className={`${!activeVoice.paused && "!hidden"}`}
          disabled={!activeVoice.paused}
        >
          <AudioLines />
        </IconButton>

        <IconButton
          onClick={handlePause}
          variant="soft"
          aria-label="Pause"
          className={`${voiceReaderIconClass} ${activeVoice.paused && "!hidden"}`}
          disabled={!activeVoice.speaking || activeVoice.paused}
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
    </Flex>
  );
};

export default VoiceReader;
