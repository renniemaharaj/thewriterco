import { useEffect } from "react";
import { useDispatch } from "react-redux";
import VoiceReader from "../voice/VoiceReader";
import VoiceSelect from "../voice/VoiceSelect";
import { useVoiceReader } from "../hooks/useVoiceReader";
import useResolveFallbackVoice from "../hooks/useResolveFallbackVoice";
import { RegisterRecoveryFunction } from "../../app/errorBoundary/errorBoundarySlice";
import { RecoveryFunction } from "../../app/errorBoundary/types";

const Voice = ({
  textContent,
  onSpeechProgress,
}: {
  defaultModel: boolean;
  textContent: string[];
  onSpeechProgress: (i: number) => void;
}) => {
  const dispatch = useDispatch();

  const voiceBrowser = useVoiceReader();
  const voiceResolved = useResolveFallbackVoice().resolveOrFallback();

  void useEffect(() => {
    const voiceRecoveryFunction: RecoveryFunction = {
      title: "KJV Voice State",
      description:
        "This recovery function will reset Eleven Labs voice state to defaults.",
      componentRoute: location.href, // Optionally use a static route if preferred
    };
    dispatch(RegisterRecoveryFunction(voiceRecoveryFunction));
  }, [dispatch]); // Empty array or `[dispatch]` is safe

  return (
    <>
      <VoiceReader
        textContent={textContent}
        defaultModel={true}
        selectedVoice={voiceResolved}
        voiceReaderEngine={voiceBrowser}
        onSpeechProgress={onSpeechProgress}
      />
      <VoiceSelect voices={voiceBrowser.voices} />
    </>
  );
};

export default Voice;
