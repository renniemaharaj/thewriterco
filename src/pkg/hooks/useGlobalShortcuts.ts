import { useEffect } from "react";

type Shortcut = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  debounceMs?: number;
};

let shortcuts: Shortcut[] = [];
const lastExecuted: Map<string, number> = new Map();

export const registerShortcut = (shortcut: Shortcut) => {
  shortcuts.push(shortcut);
};

export const unregisterShortcut = (shortcut: Shortcut) => {
  shortcuts = shortcuts.filter((s) => s !== shortcut);
};

const getShortcutKey = (s: Shortcut) => {
  return `${s.ctrl ? "Ctrl+" : ""}${s.shift ? "Shift+" : ""}${
    s.alt ? "Alt+" : ""
  }${s.key.toLowerCase()}`;
};

export const useGlobalShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const s of shortcuts) {
        const match =
          e.key.toLowerCase() === s.key.toLowerCase() &&
          !!s.ctrl === e.ctrlKey &&
          !!s.shift === e.shiftKey &&
          !!s.alt === e.altKey;

        if (match) {
          const keyId = getShortcutKey(s);
          const now = Date.now();
          const debounce = s.debounceMs ?? 300;

          if (
            !lastExecuted.has(keyId) ||
            now - (lastExecuted.get(keyId) ?? 0) > debounce
          ) {
            lastExecuted.set(keyId, now);
            e.preventDefault();
            s.action();
          }

          break; // only fire one matching shortcut
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
