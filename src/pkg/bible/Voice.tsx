import VoiceReader from "../voice/VoiceReader";
import VoiceSelect from "../voice/VoiceSelect";
import { useVoiceReader } from "../hooks/useVoiceReader";

import useResolveFallbackVoice from "../hooks/useResolveFallbackVoice";

const Voice = ({
  textContent,
  onSpeechProgress,
}: {
  defaultModel: boolean;
  textContent: string[];
  onSpeechProgress: (i: number) => void;
}) => {
  const voiceBrowser = useVoiceReader();
  const voiceResolved = useResolveFallbackVoice().resolveOrFallback();

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
