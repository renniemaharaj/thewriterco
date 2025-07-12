import { useThemeContext } from "../../context/theme/useThemeContext";

const useCustomBG = () => {
  const { theme } = useThemeContext();
  const customBG = theme === "dark" ? "bg-[#171918]" : "border";
  return { customBG };
};

export default useCustomBG;
