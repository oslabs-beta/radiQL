import * as React from 'react';

const MountainLogo = props => {

  return (
    <div id="animate-container">
      <svg id="mountain" width="120" height="89" viewBox="0 0 120 89">
        <path d="M118.5 88.5H1.5L41 18L51 35L69.5 2L118.5 88.5Z" fill="#145DA0" stroke="black" className="svg-elem-1"></path>
      </svg>
      <svg id="snow" width="120" height="89" viewBox="-21 -7 120 89">
        <path d="M1 51.5L20 18L28.5 32L10.5 62L1 51.5Z" stroke="white" fill="white" className="svg-elem-2"></path>
        <path d="M48.5 2L27.5 39.5L43 51.5L57.5 39.5L76.5 51.5L48.5 2Z" stroke="white" fill="white" className="svg-elem-3"></path> 
      </svg>
    </div>
  )
}

export default MountainLogo;