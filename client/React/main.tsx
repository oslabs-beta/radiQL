import * as React from 'react';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import About from './About'
// import CodemirrorExample from './codemirror';
import CodeBlock from './codeBlock';
import { motion, AnimatePresence } from "framer-motion";
import {FaClipboardList, FaArrowRight} from 'react-icons/fa';

const Main = props => {

  const [codeBody, setCodeBody] = useState()

  //send uri request
  const handleConvertURI = async() => {
    const dbURI = (document.getElementById('userURI') as HTMLInputElement).value;
    try{
      const response = await axios.post('/submitURI', {dbURI: dbURI})
      console.log(response.data)
      setCodeBody(response.data)
    } catch(err){
      console.log('dbURI', err)
    }
  }


  

  return (
    <div className='body'>
      < NavBar /> 
      <Routes>
        {/* // About us Page */}
        <Route path="/About" element={< About />}/>
        {/* // Main App Page */}
        <Route path="/" element={
          <div id='main-content' className='mainContent'>
            <div id='dynamic-about' className='dynamicAbout left-1' >
              {/* <ol id='steps-list' type='1'>
                <li>1. Paste your URI below and click "Convert!"</li>
                <li>2. Click "<FaClipboardList style={{'display': 'inline-block'}}/>" in the output code block. </li>
                <li>3. Paste code into your server to begin using GraphQL.</li>
              </ol> */}
              <div id="circles-container">
                <span id='1' className='circle current-step'>1</span>
                <FaArrowRight />
                <span id='2' className='circle'>2</span>
                <FaArrowRight />
                <span id='3' className='circle'>3</span>
              </div>
              <div id="uri-input-container">
                <input id='userURI' type="text" placeholder='        Your Database URI' />
                <button id='convert-btn' onClick={() => handleConvertURI()} >Convert!</button>
              </div>
              <div className='stats left-2'>Stats here?</div>
            </div>
            <CodeBlock codeBody={codeBody} />
          </div>
        }/>
      </Routes>
    </div>
  )
}

export default Main;