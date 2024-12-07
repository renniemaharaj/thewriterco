import { Box, Flex, Select } from "@radix-ui/themes";
import Hint from "../Hint";
import { useThemeContext } from "../context/useThemeContext";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { theme, specifyTheme, usesSystemTheme } = useThemeContext();

  const handleThemeChange = (theme: "Light" | "Dark" | "System") => {
    specifyTheme(theme.toLowerCase() as "light" | "dark" | "system");
  };
  return (
    <Flex
      className={`!flex-row !justify-between !w-full mt-2 p-1 ${className}`}
    >
      {/* <Text size="2">Theme</Text> */}
      <Flex className="!flex-col gap-1 mt-1 mb-1">
        <Select.Root
          defaultValue={(usesSystemTheme && "system") || theme}
          onValueChange={handleThemeChange}
        >
          <Select.Trigger>
            <Flex align="center" gap="2">
              {theme === "light" && <SunIcon />}
              {theme === "dark" && <MoonIcon />}
              {(usesSystemTheme && "System") ||
                theme.substring(0, 1).toUpperCase() + theme.substring(1)}
            </Flex>
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>Theme Modes</Select.Label>
              {["Light", "Dark", "System"].map((themeChoice, index) => (
                <Select.Item
                  key={index}
                  value={themeChoice.toLowerCase()}
                  disabled={
                    (themeChoice == "System" && usesSystemTheme) ||
                    themeChoice.toLowerCase() === theme
                  }
                >
                  {themeChoice}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Box className="!flex !flex-row gap-1">
          {usesSystemTheme ? (
            <Hint>System detected: {theme}</Hint>
          ) : (
            <Hint>Theme override: {theme}</Hint>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ThemeSwitcher;
