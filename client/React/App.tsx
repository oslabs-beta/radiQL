import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
// Components: 
import About from './About';
import NavBar from './NavBar';
import MainPage from './MainPage';

const App = () => {

  return (
    <div className='body'>
      < NavBar /> 
      <Routes>
        {/* // About us Page */}
        <Route path="/About" element={< About />}/>
        {/* // Main App Page */}
        <Route path="/" element={< MainPage />}/>
      </Routes>
    </div>
  )
}
  
export default App;