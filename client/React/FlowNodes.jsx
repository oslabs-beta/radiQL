import React from "react";
import { Handle } from 'react-flow-renderer';

const FlowNode = ({ data }) => {

  const colArray = data.columns.map((column, idx) => (
    <label id={ idx === 0 ? 'title' : 'row'} key={column} >
      {column} 
    </label>
  ))

  // Array to hold all of our foreign key handles
  const Handles = [];
  // Handle distance will be 19px to get to column 0 position and 26px for each column after that
  for (const [name, index] of Object.entries(data.foreignKeys)) {
    const handleStyle = {top: 28 + (index * 26)};
    Handles.push(<Handle type="source" key={name} id={name} position='right' style={handleStyle}/>)
  }
  
  return (
    <div className="table-node">
      <Handle type="target" position='left' style={{ top: 19 }}/>
      <div id="table-container">
        {colArray}
      </div>
      {Handles}
    </div>
  );
}

export default FlowNode
