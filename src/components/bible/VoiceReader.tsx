import { useVoiceReader } from "../hooks/useVoiceReader";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { AudioLines, PauseCircle, StopCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ElevenVoice, useElevenLabs } from "../hooks/data/useElevenLabs";
import { useDispatch, useSelector } from "react-redux";
import { PushToast } from "../../app/toast/toastSlice";
import VoiceSelect from "./VoiceSelect";
import ElevenLabs from "./ElevenLabs";
import { RootState } from "../../app/store";
import SpeakIcon from "./SpeakIcon";
import { setSpeaking } from "../../app/ereader/ereaderSlice";

type VoiceReaderProps = {
  value: string;
  override?: string;
  setOverride?: (override: string) => void;
};

const DEFAULT_VOICE_BROWSER = "Microsoft Mark - English (United States)";
const DEFAULT_VOICE_ELEVEN = "Lily";

const VoiceReader = ({ value, override, setOverride }: VoiceReaderProps) => {
  const dispatch = useDispatch();
  const { enabled: elevenLabsPowered, apiKey } = useSelector(
    (state: RootState) => state.elevenLabs,
  );

  const elevenLabsReader = useElevenLabs(apiKey);
  const browserReader = useVoiceReader();

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
  } = elevenLabsPowered ? elevenLabsReader : browserReader;

  const [selectedVoice, setSelectedVoice] = useState<
    SpeechSynthesisVoice | ElevenVoice
  >();
  const [stopped, setStopped] = useState(true);

  const defaultVoiceName = useMemo(
    () => (elevenLabsPowered ? DEFAULT_VOICE_ELEVEN : DEFAULT_VOICE_BROWSER),
    [elevenLabsPowered],
  );

  // Set default voice
  useEffect(() => {
    if (voices.length && !selectedVoice) {
      const defaultVoice = voices.find((v) => v.name === defaultVoiceName);
      setSelectedVoice(defaultVoice || voices[0]);
    }
  }, [voices, defaultVoiceName, selectedVoice]);

  // Update stop state based on speaking and paused
  useEffect(() => {
    setStopped(!speaking && !paused);
  }, [speaking, paused]);

  const handlePlay = useCallback(
    (useOverride = false) => {
      const text = useOverride && override ? override : value;
      if (!text || !selectedVoice) return;

      speak(text, {
        voiceName: elevenLabsPowered
          ? (selectedVoice as ElevenVoice).voice_id
          : (selectedVoice as SpeechSynthesisVoice).name,
      });

      dispatch(setSpeaking(true));
    },
    [speak, value, override, selectedVoice, elevenLabsPowered],
  );

  const handleStop = useCallback(() => {
    stop();
    setStopped(true);
    dispatch(setSpeaking(false));
  }, [stop]);

  // Auto-play when override is set
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!override) return;
    handlePlay(true);
    return () => handleStop();
  }, [override]);

  // Display errors via toast
  useEffect(() => {
    if (!errors.length) return;
    errors.forEach((error) =>
      dispatch(PushToast({ message: error, success: false })),
    );
    clearErrors();
  }, [errors, dispatch, clearErrors]);

  const voiceReaderIconClass =
    "text-gray-500 hover:animate-pulse transition-colors duration-200";

  useEffect(() => {
    if (stopped) {
      setOverride?.("");
    }
  }, [stopped]);
  return (
    <Flex direction="column" gap="2">
      <Flex className="gap-2 items-center">
        {/* Play */}
        <SpeakIcon
          onClick={() => handlePlay()}
          // variant="soft"
          className={`${voiceReaderIconClass} ${!stopped && "!hidden"}`}
          disabled={!selectedVoice}
        />
        {/* Resume */}
        <IconButton
          onClick={resume}
          variant="soft"
          aria-label="Resume"
          disabled={!paused}
          className={`${voiceReaderIconClass} ${!paused && "!hidden"}`}
        >
          <AudioLines />
        </IconButton>
        {/* Pause */}
        <IconButton
          onClick={pause}
          variant="soft"
          aria-label="Pause"
          disabled={!speaking || paused}
          className={`${voiceReaderIconClass} ${paused || (stopped && "!hidden")}`}
        >
          <PauseCircle />
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

        {/* Voice & Settings */}
        <Flex className="gap-2 items-center">
          <VoiceSelect
            voices={voices}
            selectedVoice={selectedVoice?.name ?? ""}
            setSelectedVoice={(voiceName) =>
              setSelectedVoice(voices.find((v) => v.name === voiceName))
            }
            useEleven={elevenLabsPowered}
          />
          <ElevenLabs trigger={<Button variant="soft">Lab</Button>} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VoiceReader;
