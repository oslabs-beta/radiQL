import * as React from "react";
import { useState, useEffect } from "react";
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { CopyBlock, hybrid } from "react-code-blocks";
import axios from "axios";
import boilerPlateInstructions from './BoilerPlateCode.jsx';
import ReactFlowDiagram from './ReactFlowDiagram.jsx'

// const finalCode = genBoilerPLate(serverOption, dummyFetchedCode);

const CodeBlock = ({schemaBody, resolverBody, setInstruction, currentTab, changeTab, lastURI}) => {

  const [boilerPlateCode, setBoilerPlateCode] = useState<string>(boilerPlateInstructions);
  const [boilerPlateSelection, setBoilerSelection] = useState<string>('No boilerplate code');
  
  useEffect(() => {
    console.log(boilerPlateInstructions, boilerPlateCode);
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

  // When boilerPlateSelection is changed,
  useEffect(() => {
    if (boilerPlateSelection === 'No boilerplate code') {
      setBoilerPlateCode(boilerPlateInstructions);
      return;
    }

    if (lastURI === null) {
      console.log('No URI submitted yet, please submit a URI to generate boilerplate code');
      return;
    }

    // Get cached boilerPlateCode from localStorage if it exists
    const code: string | null = localStorage.getItem(boilerPlateSelection + lastURI);
    // If it is not null, use setboilerPlateCode on cached data
    if (code !== null) {
      console.log('boilerplate retrieved from localStorage');
      setBoilerPlateCode(code);
    } else {
      console.log('boilerplate call to: ', boilerPlateSelection);
      // Otherwise, send call to database for boilerplate code and save to cache
      axios.post<string>(boilerPlateSelection, {dbURI: lastURI})
      .then((res) => {
        setBoilerPlateCode(res.data);
        localStorage.setItem(boilerPlateSelection + lastURI, res.data);
      }); 
    }
  }, [boilerPlateSelection])

  useEffect(() => {
    const bpSelect = document.getElementById('boiler-plate-select') as HTMLSelectElement | null;
    if (bpSelect) bpSelect.value = 'No boilerplate code';
    setBoilerPlateCode(boilerPlateInstructions)
  }, [lastURI])
  
  const zoomOut = () => {
    const txt= document.getElementById('code-output');
    //@ts-ignore
    const style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    const currentSize = parseFloat(style);
    //@ts-ignore
    txt.style.fontSize = (currentSize - 5) + 'px';
  }
  const zoomIn = () => {
    const txt = document.getElementById('code-output');
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
        <form className="mx-10 min-w-130">
          <select id="boiler-plate-select" title='boilerplatecode' className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" 
          // Set BoilerplateSelection equal to this selector's value to run new axios call
          onChange={(e) => setBoilerSelection(e.target.value)}>
            <option value="No boilerplate code">No boilerplate code</option>
            <option value="/defaultbp">Express GraphQL</option>
            <option value="/apollobp">Apollo Server</option>
            <option value="GraphQL Yoga">GraphQL Yoga</option>
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
        <div id="code-output">
        { // If current tab is === 3:
        currentTab === 3 ? 
          // Render the D3 diagram element,
          <ReactFlowDiagram /> 
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
