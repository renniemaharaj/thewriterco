import { Position, NodeProps } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import { Node, Handle } from "./Node";
import { memo } from "react";
import { CustomNodeProps } from "./types";
const handles: Handle[] = [{ type: "source", position: Position.Right }];

const EntryNode = memo(({ data }: NodeProps & CustomNodeProps) => {
  return (
    <Node
      handles={handles}
      layout="horizontal"
      icon={<PlayIcon size={20} className={`mr-2`} />}
      title={data.label || "Entry"}
    />
  );
});

export default EntryNode;
