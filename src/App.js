import { useCallback, useState, useMemo } from "react";
import ReactFlow, {
  applyNodeChanges,
  Controls,
  Background,
  useKeyPress,
} from "react-flow-renderer";
import { initialNodes } from "./data/nodes.js";
// import initialEdges from "./data/edges.js";
import Action from "./nodeTypes/Action";
import AddAction from "./nodeTypes/AddAction";
import AddIcon from "./nodeTypes/AddIcon";
import Trigger from "./nodeTypes/Trigger";
import { v4 as uuidv4 } from "uuid";
import { NODE_TYPES } from "./const";
import { Grid, Typography } from "@mui/material";

const defaultEdgeOptions = {
  // animated: true,
};

function App() {
  const spacePressed = useKeyPress("Space");
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onNodeClick = useCallback((e, node) => {
    setSelectedNode(node);
  }, []);

  const defaultEdges = useMemo(() => {
    const arr = [];
    for (const [index, node] of nodes?.entries()) {
      const nextNode = nodes?.[index + 1];

      if (index + 1 <= nodes?.length - 1) {
        arr.push({
          id: `e${node?.id}-${nextNode?.id}`,
          source: node?.id,
          target: nextNode?.id,
        });
      }
    }

    return arr;
  }, [nodes]);

  const onInsert = useCallback(
    ({ action, nodeId }) => {
      const currentNodeIndex = nodes?.findIndex((node) => node?.id === nodeId);

      if (!currentNodeIndex === -1) return;
      const currentNode = nodes?.[currentNodeIndex];

      const STEP_MOVE = 150;

      const newNodes = [
        {
          id: uuidv4(),
          data: {},
          position: currentNode?.position,
          type: NODE_TYPES.ADD_ICON,
        },
        {
          id: uuidv4(),
          data: { type: action, isShowHandleTop: true },
          position: currentNode?.position,
          type: NODE_TYPES.ACTION,
        },
      ];

      const updatedNodes = [
        ...nodes?.slice(0, currentNodeIndex),
        ...newNodes,
        ...nodes?.slice(currentNodeIndex),
      ]?.map((node, index) => ({
        ...node,
        position: {
          ...node?.position,
          y: (index + 1) * STEP_MOVE,
        },
      }));

      setNodes(updatedNodes);
    },
    [nodes]
  );

  const nodeTypes = useMemo(
    () => ({
      [NODE_TYPES.ACTION]: (props) => <Action {...props} />,
      [NODE_TYPES.ADD_ACTION]: (props) => (
        <AddAction {...props} onInsert={onInsert} />
      ),
      [NODE_TYPES.ADD_ICON]: (props) => (
        <AddIcon {...props} onInsert={onInsert} />
      ),
      [NODE_TYPES.TRIGGER]: (props) => <Trigger {...props} />,
    }),
    // eslint-disable-next-line
    [nodes?.length]
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Grid item style={{ flex: 1, height: "100%" }}>
        <ReactFlow
          defaultNodes={nodes}
          defaultEdges={defaultEdges}
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          panOnScroll={true}
          nodeTypes={nodeTypes}
          panOnDrag={spacePressed}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </Grid>
      <Grid
        container
        direction="column"
        spacing={2}
        item
        style={{
          flexBasis: 500,
          height: "100%",
          background: "#F7F8FA",
          overflowY: "auto",
        }}
      >
        <Grid item style={{ margin: 2 }}>
          <Typography variant="h5">Setting</Typography>
        </Grid>
        <Grid item>
          <pre>
            {!selectedNode
              ? "Click on node to see detail"
              : JSON.stringify(selectedNode, null, 4)}
          </pre>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
