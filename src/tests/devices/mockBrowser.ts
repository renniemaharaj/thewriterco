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

  // Mock getVoices and speechSynthesis
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
};
