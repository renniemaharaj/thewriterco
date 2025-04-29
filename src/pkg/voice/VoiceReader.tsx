import { Flex, IconButton } from "@radix-ui/themes";
import { PauseIcon, StopCircle, AudioLines } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ElevenVoice } from "../hooks/data/useElevenLabs";
import { VoiceReaderEngine } from "../hooks/useVoiceReader";

export type Variant = SpeechSynthesisVoice | ElevenVoice;

export type VoiceReaderProps = {
  textContent: string[];
  defaultModel: boolean;
  selectedVoice: Variant;
  voiceReaderEngine: VoiceReaderEngine;
};

const VoiceReader = ({
  textContent,
  selectedVoice,
  voiceReaderEngine,
}: VoiceReaderProps) => {
  const currentIndexRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  const speakCurrent = useCallback(
    (index: number) => {
      const chunk = textContent[index];
      if (!chunk) return;

      voiceReaderEngine.speak(chunk, {
        voiceName:
          (selectedVoice as ElevenVoice).name ||
          (selectedVoice as SpeechSynthesisVoice).voiceURI,
      });
      setPlaying(true);
      setPaused(false);
    },
    [textContent, selectedVoice],
  ); // ✅ Only real dependencies

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

  // Auto move to next chunk after speaking
  // Increment *after* the engine finishes speaking
  useEffect(() => {
    if (!playing) return;
    if (!selectedVoice) return;

    if (!voiceReaderEngine.speaking && !voiceReaderEngine.paused) {
      if (currentIndexRef.current < textContent.length) {
        speakCurrent(currentIndexRef.current);
        currentIndexRef.current += 1; // Move to next AFTER speaking
      } else {
        setPlaying(false); // Reached end
      }
    }
  }, [playing, voiceReaderEngine.speaking, voiceReaderEngine.paused]);

  useEffect(() => {}, [voiceReaderEngine]);

  // Reset on textContent change
  useEffect(() => {
    if (textContent.length > 0) {
      currentIndexRef.current = 0;
      speakCurrent(0);
    }
  }, [textContent, speakCurrent]);

  // Restart reading if voice changes
  useEffect(() => {
    if (playing && !paused) {
      handleStop();
      handlePlay();
    }
  }, [selectedVoice]); // ✅ Only selectedVoice

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
