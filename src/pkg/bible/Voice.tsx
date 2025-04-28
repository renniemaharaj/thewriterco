import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VoiceReader from "../voice/VoiceReader";
import VoiceSelect from "../voice/VoiceSelect";
import { useElevenLabs } from "../hooks/data/useElevenLabs";
import { useVoiceReader, VoiceReaderEngine } from "../hooks/useVoiceReader";
import useGetDefaultVoice from "../hooks/useGetDefaultVoice";
import { RootState } from "../../app/store";
import { RegisterRecoveryFunction } from "../../app/errorBoundary/errorBoundarySlice";
import { RecoveryFunction } from "../../app/errorBoundary/types";

const Voice = ({
  textContent,
}: {
  defaultModel: boolean;
  textContent: string;
}) => {
  const dispatch = useDispatch();

  const apiKey = useSelector((state: RootState) => state.elevenLabs.apiKey);
  const elevenLabs = useSelector((state: RootState) => state.elevenLabs);
  const elevenLabsActive = elevenLabs.enabled;

  const voiceElevenLabs = useElevenLabs(apiKey) as unknown as VoiceReaderEngine;
  const voiceBrowser = useVoiceReader();
  const resolveVoice = useGetDefaultVoice().resolveVoice;

  void useEffect(() => {
    const voiceRecoveryFunction: RecoveryFunction = {
      title: "KJV Voice State",
      description:
        "This recovery function will reset Eleven Labs voice state to defaults.",
      componentRoute: location.href, // Optionally use a static route if preferred
    };
    console.log("Registered recover function");
    dispatch(RegisterRecoveryFunction(voiceRecoveryFunction));
  }, [dispatch]); // Empty array or `[dispatch]` is safe

  return (
    <>
      <VoiceReader
        textContent={textContent}
        defaultModel={!elevenLabsActive}
        selectedVoice={resolveVoice()}
        activeVoice={elevenLabsActive ? voiceElevenLabs : voiceBrowser}
      />
      <VoiceSelect
        voices={elevenLabsActive ? voiceElevenLabs.voices : voiceBrowser.voices}
      />
    </>
  );
};

export default Voice;
