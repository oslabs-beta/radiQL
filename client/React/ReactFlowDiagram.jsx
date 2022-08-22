import React, { useCallback, useEffect, useState, useRef } from 'react'
import ReactFlow, { addEdge, MiniMap, Controls, Background, BackgroundVariant, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange } from 'react-flow-renderer';
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
    // Do not run function if diagramData is null:
    if (!diagramData) {
      console.log('Default Diagram');
    } else {
      // [[{}, {}, {}, {}, {}], [{}, {}, {}, {}]]
      const allNodes = [];
      // Will make this a for loop to look through every diagramData array:
      // i = current table index
      for (let i = 0; i < diagramData.length; i++) {
        // Then transform the current diagramData array into an array of column names like this:
        const foreignKeys = {};
        const columns = []
        // j = current column index
        for (let j = 0; j < diagramData[i].length; j++) {
          const colObj = diagramData[i][j];
          if (colObj.column_name === '_id') {
            columns.push(colObj.table_name);
          } else {
            if (colObj.foreign_table !== null) foreignKeys[colObj.foreign_table] = j;
            columns.push(colObj.column_name);
          }
        };

        console.log(foreignKeys);

        allNodes.push(
          {
          id: i.toString(),
          type: 'flowNode',
          data: { columns: columns, foreignKeys: foreignKeys },
          position: { x: i*100, y: i*100 },
          }
        );
      }
      setNodes(allNodes);
      setEdges([]);
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
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow 
      nodes={nodes} 
      edges={edges} 
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange} 
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      fitView
    >
      <Background
        variant={BackgroundVariant.Dots}
        className="dots"
        color="gray"
        gap={100}
        size={3}
      />
    </ReactFlow>
  )
}

export default ReactFlowDiagram