import { IconButton, Tooltip } from "@radix-ui/themes";
import { SunIcon, SunMoonIcon } from "lucide-react";
import { useThemeContext } from "../context/theme/useThemeContext";
import { motion } from "framer-motion";

const ThemeButton = () => {
  const { theme, specifyTheme } = useThemeContext();

  const handleClick = () => {
    specifyTheme(theme === "dark" ? "light" : "dark");
  };

  const MotionIcon = motion(IconButton);

  return (
    <MotionIcon
      key={theme} // causes re-render and fresh animation on theme change
      initial={{ opacity: 0.5, rotate: theme === "dark" ? 360 : 0, scale: 0.9 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      exit={{ opacity: 0.5, scale: 0.8 }}
      transition={{
        duration: 0.6,
        ease: [0.68, -0.6, 0.32, 1.6],
      }}
      variant="soft"
      aria-label="Toggle Theme - I'll give her my light"
      onClick={handleClick}
      className="hidden md:block"
    >
      {theme === "dark" ? (
        <Tooltip content=";moon lit">
          <SunMoonIcon
            width="20"
            height="20"
            className="text-white animate-pulse"
          />
        </Tooltip>
      ) : (
        <Tooltip content="sun's wit">
          <SunIcon
            width="20"
            height="20"
            className="text-yellow-400 animate-pulse"
          />
        </Tooltip>
      )}
    </MotionIcon>
  );
};

export default ThemeButton;
