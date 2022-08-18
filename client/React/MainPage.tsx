import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {FaClipboardList, FaArrowRight, FaCheck} from 'react-icons/fa';
import SavedDatabases from './SavedDatabases';
import dummydata from '../dummyCode';
// Components: 
import CodeBlock from './CodeBlock';
import MountainLogo from './MountainLogo'
import SaveDatabaseModal from './SaveDatabaseModal';

import {usersUris} from './types'

const MainPage = ({username}) => {

  // State to switch between tabs on the CodeBody component
  const [currentTab, changeTab] = useState<number>(1);
  // Code input for the Schema tab
  const [schemaBody, setschemaBody] = useState(dummydata.dummySchema);
  // Code input for the Resolver tab
  const [resolverBody, setresolverBody] = useState(dummydata.dummyResolver);
  // Current instruction step (either 1, 2 or 3)
  const [instruction, setInstruction] = useState<number>(1);

  // Current value of the URI input field
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  // State that shows or hides the SaveDatabaseModal component
  const [showSaveModal, setShowSaveModal] =  React.useState<boolean>(false);
  // Saved databases that are displayed when logged in
  const [savedUris, setSavedUris] = React.useState<usersUris | null>(null);
  // Save the last sent URI
  const [lastURI, setLastURI] = React.useState<string | null>(null);


  //send uri request
  const handleConvertURI = async() => {
    const blurBox = (document.getElementById('blur-container'));
    const dbURI = (document.getElementById('userURI') as HTMLInputElement).value;
    try{
      blurBox?.classList.remove('hidden');

      console.log('Sending URI')
      const response = await axios.post('/submitURI', {dbURI: dbURI});
      console.log('URI Response')

      if (response.data.schema) {
        setLastURI(dbURI);
        if (instruction === 1) {
          const stepOne = (document.getElementById('1') as HTMLInputElement);
          const stepTwo = (document.getElementById('2') as HTMLInputElement);
          stepOne.classList.remove('current-step');
          stepTwo.classList.add('current-step');
          setInstruction(2);
        }
        setschemaBody(response.data.schema);
        setresolverBody(response.data.resolver);
        console.log(response.data.tableData);
      } else {
        console.log('ERORR: Bad response from server');
        console.log(response);
      }
    } catch(err){
      console.log('dbURI', err);
    }
    // Unblur
    setTimeout(() => {blurBox?.classList.add('hidden')}, 500);
    // blurBox?.classList.add('hidden');
  }

  // Get URIS Function: Axios request to server  route '/uris' 
  const GetUsersUris = async (): Promise<void | string>  => {
    try {
      // Post body includes current users ID from cookie.SSID
      const { data, status } = await axios.get<usersUris>(
        '/uris', {withCredentials: true},
      );
      // console.log(JSON.stringify(data));
      // console.log('response status is: ', status);
      // Set saved uris state to the response of the axios request
      setSavedUris(data);
    }  catch (error) {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
    }
  }

  return (
    <div id='main-content' className='mainContent'>
      <div id='dynamic-about' className='dynamicAbout left-1' >
        {showSaveModal && <SaveDatabaseModal GetUsersUris={GetUsersUris} setShowSaveModal={setShowSaveModal} />}
        <h1>How to use radiQL:</h1>
        <div id="circles-container">
          <span 
            id='1' 
            className='circle current-step'>
            { instruction > 1 ? <FaCheck style={{'color': 'lime'}} /> : 1 }
          </span>
          <FaArrowRight />
          <span 
            id='2' 
            className='circle'>
            { instruction > 2 ? <FaCheck style={{'color': 'lime'}} /> : '2' }
          </span>
          <FaArrowRight />
          <span id='3' className='circle'>3</span>
        </div>
        <section id="instructions">
          <h2 className={ instruction === 1 ? '' : 'gray' } >1. Paste your URI below and click "Convert!"</h2> 
          <h2 className={ instruction === 2 ? '' : 'gray' } >2. Click "<FaClipboardList style={{'display': 'inline-block'}}/>" in the output code block to copy the current page</h2>
          <h2 className={ instruction === 3 ? '' : 'gray' } >3. Paste code into your server to begin using GraphQL</h2>
        </section>
        <div id="uri-input-container" className='p-2'>
          <input 
            id='userURI' 
            type="text" 
            placeholder=' Your Database URI' 
            value={selectedDatabase} 
            onChange={(e) => setSelectedDatabase(e.target.value)}
          />
          <motion.button 
            whileHover={{scale: 1.1}} 
            whileTap={{scale: 0.9}} 
            id='convert-btn' 
            onClick={() => handleConvertURI()}>
            Convert!
          </motion.button>
          {username ? 
            <motion.button 
              whileHover={{scale: 1.1}} 
              whileTap={{scale: 0.9}} 
              id='save-database-btn' 
              onClick={() => setShowSaveModal(true)}>
              Save Database
            </motion.button> 
            : <button id='disabled-save' disabled >Log In To Save Database</button> 
          }
          {username && <SavedDatabases savedUris={savedUris} GetUsersUris={GetUsersUris} username={username} setSelectedDatabase={setSelectedDatabase}/>}
        </div>
        <div className='stats left-2'>Last URI Submitted: {lastURI}</div>
      </div> 
      <CodeBlock 
        schemaBody={schemaBody} 
        resolverBody={resolverBody} 
        setInstruction={setInstruction} 
        currentTab={currentTab} 
        changeTab={changeTab} 
        lastURI={lastURI}
      />
      <div id='blur-container' className='hidden'>
          < MountainLogo />
        </div>
    </div>
  )
}

export default MainPage;