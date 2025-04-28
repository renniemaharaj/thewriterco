import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ElevenVoice, useElevenLabs } from "./data/useElevenLabs";
import { Variant } from "../voice/VoiceReader";
import { useVoiceReader, VoiceReaderEngine } from "./useVoiceReader";
import { DEFAULT_VOICE_BROWSER, DEFAULT_VOICE_ELEVEN } from "../bible/config";

const useGetDefaultVoice = () => {
  const apiKey = useSelector((state: RootState) => state.elevenLabs.apiKey);
  const voiceElevenLabs = useElevenLabs(apiKey) as unknown as VoiceReaderEngine;
  const voiceBrowser = useVoiceReader();

  const elevenLabs = useSelector((state: RootState) => state.elevenLabs);
  const elevenLabsActive = elevenLabs.enabled;

  const selectedVoice = elevenLabs.selectedVoice;

  const resolveVoice = (): SpeechSynthesisVoice | ElevenVoice => {
    const voices: Variant[] = elevenLabsActive
      ? voiceElevenLabs.voices
      : voiceBrowser.voices;

    return (
      voices.find((voice) =>
        elevenLabsActive
          ? (voice as ElevenVoice).name ===
            (selectedVoice ?? DEFAULT_VOICE_ELEVEN)
          : (voice as SpeechSynthesisVoice).voiceURI ===
            (selectedVoice ?? DEFAULT_VOICE_BROWSER),
      ) || voices[0]
    );
  };

  return {
    resolveVoice,
  };
};

export default useGetDefaultVoice;
