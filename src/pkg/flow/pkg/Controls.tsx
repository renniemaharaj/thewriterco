import { ControlButton } from "@xyflow/react";
import { useThemeContext } from "../../context/theme/useThemeContext";

import { SunMediumIcon, SunMoonIcon } from "lucide-react";
import { Tooltip } from "@radix-ui/themes";

export default function Controls() {
  // Getting theme context
  const { theme, specifyTheme } = useThemeContext();

  return (
    <>
      <ControlButton
        onClick={() => {
          if (theme === "light") {
            specifyTheme("dark");
          } else {
            specifyTheme("light");
          }
        }}
      >
        <Tooltip content="toggle theme">
          {theme === "light" ? <SunMoonIcon /> : <SunMediumIcon fill="" />}
        </Tooltip>
      </ControlButton>
    </>
  );
}
