import type { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { Node } from "./pkg/Node";
import type { CustomNodeProps } from "./types";

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
