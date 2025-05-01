import { useState, useEffect, useRef } from "react";

export type SpeakOptions = {
  voiceId?: string;
  modelId?: string;
  voiceName?: string;
};

export type ElevenVoice = {
  voice_id: string;
  name: string;
  labels?: Record<string, string>;
  category?: string;
  description?: string;
};

let cachedVoices: ElevenVoice[] = [];

export function useElevenLabs(apiKey: string) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [voices, setVoices] = useState<ElevenVoice[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) {
      setVoices(cachedVoices);
      return;
    }

    fetch("https://api.elevenlabs.io/v1/voices", {
      headers: {
        "xi-api-key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.voices) && data.voices.length > 0) {
          cachedVoices = data.voices;
          setVoices(data.voices);
        } else {
          setVoices(cachedVoices);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch voices:", err);
        setVoices(cachedVoices);
      });

    hasFetchedRef.current = true;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [apiKey]);

  const speak = async (text: string, options?: SpeakOptions) => {
    const audio = await generateAudio(text, options);
    if (!audio) return;

    audioRef.current = audio;
    bindAudioEvents(audio);
    audio.play();
  };

  const speakAsync = async (
    text: string,
    options?: SpeakOptions,
  ): Promise<void> => {
    const audio = await generateAudio(text, options);
    if (!audio) return;

    audioRef.current = audio;
    bindAudioEvents(audio);

    return new Promise((resolve) => {
      audio.onended = () => {
        setSpeaking(false);
        setPaused(false);
        resolve();
      };
      audio.onerror = () => {
        setSpeaking(false);
        resolve(); // Still resolve to avoid hanging
      };

      audio.play();
    });
  };

  const generateAudio = async (
    text: string,
    options?: SpeakOptions,
  ): Promise<HTMLAudioElement | null> => {
    stop();

    const voiceId = options?.voiceId ?? cachedVoices[0]?.voice_id;
    if (!voiceId) {
      console.warn("No voice available to speak.");
      return null;
    }

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
            Accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text,
            model_id: options?.modelId ?? "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Speak error:", errorText);
        return null;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return new Audio(audioUrl);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Speak exception:", errorMessage);
      return null;
    }
  };

  const bindAudioEvents = (audio: HTMLAudioElement) => {
    audio.onplay = () => {
      setSpeaking(true);
      setPaused(false);
    };
    audio.onpause = () => setPaused(true);
  };

  const pause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setPaused(true);
    }
  };

  const resume = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play();
      setPaused(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSpeaking(false);
      setPaused(false);
    }
  };

  return {
    speak,
    speakAsync,
    pause,
    resume,
    stop,
    speaking,
    paused,
    voices,
  };
}
