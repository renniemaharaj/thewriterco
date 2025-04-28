import { Select } from "@radix-ui/themes";
import { ElevenVoice } from "../hooks/data/useElevenLabs";

const VoiceList = ({
  voices,
  useEleven,
}: {
  voices: ElevenVoice[] | SpeechSynthesisVoice[];
  useEleven: boolean;
}) => {
  return useEleven
    ? voices.map((voice, index) => (
        <Select.Item
          key={`voice-native-${(voice as ElevenVoice).voice_id ?? index}`}
          value={(voice as ElevenVoice).name}
        >
          {(voice as ElevenVoice).name} {" - "}{" "}
          {(voice as ElevenVoice).voice_id}
        </Select.Item>
      ))
    : voices
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
