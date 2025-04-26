import { Select } from "@radix-ui/themes";
import VoiceList from "./VoiceList";
import { ElevenVoice } from "../hooks/data/useElevenLabs";
import { memo } from "react";

export type VoiceSelectProps = {
  voices: SpeechSynthesisVoice[] | ElevenVoice[];
  useEleven: boolean;
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
};

const VoiceSelect = ({
  selectedVoice,
  setSelectedVoice,
  useEleven,
  voices,
}: VoiceSelectProps) => {
  return (
    <Select.Root value={selectedVoice} onValueChange={setSelectedVoice}>
      <Select.Trigger
      // children={<Button variant="soft">{selectedVoice}</Button>}
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>
            {useEleven ? "ElevenLabs voices" : "Browser voices"}
          </Select.Label>
          {<VoiceList voices={voices} useEleven={useEleven} />}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default memo(VoiceSelect);
