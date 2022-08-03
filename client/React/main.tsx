import * as React from 'react';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import About from './About'
// import CodemirrorExample from './codemirror';
import CodeBlock from './codeBlock';

const Main = props => {

  const text = {
    object: {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
      key4: 'value4',
      obj1: {
        anotherkey: 'value6',
        keyagain: 'value7'
      },
      key5: 'value5'
    }
  }

  //send uri request
  const handleConvertURI = async() => {
    const dbURI = (document.getElementById('userURI') as HTMLInputElement).value;
    try{
      const response = await axios.post('/submitURI', {dbURI: dbURI})
      console.log(response)
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
              <h2>radiQL is a GraphQL Schema Generator that meets all your needs</h2>
              <div id="uri-input-container">
                <input id='userURI' type="text" placeholder='Your Database URI' />
                <button onClick={() => handleConvertURI()} >Convert!</button>
              </div>
              <div className='stats left-2'>Stats here?</div>
            </div>
            <CodeBlock />
          </div>
        }/>
      </Routes>
    </div>
  )
}

export default Main;