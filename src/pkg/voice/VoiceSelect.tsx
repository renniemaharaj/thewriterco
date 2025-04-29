import { Select } from "@radix-ui/themes";
import VoiceList from "./VoiceList";
import { ElevenVoice } from "../hooks/data/useElevenLabs";
import { memo, useCallback, useEffect } from "react";
import useResolveFallbackVoice from "../hooks/useResolveFallbackVoice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { SetSelectedVoice } from "../../app/elevenLabs/eleventLabsSlice";

export type VoiceSelectProps = {
  voices: SpeechSynthesisVoice[] | ElevenVoice[];
};

const VoiceSelect = ({ voices }: VoiceSelectProps) => {
  const elevenLabs = useSelector((state: RootState) => state.elevenLabs);
  // const selectedVoice = elevenLabs.selectedVoice?.trim();
  const useEleven = elevenLabs.enabled;

  const dispatch = useDispatch();
  const setSelectedVoice = useCallback(
    (value: string) => dispatch(SetSelectedVoice(value)),
    [dispatch],
  );

  const resolveVoice = useResolveFallbackVoice().resolveOrFallback();

  useEffect(() => {
    if (elevenLabs.selectedVoice) return;
    if (!resolveVoice) return;
    setSelectedVoice(
      (resolveVoice as ElevenVoice).name ??
        (resolveVoice as SpeechSynthesisVoice).voiceURI,
    );
  }, [elevenLabs, setSelectedVoice, resolveVoice]);

  return (
    <Select.Root
      value={elevenLabs.selectedVoice}
      onValueChange={(value) => setSelectedVoice(value)}
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
