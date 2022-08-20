import React, { useCallback, useEffect, useState, useRef } from 'react'
import ReactFlow, { MiniMap, Controls, Background, BackgroundVariant, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange } from 'react-flow-renderer';
import FlowNode from './FlowNodes.jsx'

const nodeTypes = {
  flowNode: FlowNode,
};

const ReactFlowDiagram = ({diagramData}) => {

  let initialNodes = [
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

  useEffect(() => {
    // Do not run function on initial load:
    if (diagramData) {
      console.log('Default Diagram');
    } else {
      console.log('Rendering Diagram from diagramData');
      // Will make this a for loop to look through every diagramData array:
      //const node1 = diagramData[0];
      // Then transform the current diagramData array into an array of column names like this:
      const columns = ['_id', 'name', 'manufacturer', 'model'];
      
      setNodes([
        {
        id: '5',
        type: 'flowNode',
        data: { columns: columns },
        position: { x: 200, y: 225 },
        }
      ])
    }
  }, [diagramData])


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
      nodes={nodes} 
      edges={edges} 
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange} 
      nodeTypes={nodeTypes}
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