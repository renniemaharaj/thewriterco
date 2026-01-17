import { Select } from "@radix-ui/themes";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedVoice } from "../../app/reader/readerSlice";
import type { RootState } from "../../app/store";
import useResolveFallbackVoice from "../hooks/useResolveFallbackVoice";
import VoiceList from "./VoiceList";

export type VoiceSelectProps = {
  voices: SpeechSynthesisVoice[];
};

const VoiceSelect = ({ voices }: VoiceSelectProps) => {
  const selectedVoice = useSelector((state: RootState) => state.reader.selectedVoice);
  const dispatch = useDispatch();

  const resolveVoice = useResolveFallbackVoice().resolveOrFallback();

  useEffect(() => {
    if (!resolveVoice) return;

    dispatch(setSelectedVoice((resolveVoice as SpeechSynthesisVoice).voiceURI));
  }, [resolveVoice, dispatch]);

  return (
    <Select.Root value={selectedVoice} onValueChange={value => dispatch(setSelectedVoice(value))}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Browser voices</Select.Label>
          {<VoiceList voices={voices} />}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default memo(VoiceSelect);
