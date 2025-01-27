import { NodeProps } from "@xyflow/react";
import { Node } from "./components/Node";
import { CustomNodeProps } from "./types";
import { memo } from "react";

const ScrollAreaNode = memo(({ data }: NodeProps & CustomNodeProps) => {
  return (
    <Node
      handles={[]}
      layout="horizontal"
      textContent={data.label || ""}
      children={data.children}
    />
  );
});

export default ScrollAreaNode;
