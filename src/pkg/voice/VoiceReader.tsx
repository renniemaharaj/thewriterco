import { Flex, IconButton } from "@radix-ui/themes";
import { PauseIcon, StopCircle, AudioLines } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ElevenVoice } from "../hooks/data/useElevenLabs";
import { VoiceReaderEngine } from "../hooks/useVoiceReader";
import useGetDefaultVoice from "../hooks/useGetDefaultVoice";

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
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);

  const getVoiceName = useCallback(() => {
    return defaultModel
      ? (selectedVoice as ElevenVoice).voice_id
      : (selectedVoice as SpeechSynthesisVoice).name;
  }, [defaultModel, selectedVoice]);

  const handlePlay = useCallback(() => {
    if (!textContent) return;

    activeVoice.stop();
    activeVoice.speak(textContent, {
      voiceName: getVoiceName(),
    });
    setPlaying(false);
    setPaused(false);
  }, [activeVoice, textContent, getVoiceName]);

  const handleResume = useCallback(() => {
    activeVoice.resume();
    setPaused(false);
  }, [activeVoice]);

  const handlePause = useCallback(() => {
    activeVoice.pause();
    setPaused(true);
  }, [activeVoice]);

  const handleStop = useCallback(() => {
    activeVoice.stop();
    setPlaying(true);
    setPaused(false);
  }, [activeVoice]);

  // Keep UI state synced to activeVoice (only state syncing here)
  useEffect(() => {
    setPlaying(!activeVoice.speaking && !activeVoice.paused);
    setPaused(activeVoice.paused);
  }, [activeVoice.speaking, activeVoice.paused]);

  const defaultVoice = useGetDefaultVoice().resolveVoice();

  // ONLY when new textContent arrives (NOT when paused or stopped manually)
  useEffect(() => {
    if (!textContent.trim()) return;
    activeVoice.stop();
    activeVoice.speak(textContent, {
      voiceName:
        (defaultVoice as ElevenVoice).name ||
        (defaultVoice as SpeechSynthesisVoice).voiceURI,
    });
  }, [textContent, getVoiceName]); // Only listening to textContent changes!

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
          disabled={!playing}
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
          onClick={handleStop}
          variant="soft"
          aria-label="Stop"
          disabled={playing}
        >
          <StopCircle />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default VoiceReader;
