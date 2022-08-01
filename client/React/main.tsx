import * as React from 'react';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Main = props => {



  return (
    <div>
      <div id="bg-L"></div>
      <div id="bg-R"></div>
      <h1 className='App-title'>radiQL</h1>
      < NavBar /> 
    </div>
  )
}

export default Main;