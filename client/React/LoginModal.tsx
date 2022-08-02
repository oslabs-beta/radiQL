import * as React from 'react'
import axios, { Axios } from 'axios'
// @ts-ignore
import logo from '../../public/images/radiQL_Logo.png'
import { FaBeer, FaTimes } from 'react-icons/fa';



const LoginModal = ({setShowLogin}) => {
  const [isRegistered, setIsRegistered] = React.useState(true)
  const [passwordMatch, setPasswordMatch] = React.useState(true)

  //Handle register Click function
  const handleRegister = async () => {
  //access register username value
  const username = (document.getElementById('login-username') as HTMLInputElement).value;
  //access register password value
  const password = (document.getElementById('login-password') as HTMLInputElement).value;
  //access register confirm password value
  const confirmPassword = (document.getElementById('register-confirm-password') as HTMLInputElement).value;

  //if Passwords dont match, break && tell user
  if(password !== confirmPassword){
    return setPasswordMatch(false)
  }

  try{
    //send username/password values to server, wait for response
    const response = await axios.post('/register', {
      username: username,
      password: password
    })
    console.log(response)

  } catch (error) {
    console.log('axios register post error', error)
  }

}

//handle Login click function
const handleLogin = async () => {
  
  //access login username value
  const username = (document.getElementById('login-username') as HTMLInputElement).value;
  //access login password value
  const password = (document.getElementById('login-password') as HTMLInputElement).value;

  //axios post to backend
  try{
    //send username/password values to server, wait for response
    const response = await axios.post('/login', {
      username: username,
      password: password
    })
    console.log(response)

  } catch (error) {
    console.log('axios login post error', error)
  }
}

  return (
    <div className="login-modal-container">
      <FaTimes id='close-icon' onClick={()=> setShowLogin()}/>
      <img id="login-logo" src={logo} />
      <div id="input-modal-container">
        {/* username and password input fields */}
        <input type="text" id="login-username" className='login-input'  placeholder="Username" required/>
        <input type="password" id="login-password" className='login-input' placeholder="Password" required />

        {/* if user needs to register display confirm password field */}
        {!isRegistered && <input type="password" id="register-confirm-password" className='login-input' placeholder="Confirm Password" required/>}

        {/* if user is registering btn says register and use register onclick functiion; if user is logging in, btn says log in use login onclick function  */}
        <button id="login-btn" onClick={isRegistered ? () => handleLogin() : () => handleRegister()}>{isRegistered ? 'Login': 'Create Account'}</button>

        
        {isRegistered && <a id="register" onClick={() => setIsRegistered(false)} href='#'>Register?</a>}

        {/* if passwords dont match upon registration, show error displaying that passwords do not match  */}
        {!passwordMatch && <p className="login-error-message">Passwords do not match!</p>}
      </div>
    </div>
  )
}

export default LoginModal