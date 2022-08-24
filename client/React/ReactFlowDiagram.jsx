import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow, { addEdge, Controls, Background, applyEdgeChanges, applyNodeChanges, MarkerType } from 'react-flow-renderer';
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
      
        // Add our evaluated data to the allNodes array
        allNodes.push(
          {
          id: curTable,
          type: 'flowNode',
          data: { columns: columns, foreignKeys: foreignKeys },
          position: { x: 0, y: 0 },
          }
        );
      }
      // Generate coordinates for first column:
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
      // Result for x: [0, 0, 0 ,0]
      // Result for y: [50, 250, 450, 650]
      
      // Generating coordinates for remaining columns in below function
      // From the remaining tables we should get the tables with inbound connections that are only connected to the leftmost column
      const createCoordsArray = (count) => {
        // Create the x and y coordinate arrays
        let curX = 300, curY = -200;
        const xArr = [], yArr = [];
        for (let i = 0; i < count; i++) {
          xArr.push(curX);
          yArr.push(curY);
          curX += 300;
          curY += 300;
        }
        // Result for x: [300, 600, 900, 1200]
        // Result for y: [-200, 100, 400, 700]

        // Pair up x and y arrays together
        const tempCoords = [];
        let countUp = 0;
        let countDown = 0;
        for (let i = 0; i < xArr.length; i++) {
          let yIndex = 0;
          if (countUp === countDown) yIndex = countUp++;
          else yIndex = yArr.length - ++countDown;
          tempCoords.push({ x: xArr[i], y: yArr[yIndex] });
        }
        // Wanted Result for tempCoords: 
        // [{ x: 300, y: -200 }, { x: 600, y: 700}, { x: 900, y: 100}, { x: 1200, y: 400}]
        return tempCoords;
      }

      const leftCount = ((leftY - 50) / 200);
      const rightCount = numTables - leftCount;
      const coords = createCoordsArray(rightCount);
      
      console.log(coords);
      let coordsIndex = 0;
      for (let i = 0; i < allNodes.length; i++) {
        if ( allNodes[i].position.x === 0 && allNodes[i].position.y === 0 ) {
          console.log('coordsIndex: ' + coordsIndex)
          allNodes[i].position.x = coords[coordsIndex].x;
          allNodes[i].position.y = coords[coordsIndex++].y;
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