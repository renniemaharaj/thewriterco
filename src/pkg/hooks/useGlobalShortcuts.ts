import { useEffect } from "react";

type Shortcut = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: (event: KeyboardEvent) => void;
  debounceMs?: number;
};

let shortcuts: Shortcut[] = [];
let shortcutsEnabled = true;
const lastExecuted: Map<string, number> = new Map();

export const registerShortcut = (shortcut: Shortcut) => {
  shortcuts.push(shortcut);
};

export const unregisterShortcut = (shortcut: Shortcut) => {
  shortcuts = shortcuts.filter((s) => s !== shortcut);
};

export const disableGlobalShortcuts = () => {
  shortcutsEnabled = false;
};

export const enableGlobalShortcuts = () => {
  shortcutsEnabled = true;
};

const getShortcutKey = (s: Shortcut) => {
  return `${s.ctrl ? "Ctrl+" : ""}${s.shift ? "Shift+" : ""}${s.alt ? "Alt+" : ""}${s.key.toLowerCase()}`;
};

const isTypingElement = (el: Element | null): boolean => {
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    (el as HTMLElement).isContentEditable
  );
};

export const useGlobalShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!shortcutsEnabled || isTypingElement(document.activeElement)) {
        return;
      }

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
            s.action(e);
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
