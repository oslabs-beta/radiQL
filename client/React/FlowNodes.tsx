import React from "react";
import { Handle, Position } from 'react-flow-renderer';


const handleStyle = { left: 10 };

const FlowNode = (props) => {

  

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default FlowNode



/*{
  "column_name": "_id",
  "constraint_type": "PRIMARY KEY",
  "foreign_table": null,
  "foreign_column": null
},*/