import { IconButton } from "@radix-ui/themes";
import { SunIcon, SunMoonIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useThemeContext } from "../pkg/context/theme/useThemeContext";

const ThemeButton = () => {
  const { theme, specifyTheme } = useThemeContext();

  const handleClick = () => {
    specifyTheme(theme === "dark" ? "light" : "dark");
  };

  const MotionIcon = motion(IconButton);

  return (
    <MotionIcon
      initial={{
        opacity: 0,
        rotate: theme === "dark" ? 360 : 0,
        scale: 0.9,
        y: 10,
      }}
      animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 1,
        ease: [0.68, -0.6, 0.32, 1.6],
      }}
      variant="soft"
      aria-label="Toggle Theme"
      onClick={handleClick}
      className="hidden md:block"
    >
      {theme === "dark" ? (
        <SunMoonIcon
          width="20"
          height="20"
          className="text-white animate-pulse"
        />
      ) : (
        <SunIcon width="20" height="20" className="animate-pulse" />
      )}
    </MotionIcon>
  );
};

export default ThemeButton;
