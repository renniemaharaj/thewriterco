import { ReactNode } from "react";
import { Handle as ReactHandle, Position, HandleType } from "@xyflow/react";
import { Flex, Text } from "@radix-ui/themes";
import { useThemeContext } from "../../../../context/useThemeContext";
// import { updateNodeProperty } from "../../../../app/flow/flowSlice";
// import { useDispatch } from "react-redux";
import { SquareFunctionIcon } from "lucide-react";

export type Handle = {
  type: HandleType;
  position: Position;
};

export function Node({
  handles,
  className,
  layout,
  icon,
  title,
  id,
  // expressionValue,
  // expressionPrefix,
  acceptExpression,
}: {
  handles: Handle[];
  className?: string;
  layout?: "horizontal" | "vertical";
  icon?: ReactNode;
  title?: string;
  id?: string;
  expressionValue?: string;
  expressionPrefix?: string;
  acceptExpression?: boolean;
}) {
  const { theme } = useThemeContext();
  const baseClassName = "p-3 rounded-lg shadow-lg flex hrtm-react-node-wrapper";
  const themeClassName = theme === "light" ? "bg-gray-100" : "bg-[#2b2b2b]";
  const layoutClassName = layout === "horizontal" ? "!flex-row" : "!flex-col";

  const nodeClassName = `${baseClassName} ${themeClassName} ${layoutClassName}`;

  // const dispatch = useDispatch();

  return (
    <div
      key={"node" + id}
      className={`${nodeClassName} ${className ? className : ""}`}
    >
      <Flex align={"center"} gap="1" className="flex !flex-row !justify-start">
        {icon}
        {acceptExpression && !icon && <SquareFunctionIcon />}
        <Text size="3" className="text-sm font-semibold">
          {title}
        </Text>
      </Flex>

      {/* {acceptExpression && (
        <>
          <Separator orientation="horizontal" size="4" className="my-2" />
          <Text
            as="label"
            className="block text-sm font-medium"
            htmlFor="tokenizable-field"
          >
            {expressionPrefix}
          </Text>
        </>
      )} */}
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
