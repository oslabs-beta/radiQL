import * as React from 'react';
// @ts-ignore
import logo from '../../public/images/radiQL_Logo.png';

const NavBar = props => {
  return (
    <div className="navbar">
      {/* <button className="navbar-btn">Nav Button</button> */}
      <a id="logo" className="nav-link" href="#">
        <img id="logo" src={logo} />
      </a>
      <div className="links">
        <a className="nav-link" href="#">About Us</a>
        <a className="nav-link" href="#">Medium Article</a>
        <a className="nav-link" href="#">Github</a>
        <a id="login" className="nav-link" href="#">Login</a>
      </div>
    </div>
  )
}

export default NavBar;