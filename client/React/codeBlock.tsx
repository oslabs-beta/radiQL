import * as React from "react";
import { useState, useEffect } from "react";
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { Multiselect } from "multiselect-react-dropdown";
import '../styles.css';
// import ".../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { CopyBlock, hybrid, dracula, anOldHope, androidstudio, atomOneDark, atomOneLight, codepen, googlecode, monoBlue, nord, rainbow, shadesOfPurple, tomorrowNightBlue, zenburn } from "react-code-blocks";
import "../styles.scss";
import genBoilerPlate from './BoilerPlateCode.jsx';

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
        
// const finalCode = genBoilerPLate(serverOption, dummyFetchedCode);
const finalCode = dummyFetchedCode;

const CodeBlock = ({codeBody}) => {
  const [lineNumbers, toggleLineNumbers] = useState(true);
  const [theme, setTheme] = useState(hybrid);
  const [boilerPlateCode, setBoilerPlateCode] = useState('useBoilerPlateCode');
  console.log(dracula);
  const dracula2 = {titan: 'monster'}
  console.log(eval('dracula2'))

  useEffect(() => {
    console.log('theme changed');
    console.log(theme);
  }, [theme])
  
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
    // drop-down for theme
    <div className="codeDiv">
      <div className="flex flex-row flex-grow justify-around items-end">
        <h3>Generated GraphQL Schema:</h3>
        <form>
          {/* select for theme */}
          <label>Pick a theme: </label>
          <select onChange={(e) => {setTheme(eval(e.target.value))}} title="theThemes" name="themes" id="themes" className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
            <option value="anOldHope">anOldHope</option>
            <option value="androidstudio">androidstudio</option>
            <option value="atomOneDark">atomOneDark</option>
            <option value="atomOneLight">atomOneLight</option>
            <option value="codepen">codepen</option>
            <option defaultValue="dracula">dracula</option>
            <option value="googlecode">googlecode</option>
            <option value="hybrid">hybrid</option>
            <option value="monoBlue">monoBlue</option>
            <option value="nord">nord</option>
            <option value="rainbow">rainbow</option>
            <option value="shadesOfPurple">shadesOfPurple</option>
            <option value="tomorrowNightBlue">tomorrowNightBlue</option>
            <option value="zenburn">zenburn</option>
          </select>
        </form>
          {/* select for boilerplate code */}
        <form>
          <label>Include boilerplate code</label>
          <select title='boilerplatecode' className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
            <option value="No boilerplate code">No boilerplate code</option>
            <option value="GraphQL.js">GraphQL.js</option>
            <option value="Apollo Server">Apollo Server</option>
            <option value="graphql-yoga">graphql-yoga</option>
            <option value="Express GraphQL">Express GraphQL</option>
            <option value="GraphQL Helix">GraphQL Helix</option>
            <option value="Mercurious">Mercurious</option>
          </select>
        </form>
      </div>
      <div id='zoom-controls-container'>
        {/* @ts-ignore */}
        <FaPlusSquare style={{'color':'#1b2240'}} onClick={() => zoomIn()}/>
        <FaMinusSquare style={{'color':'#1b2240'}} onClick={() => zoomOut()}/>
      </div>
       {/* codeBlock */}
      <div className="container mx-auto codeOutput overflow-scroll" >
        <div id="copyblockid" className="demo overflow-scroll">
          <CopyBlock id="copyblockid" className="overflow-scroll"
            language={'javascript'}
            text={codeBody ? codeBody : finalCode}
            showLineNumbers={lineNumbers}
            theme={theme}
            wrapLines={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
