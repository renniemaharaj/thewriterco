import { useVoiceReader } from "../hooks/useVoiceReader";
import { Flex, IconButton, Select } from "@radix-ui/themes";
import { PauseIcon, StopCircle, AudioLines } from "lucide-react";
import { useEffect, useState } from "react";

type VoiceReaderProps = {
  value: string;
  override?: string;
};

const DEFAULT_VOICE = "Microsoft Mark - English (United States)";

const VoiceReader = ({ value, override }: VoiceReaderProps) => {
  const { speak, pause, resume, stop, speaking, paused, voices } =
    useVoiceReader();

  const [selectedVoice, setSelectedVoice] = useState<string>();
  const [stopped, setStopped] = useState(true);

  useEffect(() => {
    if (voices.length > 0 && !selectedVoice) {
      const defaultVoice = voices.find((v) => v.name === DEFAULT_VOICE);
      setSelectedVoice(defaultVoice?.voiceURI || voices[0].voiceURI);
    }
  }, [voices]);

  useEffect(() => {
    setStopped(!speaking && !paused);
  }, [speaking, paused]);

  const handlePlay = (useOverride = false) => {
    const text = useOverride && override ? override : value;
    speak(text, { voiceName: selectedVoice });
  };

  const handleStop = () => {
    stop();
    setStopped(true);
  };

  const voiceReaderIconClass =
    "text-gray-500 hover:animate-pulse transition-colors duration-200";

  useEffect(() => {
    if (override) handlePlay(true);
  }, [override]);

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

        {/* Voice Selector */}
        <Select.Root value={selectedVoice} onValueChange={setSelectedVoice}>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Voices</Select.Label>
              {voices
                .filter((voice) => !!voice.voiceURI)
                .map((voice, index) => (
                  <Select.Item
                    key={`voice-${voice.voiceURI ?? index}`}
                    value={voice.voiceURI!}
                  >
                    {voice.name.slice(0, 20)} ({voice.lang})
                  </Select.Item>
                ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Flex>
  );
};

export default VoiceReader;
