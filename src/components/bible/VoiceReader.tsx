import { useVoiceReader } from "../hooks/useVoiceReader";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { PauseIcon, StopCircle, AudioLines } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ElevenVoice, useElevenLabs } from "../hooks/data/useElevenLabs";
import { useSelector } from "react-redux";
import VoiceSelect from "./VoiceSelect";
import ElevenLabs from "./ElevenLabs";
import { RootState } from "../../app/store";

type VoiceReaderProps = {
  value: string;
  override?: string;
  setOverride?: (override: string) => void;
};

const DEFAULT_VOICE_BROWSER = "Microsoft Mark - English (United States)";
const DEFAULT_VOICE_ELEVEN = "Lily";

const VoiceReader = ({ value, override }: VoiceReaderProps) => {
  const elevenLabs = useSelector((state: RootState) => state.elevenLabs);
  const elevenLabsPowered = elevenLabs.enabled ?? false;

  const browser = useVoiceReader();
  const eleven = useElevenLabs(elevenLabs.apiKey);

  const [selectedVoice, setSelectedVoice] = useState<
    SpeechSynthesisVoice | ElevenVoice
  >();
  const [stopped, setStopped] = useState(true);

  const active = elevenLabsPowered ? eleven : browser;

  const defaultVoiceName = useMemo(() => {
    return elevenLabsPowered ? DEFAULT_VOICE_ELEVEN : DEFAULT_VOICE_BROWSER;
  }, [elevenLabsPowered]);

  const setStop = useCallback(() => {
    setStopped(true);
    active.stop();
  }, [active]);

  useEffect(() => {
    if (active.voices.length > 0) {
      const defaultVoice = active.voices.find(
        (v) => v.name === defaultVoiceName,
      );
      setSelectedVoice(defaultVoice || active.voices[0]);
    }
  }, [active.voices, defaultVoiceName]);

  useEffect(() => {
    setStopped(!active.speaking && !active.paused);
  }, [active.speaking, active.paused]);

  const handlePlay = useCallback(
    (useOverride = false) => {
      const text = useOverride && override ? override : value;
      if (!text || !selectedVoice) return;

      active.speak(text, {
        voiceName: elevenLabsPowered
          ? (selectedVoice as ElevenVoice).voice_id
          : (selectedVoice as SpeechSynthesisVoice).name,
      });
    },
    [active, value, override, selectedVoice, elevenLabsPowered],
  );

  const handleStop = useCallback(() => {
    setStop();
  }, [setStop]);

  useEffect(() => {
    if (override) {
      handlePlay(true);
    }
  }, [override]);

  const voiceReaderIconClass =
    "text-gray-500 hover:animate-pulse transition-colors duration-200";

  return (
    <Flex direction="column" gap="2">
      <Flex className="gap-2 items-center">
        <IconButton
          onClick={() => handlePlay(false)}
          variant="soft"
          aria-label="Play"
          className={`${voiceReaderIconClass} ${active.paused && "!hidden"}`}
          disabled={!stopped}
        >
          <AudioLines />
        </IconButton>

        <IconButton
          onClick={active.resume}
          variant="soft"
          aria-label="Resume"
          className={`${!active.paused && "!hidden"}`}
          disabled={!active.paused}
        >
          <AudioLines />
        </IconButton>

        <IconButton
          onClick={active.pause}
          variant="soft"
          aria-label="Pause"
          className={`${voiceReaderIconClass} ${active.paused && "!hidden"}`}
          disabled={!active.speaking || active.paused}
        >
          <PauseIcon />
        </IconButton>

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
            voices={active.voices}
            selectedVoice={selectedVoice?.name ?? ""}
            setSelectedVoice={(voiceName) =>
              setSelectedVoice(active.voices.find((v) => v.name === voiceName))
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
