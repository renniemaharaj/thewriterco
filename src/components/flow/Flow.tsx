import { useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  // Background,
  // BackgroundVariant,
  Node,
  Controls,
  NodeChange,
  applyNodeChanges,
  PanOnScrollMode,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomControls from "./components/Controls";
import { Box } from "@radix-ui/themes";

import { nodeData } from "./config";
import { useThemeContext } from "../context/useThemeContext";
import ResourceMonitor from "./components/ResourceMonitor";
import { cloneDeep } from "lodash";

function FlowComponent({
  nodes,
  messageBlocksCount,
}: {
  nodes: Node[];
  messageBlocksCount: number;
}) {
  const { theme } = useThemeContext();
  const nodeTypes = useRef(nodeData).current;

  const [nodesLocal, setNodesLocal] = useState<Node[]>(nodes);

  useEffect(() => {
    setNodesLocal(nodes);
  }, [nodes]);

  const onNodesChange =
    // useCallback(
    (changes: NodeChange[]) => {
      setNodesLocal((prevNodes) => {
        const updatedNodes = applyNodeChanges(changes, cloneDeep(prevNodes));
        return updatedNodes;
      });
    };
  // ,
  //   [nodes]
  // );

  const fitViewOptionsConfig = {
    padding: 10,
    minZoom: 0.8,
    duration: 500,
    nodes: nodesLocal,
  };

  const { fitView } = useReactFlow();

  const onFitView = () => {
    fitView(fitViewOptionsConfig); // Smooth transition with 1-second duration
  };

  const messageBlocksCountRef = useRef(messageBlocksCount);

  useEffect(() => {
    if (messageBlocksCountRef.current === messageBlocksCount) return;
    messageBlocksCountRef.current = messageBlocksCount;
    onFitView();
  }, [messageBlocksCount, onFitView]);

  return (
    <Box className="!w-[600px] !h-[60vh] !flex-col">
      <ReactFlow
        nodes={nodesLocal}
        onNodesChange={onNodesChange}
        edges={[]}
        colorMode={theme as "light" | "dark"}
        fitView
        panOnScrollMode={PanOnScrollMode.Vertical}
        fitViewOptions={{ ...fitViewOptionsConfig }}
        proOptions={{ hideAttribution: true }}
        nodeTypes={nodeTypes}
      >
        <Controls
          showInteractive={false} // Remove default fit view button behavior
          showFitView
          onFitView={onFitView}
        >
          <CustomControls />
        </Controls>
        <ResourceMonitor />
        {/* <Background variant={BackgroundVariant.Cross} gap={12} size={1} /> */}
      </ReactFlow>
    </Box>
  );
}

// HOC to wrap FlowComponent with ReactFlowProvider
function withReactFlowProvider(
  Component: React.ComponentType<{ nodes: Node[]; messageBlocksCount: number }>,
) {
  return function WrappedComponent(props: {
    nodes: Node[];
    messageBlocksCount: number;
  }) {
    return (
      <ReactFlowProvider>
        <Component {...props} />
      </ReactFlowProvider>
    );
  };
}

const Flow = withReactFlowProvider(FlowComponent);

export default Flow;
