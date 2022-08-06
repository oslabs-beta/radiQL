import * as React from "react";
import { useState } from "react";
import { CopyBlock, hybrid, dracula } from "react-code-blocks";
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import "../styles.scss";

const dummyFetchedCode: string = `class HelloMessage extends React.Component {
  handlePress = () => {
    alert('Hello')
  }
  render() {
    return (
      <div>
        <p>Hello {this.props.name}</p>
        <button onClick={this.handlePress}>Say Hello</button>
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />, 
  mountNode 
);`;

const CodeBlock = ({codeBody}) => {
  const [lineNumbers, toggleLineNumbers] = useState(true);
  
  const zoomOut = () => {
    const txt = document.getElementById('code-container');
    //@ts-ignore
    const style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    const currentSize = parseFloat(style);
    //@ts-ignore
    txt.style.fontSize = (currentSize - 5) + 'px';
  }
  const zoomIn = () => {
    const txt = document.getElementById('code-container');
    //@ts-ignore
    const style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    const currentSize = parseFloat(style);
    //@ts-ignore
    txt.style.fontSize = (currentSize + 5) + 'px';
  }
  return (
    <div  className="container mx-auto codeOutput overflow-scroll">
      <div id='zoom-controls-container'>
        {/* @ts-ignore */}
        <FaPlusSquare style={{'color':'#1b2240'}} onClick={() => zoomIn()}/>
        <FaMinusSquare style={{'color':'#1b2240'}} onClick={() => zoomOut()}/>
        
      </div>
      <div id='code-container' className="demo">
        
        <CopyBlock
          language={'javascript'}
          text={codeBody ? `${codeBody}` : dummyFetchedCode}
          showLineNumbers={lineNumbers}
          theme={hybrid}
          wrapLines={true}
          codeBlock
        />
      </div>
    </div>
  );
};

export default CodeBlock;
