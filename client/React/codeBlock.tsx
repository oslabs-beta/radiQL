import * as React from "react";
import { useState } from "react";
import { CopyBlock, hybrid, dracula } from "react-code-blocks";
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

const CodeBlock = () => {
  const [lineNumbers, toggleLineNumbers] = useState(true);
  return (
    <div className="container mx-auto p-4">
      <div className="demo">
        <CopyBlock
          language={'javascript'}
          text={dummyFetchedCode}
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
