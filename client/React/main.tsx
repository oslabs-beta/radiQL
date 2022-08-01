import * as React from 'react';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Main = props => {

  

  return (
    <div>
      <h1 className='App-title'>radiQL</h1>
      < NavBar /> 
    </div>
  )
}

export default Main;