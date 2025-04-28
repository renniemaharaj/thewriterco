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
  const [paused, setPaused] = useState(false);

  const setStop = useCallback(() => {
    setStopped(true);
    setPaused(false);
    activeVoice.stop();
  }, [activeVoice]);

  const handlePlay = useCallback(() => {
    if (!textContent || !selectedVoice) return;

    activeVoice.stop();
    activeVoice.speak(textContent, {
      voiceName: defaultModel
        ? (selectedVoice as ElevenVoice).voice_id
        : (selectedVoice as SpeechSynthesisVoice).name,
    });
    setStopped(false);
    setPaused(false);
  }, [activeVoice, textContent, selectedVoice, defaultModel]);

  const handleResume = useCallback(() => {
    activeVoice.resume();
    setPaused(false);
  }, [activeVoice]);

  const handlePause = useCallback(() => {
    activeVoice.pause();
    setPaused(true);
  }, [activeVoice]);

  useEffect(() => {
    setStopped(!activeVoice.speaking && !activeVoice.paused);
    setPaused(activeVoice.paused);
  }, [activeVoice.speaking, activeVoice.paused]);

  // Auto-restart reading if textContent changes, but only if playing (NOT paused)
  useEffect(() => {
    if (activeVoice.speaking && !stopped && !paused) {
      activeVoice.stop();
      activeVoice.speak(textContent, {
        voiceName: defaultModel
          ? (selectedVoice as ElevenVoice).voice_id
          : (selectedVoice as SpeechSynthesisVoice).name,
      });
    }
  }, [textContent, activeVoice, selectedVoice, defaultModel]);

  const voiceReaderIconClass =
    "text-gray-500 hover:animate-pulse transition-colors duration-200";

  return (
    <Flex direction="column" gap="2">
      <Flex className="gap-2 items-center">
        <IconButton
          onClick={handlePlay}
          variant="soft"
          aria-label="Play"
          className={`${voiceReaderIconClass} ${paused && "!hidden"}`}
          disabled={!stopped}
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
          disabled={!activeVoice.speaking || paused}
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
