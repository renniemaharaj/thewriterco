import { Flex } from "@radix-ui/themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { VoiceReaderEngine } from "../hooks/useVoiceReader";
import VoiceHeader from "./VoiceHeader";

import {
  useGlobalShortcuts,
  registerShortcut,
  unregisterShortcut,
} from "../hooks/useGlobalShortcuts";

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
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentText, setCurrentText] = useState<string[]>([]);

  // Utility
  const not = (val: boolean) => !val;

  // Sync currentText with textContent
  useEffect(() => {
    const isDifferent =
      textContent.length !== currentText.length ||
      textContent.some((t, i) => t !== currentText[i]);

    if (isDifferent) {
      setCurrentText(textContent);
    }
  }, [textContent, currentText]);

  const speakCurrent = useCallback(
    async (index: number, onSpoken?: () => void) => {
      const chunk = currentText[index];
      if (!chunk) return false;

      setPlaying(true);
      setPaused(false);

      try {
        await voiceReaderEngine.speakAsync(chunk, {
          voiceName: selectedVoice?.voiceURI,
        });
        onSpoken?.();
        return true;
      } catch {
        return false;
      }
    },

    // Only rerun when selectedVoice actually changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentText, selectedVoice],
  );

  const handlePlay = useCallback(() => {
    currentIndexRef.current = 0;
    speakCurrent(0);
  }, [speakCurrent]);

  // Wrapping these will require unstable dependencies

  const handleResume = () => {
    handlePlay();
  };

  // Wrapping these will require unstable dependencies

  const handlePause = () => {
    handleStop();
  };

  const handleStop = useCallback(() => {
    voiceReaderEngine.stop();
    setPlaying(false);
    setPaused(false);
    currentIndexRef.current = 0;
  }, [voiceReaderEngine]);

  const trySpeakNext = useCallback(() => {
    const canSpeak =
      not(voiceReaderEngine.speaking) && not(voiceReaderEngine.paused);
    const hasMore = currentIndexRef.current < currentText.length;

    if (canSpeak && hasMore) {
      const index = currentIndexRef.current;
      speakCurrent(index, () => {
        onSpeechProgress(index);
        currentIndexRef.current++;
      });
    } else if (!hasMore) {
      setPlaying(false);
    }
  }, [
    voiceReaderEngine.speaking,
    voiceReaderEngine.paused,
    currentText.length,
    onSpeechProgress,
    speakCurrent,
  ]);

  // Speak loop runner
  useEffect(() => {
    if (playing && selectedVoice) {
      trySpeakNext();
    }
  }, [playing, trySpeakNext, selectedVoice]);

  // Restart reading when currentText changes
  useEffect(() => {
    if (currentText.length > 0) {
      currentIndexRef.current = 0;
      speakCurrent(0);
    }
  }, [currentText, speakCurrent]);

  // Restart if voice changes while playing and not paused
  useEffect(() => {
    if (playing && !paused) {
      handleStop();
      handlePlay();
    }
    // Only rerun when selectedVoice actually changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVoice?.voiceURI]);

  useGlobalShortcuts(); // Mount global listener once

  useEffect(() => {
    const stopShortcut = {
      key: "Escape",
      action: () => {
        if (playing) handleStop();
      },
    };

    const playStopShortcut = {
      key: " ",
      action: () => {
        if (playing) {
          handleStop();
        } else {
          handlePlay();
        }
      },
    };

    registerShortcut(stopShortcut);
    registerShortcut(playStopShortcut);

    return () => {
      unregisterShortcut(stopShortcut);
      unregisterShortcut(playStopShortcut);
    };
  }, [handlePlay, handleStop, playing]);

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
