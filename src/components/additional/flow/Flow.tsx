import { useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Box, Flex } from "@radix-ui/themes";
import "./styles.css";
import { useThemeContext } from "../../context/useThemeContext";
import { nodeData } from "./components/config";

export default function Flow() {
  const { theme } = useThemeContext();

  const [nodes] = useState([]);
  const [edges] = useState([]);

  const nodeTypes = useRef(nodeData).current;

  return (
    <ReactFlowProvider>
      <main className="flex">
        <Flex
          width={`${300}px`}
          className={`!h-[calc(100vh_-_65px)] !flex-col`}
          style={{
            width: "auto",
          }}
        ></Flex>

        <Box className="!w-[100vw] h-[calc(100vh_-_65px)] !flex-col">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            colorMode={theme as "light" | "dark"}
            fitView
            fitViewOptions={{ maxZoom: 0.8, padding: 0.1 }}
            proOptions={{ hideAttribution: true }}
            nodeTypes={nodeTypes}
          >
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </Box>
      </main>
    </ReactFlowProvider>
  );
}
