import { useState, useEffect, useRef } from "react";

export type VoiceReaderEngine = {
  speak: (
    text: string,
    options?: { rate?: number; pitch?: number; voiceName?: string },
  ) => void;
  speakAsync: (
    text: string,
    options?: { rate?: number; pitch?: number; voiceName?: string },
  ) => Promise<boolean>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  speaking: boolean;
  paused: boolean;
  voices: SpeechSynthesisVoice[];
};

export function useVoiceReader(): VoiceReaderEngine {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (
    text: string,
    options?: { rate?: number; pitch?: number; voiceName?: string },
  ) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options?.rate ?? 1;
    utterance.pitch = options?.pitch ?? 1;

    const voices = window.speechSynthesis.getVoices();
    if (options?.voiceName) {
      const voice = voices.find((v) => v.name === options.voiceName);
      if (voice) utterance.voice = voice;
    }

    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };
    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utterance.onerror = () => {
      setSpeaking(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const speakAsync = (
    text: string,
    options?: { rate?: number; pitch?: number; voiceName?: string },
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options?.rate ?? 1;
      utterance.pitch = options?.pitch ?? 1;

      const voices = window.speechSynthesis.getVoices();
      if (options?.voiceName) {
        const voice = voices.find((v) => v.name === options.voiceName);
        if (voice) utterance.voice = voice;
      }

      utterance.onstart = () => {
        setSpeaking(true);
        setPaused(false);
      };
      utterance.onend = () => {
        setSpeaking(false);
        setPaused(false);
        resolve(true);
      };
      utterance.onerror = (e) => {
        setSpeaking(false);
        reject(e.error ?? new Error("Speech error"));
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    });
  };

  const pause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  return {
    speak,
    speakAsync,
    pause,
    resume,
    stop,
    speaking,
    paused,
    voices: window.speechSynthesis.getVoices(),
  };
}
