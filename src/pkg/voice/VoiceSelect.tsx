import { Select } from "@radix-ui/themes";
import VoiceList from "./VoiceList";
import { ElevenVoice } from "../hooks/data/useElevenLabs";
import { memo, useEffect } from "react";
import useGetDefaultVoice from "../hooks/useGetDefaultVoice";

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
  const resolveVoice = useGetDefaultVoice().resolveVoice;
  useEffect(() => {
    if (!resolveVoice()) return;
    setSelectedVoice(
      (resolveVoice() as ElevenVoice).name ??
        (resolveVoice() as SpeechSynthesisVoice).voiceURI,
    );
  }, [resolveVoice, setSelectedVoice]);

  return (
    <Select.Root
      disabled
      value={selectedVoice}
      onValueChange={setSelectedVoice}
    >
      <Select.Trigger />
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
