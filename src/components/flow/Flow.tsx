import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { useThemeContext } from "../context/theme/useThemeContext";
import ResourceMonitor from "./components/ResourceMonitor";
import { cloneDeep } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const FlowComponent = ({
  nodes,
  width,
  height,
}: {
  nodes: Node[];
  width?: string;
  height?: string;
}) => {
  const { theme } = useThemeContext();
  const nodeTypes = useRef(nodeData).current;

  const flowState = useSelector((state: RootState) => state.flow);

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

  const fitViewOptionsConfig = useMemo(() => {
    return {
      padding: 10,
      minZoom: 0.8,
      duration: 500,
      nodes: nodesLocal,
    };
  }, [nodesLocal]);

  const { fitView } = useReactFlow();

  const onFitView = useCallback(() => {
    fitView(fitViewOptionsConfig); // Smooth transition with 1-second duration
  }, [fitView, fitViewOptionsConfig]);

  useEffect(() => {
    setTimeout(() => {
      fitView(fitViewOptionsConfig);
    }, 500);
  }, [flowState, fitView, fitViewOptionsConfig]);

  return (
    <Box className={`w-auto h-full !flex-col ${width} ${height}`}>
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
};

// HOC to wrap FlowComponent with ReactFlowProvider
function withReactFlowProvider(
  Component: React.ComponentType<{
    width?: string;
    height?: string;
    nodes: Node[];
    messageBlocksCount: number;
  }>,
) {
  return function WrappedComponent(props: {
    width?: string;
    height?: string;
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
