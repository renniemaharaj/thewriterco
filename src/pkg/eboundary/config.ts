// Recovery functions map by title
export const recoveryFunctionMap: { [title: string]: () => void } = {
  "KJV Voice State": () => {
    const event = new CustomEvent("recover-elevenlabs");
    window.dispatchEvent(event);
  },
  // Add more recovery titles and actions here as needed
};
