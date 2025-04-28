import { useCallback, useState } from "react";
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
  const content = useSelector(
    (state: RootState) => state.ereader.eContent.content,
  );

  const NarratedContent = useCallback((): string => {
    if (typeof content === "string") return content;

    return Object.values(content)
      .flatMap((chapter) => Object.values(chapter))
      .join(" ");
  }, [content]);

  const apiKey = useSelector((state: RootState) => state.elevenLabs.apiKey);
  const voiceElevenLabs = useElevenLabs(apiKey) as unknown as VoiceReaderEngine;
  const voiceBrowser = useVoiceReader();

  const [selectedVoice, setSelectedVoice] = useState("");

  //   const [textContentLocal, setTextContentLocal] = useState("");

  const elevenLabs = useSelector((state: RootState) => state.elevenLabs);
  const elevenLabsActive = elevenLabs.enabled;

  const resolveVoice = useGetDefaultVoice().resolveVoice;

  return (
    <>
      {/** Voice Reader Component */}
      <VoiceReader
        textContent={textContent || NarratedContent()}
        defaultModel={!elevenLabsActive}
        selectedVoice={resolveVoice()}
        activeVoice={elevenLabsActive ? voiceElevenLabs : voiceBrowser}
      />

      {/** */}
      <VoiceSelect
        useEleven={elevenLabsActive}
        voices={elevenLabsActive ? voiceElevenLabs.voices : voiceBrowser.voices}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
      />
    </>
  );
};

export default Voice;
