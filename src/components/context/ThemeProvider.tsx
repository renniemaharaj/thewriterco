import { createContext, ReactNode } from "react";
import useTheme from "../hooks/useTheme";

import { ThemeContextType } from "./types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme, specifyTheme, usesSystemTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, specifyTheme, usesSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
