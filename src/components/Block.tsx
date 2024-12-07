import { Flex, Spinner } from "@radix-ui/themes";
import { useThemeContext } from "./context/useThemeContext";

export default function Block() {
  const { theme } = useThemeContext();

  return (
    <Flex
      justify={"center"}
      align={"center"}
      className={`${theme == "light" ? "bg-white" : "bg-black"} w-full h-[100vh] fixed top-0 left-0`}
    >
      <Flex
        justify={"center"}
        align={"center"}
        className="page-signup_flex_left_logo rounded-full !w-52 !h-52"
      >
        <BlockingSpinner />
      </Flex>
    </Flex>
  );
}

export function BlockingSpinner({
  className,
  size,
}: {
  className?: string;
  size?: "1" | "2" | "3";
}) {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      className={`w-10 aspect-square rounded-full animate-spin transition-[all_1s_ease-in-out] absolute ${className}`}
    >
      <Spinner size={size || "2"} className="scale-125" />
    </Flex>
  );
}
