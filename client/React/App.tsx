import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
// Components: 
import About from './About';
import NavBar from './NavBar';
import MainPage from './MainPage';
import axios from 'axios';

const App = () => {

  const [username, setUsername] = React.useState<string>('');

  React.useEffect(() => {
    // setUsername('Alex');
    axios.get('/getUsername')
    .then((res) => {
      console.log(res.data);
      setUsername(res.data);
    })
  }, [])

  return (
    <div className='body'>
      < NavBar username={username} setUsername={setUsername} /> 
      <Routes>
        {/* // About us Page */}
        <Route path="/About" element={< About />}/>
        {/* // Main App Page */}
        <Route path="/" element={< MainPage username={username} />}/>
      </Routes>
    </div>
  )
}
  
export default App;