import { Select } from "@radix-ui/themes";

const VoiceList = ({
  voices,
}: {
  voices: SpeechSynthesisVoice[];
  useEleven: boolean;
}) => {
  return voices
    .filter((voice) => !!(voice as SpeechSynthesisVoice).voiceURI)
    .map((voice, index) => (
      <Select.Item
        key={`voice-eleven-${(voice as SpeechSynthesisVoice).voiceURI ?? index}`}
        value={(voice as SpeechSynthesisVoice).voiceURI!}
      >
        {(voice as SpeechSynthesisVoice).name.slice(0, 20)}
        {(voice as SpeechSynthesisVoice).lang}
      </Select.Item>
    ));
};

export default VoiceList;
