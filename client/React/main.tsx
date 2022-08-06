import * as React from 'react';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import About from './About'
// import CodemirrorExample from './codemirror';
import CodeBlock from './codeBlock';

const Main = props => {


  return (
    <div className='body'>
      < NavBar /> 
      <Routes>
        // About us Page
        <Route path="/About" element={< About />}/>
        // Main App Page
        <Route path="/" element={
          <div id='main-content' className='mainContent'>
            <div id='dynamic-about' className='dynamicAbout left-1' >
              <p>radiQL is a GraphQL Schema Generator that meets all your needs</p>
              <div id="animate-container">
                <svg id="mountain" width="120" height="89" viewBox="0 0 120 89">
                  <path d="M118.5 88.5H1.5L41 18L51 35L69.5 2L118.5 88.5Z" fill="#145DA0" stroke="black" className="svg-elem-1"></path>
                </svg>
                <svg id="snow" width="120" height="89" viewBox="-21 -7 120 89">
                  <path d="M1 51.5L20 18L28.5 32L10.5 62L1 51.5Z" stroke="white" fill="white" className="svg-elem-2"></path>
                  <path d="M48.5 2L27.5 39.5L43 51.5L57.5 39.5L76.5 51.5L48.5 2Z" stroke="white" fill="white" className="svg-elem-3"></path> 
                </svg>
              </div>
            </div>
            <div className='stats left-2'>Stats here?</div>
            <CodeBlock/>
          </div>
        }/>
      </Routes>
    </div>
  )
}

export default Main;