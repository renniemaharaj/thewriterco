import { useVoiceReader } from "../hooks/useVoiceReader";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { PauseIcon, StopCircle, AudioLines } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ElevenVoice, useElevenLabs } from "../hooks/data/useElevenLabs";
import { useDispatch, useSelector } from "react-redux";
import { PushToast } from "../../app/toast/toastSlice";
import VoiceSelect from "./VoiceSelect";
import ElevenLabs from "./ElevenLabs";
import { RootState } from "../../app/store";

type VoiceReaderProps = {
  value: string;
  override?: string;
  useEleven?: boolean;
  elevenKey?: string;
};

const VoiceReader = ({ value, override, elevenKey = "" }: VoiceReaderProps) => {
  const elevenLabs = useSelector((state: RootState) => state.elevenLabs);
  const enabled = elevenLabs.enabled;
  const desiredTechnology = enabled ? useElevenLabs : useVoiceReader;
  const {
    speak,
    pause,
    resume,
    stop,
    speaking,
    paused,
    voices,
    errors,
    clearErrors,
  } = desiredTechnology(elevenKey);

  const [selectedVoice, setSelectedVoice] = useState<string>();
  const [stopped, setStopped] = useState(true);

  const DEFAULT_VOICE_BROWSER = "Microsoft Mark - English (United States)";
  const DEFAULT_VOICE_ELEVEN = "Lily";

  useEffect(() => {
    if (voices.length > 0 && !selectedVoice) {
      if (enabled) {
        const defaultVoice = voices.find(
          (v) => (v as ElevenVoice).name === DEFAULT_VOICE_ELEVEN,
        );
        if (defaultVoice) {
          setSelectedVoice(
            (defaultVoice as ElevenVoice).name ||
              (voices[0] as ElevenVoice).name,
          );
        }
      } else {
        const defaultVoice = voices.find(
          (v) => (v as SpeechSynthesisVoice).name === DEFAULT_VOICE_BROWSER,
        );
        if (defaultVoice) {
          setSelectedVoice(
            (defaultVoice as SpeechSynthesisVoice).voiceURI ||
              (voices[0] as SpeechSynthesisVoice).voiceURI,
          );
        }
      }
    }
  }, [voices, enabled, selectedVoice]);

  useEffect(() => {
    setStopped(!speaking && !paused);
  }, [speaking, paused]);

  const handlePlay = useCallback(
    (useOverride = false) => {
      const text = useOverride && override ? override : value;
      speak(text, { voiceName: selectedVoice });
    },
    [speak, value, selectedVoice, override],
  );

  const handleStop = () => {
    stop();
    setStopped(true);
  };

  const voiceReaderIconClass =
    "text-gray-500 hover:animate-pulse transition-colors duration-200";

  useEffect(() => {
    if (override) handlePlay(true);
  }, [override, handlePlay]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error) =>
        dispatch(PushToast({ message: error, success: false })),
      );
      return () => {
        clearErrors();
      };
    }
  }, [errors, clearErrors, dispatch]);

  return (
    <Flex direction="column" gap="2">
      <Flex className="gap-2 items-center">
        {/* Play Original */}
        <IconButton
          onClick={() => handlePlay(false)}
          variant="soft"
          aria-label="Play"
          className={`${voiceReaderIconClass} ${paused && "!hidden"}`}
          disabled={!stopped}
        >
          <AudioLines />
        </IconButton>

        {/* Resume */}
        <IconButton
          onClick={resume}
          variant="soft"
          aria-label="Resume"
          className={`${!paused && "!hidden"}`}
          disabled={!paused}
        >
          <AudioLines />
        </IconButton>

        {/* Pause */}
        <IconButton
          onClick={pause}
          variant="soft"
          aria-label="Pause"
          className={`${voiceReaderIconClass} ${paused && "!hidden"}`}
          disabled={!speaking || paused}
        >
          <PauseIcon />
        </IconButton>

        {/* Stop */}
        <IconButton
          onClick={handleStop}
          variant="soft"
          aria-label="Stop"
          disabled={stopped}
        >
          <StopCircle />
        </IconButton>
        <Flex className="gap-2 items-center">
          <VoiceSelect
            voices={voices}
            setSelectedVoice={setSelectedVoice}
            selectedVoice={selectedVoice ?? ""}
            useEleven={enabled}
          />
          <ElevenLabs trigger={<Button variant="soft">Lab</Button>} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VoiceReader;
