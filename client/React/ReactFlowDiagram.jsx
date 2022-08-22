import React, { useCallback, useEffect, useState, useRef } from 'react'
import ReactFlow, { addEdge, MiniMap, Controls, Background, BackgroundVariant, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange, MarkerType } from 'react-flow-renderer';
import FlowNode from './FlowNodes.jsx'
import CustomEdge from './FlowEdges.jsx';
console.log('Background', Background);

const nodeTypes = {
  flowNode: FlowNode,
};
const edgeTypes = {
  custom: CustomEdge,
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
      console.log('diagramData', diagramData);
      const allNodes = [];
      const allEdges = [];
      // {name: {inbound: [], outbound: []}}
      const connections = {};
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
            if (colObj.foreign_table !== null) {

              allEdges.push({ 
                id: colObj.table_name + colObj.foreign_table, 
                source: colObj.table_name, 
                sourceHandle: colObj.foreign_table,
                target: colObj.foreign_table, 
                animated: true, 
                type: 'custom',
                data: { },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                },
              })

              foreignKeys[colObj.foreign_table] = j;
            }
            columns.push(colObj.column_name);
          }
        };

        const curTable = diagramData[i][0].table_name;

        console.log(foreignKeys);
        // If the curent table does not exist in our connections hash
        if (!connections[curTable]) {
          // Add it to the connections hash object
          connections[curTable] = { outbound: [], inbound: [] };
        }

        // For each foreign key, 
        for (const foreignTable of Object.keys(foreignKeys)) {
          // Add the foreign key to the current table's connections
          connections[curTable].outbound.push(foreignTable);

          // if the foreignTable does exist in our connections hash,
          if (connections[foreignTable]) {
            // Add the current table to it's inbound connections 
            connections[foreignTable].inbound.push(curTable);
          } else {
            // Otherwise, initialize the foreignTable object with the current table already in the inbound connections 
            connections[foreignTable] = { outbound: [], inbound: [curTable] };
          }
        }
      
        allNodes.push(
          {
          id: curTable,
          type: 'flowNode',
          data: { columns: columns, foreignKeys: foreignKeys },
          position: { x: 0, y: 0 },
          }
        );
      }

      console.log(connections);
      const numTables = diagramData.length;
      let leftY = 50;
      // All tables with only outbound connections should be in the leftmost column
      for (let i = 0; i < allNodes.length; i++) {
        const node = allNodes[i];
        if (connections[node.id].inbound.length === 0) {
          node.position.y = leftY;
          leftY += 200;
        }
      }
      // From the remaining tables we should get the tables with inbound connections that are only connected to the leftmost column
      const leftCount = ((leftY - 50) / 200);
      const rightCount = numTables - leftCount; //5
      let curX = 300, curY = 200;
      const coords = [];
      for (let i = 0; i < rightCount; i++) {
        coords.push({ x: curX, y: curY });
        curX += 300;
        curY -= 300;
      }
      
      console.log(coords);
      let coordsIndex = 0;
      let coordsIndexRev = 0;
      for (let i = 0; i < allNodes.length; i++) {
        if ( allNodes[i].position.x === 0 && allNodes[i].position.y === 0 ) {
          if ( coordsIndex === coordsIndexRev ) {
            allNodes[i].position.x = coords[coordsIndex].x;
            allNodes[i].position.y = coords[coordsIndex++].y;
          } else {
            allNodes[i].position.x = coords[coords.length - coordsIndexRev - 1].x;
            allNodes[i].position.y = coords[coords.length - coordsIndexRev++ - 1].y;
          }
        }
      }

      setNodes(allNodes);
      setEdges(allEdges);
    }
  }, [diagramData])


  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e1-4', 
      source: '1', 
      target: '4', 
      animated: true, 
      type: 'custom',
      data: {  },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
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
      edgeTypes={edgeTypes}
      fitView
    />
  )
}

export default ReactFlowDiagram