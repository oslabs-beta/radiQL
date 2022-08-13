import * as React from "react";
import { useState, useEffect } from "react";
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { CopyBlock, hybrid } from "react-code-blocks";
import genBoilerPlate from './BoilerPlateCode.jsx';

// const finalCode = genBoilerPLate(serverOption, dummyFetchedCode);

const CodeBlock = ({schemaBody, resolverBody, setInstruction, currentTab, changeTab}) => {

  const [boilerPlateCode, setBoilerPlateCode] = useState('BoilerPlateCode');

  useEffect(() => {
    const clipboardIcon = (document.querySelector('.icon') as HTMLInputElement);
    console.log(clipboardIcon);
    clipboardIcon.addEventListener('click', () => {
      const stepThree = (document.getElementById('3') as HTMLInputElement);
      const stepTwo= (document.getElementById('2') as HTMLInputElement);
      const stepOne= (document.getElementById('1') as HTMLInputElement);
      stepThree.classList.add('current-step');
      stepTwo.classList.remove('current-step');
      stepOne.classList.remove('current-step');
      console.log('clipboard clicked');
      setInstruction(3);
    })
  }, [])
  
  const zoomOut = () => {
    const txt = document.getElementById('codeOutput');
    //@ts-ignore
    const style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    const currentSize = parseFloat(style);
    //@ts-ignore
    txt.style.fontSize = (currentSize - 5) + 'px';
  }
  const zoomIn = () => {
    const txt = document.getElementById('codeOutput');
    //@ts-ignore
    const style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    const currentSize = parseFloat(style);
    //@ts-ignore
    txt.style.fontSize = (currentSize + 5) + 'px';
  }

  return (
    // code menus and code generation
    <div className="codeDiv">
      <div id="code-header">
          {/* select for boilerplate code */}
        <section id="tabs">
          <button className={ currentTab === 1 ? '' : 'not-active' } onClick={() => changeTab(1)}>Schema</button>
          <button className={ currentTab === 2 ? '' : 'not-active' } onClick={() => changeTab(2)}>Resolver</button>
          <button className={ currentTab === 3 ? '' : 'not-active' } onClick={() => changeTab(3)}>Diagram</button>
          <button className={ currentTab === 4 ? '' : 'not-active' } onClick={() => changeTab(4)}>Boilerplate</button>
        </section>
        <form className="mx-10">
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
        <div id='zoom-controls-container'>
          {/* @ts-ignore */}
          <FaMinusSquare style={{'color':'white'}} onClick={() => zoomOut()}/>
          <FaPlusSquare style={{'color':'white'}} onClick={() => zoomIn()}/>
        </div>
      </div>
        <div id="codeOutput">
        { // If current tab is === 3:
        currentTab === 3 ? 
          // Render the D3 diagram element,
          <div id="diagram" style={{'color':'white'}}>Diagram</div> 
          : // Otherwise:
          // Render the Codeblock element.
          <CopyBlock id="copyblockid"
            language={'javascript'}
            text={ 
              currentTab === 1 ? schemaBody : 
              currentTab === 2 ? resolverBody :
              currentTab === 4 ? boilerPlateCode :
              `Tabs Error: tab ${currentTab} not found`
              }
            theme={hybrid}
            wrapLines={true}
          />
        }
      </div>
    </div>
  );
};

export default CodeBlock;
