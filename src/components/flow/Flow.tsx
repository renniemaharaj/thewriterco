import { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  Node,
  Controls,
  NodeChange,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomControls from "./components/Controls";
import { Box } from "@radix-ui/themes";

// import "./styles.css";

import { nodeData } from "./config";
import { useThemeContext } from "../context/useThemeContext";
import ResourceMonitor from "./components/ResourceMonitor";
import { cloneDeep } from "lodash";

export default function Flow({ nodes }: { nodes: Node[] }) {
  const { theme } = useThemeContext();

  const nodeTypes = useRef(nodeData).current;

  const [nodesLocal, setNodesLocal] = useState<Node[]>(nodes);
  // const mapRef = useRef(() => <MiniMap />).current;

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodesLocal((prevNodes) => {
        const updatedNodes = applyNodeChanges(changes, cloneDeep(prevNodes));
        return updatedNodes;
      });
    },
    [nodes],
  );

  return (
    <ReactFlowProvider>
      {/* <main className="flex"> */}
      <Box className="!w-[600px] !h-[60vh] !flex-col">
        <ReactFlow
          nodes={nodesLocal}
          onNodesChange={onNodesChange}
          edges={[]}
          colorMode={theme as "light" | "dark"}
          fitView
          fitViewOptions={{ maxZoom: 0.8, padding: 0.1 }}
          proOptions={{ hideAttribution: true }}
          nodeTypes={nodeTypes}
        >
          <Controls>
            <CustomControls />
          </Controls>
          <ResourceMonitor />
          {/* {flowState.editor.displayMiniMap && mapRef()} */}
          <Background variant={BackgroundVariant.Cross} gap={12} size={1} />
        </ReactFlow>
      </Box>
      {/* </main> */}
    </ReactFlowProvider>
  );
}
