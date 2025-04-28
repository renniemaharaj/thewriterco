import VoiceReader from "../voice/VoiceReader";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useElevenLabs } from "../hooks/data/useElevenLabs";
import { useVoiceReader, VoiceReaderEngine } from "../hooks/useVoiceReader";
import VoiceSelect from "../voice/VoiceSelect";
import useGetDefaultVoice from "../hooks/useGetDefaultVoice";

const Voice = ({
  textContent,
}: {
  defaultModel: boolean;
  textContent: string;
}) => {
  const apiKey = useSelector((state: RootState) => state.elevenLabs.apiKey);
  const elevenLabs = useSelector((state: RootState) => state.elevenLabs);
  const elevenLabsActive = elevenLabs.enabled;

  const voiceElevenLabs = useElevenLabs(apiKey) as unknown as VoiceReaderEngine;
  const voiceBrowser = useVoiceReader();
  const resolveVoice = useGetDefaultVoice().resolveVoice;

  return (
    <>
      {/* Voice Reader Component */}
      <VoiceReader
        textContent={textContent}
        defaultModel={!elevenLabsActive}
        selectedVoice={resolveVoice()}
        activeVoice={elevenLabsActive ? voiceElevenLabs : voiceBrowser}
      />

      {/* Voice Selector Component */}
      <VoiceSelect
        useEleven={elevenLabsActive}
        voices={elevenLabsActive ? voiceElevenLabs.voices : voiceBrowser.voices}
      />
    </>
  );
};

export default Voice;
