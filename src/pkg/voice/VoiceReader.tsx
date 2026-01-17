import { Flex } from "@radix-ui/themes";
import { useCallback, useEffect, useState } from "react";
import type { VoiceReaderEngine } from "../hooks/useVoiceReader";
import VoiceHeader from "./VoiceHeader";

export type Variant = SpeechSynthesisVoice;

export type VoiceReaderProps = {
  textContent: string;
  defaultModel: boolean;
  selectedVoice: Variant;
  voiceReaderEngine: VoiceReaderEngine;
  onSpeechProgress: () => void;
};

const VoiceReader = ({
  textContent,
  selectedVoice,
  voiceReaderEngine,
  onSpeechProgress,
}: VoiceReaderProps) => {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  const speakCurrent = useCallback(
    async () => {
      if (!textContent) return;

      setPlaying(true);
      setPaused(false);

      try {
        await voiceReaderEngine.speakAsync(textContent, {
          voiceName: selectedVoice?.voiceURI,
        });
        onSpeechProgress?.();
        return true;
      } catch {
        return false;
      }
    },

    // Only rerun when selectedVoice actually changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textContent, selectedVoice],
  );

  const handlePlay = useCallback(() => {
    speakCurrent();
  }, [speakCurrent]);

  const handleResume = () => {
    handlePlay();
  };

  const handlePause = () => {
    handleStop();
  };

  const handleStop = useCallback(() => {
    voiceReaderEngine.stop();
    setPlaying(false);
    setPaused(false);
  }, [voiceReaderEngine]);

  // Restart if voice changes while playing and not paused
  useEffect(() => {
    if (playing && !paused) {
      handleStop();
      handlePlay();
    }
    // Only rerun when selectedVoice actually changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVoice?.voiceURI, textContent]);
  return (
    <Flex direction="column" gap="2">
      <VoiceHeader
        voiceReaderEngine={voiceReaderEngine}
        playing={playing}
        paused={paused}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleResume={handleResume}
        handleStop={handleStop}
      />
    </Flex>
  );
};

export default VoiceReader;
