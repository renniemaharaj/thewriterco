const DEFAULT_DURATION = 3000; // Default duration in milliseconds
const DEFAULT_POSITION = "top-right"; // Default position for the toast
const DEFAULT_COLOR = "#fff"; // Default color for the toast text
const DEFAULT_FONT_SIZE = "16px"; // Default font size for the toast text
const DEFAULT_PADDING = "16px"; // Default padding for the toast

// Default styles for success and error toasts
const DEFAULT_STYLE = {
  success: {
    // background: "#4caf50",
    color: DEFAULT_COLOR,
    fontSize: DEFAULT_FONT_SIZE,
    padding: DEFAULT_PADDING,
  },
  error: {
    // background: "#f44336",
    color: DEFAULT_COLOR,
    fontSize: DEFAULT_FONT_SIZE,
    padding: DEFAULT_PADDING,
  },
};

export {
  DEFAULT_DURATION,
  DEFAULT_POSITION,
  DEFAULT_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_PADDING,
  DEFAULT_STYLE,
};
