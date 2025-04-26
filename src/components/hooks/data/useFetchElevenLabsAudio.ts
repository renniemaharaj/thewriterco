// src/api/fetchElevenLabsAudio.ts
export type ElevenLabsOptions = {
  text: string;
  apiKey: string;
  voiceId?: string;
  modelId?: string;
};

export async function fetchElevenLabsAudio({
  text,
  apiKey,
  voiceId = "default",
  modelId = "eleven_monolingual_v1",
}: ElevenLabsOptions): Promise<HTMLAudioElement> {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch audio from ElevenLabs");
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  return new Audio(audioUrl);
}
