import { Handle as ReactHandle } from "@xyflow/react";
// import { Flex, Text } from "@radix-ui/themes";
import { useThemeContext } from "../../../../context/theme/useThemeContext";
import { Handle } from "../types";

export function Node({
  handles,
  className,
  layout,
  // textContent,
  children,
  id,
}: {
  handles: Handle[];
  className?: string;
  layout?: "horizontal" | "vertical";
  textContent?: string;
  children?: React.ReactNode;
  id?: string;
}) {
  const { theme } = useThemeContext();
  const baseClassName = "p-3 rounded-lg shadow-lg flex hrtm-react-node-wrapper";
  const themeClassName = theme === "light" ? "bg-gray-100" : "bg-[#2b2b2b]";
  const layoutClassName = layout === "horizontal" ? "!flex-row" : "!flex-col";

  const nodeClassName = `${baseClassName} ${themeClassName} ${layoutClassName}`;

  return (
    <div
      key={"node" + id}
      className={`${nodeClassName} ${className ? className : ""}`}
    >
      {children}
      {/* <Flex align={"center"} gap="1" className="flex !flex-row !justify-start">
        <Text size="3" className="text-sm font-semibold">
          {textContent}
        </Text>
      </Flex> */}
      {handles.map((handle: Handle, index) => (
        <ReactHandle
          key={index}
          type={handle.type}
          position={handle.position}
          className={`${theme === "light" ? "bg-gray-200" : "bg-[#333]"} rounded-full w-3 h-3`}
        />
      ))}
    </div>
  );
}
