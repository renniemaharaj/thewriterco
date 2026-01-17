import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { DEFAULT_VOICE_BROWSER } from "../bible/config";
import type { Variant } from "../voice/VoiceReader";
import { useVoiceReader } from "./useVoiceReader";

const useResolveFallbackVoice = () => {
  const voiceBrowser = useVoiceReader();

  const selectedVoice = useSelector((state: RootState) => state.reader.selectedVoice);

  const resolveOrFallback = (): SpeechSynthesisVoice => {
    const voices: Variant[] = voiceBrowser.voices;

    return (
      voices.find(
        voice =>
          (voice as SpeechSynthesisVoice).voiceURI === (selectedVoice ?? DEFAULT_VOICE_BROWSER),
      ) || voices[0]
    );
  };

  return {
    resolveOrFallback,
  };
};

export default useResolveFallbackVoice;
