import React from "react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) {
  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path animated"
        d={`M${sourceX},${sourceY} C  ${targetX} ${sourceY} ${targetX-10} ${sourceY} ${targetX-10},${targetY}`}
        markerEnd={markerEnd}
      />
    </>
  )
}