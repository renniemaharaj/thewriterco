import { Flex, IconButton } from "@radix-ui/themes";
import { PauseIcon, StopCircle, AudioLines } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { VoiceReaderEngine } from "../hooks/useVoiceReader";

export type Variant = SpeechSynthesisVoice;

export type VoiceReaderProps = {
  textContent: string[];
  defaultModel: boolean;
  selectedVoice: Variant;
  voiceReaderEngine: VoiceReaderEngine;
  onSpeechProgress: (i: number) => void;
};

const VoiceReader = ({
  textContent,
  selectedVoice,
  voiceReaderEngine,
  onSpeechProgress,
}: VoiceReaderProps) => {
  const currentIndexRef = useRef(-1);
  const [localTextContent, setLocalTextContent] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  // Deep compare and update local text content if changed
  useEffect(() => {
    const isEffectivelyEmpty = (arr: string[]) =>
      arr.length === 0 || (arr.length === 1 && arr[0].trim() === "");

    const hasChanged =
      textContent.length !== localTextContent.length ||
      textContent.some((t, i) => t !== localTextContent[i]);

    if (hasChanged && !isEffectivelyEmpty(textContent)) {
      setLocalTextContent(textContent);
    }
  }, [textContent, localTextContent]);

  const speakCurrent = useCallback(
    async (index: number, onSpoken?: () => void) => {
      const chunk = localTextContent[index];
      if (!chunk) return false;

      setPlaying(true);
      setPaused(false);

      try {
        await voiceReaderEngine.speakAsync(chunk, {
          voiceName: (selectedVoice as SpeechSynthesisVoice)?.voiceURI,
        });
        onSpoken?.();
        return true;
      } catch {
        // console.error("Speech error:", err);
        return false;
      }
    },
    [localTextContent, selectedVoice],
  );

  const handlePlay = () => {
    currentIndexRef.current = 0;
    speakCurrent(0);
  };

  const handleResume = () => {
    voiceReaderEngine.resume();
    setPaused(false);
  };

  const handlePause = () => {
    voiceReaderEngine.pause();
    setPaused(true);
  };

  const handleStop = () => {
    voiceReaderEngine.stop();
    setPlaying(false);
    setPaused(false);
    currentIndexRef.current = 0;
  };

  const not = (val: boolean) => !val;
  // Auto move to next chunk after speaking
  useEffect(() => {
    if (!playing) return;
    if (!selectedVoice) return;
    if (not(voiceReaderEngine.speaking) && not(voiceReaderEngine.paused)) {
      if (currentIndexRef.current < localTextContent.length) {
        speakCurrent(currentIndexRef.current, () => {
          onSpeechProgress(currentIndexRef.current);
          currentIndexRef.current++;
        });
        // onSpeechProgress(currentIndexRef.current);
      } else {
        setPlaying(false); // Reached end
      }
    }
  }, [
    playing,
    voiceReaderEngine.speaking,
    voiceReaderEngine.paused,
    localTextContent.length,
    onSpeechProgress,
  ]);

  // Reset on localTextContent change
  useEffect(() => {
    if (localTextContent.length > 0) {
      currentIndexRef.current = 0;
      speakCurrent(0);
    }
  }, [localTextContent, speakCurrent]);

  // Restart reading if voice changes
  useEffect(() => {
    if (playing && !paused) {
      handleStop();
      handlePlay();
    }
  }, [selectedVoice]);

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
    </Flex>
  );
};

export default VoiceReader;
