import { useState, useEffect, useRef } from "react";

export type SpeakOptions = {
  voiceId?: string;
  modelId?: string;
};

export type ElevenVoice = {
  voice_id: string;
  name: string;
  labels?: Record<string, string>;
  category?: string;
  description?: string;
};

let cachedVoices: ElevenVoice[] = []; // Static cache

export function useElevenLabs(apiKey: string) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [voices, setVoices] = useState<ElevenVoice[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const hasFetchedRef = useRef(false); // Prevent multiple fetches

  const pushError = (error: string) => {
    setErrors((prev) => [...prev, error]);
  };

  const clearErrors = () => {
    setErrors([]);
  };

  useEffect(() => {
    if (hasFetchedRef.current) {
      setVoices(cachedVoices); // Use cached if already fetched
      return;
    }

    fetch("https://api.elevenlabs.io/v1/voices", {
      headers: {
        "xi-api-key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.voices?.length > 0) {
          cachedVoices = data.voices;
          setVoices(data.voices);
        } else {
          pushError("No voices returned from ElevenLabs.");
          setVoices(cachedVoices);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch voices:", err);
        pushError("Failed to fetch voices from ElevenLabs: " + err.message);
        setVoices(cachedVoices);
      });

    hasFetchedRef.current = true;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [apiKey]);

  const speak = async (text: string, options?: SpeakOptions) => {
    stop();

    const voiceId = options?.voiceId ?? cachedVoices[0]?.voice_id;
    if (!voiceId) return pushError("No voice ID available.");

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
        return pushError("Text-to-speech error: " + errorText);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        setSpeaking(true);
        setPaused(false);
      };
      audio.onpause = () => setPaused(true);
      audio.onended = () => {
        setSpeaking(false);
        setPaused(false);
      };
      audio.onerror = () => {
        setSpeaking(false);
        pushError("Audio playback failed.");
      };

      audio.play();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      pushError("Speak error: " + errorMessage);
    }
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
    pause,
    resume,
    stop,
    speaking,
    paused,
    voices,
    errors,
    clearErrors,
  };
}
