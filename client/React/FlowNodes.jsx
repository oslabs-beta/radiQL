import React from "react";
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { };

const FlowNode = ({ data, isConnectable }) => {

  const colArray = data.columns.map(column => (
    <label>
      {column} 
    </label>
  ))

  const Handles = [];

  for (const fk of data.foreignKeys) {

    // <Handle type="source" position='right' isConnectable={true}/>
  }
  
  
  return (
    <div className="table-node">
      <Handle type="target" position='left' isConnectable={true}/>
      <div>
        {colArray}
      </div>
      <Handle type="source" position='right' isConnectable={true}/>
      {/* {Handles} */}
    </div>
  );
}

export default FlowNode
