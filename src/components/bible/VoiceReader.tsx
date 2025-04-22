import { useVoiceReader } from "../hooks/useVoiceReader";
import { Flex, IconButton, Select } from "@radix-ui/themes";
import { PlayIcon, PauseIcon, StopCircle } from "lucide-react";
import { useEffect, useState } from "react";

const VoiceReader = ({ value }: { value: string }) => {
  const { speak, pause, resume, stop, speaking, paused, voices } =
    useVoiceReader();

  const defaultVoice = "Microsoft Mark - English (United States)";

  const [stopped, setStopped] = useState(true);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (voices.length > 0 && !selectedVoiceURI) {
      setSelectedVoiceURI(defaultVoice || voices[0].voiceURI);
    }
  }, [voices]);

  useEffect(() => {
    if (speaking) setStopped(false);
    if (!speaking && !paused) setStopped(true);
  }, [speaking]);

  const setStop = () => {
    setStopped(true);
    stop();
  };

  const handlePlay = () => {
    speak(value, { voiceName: selectedVoiceURI });
  };

  useEffect(() => {
    console.log("Selected voice URI changed:", selectedVoiceURI);
  }, [selectedVoiceURI]);

  const voiceReaderIconClassName =
    "text-gray-500 hover:animate-pulse transition-colors duration-200 ease-in-out";

  return (
    <Flex direction="column" gap="2">
      <Flex className="gap-2 items-center">
        <IconButton
          className={`${voiceReaderIconClassName} ${paused && "!hidden"}`}
          disabled={!stopped}
          onClick={handlePlay}
          variant="soft"
          aria-label="Play"
        >
          <PlayIcon />
        </IconButton>
        <IconButton
          className={`${!paused && "!hidden"}`}
          onClick={resume}
          variant="soft"
          aria-label="Resume"
          disabled={!paused}
        >
          <PlayIcon />
        </IconButton>
        <IconButton
          onClick={pause}
          variant="soft"
          aria-label="Pause"
          className={`${voiceReaderIconClassName} ${paused && "!hidden"}`}
          disabled={!speaking || paused}
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

        <Select.Root
          defaultValue={defaultVoice}
          onValueChange={setSelectedVoiceURI}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Voices</Select.Label>
              {voices.map((voice) => (
                <Select.Item key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name.slice(0, 15)} {voice.lang.slice(0, 5)}
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
