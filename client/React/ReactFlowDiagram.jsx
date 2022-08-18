import React, { useCallback, useState } from 'react'
import ReactFlow, { MiniMap, Controls, Background, BackgroundVariant, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange } from 'react-flow-renderer';
const ReactFlowDiagram = () => {

  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 250, y: 25 },
    },

    {
      id: '2',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '4',
      type: 'output',
      data: { label: 'Radql Node' },
      position: { x: 350, y: 200 },
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e1-4', source: '1', target: '4', animated: true },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <ReactFlow 
      nodes={initialNodes} 
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange} 
      edges={initialEdges} 
      fitView
      >
      <Background
          variant={BackgroundVariant.Dots}
          className="dots"
          color="gray"
          gap={20}
          size={1}
          />
    </ReactFlow>
  )
}

export default ReactFlowDiagram