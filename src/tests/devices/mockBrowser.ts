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

  // Mock matchMedia for motion queries
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated but sometimes still used
      removeListener: vi.fn(), // Deprecated but sometimes still used
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock speechSynthesis and other existing mocks...
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

  // Mock SpeechSynthesisUtterance
  window.SpeechSynthesisUtterance = vi.fn().mockImplementation(function (
    this: SpeechSynthesisUtterance,
    text: string,
  ) {
    this.text = text;
    this.volume = 1;
    this.rate = 1;
    this.pitch = 1;
    this.lang = "en-US";
    this.voice = null;
    this.onstart = vi.fn();
    this.onend = vi.fn();
    this.onerror = vi.fn();
  });
};
