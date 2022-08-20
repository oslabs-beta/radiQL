import React from "react";
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };

const FlowNode = ({data}) => {

  const colArray = data.columns.map(column => (
    <label>
      {column} 
    </label>
  ))

  console.log(colArray);

  return (
    <div className="table-node">
      {/* <Handle type="target" position="left" /> */}
      <div>
        {colArray}
      </div>
      {/* <Handle type="source" position={Position.Bottom} /> */}
    </div>
  );
}

export default FlowNode
