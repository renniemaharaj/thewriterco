import { vi } from "vitest";

declare global {
  interface Window {
    synthesize: (text: string) => Promise<Blob>;
  }
}

export const mockBrowser = () => {
  // Mock scrollTo
  document.documentElement.scrollTo = vi.fn();

  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock getVoices
  window.speechSynthesis = {
    getVoices: vi.fn(() => [
      { name: "MockVoice1", lang: "en-US", default: true },
      { name: "MockVoice2", lang: "en-GB", default: false },
    ]),
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    speaking: false,
  } as unknown as SpeechSynthesis;

  // Mock synthesize method (your own custom window.synthesize)
  window.synthesize = vi.fn((text: string) => {
    // Simulate MP3 blob return for testing
    if (!text) return Promise.reject(new Error("No text provided"));
    const blob = new Blob(["MOCK_AUDIO_CONTENT"], { type: "audio/mpeg" });
    return Promise.resolve(blob);
  });
};
