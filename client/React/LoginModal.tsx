import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useCookies, Cookies } from 'react-cookie';
// @ts-ignore
import logo from '../../public/images/radiQL_Logo.png';
import { FaTimes } from 'react-icons/fa';
import { motion } from "framer-motion";


const LoginModal = ({ setShowLogin, username, setUsername }) => {

  const [notRegistering, setNotRegistering] = useState<boolean>(true);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  // Handle register Click function
  const handleRegister = async () => {
    const username = (document.getElementById('login-username') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('register-confirm-password') as HTMLInputElement).value;
    // If passwords don't match, break && tell user
    if(password !== confirmPassword){
      setTimeout(()=> setPasswordMatch(true), 3000);
      return setPasswordMatch(false);
    }
    try{
      // Send username/password values to server, wait for response
      const response = await axios.post('/register', {
        username: username,
        password: password
      })
      setNotRegistering(true);
      console.log(response);
    } catch (error) {
      console.log('axios register post error', error);
    }
  }
  //ERROR: Username Not Found on Login
  useEffect(()=> {
    userNotFound && setTimeout(()=> {
      setUserNotFound(false);
    }, 3000)
  })


  // Handle Login click function
  const handleLogin = async () => {
    console.log('login attempt');
    const username = (document.getElementById('login-username') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;
    try{
      // Send username/password values to server, wait for response
      const response = await axios.post('/login', {
        username: username,
        password: password
      })
      console.log(response.data);
      setUsername(response.data);
    } catch (error) {
      console.log('axios login post error', error);
      setUserNotFound(true)
    }
  }
  
  const handleLogout = async () => {
    console.log('logout');
    try {
      const success: boolean = await axios.get('/logout');
      setUsername('');
      
    }  catch (error) {
      console.log('axios logout error', error);
    }
  }

  return (
    <motion.div drag initial={{ opacity: 0, scale: 0.75, top: 0, right: 0, }} animate={{ opacity: 1, scale: 1, top: 50, right: 30, }} exit={{ top:-150, right:-100, opacity: 0, scale: 0 }} className="login-modal-container">
      <FaTimes id='close-icon' onClick={()=> setShowLogin()}/>
      <img id="login-logo" src={logo} />

      { ///// If user is not logged in, show login fields and login/register buttons:
      username === '' ? 
      <div id="input-modal-container">
          {/* Username and password input fields */}
        <input 
          type="text" 
          id="login-username" 
          className='login-input'  
          placeholder="Username" 
          required
        />
        <input 
          type="password" 
          id="login-password" 
          className='login-input' 
          placeholder="Password" 
          required 
        />
          {/* If user needs to register display confirm password field */}
        {!notRegistering && 
          <input 
            type="password" 
            id="register-confirm-password" 
            className='login-input' 
            placeholder="Confirm Password" 
            required
          />
        }
          {/* If user is registering btn says register and use register onclick functiion; 
          if user is logging in, btn says log in use login onclick function  */}
        {userNotFound ? <p className='text-red-500'>'Invalid username/password'</p> : <motion.button 
          whileHover={{scale: 1.1}} 
          whileTap={{scale: 0.9}} 
          id="login-btn" 
          onClick={notRegistering ? () => handleLogin() : () => {
            console.log(document.cookie); 
            handleRegister()}
          }
        >
          {notRegistering ? 'Login': 'Create Account'}
        </motion.button>}
          {/* Button to switch between registration and login */}
        {notRegistering ? <a id="register" onClick={() => setNotRegistering(false)} href='#'>Register?</a> 
          : passwordMatch ? <a id="login?" onClick={() => setNotRegistering(true)} href='#'>Login?</a> 
          : <p className="login-error-message">Passwords do not match!</p> }
        {/* If passwords dont match upon registration, show error displaying that passwords do not match  */}
        {/* {!passwordMatch && <p className="login-error-message">Passwords do not match!</p>} */}
      </div>

      ///// If user is logged in, instead display account information and logout button
      : <div id="input-modal-container">
          <div id='username'>Logged into account: {username}</div>
          <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} id="login-btn" className='logout'
          onClick={() => handleLogout()}>Logout</motion.button> 
        </div>}
    </motion.div>
  )
}

export default LoginModal